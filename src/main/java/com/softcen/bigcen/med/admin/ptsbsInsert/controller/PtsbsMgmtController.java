package com.softcen.bigcen.med.admin.ptsbsInsert.controller;

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

import com.softcen.bigcen.med.admin.auth.service.IAuthService;
import com.softcen.bigcen.med.admin.board.service.IBoardMgmtService;
import com.softcen.bigcen.med.admin.ptsbsInsert.service.IPtsbsMgmtService;
import com.softcen.bigcen.med.admin.ptsbsInsert.service.PtsbsMgmtServiceImpl;

@Controller
@RequestMapping(value="/admin/ptsbsInsert")
public class PtsbsMgmtController {
	
	private static final Logger logger = LoggerFactory.getLogger(PtsbsMgmtController.class);
	
	@Autowired
	private IPtsbsMgmtService ptsbsMgmtService;
	
	
	
	@RequestMapping(value="/main")
	public String menuMain(){
		logger.debug("[--- START USER MAIN");
		return "/admin/ptsbsInsert.tiles";
	}
	
	
	/**
	 * 유래물 비코드 적용 내역 ALL
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectCheckPtsbsMapAll")
	public Object selectCheckPtsbsMapAll(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START selectCheckPtsbsMapAll");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		resultMap.put("ERR_CD", "0");
		resultMap.put("ERR_MSG", "0");
		
		resultMap.put("selectCheckPtsbsMapAll", ptsbsMgmtService.selectCheckPtsbsMapAll(paramMap));

		return resultMap;
	}
	
	
	/**
	 * 환자번호 대체 매핑
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectPtsbsMapping")
	public Object selectPtsbsMapping(@RequestBody List<Map<Object,Object>> paramMap){
		logger.debug("[--- START selectPtsbsMapping");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		List<Map<Object,Object>> PtsbsMappingList = new ArrayList<Map<Object,Object>>();

		resultMap = (HashMap) ptsbsMgmtService.selectPtsbsMapping(paramMap);

		resultMap.put("ERR_CD", "0");
		resultMap.put("ERR_MSG", "0");
		
		return resultMap;
	}
	

}
