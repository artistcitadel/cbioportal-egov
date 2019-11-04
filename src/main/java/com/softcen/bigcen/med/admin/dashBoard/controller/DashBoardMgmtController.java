package com.softcen.bigcen.med.admin.dashBoard.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.med.admin.dashBoard.service.IDashBoardMgmtService;

@Controller
@RequestMapping(value="/admin/dashboardMgmt")
public class DashBoardMgmtController {
	
	private static final Logger logger = LoggerFactory.getLogger(DashBoardMgmtController.class);
	
	@Autowired
	private IDashBoardMgmtService dashBoardMgmtService;
	
	
	@RequestMapping(value="/main")
	public String dashboardMgmt(){
		return "/admin/dashboardMgmt.tiles";
	}
	
	/**
	 * 대쉬보드정보 신규저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertDashBoardMgmt")
	public Object insertDashboardMgmt(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START insertDashBoardMgmt");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			dashBoardMgmtService.insertDashBoardMgmt(paramMap);
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
	 * 대쉬보드정보 Load
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectDashBoardMgmt")
	public Object selectDashBoardMgmt(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- selectDashBoardMgmt START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsDashBoard", dashBoardMgmtService.selectDashBoardMgmt(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * chart정보 신규저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertChartMgmt")
	public Object insertChartMgmt(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START insertChartMgmt");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			dashBoardMgmtService.insertChartMgmt(paramMap);
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
	 * chart정보 수정
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateChartMgmt")
	public Object updateChartMgmt(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START updateChartMgmt");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			dashBoardMgmtService.updateChartMgmt(paramMap);
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
			resultMap.put("dsChartMgmtList", dashBoardMgmtService.selectChartMgmt(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * chart정보 삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteChartMgmt")
	public Object deleteChartMgmt(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START deleteChartMgmt");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			dashBoardMgmtService.deleteChartMgmt(paramMap);
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
	 * chart 순서변경
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/orderChartMgmtUpDown")
	public Object orderUpChartMgmt(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START orderChartMgmtUpDown");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			dashBoardMgmtService.orderChartMgmtUpDown(paramMap);
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
	 * chart Dimension & Measures Load
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectChartSQL")
	public Object selectChartSQL(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- selectChartSQL START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsChartDimMeaList", dashBoardMgmtService.selectChartSQL(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	/**
	 * 서비스상태 미리보기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectSummarySQL")
	public Object selectSummarySQL(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- selectSummarySQL START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsSummary", dashBoardMgmtService.selectChartSQL(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	/**
	 * suumary 미리보기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectServiceSQL")
	public Object selectServiceSQL(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- selectServiceSQL START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsService", dashBoardMgmtService.selectChartSQL(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	/**
	 * chart 미리보기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectChartView")
	public Object selectChartView(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- selectChartView START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		String CHART_INDEX = paramMap.get("CHART_INDEX");
		
		try{
			resultMap.put("dsChartView", dashBoardMgmtService.selectChartSQL(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			resultMap.put("CHART_INDEX", CHART_INDEX);
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			resultMap.put("CHART_INDEX", CHART_INDEX);
		}
		
		return resultMap;
	}
	

}
