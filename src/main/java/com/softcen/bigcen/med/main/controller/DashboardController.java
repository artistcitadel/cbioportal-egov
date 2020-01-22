package com.softcen.bigcen.med.main.controller;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;
import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.main.service.IDashboardService;
import com.softcen.bigcen.med.utils.PropertiesUtils;

@Controller
@RequestMapping(value="/dashboard")
public class DashboardController extends BigcenMedAbstractController{
	private static final int MAX_FILE_SIZE = 1024 * 1024 * 20;
	
	@Autowired
	private IDashboardService dashboardService;
	
	@RequestMapping(value="/main2")
	public String cohortMain(){
		return "/dashboard.tiles";
	}
	
	@RequestMapping(value="/main")
	public String dashboardMain(Model model){
		logger.debug(">>> dashboardMain START ...");
		
		Map<Object,Object> resultMap 				= new HashMap<Object,Object>();		//대시보드 정보 조회 결과 
		Map<Object,Object> paramMap 				= new HashMap<Object,Object>();		//대시보드 정보 파라미터 Map
		
		List resultCharList		= new ArrayList();
		List resultBoardList	= new ArrayList();
		
		Map<Object,Object> serviceStatMap 			= new HashMap<Object,Object>();		//서비스상태
		List researchTargetStatList				 	= new ArrayList();					//SUMMARY
		List chartList				 				= new ArrayList();					//CHART
		
		
		String queryServiceStat 			= "";
		String queryResearchTargetStat 		= "";
		
		
		try{
			//resultMap.put("selStateBox", dashboardService.selectDashboardState(paramMap));
			
			/*
		//	1.dashboard 정보 가져오기	
			resultMap 			= (HashMap)dashboardService.selectDashboard(new HashMap<Object,Object>());
			resultCharList 		= (ArrayList)dashboardService.selectDashboardChart(paramMap);
			resultBoardList 	= (ArrayList)dashboardService.selectDashboardBoard(paramMap);
			
		//	2.SQL 추출 (변환)
			queryServiceStat = resultMap.get("SERVICE_STAT_SQL").toString();
			queryServiceStat = queryServiceStat.replaceAll("&lt;", "<");
			queryServiceStat = queryServiceStat.replaceAll("&gt;", ">");
			
			queryResearchTargetStat = resultMap.get("RESEARCH_TARGET_STAT_SQL").toString();
			queryResearchTargetStat = queryResearchTargetStat.replaceAll("&lt;", "<");
			queryResearchTargetStat = queryResearchTargetStat.replaceAll("&gt;", ">");
			
			paramMap.put("SERVICE_STAT_SQL", 	queryServiceStat);
			paramMap.put("RESEARCH_TARGET_STAT_SQL", queryResearchTargetStat);
			
			//serviceStatMap 			= (HashMap)dashboardService.selectSvcStatus(paramMap);
			//researchTargetStatList 	= (ArrayList)dashboardService.selectResearchTargetStat(paramMap);
			
			Map resultMap2 = new HashMap();
			Map resultMap3 = new HashMap();
			
		//	3.CHART
			for (Object object : resultCharList) {
				Map paramMap2 = (HashMap)object;
				
				String sql2 = paramMap2.get("DATA_SQL").toString();
				
				paramMap2.put("CHART_SQL", sql2);
				
				List chartList2 = (ArrayList)dashboardService.selectDashboardChartList(paramMap2);
				
				resultMap2.put("TITLE", 	paramMap2.get("TITLE"));
				resultMap2.put("ORDER_NUM", paramMap2.get("ORDER_NUM"));
				resultMap2.put("MEASURE", 	paramMap2.get("MEASURE"));
				resultMap2.put("DIM", 		paramMap2.get("DIM"));
				resultMap2.put("WIDTH", 	paramMap2.get("WIDTH"));
				resultMap2.put("TYPE", 		paramMap2.get("TYPE"));
				
				resultMap2.put("CHART_DATA", chartList2);
				
			}
			
			//4.BOARD
			for (Object object : resultBoardList) {
				Map paramMap3 = (HashMap)object;
				
				String SEQBoard 			= paramMap3.get("SEQ").toString();
				Integer LIST_COUNT_DASHBOARD = (Integer) paramMap3.get("LIST_COUNT_DASHBOARD");			
				
				paramMap3.put("BOARD_SEQ", SEQBoard);
				paramMap3.put("LIST_COUNT_DASHBOARD", LIST_COUNT_DASHBOARD);
				
				List boardList3 = (ArrayList)dashboardService.selectDashboardBoardList(paramMap3);
				
				resultMap3.put(SEQBoard, boardList3);

				
			}
			
			model.addAttribute("SERVICE_STAT", serviceStatMap);
			model.addAttribute("RESEARCH_TARGET_STAT_LIST", researchTargetStatList);
			model.addAttribute("CHART_COUNT", resultCharList.size());
			model.addAttribute("CHART_LIST", resultCharList);
			model.addAttribute("BOARD_LIST", resultBoardList);
			model.addAttribute("BOARD_DATA", resultMap3);
			model.addAttribute("SUMMARY", resultMap);
			
			model.addAttribute("PWD_PATTERN", PropertiesUtils.getTargetString("PWD.PATTERN"));
			*/
			
		}catch(Exception e){
			throw new RuntimeException(e);
		}
	
		
		
		return "/dashboardTree.tiles";	
	}
	
