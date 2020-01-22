package com.softcen.bigcen.med.main.controller;

import java.io.File;
import java.net.URLEncoder;
import java.sql.SQLSyntaxErrorException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.med.admin.auth.service.IAuthService;
import com.softcen.bigcen.med.main.service.ILogAccessService;
import com.softcen.bigcen.med.main.service.ILoginService;
import com.softcen.bigcen.med.research.approve.service.IApproveService;
import com.softcen.bigcen.med.utils.BigcenSecurityUtils;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.RequestUtil;
import com.softcen.bigcen.med.utils.StringUtils;

@Controller
@RequestMapping(value="/login")
public class LoginController {
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	
	static MessageSourceAccessor messageSourceAccessor = null;
	
	
	@Autowired
	private ILoginService loginService;
	
	@Autowired
	private ILogAccessService logAccessService;
	
	@Autowired
	private IAuthService authService;
	
	@Autowired
	private IApproveService approveService;
	

	/**
	 * 로그인폼
	 * @return
	 */
	@SuppressWarnings({"cast"})
	@RequestMapping(value="/loginForm")
	public String loginForm(HttpServletRequest request, HttpServletResponse response, ModelMap model){
		logger.debug("[--- START LOGIN FORM");
		try{
		//	로그인폼 출력시 사용할 사업장적용여부	
			model.addAttribute("INSTCD_YN", PropertiesUtils.getTargetString("INSTCD_YN"));
			model.addAttribute("SITE_CODE",PropertiesUtils.getString("SITE_CODE"));
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException();
		}
		return "login";
	}
	
	
	@ResponseBody
	@RequestMapping(value="/sessionExtend")
	public Object sessionExtend(@RequestBody Map paramMap, HttpServletRequest request){
		Map<String,String> resultMap = new HashMap();
		
		resultMap.put("ERR_CD", "0");
		resultMap.put("ERR_MSG", "OK");
		
		
		return resultMap;
	}
	
	
	/**
	 * 로그인 요청
	 * @param model
	 * @param perCode 
	 * @param perPass
	 * @param hospitalCode : 병원코드-선택
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	@RequestMapping(value="/loginRequest")
	public String loginRequest(Model model
							  ,@RequestParam(value="userId") String perCode
							  ,@RequestParam(value="userPwd") String perPass
							  ,@RequestParam(value="instcd",required=false) String instcd
							  ,HttpServletRequest request) throws Exception{
		logger.info("[--- START loginRequest");
		
		logger.info("[--- USER ID : " + perCode);
		logger.info("[--- USER PW : " + perPass);
		
		
		try{
			Map<Object, Object> paramMap = new HashMap<Object, Object>();
			Map<Object, Object> paramLogAccessMap = new HashMap<Object, Object>();
			Map<String,String> perinxMap = new HashMap<String,String>();
			
			if(StringUtils.isEmpty(perCode)){
				model.addAttribute("ERR_CD", "-1");
				model.addAttribute("ERR_MSG", "사용자 아이디를 입력하세요.");
			}
			
			if(StringUtils.isEmpty(perPass)){
				model.addAttribute("ERR_CD", "-1");
				model.addAttribute("ERR_MSG", "사용자 비밀번호를 입력하세요.");
			}
			
			String encryptedPass = "";
			
			paramMap.put("PER_CODE", perCode);
			paramMap.put("PER_PASS", perPass);
			paramMap.put("INSTCD", instcd);
			paramMap.put("SITE_CODE", PropertiesUtils.getString("SITE_CODE"));
		//	1.사용자정보 조회
			perinxMap = (Map<String,String>)loginService.selectPerinx(paramMap);
			
		//	1.1. 사용자 정보가 없으면	
			if( StringUtils.isNull(perinxMap)){
				model.addAttribute("ERR_CD", "-1");
				if("KUH".equals(PropertiesUtils.getString("SITE_CODE"))){
					model.addAttribute("ERR_MSG", "시스템에서 등록 후 사용하시기 바랍니다.");
				}else{
					model.addAttribute("ERR_MSG", "사용자 정보가 없습니다.");
				}
				return "forward:loginForm";
				
			}
			
			
		//	암호조합방식에 따른 분기	
			if("PWD".equals(PropertiesUtils.getTargetString("PWD.ENCRYPT_STRING"))){
				encryptedPass = BigcenSecurityUtils.encryptPassword(perPass);
				
			}else{
				encryptedPass = BigcenSecurityUtils.encryptPassword(perPass, perCode);
				
			}
			
		//	1.2. 비밀번호가 다르면	
			if(!encryptedPass.equals(perinxMap.get("PER_PASS"))){
				model.addAttribute("ERR_CD", "-1");
				model.addAttribute("ERR_MSG", "사용자 비밀번호가 틀립니다.");
				return "forward:loginForm";
				
				
			}
			
		//  1.2. 서약유무가 N이면
			if("KUH".equals(PropertiesUtils.getString("SITE_CODE"))){
				if("N".equals(perinxMap.get("OATHYN"))) {
					model.addAttribute("ERR_CD", "-1");
					model.addAttribute("ERR_MSG", "Ku 시스템에서 서약서를 등록해 주시길 바랍니다 . <br/> 문의:의료정보과 이윤주(6571)");
					return "forward:loginForm";
				}
			}
			
			
		//	1.3. 로그인 성공	
			String remoteAddr = "";
			
			remoteAddr = request.getHeader("X-FORWARDED-FOR");
			
			if(!StringUtils.isEmpty(remoteAddr)){
				remoteAddr = request.getRemoteAddr();
			}
			
		//	1.4. 권한정보 가져오기
			Map<Object,Object> authMap = new HashMap<Object,Object>();
			
			authMap.put("SEARCH_PER_CODE", perinxMap.get("PER_CODE"));
			
			List authList = (ArrayList)authService.selectPerAuthList(authMap);
			Map<Object, Object> rsultAuthMap = new HashMap<Object,Object>();
			List manuList = new ArrayList();
			List reportList = new ArrayList();
			String strAuthCode = "";
			String strAuthCode2 = "";
			
			if(!authList.isEmpty()){
				for(int i=0; i < authList.size(); i++){
					Map<String,String> dsMap = (HashMap)authList.get(i);
					
					if(StringUtils.isEmpty(strAuthCode)){
						strAuthCode = "'"+dsMap.get("AUT_CODE")+"'";
					
					}else{
						if("'ADMIN'".equals(strAuthCode)){
							strAuthCode2 = "ADMIN";
						}
						strAuthCode += ",";
						strAuthCode += "'"+dsMap.get("AUT_CODE")+"'";
					}
				}
				
				
			//	1.5. 메뉴정보 가져오기
				Map<Object,Object> manuMap = new HashMap<Object,Object>();
				manuMap.put("SEARCH_AUT_CODE", strAuthCode);
				manuMap.put("SEARCH_AUT_CODE2", strAuthCode2);
				
				manuList = authService.selectMenuAuthList(manuMap);
				
				logger.debug("<!-- 메뉴정보 -->");
				logger.debug(manuList.toString());
				
				//정형보고서 권한 받아오기 - topForPage 링크설정 용
				reportList = authService.selectReportMenuAuthList(manuMap);
				
			//	권한없을때	
			}else{
				Map<Object,Object> manuMap = new HashMap<Object,Object>();
				manuMap.put("SEARCH_AUT_CODE", "'ALL'");
				
				manuList = authService.selectMenuAuthList(manuMap);
				
				logger.debug("<!-- 메뉴정보 -->");
				logger.debug(manuList.toString());
				
				//정형보고서 권한 받아오기 - topForPage 링크설정 용
				/*reportList = authService.selectReportMenuAuthList(manuMap);*/
				
			}
			
			//승인알람 받아오기
			/*int approveCount = (Integer) approveService.selectApproveCount();
			List approveList = (List) approveService.selectApproveList();*/
			
			
		//	2. Log
			paramLogAccessMap.put("TYPE", "L");
			paramLogAccessMap.put("REQUEST_URL", request.getRequestURI());
			paramLogAccessMap.put("PER_CODE", perCode);
			paramLogAccessMap.put("ACCESS_IP", StringUtils.nvl(request.getRemoteAddr(), ""));
			
			logAccessService.insertLogAccess(paramLogAccessMap);
			
			
		//	3. SESSION SET
			String jsonData = new ObjectMapper().writeValueAsString(perinxMap);
			String jsonDataMenu = new ObjectMapper().writeValueAsString(manuList);
			String jsonDataReport = new ObjectMapper().writeValueAsString(reportList);
