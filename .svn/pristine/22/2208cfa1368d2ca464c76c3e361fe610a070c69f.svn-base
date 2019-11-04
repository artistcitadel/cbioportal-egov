package com.softcen.bigcen.med.admin.log.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.med.admin.log.service.ILogMgmtService;

@Controller
@RequestMapping(value="/admin/log")
public class LogMgmtController {
	
	private static final Logger logger = LoggerFactory.getLogger(LogMgmtController.class);
	
	@Autowired
	private ILogMgmtService logMgmtService;
	
	@RequestMapping(value="/logMgmt")
	public String logMgmt(){
		return "";
	}
	
	@RequestMapping(value="/webLog")
	public String webLog(){
		return "/admin/webLog.tiles";
	}
	
	@RequestMapping(value="/etlLog")
	public String etlLog(){
		return "/admin/etlLog.tiles";
	}
	
	@ResponseBody
	@RequestMapping(value="/webLogList")
	public Object selectWebLogList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START webLogList");
		
		
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap = (HashMap)logMgmtService.selectWebLogList(paramMap);
			
			logger.debug(">>>>>>>>>>>>>>>>>>>>>>>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/etlLogList")
	public Object selectEtlLogList(@RequestBody Map<Object,Object> paramMap) throws Exception{
		logger.debug("[--- START etlLogList");
		
		
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap = (HashMap)logMgmtService.selectEtlLogList(paramMap);
			
			logger.debug(">>>>>>>>>>>>>>>>>>>>>>>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}

}
