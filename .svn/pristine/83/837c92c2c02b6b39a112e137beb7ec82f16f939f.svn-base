package com.softcen.bigcen.med.admin.auth.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.med.admin.auth.service.IAuthService;
import com.softcen.bigcen.med.admin.user.controller.UserController;
import com.softcen.bigcen.med.admin.user.service.IUserService;

@Controller
@RequestMapping(value="/admin/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private IAuthService authService;
	
	
	@RequestMapping(value="/main")
	public String authMain(){
		logger.debug("[--- AuthController MAIN START ");
		
		return "/admin/authority.tiles";
	}
	
	@RequestMapping(value="/menuAuthMain")
	public String menuAuthMain(){
		return "/admin/authorityMenu.tiles";
	}
	
	
	/**
	 * 권한목록조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectAutinxList")
	public Object selectAutinxList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START userList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		List<Map<Object,Object>> autinxList = new ArrayList<Map<Object,Object>>();
		List<Map<Object,Object>> perinxList = new ArrayList<Map<Object,Object>>();
		
		autinxList = authService.selectAutinxList(paramMap);
		perinxList = (ArrayList)((HashMap)userService.selectPerinxList(paramMap)).get("data");
		
		resultMap.put("ERR_CD", "0");
		resultMap.put("ERR_MSG", "0");
		
		resultMap.put("dsAutinxList", autinxList);
		resultMap.put("dsPerinxList", perinxList);
		
		return resultMap;
	}
	
	
	/**
	 * 사용자-권한목록조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectPerAuthList")
	public Object selectPerAuthList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START userList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		List<Map<Object,Object>> perAuthList = new ArrayList<Map<Object,Object>>();
		
		perAuthList = authService.selectPerAuthList(paramMap);
		
		resultMap.put("dsPerAuthList", perAuthList);
		
		resultMap.put("ERR_CD", "0");
		resultMap.put("ERR_MSG", "OK");
		
		return resultMap;
	}
	
	/**
	 * 권한정보 신규저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertAutinx")
	public Object insertAutinx(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START insertAutinx");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			authService.insertAuthinx(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 권한정보 수정
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateAutinx")
	public Object updateAutinx(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START updateAutinx");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			authService.updateAuthinx(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		
		return resultMap;
	}
	
	/**
	 * 권한정보 삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteAutinx")
	public Object deleteAutinx(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START userList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			authService.deleteAuthinx(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/savePerAuth")
	public Object savePerAuth(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START savePerAuth");
		
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			//int ret = (Integer)authService.deletePerAuth(paramMap);
			
			authService.insertPerAuth(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
				
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);

		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/deletePerAuth")
	public Object deletePerAuth(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START savePerAuth");
		
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			int ret = (Integer)authService.deletePerAuth(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
				
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);

		}
		
		return resultMap;
	}
	
	
	/**
	 * 권한리스트
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectAuthList")
	public Object selectAutList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START authList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		List<Map<Object,Object>> autinxList = new ArrayList<Map<Object,Object>>();
		
		autinxList = authService.selectAutinxList(paramMap);
		
		resultMap.put("ERR_CD", "0");
		resultMap.put("ERR_MSG", "0");
		
		resultMap.put("dsAutinxList", autinxList);		
		
		return resultMap;
	}
	
	
	/**
	 * 사용자-권한목록조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectMenuAuthList")
	public Object selectMenuAuthList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START selectMenuAuthList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		List<Map<Object,Object>> perAuthList = new ArrayList<Map<Object,Object>>();
		
		perAuthList = authService.selectMenuAuthList(paramMap);
		
		resultMap.put("dsMenuAuthList", perAuthList);
		
		resultMap.put("ERR_CD", "0");
		resultMap.put("ERR_MSG", "OK");
		
		return resultMap;
	}
	
	
	/**
	 * 메뉴-권한 정보 저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/upsertMenuAuth")
	public Object upsertMenuAuth(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START selectMenuAuthList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			authService.saveMenuAuth(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			
		}
		

		
		return resultMap;
	}
	
	
	

}
