package com.softcen.bigcen.med.search.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.common.sys.service.ISysService;
import com.softcen.bigcen.med.search.service.ISearchService;
import com.softcen.bigcen.med.utils.StringUtils;

@Controller
@RequestMapping(value="/search")
public class SearchController extends BigcenMedAbstractController{
	
	
	@Autowired
	private ISearchService searchService;
	
	@Autowired
	private ISysService sysService;

	
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	@RequestMapping(value="/searchFormPopup")
	public String searchFormPopup(HttpServletRequest req, HttpServletResponse res, Model model){
		logger.debug("[--- searchFormPopup START ");
		try{
			String searchVal = "";
			String searchTableId = "";
			Map paramMap = new HashMap();
			
			List patSbstNoList = new ArrayList();	//환자대체번호목록
			List synonymList = new ArrayList();		//동의어목록

			searchVal = StringUtils.nvl(req.getParameter("SEARCH_VAL"), "");
			searchTableId = StringUtils.nvl(req.getParameter("SEARCH_TABLE_ID"), "");
			
			paramMap.put("SEARCH_VAL", searchVal);
			paramMap.put("SEARCH_TABLE_ID", searchTableId);
			
			synonymList = (ArrayList)searchService.selectSynonymList(paramMap);
			
			
			model.addAttribute("SEARCH_VAL", searchVal);
			model.addAttribute("SEARCH_TABLE_ID", searchTableId);
			model.addAttribute("dsSynonymList", synonymList);
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
		}
		
		return "/popup/searchFormPopup.tiles";
	}
	
	
	/**
	 * 환자목록조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getPatSbstNoList")
	public Object getPatSbstNoList(@RequestBody Map<Object,Object> paramMap){
		resultMap = new HashMap();
		
		try{
			List patSbstNoList = new ArrayList();	//환자대체번호목록
			
			patSbstNoList = (ArrayList)searchService.selectPatSbstNoList(paramMap);
			
			resultMap.put("dsPatSbstNoList", patSbstNoList);
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		return resultMap;
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="/typeahead")
	public Object typeahead(@RequestBody Map<Object,Object> paramMap){
		resultMap = new HashMap();
		
		try{
			logger.debug("[--- typeahead START");
			
			resultMap.put("data", searchService.typeahead(paramMap));
			resultMap.put("ERR_CD", "0");
			
			
		}catch(Exception e){
			System.out.println(e.getMessage());
			logger.error("[--- TYPEAHEAD ERROR : " + e.getMessage());
		}
		
		logger.debug("[--- TYPEAHEAD ERROR : " + resultMap.toString());
		
		return resultMap;
	}
	
	/**
	 * 검색요청
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/searchRequest")
	public Object searchRequest(@RequestBody Map<Object,Object> paramMap){
		resultMap = new HashMap();
		
		try{
			logger.debug(paramMap.toString());
			List synonymList = new ArrayList();
			
		//	동의어목록
			//paramMap.put("SEARCH_VAL", paramMap.get("SEARCH_VAL"));
			synonymList = (ArrayList)searchService.selectSynonymList(paramMap);
			
			resultMap = searchService.searchRequest(paramMap);
			
			resultMap.put("dsSynonymList", synonymList);
			resultMap.put("SEARCH_SYNONYM_LIST", paramMap.get("SEARCH_SYNONYM_LIST"));
			resultMap.put("ERR_CD", "0");
			
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		return resultMap;
		
	}
	
	
	/**
	 * 검색요청
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/searchRequestByPatSbstNo")
	public Object searchRequestByPatSbstNo(@RequestBody Map<Object,Object> paramMap){
		resultMap = new HashMap();
		
		try{
			resultMap = searchService.searchRequestByPatSbstNo(paramMap);
			resultMap.put("ERR_CD", "0");
			
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		return resultMap;
		
	}
	
	

}
