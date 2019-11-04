package com.softcen.bigcen.med.admin.researchItem.controller;

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

import com.softcen.bigcen.med.admin.researchItem.service.IResearchItemService;


/* 연구항목관리 controller */
@Controller
@RequestMapping(value="/admin/researchItem")
public class ResearchItemController {
	private static final Logger logger = LoggerFactory.getLogger(ResearchItemController.class);
	
	@Autowired
	private IResearchItemService researchItemService;
	
	
	@RequestMapping(value="/researchItemMain")
	public String researchItemMain(){
		logger.debug("[--- researchItemController MAIN START ");
		
		return "/admin/researchItem.tiles";
	}
	
	@RequestMapping(value="/categorizeMain")
	public String categorizeMain(){
		logger.debug("[--- categorizeController MAIN START ");
		
		return "/admin/researchCategorize.tiles";
	}
	
	
	/**
	 * 대분류조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectItemCateList")
	public Object selectItemCateList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsItemCateList", researchItemService.selectItemCateList(paramMap));
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 중분류조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectItemCateDetlList")
	public Object selectItemCateDetlList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsItemCateDetlList", researchItemService.selectItemCateDetlList(paramMap));
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	
	/**
	 * 대분류저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertItemCate")
	public Object insertItemCate(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			researchItemService.insertItemCate(paramMap);
			
			//resultMap.put("dsItemCateDetlList", researchItemService.selectItemCateDetlList(paramMap));
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 대분류저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateItemCate")
	public Object updateItemCate(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			researchItemService.updateItemCate(paramMap);
			
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 대분류저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteItemCate")
	public Object deleteItemCate(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			researchItemService.deleteItemCate(paramMap);
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertItemCateDetl")
	public Object insertItemCateDetl(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			researchItemService.insertItemCateDetl(paramMap);
			
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateItemCateDetl")
	public Object updateItemCateDetl(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			researchItemService.updateItemCateDetl(paramMap);
			
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */	
	@ResponseBody
	@RequestMapping(value="/deleteItemCateDetl")
	public Object deleteItemCateDetl(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			researchItemService.deleteItemCateDetl(paramMap);
			
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	
	
	/**
	 * 스카마 목록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectCatalogSchemaList")
	public Object selectCatalogSchemaList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsSchemaList", researchItemService.selectCatalogSchemaList(paramMap));
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 테이블목록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectCatalogTableList")
	public Object selectCatalogTableList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsTableList", researchItemService.selectCatalogTableList(paramMap));
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	@ResponseBody
	@RequestMapping(value="/selectCatalogColumnDateList")
	public Object selectCatalogColumnDateList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsColumnDateList", researchItemService.selectCatalogColumnDateList(paramMap));
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}

	/**
	 * 컬럼목록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectCatalogColumnList")
	public Object selectCatalogColumnList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsColumnList", researchItemService.selectCatalogColumnList(paramMap));
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 연구항목등록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertItemMgmt")
	public Object insertItemMgmt(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			researchItemService.insertItemMgmt(paramMap);
			
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 연구항목목록조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectItemMgmtList")
	public Object selectItemMgmtList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsItemMgmtList", researchItemService.selectItemMgmtList(paramMap));
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="/selectItemMgmtView")
	public Object selectItemMgmtView(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsItemMgmtView", researchItemService.selectItemMgmtView(paramMap));
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	
	
	
	
	@ResponseBody
	@RequestMapping(value="/updateItemMgmt")
	public Object updateItemMgmt(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			researchItemService.updateItemMgmt(paramMap);
			
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="/deleteItemMgmt")
	public Object deleteItemMgmt(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			researchItemService.deleteItemMgmt(paramMap);
			
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="/selectItemMgmtTableList")
	public Object selectItemMgmtTableList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			List itemMgmtTableList = (ArrayList)researchItemService.selectItemMgmtTableList(paramMap);
			
			logger.debug(itemMgmtTableList.toString());
			
			resultMap.put("dsItemMgmtTableList", itemMgmtTableList);
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	
	@ResponseBody
	@RequestMapping(value="/selectItemMgmtColumnList")
	public Object selectItemMgmtColumnList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsItemMgmtColumnList", researchItemService.selectItemMgmtColumnList(paramMap));
			resultMap.put("ERROR_CD", "0");
			resultMap.put("ERR_MSG", "0");
			
		}catch(Exception e){
			resultMap.put("ERROR_CD", "-1");
			resultMap.put("ERR_MSG", e);
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	
	/*
	public Object selectItemMgmtTableList(Map<Object,Object> paramMap) throws Exception{
		return researchItemDAO.selectItemMgmtTableList(paramMap);
	}
	
	public Object selectItemMgmtColumnList(Map<Object,Object> paramMap) throws Exception{
		return researchItemDAO.selectItemMgmtColumnList(paramMap);
	}*/
	
	

}