	@ResponseBody
	@RequestMapping(value="/updateDashboardTabNo")
	public Object updateDashboardTabNo(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- updateDashboardTabNo START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			dashboardService.updateDashboardTabNo(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/selPatnoResultCheck")
	public Object selPatnoResultCheck(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selPatnoResultCheck START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		/*List tmpArr = (ArrayList)paramMap.get("TXTARR");
		String patno = "''";
		for(int i=0; i<tmpArr.size(); i++) {
			patno += ",'"+tmpArr.get(i).toString()+"'";
		}*/
		paramMap.put("PATNO", paramMap.get("TXTARR"));
		try{
			if("patnoA".equals(paramMap.get("KIND"))) {
				resultMap.put("selPatnoResultCheck", dashboardService.selectPatnoResultCheck(paramMap));
			}
			else {
				resultMap.put("selPatnoResultCheck", dashboardService.selectReschPatnoResultCheck(paramMap));
			}
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/loadselectedCohort")
	public Object loadselectedCohort(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- loadselectedCohort START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)dashboardService.loadselectedCohort(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/selSavedCohortList")
	public Object selSavedCohortList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selSavedCohortList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selSavedCohortList", dashboardService.selectSavedCohortList(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/selCateOncotreeList")
	public Object selCateOncotreeList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selCateOncotreeList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selCateOncotreeList", dashboardService.selectCateOncotreeList(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/selCohortAnalysisPatno")
	public Object selCohortAnalysisPatno(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selCohortAnalysisPatno START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selCohortAnalysisPatno", dashboardService.selectCohortAnalysisPatno(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/selCohortAnalysisPatnoByNo")
	public Object selCohortAnalysisPatnoByNo(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selCohortAnalysisPatnoByNo START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
						
			resultMap.put("selCohortAnalysisPatnoByNo", dashboardService.selectCohortAnalysisPatnoByNo(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/selMainPatientChart")
	public Object selMainPatientChart(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selMainPatientChart START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selMainPatientChart", dashboardService.selectMainPatientChart(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	/**
	 * Filtering 적용
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/filterApply")
	public Object filterApply(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- filterApply START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("filterApply", dashboardService.selectfilterApply(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	/**
	 * State Box
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getStatebox")
	public Object getStatebox(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- getStatebox START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selStateBox", dashboardService.selectDashboardState(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * default chart
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/loadselectedChartDefault")
	public Object loadselectedChartDefault(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- loadselectedChartDefault START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{

			resultMap.put("loadselectedChartDefault", dashboardService.loadselectedChartDefault(paramMap));			

			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	/**
	 * filtering chart
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/loadselectedChartFilter")
	public Object loadselectedChartFilter(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- loadselectedChartFilter START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{

			resultMap.put("loadselectedChartFilter", dashboardService.loadselectedChartFilter(paramMap));			

			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * chart 추가 목록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/loadselectedChart")
	public Object loadselectedChart(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- loadselectedChart START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("loadselectedChart", dashboardService.loadselectedChart(paramMap));			

			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * chart 추가 목록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectChartList")
	public Object selectChartList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectChartList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		List cate = (ArrayList)paramMap.get("CATE_ID_KIND");
		try{
			
			for(int i=0; i<cate.size(); i++) {
				paramMap.put("ITEM_CATE_ID", cate.get(i));
				resultMap.put(cate.get(i), dashboardService.selectDashboardChartList(paramMap));
			}
			

			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	/**
	 * cohort 목록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectCohortList")
	public Object selectCohortList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectCohortList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selectCohortList", dashboardService.selectDashboardCohortList(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	/**
	 * cohort 상세 목록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectCohortDetlList")
	public Object selectCohortDetlList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectCohortDetlList START ");
		System.out.println(paramMap);
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selectCohortDetlList", dashboardService.selectDashboardCohortDetlList(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * chart filtering
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/chartDashboardFilter")
	public Object chartDashboardFilter(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectCohortList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("chartDashboardFilter", "");
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * cohort delete
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteMycohortCont")
	public Object deleteMycohortCont(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- deleteMycohortCont START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			dashboardService.deleteMycohortCont(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * cohort save
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertCohortItemCont")
	public Object insertItemCont(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- insertCohortItemCont START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("insertCohortItemCont", dashboardService.insertCohortItemCont(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="getChartData")
	public Object getChartData(@RequestBody Map paramMap){
		logger.debug(">>> dashboardMain START ...");
		
		Map resultMap = new HashMap();
		List resultChartList	= new ArrayList();
		List outputChartList = new ArrayList();
		
		/*
		try{
			resultChartList 	= (ArrayList)dashboardService.selectDashboardChart(paramMap);
			
			for (Object object : resultChartList) {
				Map paramMap2 = (HashMap)object;
				Map resultMap2 = new HashMap();
				
				String sql2 = paramMap2.get("DATA_SQL").toString();
				
				paramMap2.put("CHART_SQL", sql2);
				
				List chartList2 = (ArrayList)dashboardService.selectDashboardChartList(paramMap2);
				
				resultMap2.put("TITLE", 	paramMap2.get("TITLE"));
				resultMap2.put("ORDER_NUM", paramMap2.get("ORDER_NUM"));
				resultMap2.put("MEASURE", 	paramMap2.get("MEASURE"));
				resultMap2.put("DIM", 		paramMap2.get("DIM"));
				resultMap2.put("WIDTH", 	paramMap2.get("WIDTH"));
				resultMap2.put("TYPE", 		paramMap2.get("TYPE"));
				
				resultMap2.put("CHART_DATA", chartList2);
				
				outputChartList.add(resultMap2);
				
			}
			resultMap.put("dsChartList",outputChartList);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG","OK");
			
			
			logger.debug(resultMap.toString());
			
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
		*/
		
		
		return resultMap;
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="getBoardData")
	public Object getBoardData(@RequestBody Map paramMap){
		logger.debug(">>> getBoardData START ...");
		logger.debug(paramMap.toString());
		
		String LIST_COUNT_YN = (String) paramMap.get("LIST_COUNT_DASHBOARD");
		Map resultMap 			= new HashMap();
		List resultBoardList	= new ArrayList();
		int SEQBoard = Integer.parseInt((String) paramMap.get("BOARD_SEQ"));
		int LIST_COUNT_DASHBOARD = Integer.parseInt((String) paramMap.get("LIST_COUNT_DASHBOARD"));
		
		if(LIST_COUNT_YN != null){
			paramMap.put("LIST_COUNT_DASHBOARD", LIST_COUNT_DASHBOARD);
		}else{
			paramMap.put("LIST_COUNT_DASHBOARD", "");
		}
		
		paramMap.put("BOARD_SEQ", SEQBoard);
		
		try{
			resultBoardList 	= (ArrayList)dashboardService.selectDashboardBoardList(paramMap);
			
			resultMap.put("dsBoardList",resultBoardList);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG","OK");
			
			logger.debug(resultMap.toString());
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e.getMessage());
		}
		
		return resultMap;
		
	}
	
	
	//모달용 게시판 리스트
	@ResponseBody
	@RequestMapping(value="getBoardOneData")
	public Object getBoardOneData(@RequestBody Map paramMap){
		logger.debug(">>> getBoardData START ...");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap = (HashMap)dashboardService.selectDashboardBoardOneList(paramMap);
			
			logger.debug(">>>>>>>>>>>>>>>>>>>>>>>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	
	/**
	 * 게시판 신규저장
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	@ResponseBody
	@RequestMapping(value="/insertBoardData")
	public Object insertBoardData(HttpServletRequest request){
		logger.debug("[--- START insertBoardData");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		Map<Object,Object> paramMap = new HashMap<Object,Object>();
		String repository = "";
		MultipartRequest mr = null;	
		
		try{

			//첨부파일 등록
			repository = PropertiesUtils.getTargetString("ATTACH_FILE_PATH");
			
			mr = new MultipartRequest( request, repository, MAX_FILE_SIZE, "utf-8", new DefaultFileRenamePolicy());
			
			
			//게시글 등록
			paramMap.put("TITLE", mr.getParameter("vBoardTitle"));
			paramMap.put("BOARD_SEQ", mr.getParameter("boardSeq"));
			paramMap.put("CONTENT", mr.getParameter("CONTENT"));
			paramMap.put("UDT_ID", mr.getParameter("UDT_ID"));
			paramMap.put("CRT_ID", mr.getParameter("CRT_ID"));
			
			dashboardService.insertBoardData(paramMap);
			
			Enumeration enumer = mr.getFileNames();
			
			int i = 1;
			
			while(enumer.hasMoreElements()){
				String file = (String)enumer.nextElement();
				UUID uuid = UUID.randomUUID();
				
				File s_file = mr.getFile(file);
				
				if(s_file == null){
					
				}else{
					String o_name = mr.getOriginalFileName(file);								//실제파일명 
					String exc = o_name.substring(o_name.lastIndexOf(".")+1, o_name.length());		//파일확장자
					String s_name = uuid + "." + exc;												//저장파일명
					long fileSize = s_file.length();
					
					//파일명 변경 저장
					File oldFile = new File(repository + o_name);
				    File newFile = new File(repository + s_name); 
				    oldFile.renameTo(newFile);
				    
				    paramMap.put("o_name", o_name);							//실제파일명
					paramMap.put("s_name", s_name);							//저장파일명
					paramMap.put("repository", repository);					//저장경로
					paramMap.put("fileSize", fileSize);						//파일사이즈
					paramMap.put("ORDER", i);								//파일순서
				    
				    dashboardService.insertBoardFileData(paramMap);
				    
				    i++;
				}
			}
			
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
	 * 게시판 수정저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateBoardData")
	public Object updateBoardData(HttpServletRequest request){
		logger.debug("[--- START updateBoardData");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		Map<Object,Object> paramMap = new HashMap<Object,Object>();
		String repository = "";
		MultipartRequest mr = null;	
		
		try{
			//첨부파일 등록
			repository = PropertiesUtils.getTargetString("ATTACH_FILE_PATH");
			
			mr = new MultipartRequest( request, repository, MAX_FILE_SIZE, "utf-8", new DefaultFileRenamePolicy());
			
			
			//게시글 등록
			paramMap.put("SEQ", mr.getParameter("vSEQ"));
			paramMap.put("TITLE", mr.getParameter("vBoardTitle"));
			paramMap.put("CONTENT", mr.getParameter("CONTENT"));
			paramMap.put("UDT_ID", mr.getParameter("UDT_ID"));
			paramMap.put("CRT_ID", mr.getParameter("CRT_ID"));
			paramMap.put("BOARD_SEQ", mr.getParameter("boardSeq"));
			
			dashboardService.updateBoardData(paramMap);
			
			Enumeration enumer = mr.getFileNames();
			
			int i = 1;
			
			while(enumer.hasMoreElements()){
				String file = (String)enumer.nextElement();
				UUID uuid = UUID.randomUUID();
				
				File s_file = mr.getFile(file);
				
				if(s_file == null){
					
				}else{
					String o_name = mr.getOriginalFileName(file);								//실제파일명 
					String exc = o_name.substring(o_name.lastIndexOf(".")+1, o_name.length());		//파일확장자
					String s_name = uuid + "." + exc;												//저장파일명
					long fileSize = s_file.length();
					
					//파일명 변경 저장
					File oldFile = new File(repository + "/" + o_name);
				    File newFile = new File(repository + "/" + s_name); 
				    oldFile.renameTo(newFile);
				    
				    paramMap.put("o_name", o_name);							//실제파일명
					paramMap.put("s_name", s_name);							//저장파일명
					paramMap.put("repository", repository);					//저장경로
					paramMap.put("fileSize", fileSize);						//파일사이즈
					paramMap.put("ORDER", i);								//파일순서
				    
				    dashboardService.insertBoardFileData(paramMap);
				    
				    i++;
				}
			}
			
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
	 * 게시글 삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteBoardData")
	public Object deleteBoardDataDetail(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START deleteBoardData");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			List fileList = (ArrayList)dashboardService.selectBoardDataDetailFile(paramMap);
			for (Object object : fileList) {
				Map fileListParamMap = (HashMap)object;
				
				String path = fileListParamMap.get("ATTACH_PATH").toString();
				String SAVE_FILE_NAME = fileListParamMap.get("SAVE_FILE_NAME").toString();				
				String path_SAVE_FILE_NAME = path + "/" + SAVE_FILE_NAME;
				
				File file = new File(path_SAVE_FILE_NAME);
					if(file.exists() == true){
					file.delete();
				}
			}
			
			dashboardService.deleteBoardData(paramMap);
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
	 * 게시글 상세 Load
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectBoardDataDetail")
	public Object selectBoardDataDetail(@RequestBody Map<Object, Object> paramMap){
		logger.debug("[--- selectBoardDataDetail START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsBoardDetail", dashboardService.selectBoardDataDetail(paramMap));
			
			resultMap.put("dsBoardDetailFile", dashboardService.selectBoardDataDetailFile(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * 나의연구항목 리스트
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getMySaveData")
	public Object selectMySaveData(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START selectMySaveData");
		
		
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsMySaveData", dashboardService.selectMySaveData(paramMap));
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
	 * chart정보 Load
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectChartMgmt")
	public Object selectChartMgmt(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- selectChartMgmt START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsChartMgmtList", dashboardService.selectChartMgmt(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * 첨부파일 다운로드
	 * @param request
	 * @param res
	 */
	@RequestMapping(value="/fileDownload")
	public void fileDownload(HttpServletRequest request, HttpServletResponse response){
		String repository = "";
		String fileName = "";
		
		String path				 = request.getParameter("path");			//첨부파일경로
		String SAVE_FILE_NAME	 = request.getParameter("SAVE_FILE_NAME");	//저장된 파일명
		String REAL_FILE_NAME	 = request.getParameter("FILE_NAME");		//실제 파일명
		
		
		try{
			repository = path;
			fileName = SAVE_FILE_NAME;
			REAL_FILE_NAME	 = new String(REAL_FILE_NAME);
			
			String filePath = repository + fileName;
			
			File file = new File(filePath);
			byte b[] = new byte[4096];
			
			response.setHeader("Content-Type", "application/octet-stream");
			
			String Encoding = new String(REAL_FILE_NAME.getBytes("UTF-8"), "8859_1");

			response.setHeader("Content-Disposition", "attachment; filename = " + Encoding);
			response.setHeader("Content-Transfer-Encoding", "binary;");
			response.setHeader("Pragma", "no-cache;");
			response.setHeader("Expires", "-1;");
			

			FileInputStream in = new FileInputStream(filePath);
			ServletOutputStream out2 = response.getOutputStream();
			   
			int numRead;
			while((numRead = in.read(b, 0, b.length)) != -1){
			    out2.write(b, 0, numRead);
			}
			   
			out2.flush();
			out2.close();
			in.close();


						
		}catch(Exception e){
			System.err.println("ERROR : " + e.getMessage());
		}
	}
	
	
	/**
	 * 첨부파일 개별삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteFile")
	public Object deleteFile(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- deleteFile START ");
		String repository = "";
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap.put("dsFileSeq", paramMap.get("SEQ"));
			
			dashboardService.deleteFile(paramMap);
			
			String path = (String) paramMap.get("ATTACH_PATH");
			String SAVE_FILE_NAME = (String) paramMap.get("SAVE_FILE_NAME");
			String path_SAVE_FILE_NAME = path + SAVE_FILE_NAME;
			
			File file = new File(path_SAVE_FILE_NAME);
				if(file.exists() == true){
				file.delete();
			}
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}

}
