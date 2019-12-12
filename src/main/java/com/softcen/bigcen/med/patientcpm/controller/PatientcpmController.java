package com.softcen.bigcen.med.patientcpm.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

import com.softcen.bigcen.med.patientcpm.service.PatientcpmServiceImpl;

@Controller
@RequestMapping(value="/patient111")
public class PatientcpmController {

private static final Logger logger = LoggerFactory.getLogger(PatientcpmController.class);

	@Autowired
	private PatientcpmServiceImpl patientcpmService;


	@RequestMapping(value="/patientMain")
	public String patientMain(){
		return "/patient/patientMain.tiles";
	}

	@RequestMapping(value="/patientView")
	public String patientView(){
		return "/patient/patientView.tiles";
	}

	@RequestMapping(value="/patientData")
	public String patientData(){
		return "/patient/patientData.tiles";
	}

	@RequestMapping(value="/patientQuasi")
	public String patientQuasi(){
		return "/patient/patientQuasi.tiles";
	}

	@RequestMapping(value="/raphael")
	public String raphael(){
		return "/patient/raphael.tiles";
	}


	/**
	 * patient view inquery
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectList")
	public Object selectDashBoardMgmt(@RequestBody Map<String,String> paramMap){
		logger.debug("[--- selectList START ");

		Map<Object,Object> resultMap = new HashMap<Object,Object>();

		try{
			resultMap.put("result", patientcpmService.selectPatientView(paramMap));

		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}

		return resultMap;
	}
}

