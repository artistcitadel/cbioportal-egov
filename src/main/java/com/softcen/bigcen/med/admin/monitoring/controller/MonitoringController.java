package com.softcen.bigcen.med.admin.monitoring.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/admin/monitoring")
public class MonitoringController {
	
	private static final Logger logger = LoggerFactory.getLogger(MonitoringController.class);
	
	
	@RequestMapping(value="/monitoringMain")
	public String menuMain(){
		return "/admin/monitoring.tiles";
	}
	

}