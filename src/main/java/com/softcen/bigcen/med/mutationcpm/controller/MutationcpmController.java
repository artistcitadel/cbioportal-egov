package com.softcen.bigcen.med.mutationcpm.controller;

import java.util.ArrayList;
import java.util.List;
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
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.common.sys.service.ISysService;
import com.softcen.bigcen.med.mutationcpm.service.MutationService;
import com.softcen.bigcen.med.research.sharingconditions.service.ISharingConditionsService;
import com.softcen.bigcen.med.utils.StringUtils;

@Controller
@RequestMapping(value="/mutation")
public class MutationcpmController extends BigcenMedAbstractController{
	private static final Logger logger = LoggerFactory.getLogger(MutationcpmController.class);
	
	@Autowired
	private ISharingConditionsService iSharingConditionsService;
	
	@Autowired
	private ISysService isysService;
	
	@Autowired
	private MutationService mutationService;
	
	
	/**
	 * 
	 * @param req
	 * @param res
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/mutationList")
	public String mutationList(HttpServletRequest req, HttpServletResponse res, Model model){
		String cohortId = "";
		String filterId = "";
		String geneNm = "";
		
		String query = "";
		String tree = "";
		
		
		try {
			cohortId = StringUtils.nvl(req.getParameter("cohortId"), "");
			filterId = StringUtils.nvl(req.getParameter("filterId"), "");
			geneNm = StringUtils.nvl(req.getParameter("geneNm"), "");
			query = StringUtils.nvl(req.getParameter("QUERY"), "");
			tree = StringUtils.nvl(req.getParameter("TREE"), "");
//			System.out.println("--------query---------");
//			System.out.println(query);
//			System.out.println("------------------------");
//			
//			System.out.println("--------tree---------");
//			System.out.println(tree);
//			System.out.println("------------------------");
			
			model.addAttribute("cohortId", cohortId);
			model.addAttribute("filterId", filterId);
			model.addAttribute("geneNm", geneNm);
			model.addAttribute("query", query);
			model.addAttribute("tree", tree);
			
			model.addAttribute("pageGbnCd", "LIST");
			
			
		}catch(Exception e) {
			logger.error(e.getMessage());
		}
		
		return "/mutation/mutationList.tiles";
	}
	
	/**
	 * 
	 * @param req
	 * @param res
	 * @param model
	 * @return
	 */
	@RequestMapping(value="/mutationView")
	public String mutationView(HttpServletRequest req, HttpServletResponse res, Model model){
		String cohortId = "";
		String filterId = "";
		String geneNm = "";
		String itemContSeq = "";
		
		try {
			cohortId = StringUtils.nvl(req.getParameter("cohortId"), "");
			filterId = StringUtils.nvl(req.getParameter("filterId"), "");
			geneNm = StringUtils.nvl(req.getParameter("geneNm"), "");
			itemContSeq = StringUtils.nvl(req.getParameter("selItemContList"), "");
			
			model.addAttribute("cohortId", cohortId);
			model.addAttribute("filterId", filterId);
			model.addAttribute("geneNm", geneNm);
			model.addAttribute("itemContSeq", itemContSeq);
			model.addAttribute("pageGbnCd", "VIEW");
			
		}catch(Exception e) {
			logger.error(e.getMessage());
		}
		
		return "/mutation/mutationView.tiles";
	}
	
	@ResponseBody
	@RequestMapping(value="/getMutationList")
	public Object getMutationList(@RequestBody Map<String,Object> params){
		logger.debug("getMutationList");
		
		try {
			resultMap.put("mutationList", mutationService.getMutationList(params));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e) {
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
		
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="/getOncoPrintList")
	public Object getOncoPrintList(@RequestBody Map<String,Object> params){
		logger.debug("getMutationList");
		
		try {
			List<Map<String,Object>> oncoPrintList = mutationService.getOncoPrintList(params);
			List<Map<String,Object>> oncoPrintPatList = mutationService.getOncoPrintPatList(params);
			List<Map<String,Object>> oncoPrintCancerList = mutationService.getOncoPrintCancerList(params);
			List<Map<String,Object>> clinicalTrackList = mutationService.getClinicalTrackList(params);
			
			resultMap.put("oncoPrintList", oncoPrintList);
			resultMap.put("oncoPrintPatList", oncoPrintPatList);
			resultMap.put("oncoPrintCancerList", oncoPrintCancerList);
			resultMap.put("clinicalTrackList", clinicalTrackList);
			
			resultMap.put("ERR_CD", "0");
			
		}catch(DataAccessException dae) {
			logger.error(dae.getMessage());
			resultMap.put("ERR_CD", "-2");
			resultMap.put("ERR_MSG", "Database Error.");
			
		}catch(Exception e) {
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", "Application Error.");
		}
		
		return resultMap;
		
		
	}
	
	@ResponseBody
	@RequestMapping(value="/getItemContList")
	public Object getItemContList(@RequestBody Map<String,Object> params){
		logger.debug("getItemContList");
		
		try {
			resultMap.put("itemContList", isysService.getItemContList(params));
			resultMap.put("ERR_CD", "0");
			
		}catch(DataAccessException dae) {
			logger.error(dae.getMessage());
			resultMap.put("ERR_CD", "-2");
			resultMap.put("ERR_MSG", "Database Error.");
			
		}catch(Exception e) {
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
		
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="/saveMutationList")
	public Object saveMutationList(@RequestBody Map<String,Object> params){
		logger.debug("saveMutationList");
		
		try {
			resultMap.put("SEQ", iSharingConditionsService.saveQueryConditions(params));
			resultMap.put("ERR_CD", "0");
			
		}catch(DataAccessException dae) {
			logger.error(dae.getMessage());
			resultMap.put("ERR_CD", "-2");
			resultMap.put("ERR_MSG", "Database Error.");
			
		}catch(Exception e) {
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
		
		
	}

}

	