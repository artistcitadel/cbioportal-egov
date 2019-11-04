package com.softcen.bigcen.med.research.cohort.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.admin.researchItem.service.IResearchItemService;
import com.softcen.bigcen.med.research.cohort.service.ICohortService;
import com.softcen.bigcen.med.research.crssec.service.ICrossSectionalStudyService;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;


@Controller
@RequestMapping("/research/cohort")
public class CohortController extends BigcenMedAbstractController{
	@Autowired
	private IResearchItemService researchItemService;
	
	@Autowired
	private ICrossSectionalStudyService crossSectionalStudyService;
	
	@Autowired
	private ICohortService cohortService;
	
	
	@RequestMapping(value="/cohortMain")
	public String cohortMain(HttpServletRequest req, Model model){
		
		try{
			model.addAttribute("FROM_MAIN_YN", StringUtils.nvl(req.getParameter("FROM_MAIN_YN"),""));
			model.addAttribute("LINK_TYPE", StringUtils.nvl(req.getParameter("LINK_TYPE"),""));
			model.addAttribute("CONT_SEQ", StringUtils.nvl(req.getParameter("CONT_SEQ"),""));
			model.addAttribute("DATA_SEQ", StringUtils.nvl(req.getParameter("DATA_SEQ"),""));
			model.addAttribute("VISUAL_USER_ID",PropertiesUtils.getString("VISUAL_USER_ID"));
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return "/research/cohort/cohortMain.tiles";
	}
	
	@RequestMapping(value="/cohortMain/pop")
	public String cohortMainPop(HttpServletRequest req, Model model){
		
		try{
			model.addAttribute("FROM_MAIN_YN", StringUtils.nvl(req.getParameter("FROM_MAIN_YN"),""));
			model.addAttribute("LINK_TYPE", StringUtils.nvl(req.getParameter("LINK_TYPE"),""));
			model.addAttribute("CONT_SEQ", StringUtils.nvl(req.getParameter("CONT_SEQ"),""));
			model.addAttribute("DATA_SEQ", StringUtils.nvl(req.getParameter("DATA_SEQ"),""));
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return "/research/cohort/cohortMain/pop.tiles";
	}
	
	
	/**
	 * 코호트연구 환자선택 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/searchPatient")
	public Object searchPatient(@RequestBody Map<Object,Object> paramMap, HttpServletRequest request){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug(">>> searchCrossSectionalStudyPatient START");
			
			paramMap.put("TYPE", "Q");
			paramMap.put("PER_CODE", request.getSession().getAttribute("PER_CODE"));
			paramMap.put("REQUEST_URL", request.getRequestURI());
			paramMap.put("ACCESS_IP", StringUtils.nvl(request.getRemoteAddr(),""));
			
			
			resultMap.put("DATA", cohortService.searchPatientSearchList(paramMap));
			resultMap.put("ERR_CD", "0");
			
			
		}catch(DataAccessException de){
			logger.error(de.getMessage());
			resultMap.put("ERR_CD", "900");
			resultMap.put("ERR_MSG", de.getMessage());
			
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
		
	}
	
	
	/**
	 * 코호트연구 연구항목 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/searchStudyItemTargetList")
	public Object searchStudyItemTargetList(@RequestBody Map<Object,Object> paramMap,HttpServletRequest request){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug(">>> searchStudyItemTargetList START");
			
			paramMap.put("TYPE", "Q");
			paramMap.put("PER_CODE", request.getSession().getAttribute("PER_CODE"));
			paramMap.put("REQUEST_URL", request.getRequestURI());
			paramMap.put("ACCESS_IP", StringUtils.nvl(request.getRemoteAddr(),""));
			
			
			
			resultMap.put("DATA", cohortService.searchStudyItemTargetList(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(DataAccessException de){
			logger.error(de.getMessage());
			resultMap.put("ERR_CD", "900");
			resultMap.put("ERR_MSG", de.getMessage());
			
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
		
	}

}
