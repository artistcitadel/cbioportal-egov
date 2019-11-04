package com.softcen.bigcen.med.research.crssec.controller;

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
import com.softcen.bigcen.med.research.crssec.service.ICrossSectionalStudyService;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

@Controller
@RequestMapping(value="/research/crossSectionalStudy")
public class CrossSectionalStudyController extends BigcenMedAbstractController{
	@Autowired
	private ICrossSectionalStudyService crossSectionalStudyService;
	
	
	@RequestMapping(value="/main")
	public String crossSectionalStudy(HttpServletRequest req){
		logger.debug("[-- crossSectionalStudy MAIN START");
		return "/research/side/side.tiles";
	}
	
	
	@RequestMapping(value="/crssecMain")
	public String crssecMain(HttpServletRequest req, Model model){
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
		
		return "/research/crossSectionalStudy/crssecMain.tiles";
	}
	
	/**
	 * 
	 * @param req
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/crssecMain/pop")
	public String crssecMainPop(HttpServletRequest req, Model model){
		try{
			model.addAttribute("FROM_MAIN_YN", StringUtils.nvl(req.getParameter("FROM_MAIN_YN"),""));
			model.addAttribute("LINK_TYPE", StringUtils.nvl(req.getParameter("LINK_TYPE"),""));
			model.addAttribute("CONT_SEQ", StringUtils.nvl(req.getParameter("CONT_SEQ"),""));
			model.addAttribute("DATA_SEQ", StringUtils.nvl(req.getParameter("DATA_SEQ"),""));
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return "/research/crossSectionalStudy/crssecMain/pop.tiles";
	}
	
	
	/**
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping(value="/updateSearchCondition")
	public String updateSearchCondition(HttpServletRequest req){
		logger.debug("[-- crossSectionalStudy MAIN START");
		
		return "/research/side/side.tiles";
	}
	
	
	
	
	/**
	 * 단면연구 환자선택 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/searchPatient")
	public Object searchPatient(@RequestBody Map<Object,Object> paramMap, HttpServletRequest request){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			paramMap.put("TYPE", "Q");
			paramMap.put("PER_CODE", request.getSession().getAttribute("PER_CODE"));
			paramMap.put("REQUEST_URL", request.getRequestURI());
			paramMap.put("ACCESS_IP", StringUtils.nvl(request.getRemoteAddr(),""));
			
			resultMap.put("DATA", crossSectionalStudyService.searchPatientSearchList(paramMap));
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
	 * 단면연구 연구항목 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getStudyItemTargetList")
	public Object getStudyItemTargetList(@RequestBody Map<Object,Object> paramMap, HttpServletRequest request){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			paramMap.put("TYPE", "Q");
			paramMap.put("PER_CODE", request.getSession().getAttribute("PER_CODE"));
			paramMap.put("REQUEST_URL", request.getRequestURI());
			paramMap.put("ACCESS_IP", StringUtils.nvl(request.getRemoteAddr(),""));
			
			resultMap.put("DATA", crossSectionalStudyService.searchStudyItemTargetList(paramMap));
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
	 * 연구항목조회(반복데이터)
	 * @param paramMap
	 * @return
	 
	@ResponseBody
	@RequestMapping(value="/getItemMgmtList")
	public Object getItemMgmtList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("periodCount", paramMap.get("SEARCH_PERIOD_COUNT"));
			resultMap.put("dsItemMgmtList", crossSectionalStudyService.selectItemMgmtList(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	*/
	

}
