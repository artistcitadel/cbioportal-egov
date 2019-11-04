package com.softcen.bigcen.med.common.except;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.softcen.bigcen.med.main.service.ILogAccessService;

public class BizRuntimeException extends RuntimeException{
	private static final Logger logger = Logger.getLogger(BizRuntimeException.class);
	
	@Autowired
	private ILogAccessService logAccessService;
	
	
	public BizRuntimeException(Exception e){
		super(e.getMessage());
		
		logger.error("[ BizRuntimeException ]");
		
		Map paramLogAccessMap = new HashMap();
		
		paramLogAccessMap.put("TYPE", "E");
		paramLogAccessMap.put("REQUEST_URL", "ERROR");
		paramLogAccessMap.put("PER_CODE", "ERROR");
		paramLogAccessMap.put("ACCESS_IP", "ERROR");
		paramLogAccessMap.put("MESSAGE", e.getMessage());
		
		logAccessService.insertLogAccess(paramLogAccessMap);
		
		
	}
}
