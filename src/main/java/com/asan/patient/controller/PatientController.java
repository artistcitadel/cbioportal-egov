package com.asan.patient.controller;

import com.asan.patient.vo.Patient;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reactkorea.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.asan.patient.service.PatientServiceImpl;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(value="/patient")
public class PatientController {

private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

	@Autowired
	private PatientServiceImpl patientService;


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
	 * on patient summary inquiry
	 * @param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectList")
	public void fetch(HttpServletResponse response, @RequestBody Patient vo){
		logger.debug("[--- selectList START ");

		Map<Object,Object> resultMap = new HashMap<Object,Object>();

		try{
			ObjectMapper mapper = new ObjectMapper();
			Result<List<Patient>> ar = patientService.fetch(vo.getQueryId(), vo);
			String jdata = "";
			jdata = mapper.writeValueAsString(ar.getData());
			logger.debug(" result is " + jdata);
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jdata);
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}

		//return resultMap;
	}
/*	@RequestMapping(value="/selectList")
	@ResponseBody
	public void fetch(
			HttpServletResponse response,
			@RequestBody Patient vo
	) throws Exception{
		System.err.println("/selectList.do called...");
		ObjectMapper mapper = new ObjectMapper();
		Result<List<Patient>> ar = patientService.fetch(vo.getQueryId(), vo);
		String jdata = "";
		jdata = mapper.writeValueAsString(ar.getData());
		logger.debug(" result is " + jdata);
		response.setContentType("text/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(jdata);
	}*/
}

