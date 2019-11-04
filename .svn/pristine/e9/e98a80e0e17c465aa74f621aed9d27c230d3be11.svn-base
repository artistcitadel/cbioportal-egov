package com.softcen.bigcen.med.admin.commonCode.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.med.admin.board.service.IBoardMgmtService;
import com.softcen.bigcen.med.admin.commonCode.service.ICommonCodeMgmtService;

/**
 * 관리자 > 공통코드 관리 를 담당하는 Controller 
 * @author RedEye
 *
 */
@Controller
@RequestMapping(value="/admin/commonCodeMgmt")
public class CommonCodeMgmtController {
	
	private static final Logger logger = LoggerFactory.getLogger(CommonCodeMgmtController.class);
	
	@Autowired
	private ICommonCodeMgmtService codeMgmtService;
	
	
	@RequestMapping(value="/main")
	public String codeManagement(){
		return "/admin/commonCodeMgmt.tiles";
	}
	
	/**
	 * 그룹코드 목록 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/groupCodeList")
	public Object selectGroupCodeList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START groupCodeList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap = (HashMap)codeMgmtService.selectGroupCodeList(paramMap);
			
			logger.debug(">>>>>>>>>>>>>>>>>>>>>>>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 코드관리에서 사용 할 그룹코드 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/codeGroupCodeList")
	public Object codeGroupCodeList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START codeGroupCodeList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap = (HashMap)codeMgmtService.codeGroupCodeList(paramMap);
			
			logger.debug(">>>>>>>>>>>>>>>>>>>>>>>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 그룹코드 등록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertGroupCode")
	public Object insertGroupCode(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START insertGroupCode");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			codeMgmtService.insertGroupCode(paramMap);
			resultMap.put("ERR_CD", "1");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 그룹코드 수정
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateGroupCode")
	public Object updateGroupCode(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START updateGroupCode");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			codeMgmtService.updateGroupCode(paramMap);
			resultMap.put("ERR_CD", "2");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 그룹코드 삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteGroupCode")
	public Object deleteGroupCode(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START deleteGroupCode");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			codeMgmtService.deleteGroupCode(paramMap);
			resultMap.put("ERR_CD", "3");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 코드 목록 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/codeList")
	public Object selectCodeList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START codeList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap = (HashMap)codeMgmtService.selectCodeList(paramMap);
			
			logger.debug(">>>>>>>>>>>>>>>>>>>>>>>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 코드 순서 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/codeOrderList")
	public Object codeOrderList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START codeOrderList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)codeMgmtService.codeOrderList(paramMap);
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 코드 등록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertCode")
	public Object insertCode(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START insertCode");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			codeMgmtService.insertCode(paramMap);
			resultMap.put("ERR_CD", "1");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 코드 수정
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateCode")
	public Object updateCode(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START updateCode");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			codeMgmtService.updateCode(paramMap);
			resultMap.put("ERR_CD", "2");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 코드 삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteCode")
	public Object deleteCode(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START deleteCode");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			codeMgmtService.deleteCode(paramMap);
			resultMap.put("ERR_CD", "3");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
}