//			String jsonApprove = new ObjectMapper().writeValueAsString(approveList);
			String jsonAuth = new ObjectMapper().writeValueAsString(authList);
			
			logger.debug("-------------------------------------");
			logger.debug(jsonData);
			request.getSession().setAttribute("PERINX_JSON"		,jsonData);
			request.getSession().setAttribute("PERINX"			,perinxMap);
			request.getSession().setAttribute("PER_CODE"		,perinxMap.get("PER_CODE"));
			request.getSession().setAttribute("PER_NAME"		,perinxMap.get("PER_NAME"));
			request.getSession().setAttribute("DEPT_CODE"		,perinxMap.get("DEPT_CODE"));
			request.getSession().setAttribute("DEPT_NAME"		,perinxMap.get("DEPT_NAME"));
			request.getSession().setAttribute("CONTEXT_PATH"	,request.getContextPath());
			request.getSession().setAttribute("DASHBOARD_TAB"	,perinxMap.get("DASHBOARD_TAB"));
			logger.info("-------------------------");
			logger.info(request.getHeader("Origin"));
		
			if(StringUtils.isNull(request.getHeader("Origin"))){
				request.getSession().setAttribute("SERVER"	,PropertiesUtils.getTargetString("SERVER.IP"));
				
			}else{
				request.getSession().setAttribute("SERVER"	,request.getHeader("Origin"));
				
			}
			
			if(strAuthCode == ""){
				strAuthCode = "''";
			}
			
			request.getSession().setAttribute("AUT_CODE"		,strAuthCode);
			request.getSession().setAttribute("AUTINX"			,rsultAuthMap);
			request.getSession().setAttribute("MNUINX"			,manuList);
			request.getSession().setAttribute("REPTMNUINK"      , reportList);
			
			//승인알림
			/*request.getSession().setAttribute("APVCOUT"			,approveCount);
			request.getSession().setAttribute("APVLIST"			,jsonApprove);*/
			
			//메뉴권한 용 json변환 
			request.getSession().setAttribute("jsonMNUINX"		,jsonDataMenu);
			request.getSession().setAttribute("jsonREPINX"		,jsonDataReport);
			request.getSession().setAttribute("jsonAuth"		,jsonAuth);
			
			//처음로그인인지 체크
			request.getSession().setAttribute("FIRST_FLAG"		,perinxMap.get("FIRST_FLAG"));
			
			// 경북대-병원코드
			request.getSession().setAttribute("HOSPITAL_CODE"	,perinxMap.get("INSTCD")); 

			//사업장적용여부 체크-INSTCD_YN
			request.getSession().setAttribute("INSTCD_YN"		,PropertiesUtils.getTargetString("INSTCD_YN"));
			
			//환자대체번호 컬럼
			request.getSession().setAttribute("PAT_SBST_NO"		,PropertiesUtils.getTargetString("PAT_SBST_NO"));
			
			//검색여부
			request.getSession().setAttribute("SEARCH_YN"		,PropertiesUtils.getTargetString("SEARCH_YN"));
			
			//병원구분코드(연구항목 조회시 사용)
			request.getSession().setAttribute("INSTCD"			,instcd);
			
			//환자대체번호 컬럼크기
			request.getSession().setAttribute("PAT_SBST_NO_SIZE",PropertiesUtils.getString("PAT_SBST_NO_SIZE"));
			
			//기준일자 Timestamp타입 사용여부
			request.getSession().setAttribute("BASE_DT_TIMESTAMP_YN",PropertiesUtils.getString("BASE_DT_TIMESTAMP_YN"));
			
			//IS NULL OR BLANK 사용여부
			request.getSession().setAttribute("IS_NULL_OR_BLANK_YN",PropertiesUtils.getString("IS_NULL_OR_BLANK_YN"));
			
			//REGISTRY 사용유무
			request.getSession().setAttribute("REGISTRY_YN",PropertiesUtils.getString("REGISTRY_YN"));
			request.getSession().getServletContext().setAttribute("PERINX_JSON",jsonData);
			request.getSession().getServletContext().setAttribute("PERINX", perinxMap);
			request.getSession().getServletContext().setAttribute("PER_CODE", perinxMap.get("PER_CODE"));
			request.getSession().getServletContext().setAttribute("PER_NAME", perinxMap.get("PER_NAME"));
			request.getSession().getServletContext().setAttribute("DEPT_CODE", perinxMap.get("DEPT_CODE"));
			request.getSession().getServletContext().setAttribute("DEPT_NAME", perinxMap.get("DEPT_NAME"));

			//병원체크
			request.getSession().setAttribute("SITE_CODE",PropertiesUtils.getString("SITE_CODE"));
			String SITE_CODE = PropertiesUtils.getString("SITE_CODE");
			model.addAttribute("SITE_CODE", PropertiesUtils.getString("SITE_CODE")); 
			
			if(StringUtils.isNull(request.getHeader("Origin"))){
				request.getSession().getServletContext().setAttribute("SERVER"	,PropertiesUtils.getTargetString("SERVER.IP"));
				
			}else{
				request.getSession().getServletContext().setAttribute("SERVER"	,request.getHeader("Origin"));
				
			}
			
			//SOFTCEN 개발 체크
			request.getSession().setAttribute("VISUAL_USER_ID"	,PropertiesUtils.getString("VISUAL_USER_ID"));

			model.addAttribute("ERR_CD", "0");
			model.addAttribute("ERR_MSG", "로그인 성공");
			
			
		}catch(SQLSyntaxErrorException se){
			model.addAttribute("ERR_CD", "-1");
			model.addAttribute("ERR_MSG", se.getMessage());
			
			logger.error(se.getMessage());
			
			throw new RuntimeException(se);
			
		}catch(DataAccessException dae){
			model.addAttribute("ERR_CD", "-1");
			model.addAttribute("ERR_MSG", dae.getMessage());
			
			logger.error(dae.getMessage());
			
			throw new RuntimeException(dae);
			
		}catch(Exception e){
			model.addAttribute("ERR_CD", "-1");
			model.addAttribute("ERR_MSG", e.getMessage());
			
			logger.error(e.getMessage());
			
			throw new RuntimeException(e);
			
		}
		
	
		return "forward:/dashboard/main";
	}
	
	/**
	 * 로그아웃
	 * @return
	 */
	@RequestMapping(value="/logout")
	public String logout(Model model,HttpServletRequest request) throws Exception{
		logger.debug("[--- START logout");
		
		if(!StringUtils.isNull(request.getSession().getAttribute("PER_CODE"))){
			Enumeration enumer = request.getSession().getAttributeNames();
			
			while(enumer.hasMoreElements()){
				Object key = enumer.nextElement();
				request.getSession().removeAttribute(key.toString());
				
			}
		}
		
		return "forward:loginForm";
	}
	
	
	/**
	 * 사용자 비밀번호 변경
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/changePassword")
	public Object changePassword(@RequestBody Map<Object,Object> paramMap,HttpServletRequest request){
		
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		Map<String,String> perinxMap = new HashMap<String,String>();	//사용자정보
		Map<Object,Object> paramMap2 = new HashMap<Object,Object>();
		
		String perCode = "";				//현재비밀번호
		String changePerPass = "";		//변경될 비밀번호
		String encrypredPerPass = "";
		
		try{
			perCode = String.valueOf(paramMap.get("PER_CODE"));
			changePerPass = String.valueOf(paramMap.get("CHANGE_PER_PASS"));
			
		//	경북대	
			if("Y".equals(PropertiesUtils.getTargetString("INSTCD_YN"))){
				String retVal = BigcenSecurityUtils.fCommonCheckPassword(changePerPass,perCode);
				
				if(StringUtils.isEmpty(retVal) || StringUtils.isNull(retVal)){
					encrypredPerPass = BigcenSecurityUtils.encryptPassword(changePerPass);
					
					paramMap2.put("PER_CODE", perCode);
					paramMap2.put("PER_PASS", encrypredPerPass);
					paramMap2.put("HOSPITAL_CODE", request.getSession().getAttribute("HOSPITAL_CODE"));	//경북대
					
					loginService.changePerPass(paramMap2);
					
					//처음로그인인지 체크
					request.getSession().setAttribute("FIRST_FLAG",'Y');
					resultMap.put("ERR_CD", "0");
					resultMap.put("ERR_MSG", "OK");
					
				}else{			//패턴이 false
					resultMap.put("ERR_CD", "1");
					resultMap.put("ERR_MSG", retVal);
				}
				
		//	울산대(패턴체크 하지 않음)		
			}else{
				encrypredPerPass = BigcenSecurityUtils.encryptPassword(changePerPass, perCode);
				
				paramMap2.put("PER_CODE", perCode);
				paramMap2.put("PER_PASS", encrypredPerPass);
				
				loginService.changePerPass(paramMap2);
				
				//처음로그인인지 체크
				request.getSession().setAttribute("FIRST_FLAG",'Y');
				resultMap.put("ERR_CD", "0");
				resultMap.put("ERR_MSG", "OK");
				
			}
			
		}catch(RuntimeException re){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", re.getMessage());
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			
		}
		
		return resultMap;
	}
	
	
	/**
	 * 사용자 비밀번호 변경 API
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateUserPassword")
	public void updatePassword(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		logger.info("updateUserPasswordStart");
		loginService.updateUserPassword(new RequestUtil().paramToHashMap(request));       
	}
	
	
	/**
	 * 경북대
	 * 필수 설치 파일 다운: /WEB-INF/filedown/softcenUri.reg
	 * 패키지 내부에 저장된 파일 다운
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value="/regeditDown")
	public FileSystemResource regeditDown(HttpServletRequest request, HttpServletResponse response) throws Exception{
		String path = request.getSession().getServletContext().getRealPath("/");
		File file = new File(path+"/WEB-INF/filedown/softcenUri.reg");
		String downFileName = "softcenUri.reg";
		String userAgent = request.getHeader("User-Agent");
		boolean isIE = userAgent.indexOf("MSIE") > -1;
		
		if(isIE){
			downFileName = URLEncoder.encode(file.getName(), "utf-8").replace("+", "%20");
		}else{
			downFileName = new String(file.getName().getBytes("utf-8"),"iso-8859-1").replace("+", "%20");
		}
		response.setHeader("Content-Disposition", "attachment;" + " filename=\"" + downFileName + "\";"); 
		
		return new FileSystemResource(file);
	}
	/**
	 * 경북대
	 * 필수설치 파일다운 후 모달창 닫기 버튼 클릭시 최초 로그인 FLAG 값 업데이트
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/firstFlagUpdate")
	public Object firstFlagUpdate(@RequestBody Map<Object,Object> paramMap, HttpServletRequest request){
		logger.debug("[--- START firstFlagUpdate");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		try {
			loginService.firstFlagUpdate(paramMap);
			
			// 최초로그인 설정
			request.getSession().setAttribute("FIRST_FLAG"		,"Y");
						
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
		} catch (Exception e) {
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		System.out.println(paramMap.toString());
		
		return resultMap;
	}
	
	

}
