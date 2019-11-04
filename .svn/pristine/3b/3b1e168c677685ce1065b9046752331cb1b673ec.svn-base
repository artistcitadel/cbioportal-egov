package com.softcen.bigcen.med.admin.menu.controller;

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
@RequestMapping(value="/admin/menu")
public class MenuMgmtController {
	
	private static final Logger logger = LoggerFactory.getLogger(MenuMgmtController.class);
	
	
	@RequestMapping(value="/menuMain")
	public String menuMain(){
		return "/admin/menuMgmt.tiles";
	}
	
	@RequestMapping(value="/menuAuthMain")
	public String authMain(){
		return "/admin/menuAuthMgmt.tiles";
	}
	

}
