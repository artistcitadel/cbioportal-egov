package com.softcen.bigcen.med.patient.controller;

import com.softcen.bigcen.med.patient.service.EventServiceImpl;
import com.softcen.bigcen.med.patient.vo.Event;
import com.softcen.bigcen.med.patient.vo.Patient;
import com.softcen.bigcen.med.patient.vo.PatientMut;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reactkorea.Result;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.softcen.bigcen.med.patient.service.PatientServiceImpl;
import com.softcen.bigcen.med.patient.service.PatientMutServiceImpl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 1.업무명 : 환자관리시스템
 * 2.단위업무명 : 환자조회
 * 3.프로그램명 : 환자챠트
 * 4.설명 : 환자정보를 Controller 클래스다.
 *
 * @Class  PatientController.java
 * @author
 * @since   2019. 11. 07.
 * @version 1.0
 *
 * @Copyright (c) com.asan.platform.
 *------------------------------------------------------------------------
 * Modification Information
 *------------------------------------------------------------------------
 * 수정일               수정자            수정내용
 *------------------------------------------------------------------------
 * 2019. 11. 07.     오세영          [환자진단진료조회시스템] 최초생성
 */

@Controller
@RequestMapping(value="/patient")
public class PatientController {

private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

	@Autowired
	private PatientServiceImpl patientService;

	@Autowired
	private PatientMutServiceImpl patientMutService;

	@Autowired
	private EventServiceImpl eventService;

	@RequestMapping(value="/patientMain")
	public String patientMain(){
		return "/patient/patientMain.tiles";
	}

	@RequestMapping(value="/patientView")
	public String patientView(HttpServletRequest request, HttpServletResponse response,
														Model model , @RequestParam(value="QUERY", defaultValue="") String QUERY, @RequestParam(value="RESCH_PAT_ID",defaultValue="48321932") String RESCH_PAT_ID){
		model.addAttribute("QUERY", QUERY);
		model.addAttribute("RESCH_PAT_ID", RESCH_PAT_ID);
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

	@RequestMapping(value="/oncokbcard")
	public String oncokbcard(){
		return "/patient/oncokbcard.tiles";
	}

	/**
	 * 환자 진단진료 타임라인 그래프
	 * @param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectList")
	public void fetch(HttpServletResponse response, @RequestBody Patient vo){
		logger.debug("/selectList");
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
	}


	/**
	 * 환자 이벤트
	 * @param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectEventList")
	public void fetchEvent(HttpServletResponse response, @RequestBody Event vo){
		logger.debug("/selectEventList");
		Map<Object,Object> resultMap = new HashMap<Object,Object>();

		try{
			ObjectMapper mapper = new ObjectMapper();
			Result<List<Patient>> ar = eventService.fetch(vo.getQueryId(), vo);
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
	}

	/**
	 * 환자 체내 돌연변이 정보
	 * @param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectPatientMuList")
	public void selectPatientMuList(HttpServletResponse response, @RequestBody PatientMut vo){
		logger.debug("/selectPatientMuList called ");
		try{
			ObjectMapper mapper = new ObjectMapper();
			Result<List<PatientMut>> ar = patientMutService.fetch(vo.getQueryId(), vo);
			String jdata = "";
			jdata = mapper.writeValueAsString(ar.getData());
			logger.debug(" result is " + jdata);
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jdata);
		}catch(Exception e){
			System.err.println(" error " + e.getMessage());
		}
	}

}

