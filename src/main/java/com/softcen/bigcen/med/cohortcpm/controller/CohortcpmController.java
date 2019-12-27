package com.softcen.bigcen.med.cohortcpm.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.cohortcpm.service.CohortcpmServiceImpl;
import com.softcen.bigcen.med.cohortcpm.service.ICohortcpmService;
import com.softcen.bigcen.med.utils.StringUtils;

@Controller
@RequestMapping(value="/cohort")
public class CohortcpmController extends BigcenMedAbstractController{
	
//private static final Logger logger = LoggerFactory.getLogger(CohortcpmController.class);

	@Autowired
	private ICohortcpmService cohortcpmService;
	
	
	@RequestMapping(value="/cohortMain")
	public String cohortMain(){
		return "/cohort/cohortMain.tiles";
	}

	@RequestMapping(value="/cohortAnalysis")
	public String cohortAnalysis(HttpServletRequest request, HttpServletResponse response,
			Model model ){
		
		//model.addAttribute("tab", tab);
		//model.addAttribute("table", table);
		
		return "/cohort/cohortAnalysis.tiles";
	}
	
	
	@ResponseBody
	@RequestMapping(value="/selCohortFilteringTable")
	public Object selCohortFilteringTable(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selCohortFilteringTable START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selCohortFilteringTable", cohortcpmService.selectCohortFilteringTable(paramMap));			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/selCohortPatientDataList")
	public Object selCohortPatientDataList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selCohortPatientDataList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selCohortPatientDataList", cohortcpmService.selectCohortPatientDataList(paramMap));			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * cohort list 출력
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selCohortTable")
	public Object selCohortTable(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selCohortTable START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)cohortcpmService.selectCohortTable(paramMap);			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	
	/**
	 * cohort list 출력
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selCohortContList")
	public Object loadselectedChartFilter(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selCohortContList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selCohortContList", cohortcpmService.selectCohortContList(paramMap));			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@ResponseBody
	@RequestMapping(value="/cohortAnalysisList")
	public Object cohortAnalysisList(@RequestBody Map<Object,Object> paramMap, HttpServletRequest request) throws UnsupportedEncodingException{
		Map<Object,Object> resultMap = new HashMap<Object,Object>();

		//restTemplate.postForObject(url, null, String.class);
		
		try{
			RestTemplate restTemplate = new RestTemplate();
			String url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json";
			String param = "?key=430156241533f1d058c603178cc3ca0e&targetDt=20171110";
			//String encodeurl = URLEncoder.encode(url, "UTF-8");

//			System.out.println(restTemplate.getForObject(url+param,Map.class));
//			logger.debug(">>> cohortAnalysisList START");
//			resultMap.put("ERR_CD", "0");
//			resultMap.put("list", restTemplate.getForObject(url+param,Map.class));
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
		
	}
	
	@ResponseBody
	@RequestMapping(value="/updateCohortPatientList")
	public Object updateCohortPatientList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- updateCohortPatientList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			cohortcpmService.updateCohortPatientList(paramMap);			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
}

	