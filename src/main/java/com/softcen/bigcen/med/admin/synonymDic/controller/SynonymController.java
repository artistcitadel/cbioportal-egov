package com.softcen.bigcen.med.admin.synonymDic.controller;

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

import com.softcen.bigcen.med.admin.synonymDic.service.ISynonymService;

@Controller
@RequestMapping(value="/admin/synonymDic")
public class SynonymController {
	private static final Logger logger = LoggerFactory.getLogger(SynonymController.class);
	
	@Autowired
	private ISynonymService iSynonimService;
	
	@RequestMapping(value="/main")
	public String synonymDicMain(){
		logger.debug("[--- SynonymDicController MAIN START ");
		
		return "/admin/synonymDic.tiles";
	}
	
	
	@ResponseBody
	@RequestMapping(value="/selectSynonymCategoryList")
	public Object selectSynonymCategoryList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- SynonymDicController MAIN START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsCategoryList", iSynonimService.selectSynonymCategoryList(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/selectSynonymList")
	public Object selectSynonymList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- SynonymDicController MAIN START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsSynonymList", iSynonimService.selectSynonymList(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	

	@ResponseBody
	@RequestMapping(value="/selectSynonymTermListByRepTerm")
	public Object selectSynonymTermListByRepTerm(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- SynonymDicController MAIN START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsSynonymTermList", iSynonimService.selectSynonymTermListByRepTerm(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * 동의어 신규등록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertSynonym")
	public Object insertSynonym(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- insertSynonym MAIN START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug("---------------------------");
			iSynonimService.insertSynonym(paramMap);
			
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
	 */
	@ResponseBody
	@RequestMapping(value="/selectSynonymView")
	public Object selectSynonymView(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectSynonymView START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsSynonymView", iSynonimService.selectSynonymList(paramMap));
			resultMap.put("dsSynonymTermList", iSynonimService.selectSynonymTermListByRepTerm(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/upsertSynonymTerm")
	public Object upsertSynonymTerm(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- upsertSynonymTerm START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			iSynonimService.upsertSynonym(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/deleteSynonymTerm")
	public Object deleteSynonymTerm(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- deleteSynonymTerm START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			iSynonimService.deleteSynonymTerm(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	//

}
