package com.softcen.bigcen.med.admin.board.controller;

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

@Controller
@RequestMapping(value="/admin/board")
public class BoardMgmtController {
	
	private static final Logger logger = LoggerFactory.getLogger(BoardMgmtController.class);
	
	@Autowired
	private IBoardMgmtService boardMgmtService;
	
	
	@RequestMapping(value="/boardManagement")
	public String boardManagement(){
		return "/admin/boardManagement.tiles";
	}
	
	/**
	 * 게시판정보 리스트
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectBoardMgmt")
	public Object selectBoardMgmt(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- START selectBoardMgmt");
		
		
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		
		resultMap.put("dsBoardMgmtList", boardMgmtService.selectBoardMgmt(paramMap));
		
		return resultMap;
	}
	
	/**
	 * 게시판정보 신규저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertBoardMgmt")
	public Object insertBoardMgmt(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START insertBoardMgmt");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			boardMgmtService.insertBoardMgmt(paramMap);
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
	 * 게시판정보 수정저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateBoardMgmt")
	public Object updateBoardMgmt(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START updateBoardMgmt");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			boardMgmtService.updateBoardMgmt(paramMap);
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
	 * 게시판정보 삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deleteBoardMgmt")
	public Object deleteBoardMgmt(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START deleteBoardMgmt");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			boardMgmtService.deleteBoardMgmt(paramMap);
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
	 * 게시판 순서변경 UP
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/orderBoardMgmtUpDown")
	public Object orderUpBoardMgmt(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START orderBoardMgmtUpDown");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			boardMgmtService.orderBoardMgmtUpDown(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}

}
