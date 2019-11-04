package com.softcen.bigcen.med.admin.join.controller;

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
import com.softcen.bigcen.med.admin.join.service.IJoinMgmtService;

/**
 * 관리자 > JOIN 관리 를 담당하는 Controller 
 * @author RedEye
 *
 */
@Controller
@RequestMapping(value="/admin/joinMgmt")
public class JoinMgmtController {
	
	private static final Logger logger = LoggerFactory.getLogger(JoinMgmtController.class);
	
	@Autowired
	private IJoinMgmtService joinMgmtService;
	
	@RequestMapping(value="/main")
	public String boardManagement(){
		return "/admin/joinMgmt.tiles";
	}
	
	/**
	 * 연구항목  관리 항목 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectMgmtItemList")
	public Object selectMgmtItemList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START selectMgmtItemList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap = (HashMap)joinMgmtService.selectMgmtItemList(paramMap);
			
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
	 * 연구항목 조인 관리 항목 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectJoinItemList")
	public Object selectJoinItemList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START selectJoinItemList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap = (HashMap)joinMgmtService.selectJoinItemList(paramMap);
			
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
	 * 연구항목 조인 관리 목록 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectJoinList")
	public Object selectJoinList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START selectJoinList");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap = (HashMap)joinMgmtService.selectJoinList(paramMap);
			
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
	 * 연구항목 조인 관리 목록 등록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertJoin")
	public Object insertJoin(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START insertJoin");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			int cnt = (Integer) joinMgmtService.insertJoin(paramMap);
			// 등록 성공
			if(cnt > 0){
				resultMap.put("ERR_CD", "1");
				resultMap.put("ERR_MSG", "OK");
			// 중복발생
			}else{
				resultMap.put("ERR_CD", "-10");
				resultMap.put("ERR_MSG", "OVERLAP");
			}
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 연구항목 조인 관리 목록 삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteJoin")
	public Object deleteJoin(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START deleteJoin");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			joinMgmtService.deleteJoin(paramMap);
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
