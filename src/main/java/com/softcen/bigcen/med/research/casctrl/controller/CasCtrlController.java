package com.softcen.bigcen.med.research.casctrl.controller;

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
import com.softcen.bigcen.med.research.casctrl.service.ICasCtrlService;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

@Controller
@RequestMapping("/research/casctrl")
public class CasCtrlController extends BigcenMedAbstractController{
	
	
	@Autowired
	private ICasCtrlService casCtrlService;
	
	
	@RequestMapping(value="/casctrlMain")
	public String casCtrlMain(HttpServletRequest req, Model model){
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
		
		return "/research/casctrl/casctrlMain.tiles";
	}
	
	@RequestMapping(value="/casctrlMain/pop")
	public String casCtrlMainPop(HttpServletRequest req, Model model){
		try{
			model.addAttribute("FROM_MAIN_YN", StringUtils.nvl(req.getParameter("FROM_MAIN_YN"),""));
			model.addAttribute("LINK_TYPE", StringUtils.nvl(req.getParameter("LINK_TYPE"),""));
			model.addAttribute("CONT_SEQ", StringUtils.nvl(req.getParameter("CONT_SEQ"),""));
			model.addAttribute("DATA_SEQ", StringUtils.nvl(req.getParameter("DATA_SEQ"),""));
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return "/research/casctrl/casctrlMain/pop.tiles";
	}
	
	
	/**
	 * 연구항목저장
	 * @param paramMap
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/saveItemContDetl")
	public Object saveItemContDetl(@RequestBody Map<Object,Object> paramMap, HttpServletRequest req){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug("[--- saveItemCont START");
			logger.debug(paramMap.toString());
			
			//crossSectionalStudyService.saveItemContDetl(paramMap);
			
			resultMap.put("ERR_CD", "0");
			
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
		
	}
	
	
	
	/**
	 * 사례-대조 연구 환자선택 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/searchPatient")
	public Object searchPatient(@RequestBody Map<Object,Object> paramMap, HttpServletRequest request){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug(">>> searchCrossSectionalStudyPatient START");
			logger.debug(paramMap.toString());
			
			paramMap.put("TYPE", "Q");
			paramMap.put("PER_CODE", request.getSession().getAttribute("PER_CODE"));
			paramMap.put("REQUEST_URL", request.getRequestURI());
			paramMap.put("ACCESS_IP", StringUtils.nvl(request.getRemoteAddr(),""));
			
			resultMap.put("DATA", casCtrlService.searchPatientSearchList(paramMap));
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
	 * 연구항목 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/searchStudyItemTargetList")
	public Object searchStudyItemTargetList(@RequestBody Map<Object,Object> paramMap, HttpServletRequest request){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug(">>> searchStudyItemTargetList START");
			logger.debug(paramMap.toString());
			
			paramMap.put("TYPE", "Q");
			paramMap.put("PER_CODE", request.getSession().getAttribute("PER_CODE"));
			paramMap.put("REQUEST_URL", request.getRequestURI());
			paramMap.put("ACCESS_IP", StringUtils.nvl(request.getRemoteAddr(),""));
			
			resultMap.put("DATA", casCtrlService.searchStudyItemTargetList(paramMap));
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
