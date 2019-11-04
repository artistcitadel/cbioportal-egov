package com.softcen.bigcen.med.utils;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NetworkUtils {
	private  static final Logger logger = LoggerFactory.getLogger(NetworkUtils.class);
	
	public String getRemoteIpAddr(HttpServletRequest req){
		String ipAddr = "";
		
		try{
			if(req != null){
				ipAddr = req.getRemoteAddr();
			}
			
		}catch(Exception e){
			logger.error(e.getMessage());
		}
		
		return ipAddr;
	}

}
