package com.softcen.bigcen.med.mutationcpm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value="/mutation")
public class MutationcpmController {
	
private static final Logger logger = LoggerFactory.getLogger(MutationcpmController.class);

/*	@Autowired
	private IBoardMgmtService boardMgmtService;*/
	
	
	@RequestMapping(value="/mutationMain")
	public String boardManagement(){
		return "/mutation/mutationMain.tiles";
	}

}

	