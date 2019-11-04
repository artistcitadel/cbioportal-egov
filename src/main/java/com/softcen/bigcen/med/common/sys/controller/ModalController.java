package com.softcen.bigcen.med.common.sys.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.common.sys.service.IModalService;

@Controller
@RequestMapping(value="/common/modal")
public class ModalController extends BigcenMedAbstractController{
	
	@Autowired
	private IModalService modalService;
	
	/**
	 * 상병코드 조회/목록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getDiseaseCodeListW")
	public Object selectDiseaseCodeW(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- selectDiseaseCodeW START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsDiseaseCodeListW", modalService.selectDiseaseCodeW(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * 선택된 상병코드 목록 가져오기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getDiseaseParentCodeListW")
	public Object selectDiseaseParentCodeListW(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- selectDiseaseParentCodeListW START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsDiseaseParentCodeListW", modalService.selectDiseaseParentCodeListW(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}	
	
	/**
	 * tree 목록 가져오기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getDiseaseCodeTreeW")
	public Object getDiseaseCodeTreeW(@RequestBody Map<Object,Object> paramMap){
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("gvDiseaseCodeTreeW", modalService.selectDiseaseCodeTreeW(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
			logger.debug(resultMap.toString());
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			
		}
		
		return resultMap;
	}
	
	/**
	 * tree에서 상병코드 목록 받아오기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getSearchSelectItemContDetlWList")
	public Object getSearchSelectItemContDetlWList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsItemContDetlList", modalService.selectSearchSelectItemContDetlWList(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	/**
	 * tree 등록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertDiseaseCodeForTreeW")
	public Object insertDiseaseCodeForTreeW(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START insertDiseaseCodeForTreeW");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			modalService.insertDiseaseCodeForTreeW(paramMap);
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
	 * tree 수정
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateDiseaseCodeForTreeW")
	public Object updateDiseaseCodeForTreeW(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START updateDiseaseCodeForTreeW");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			modalService.updateDiseaseCodeForTreeW(paramMap);
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
	 * tree 삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteDiseaseCodeForTreeW")
	public Object deleteDiseaseCodeForTreeW(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START deleteDiseaseCodeForTreeW");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			modalService.deleteDiseaseCodeForTreeW(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	
	//popP 처방코드 selectbox 리스트
	@ResponseBody
	@RequestMapping(value="/selectSelectBoxP")
	public Object selectSelectBoxP(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectSelectBoxP");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		String idKey = (String) paramMap.get("id");
		
		try{
			resultMap.put("idKey", idKey);
			resultMap.put("dsSelectBoxList", modalService.selectSelectBoxP(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	//popP 처방코드 리스트
	@ResponseBody
	@RequestMapping(value="/getCodeListP")
	public Object selectCodeListP(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectCodeListP");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		String idKey = (String) paramMap.get("id");
		
		try{
			resultMap.put("idKey", idKey);
			resultMap.put("dsCodeListP", modalService.selectCodeListP(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	/**
	 * 선택된 처방코드 목록 가져오기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getDiseaseParentCodeListP")
	public Object selectDiseaseParentCodeListP(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- selectDiseaseParentCodeListP START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsDiseaseParentCodeListP", modalService.selectDiseaseParentCodeListP(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * tree 목록 가져오기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getDiseaseCodeTreeP")
	public Object getDiseaseCodeTreeP(@RequestBody Map<Object,Object> paramMap){
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("gvDiseaseCodeTreeP", modalService.selectDiseaseCodeTreeW(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
			logger.debug(resultMap.toString());
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			
		}
		
		return resultMap;
	}
	
	/**
	 * 공통코드목록(코드셋)
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getCommonCodeList")
	public Object getCommonCodeList(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectCodeListP");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		String idKey = (String) paramMap.get("id");
		
		try{
			resultMap.put("dsCodeList", modalService.selectCommonCodeList(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	/**
	 * 공통코드선택목록(코드셋)
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getCommonSelectedCodeList")
	public Object getCommonSelectedCodeList(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectCodeListP");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		String idKey = (String) paramMap.get("id");
		
		try{
			resultMap.put("dsCodeSelectedList", modalService.selectCommonCodeList(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	/**
	 * 공통코드선택목록(상위코드)
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getUpperCommonCodeList")
	public Object getUpperCommonCodeList(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectUpperCommonCodeList");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{			
			String INSTCD = paramMap.get("INSTCD");
			
			resultMap.put("dsUpperCommonCodeList", modalService.selectUpperCommonCodeList(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("INSTCD", INSTCD);
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	/**
	 * 기록내용 코드
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getCommonCodeList_3HT_MR_EDIT")
	public Object getCommonCodeList_3HT_MR_EDIT(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectCommonCodeList_3HT_MR_EDIT");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsCodeList", modalService.selectCommonCodeList_3HT_MR_EDIT(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	/**
	 * 기록내용 코드
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getCommonCodeList_3HT_MR_LIST")
	public Object getCommonCodeList_3HT_MR_LIST(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectCommonCodeList_3HT_MR_LIST");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsCodeList", modalService.selectCommonCodeList_3HT_MR_LIST(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	/**
	 * 기록내용 코드
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getCommonCodeList_3HT_MR_CHECK")
	public Object getCommonCodeList_3HT_MR_CHECK(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectCommonCodeList_3HT_MR_CHECK");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsCodeList", modalService.selectCommonCodeList_3HT_MR_CHECK(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}

	
	/**
	 * keyword(동의어-대표어)
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getKeyWordCodeList")
	public Object getKeyWordCodeList(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectKeyWordCodeList");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsKeyWordCodeList", modalService.selectKeyWordCodeList(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	/**
	 * keyword(동의어-상세)
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getKeyWordCodeDetlList")
	public Object getKeyWordCodeDetlList(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectKeyWordCodeDetlList");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsKeyWordCodeDetlList", modalService.selectKeyWordCodeDetlList(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
}
