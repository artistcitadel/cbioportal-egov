package com.reactkorea.patient.controller;

import com.reactkorea.patient.service.EventServiceImpl;
import com.reactkorea.patient.service.PatientsInfoServiceImpl;
import com.reactkorea.patient.service.BloodServiceImpl;
import com.reactkorea.patient.vo.Event;
import com.reactkorea.patient.vo.Patient;
import com.reactkorea.patient.vo.PatientMut;
import com.reactkorea.patient.vo.Blood;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reactkorea.Result;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
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

import com.reactkorea.patient.service.PatientServiceImpl;
import com.reactkorea.patient.service.PatientMutServiceImpl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 1.업무명 : 환자관리시스템
 * 2.단위업무명 : 환자정보
 * 3.프로그램명 : 환자챠트
 * 4.설명 : 환자정보를 조회하는 Controller 클래스다.
 *
 * @Class  PatientController.java
 * @author
 * @since   2019. 11. 07.
 * @version 1.0
 *
 * @Copyright (c) com.reactkorea.platform.
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

//private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private static final Logger logger = LogManager.getLogger("com.reactkorea");

//private static final Logger logger = LoggerFactory.getLogger(PatientController.class);

	@Autowired
	private PatientsInfoServiceImpl patientsInfoService;

	@Autowired
	private PatientServiceImpl patientService;

	@Autowired
	private PatientMutServiceImpl patientMutService;

	@Autowired
	private EventServiceImpl eventService;

	@Autowired
	private BloodServiceImpl bloodService;

	@RequestMapping(value="/patientMain")
	public String patientMain(){
		return "/patient/patientMain";
	}

	@RequestMapping(value="/patientView")
	public String patientView(HttpServletRequest request, HttpServletResponse response,
														Model model , @RequestParam(value="QUERY", defaultValue="SELECT RESCH_PAT_ID\n" +
			" FROM \n" +
			"pmsdata.P0000001\n" +
//			"pmsdata.P0000\n" +
			" WHERE \n" +
			"1=1\n" +
			" AND DELETE_YN = 'N'") String QUERY, @RequestParam(value="RESCH_PAT_ID",defaultValue="48321932") String RESCH_PAT_ID,
														@RequestParam(value="pages",defaultValue="1") String pages,
														@RequestParam(value="patients",defaultValue="") String patients,
														@RequestParam(value="patientId",defaultValue="") String patientId){
		logger.info("\n### patientMain...");
		model.addAttribute("QUERY", QUERY);
		model.addAttribute("RESCH_PAT_ID", RESCH_PAT_ID);
		return "/patient/patientView";
	}

	@RequestMapping(value="/patientData")
	public String patientData(){
		return "/patient/patientData";
	}

	@RequestMapping(value="/patientQuasi")
	public String patientQuasi(){
		return "/patient/patientQuasi";
	}

	@RequestMapping(value="/raphael")
	public String raphael(){
		return "/patient/raphael";
	}

	@RequestMapping(value="/oncokbcard")
	public String oncokbcard(){
		return "/patient/oncokbcard";
	}

	@RequestMapping(value="/civic")
	public String civic(){
		return "/patient/civic";
	}

	@RequestMapping(value="/patientAttr")
	public String patientAttr(){
		return "/patient/patientAttr";
	}

	@RequestMapping(value="/patientInfo")
	public String patientInfo(){
		return "/patient/patientInfo";
	}

	@RequestMapping(value="/patientSample")
	public String patientSample(){
		return "/patient/patientSample";
	}

	@RequestMapping(value="/patientResemble")
	public String patientSimilar(){
		return "/patient/patientResemble";
	}

	/**
	 * 환자 리스트 조회
	 * @param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectPatientz")
	public void fetchPatients(HttpServletResponse response, @RequestBody Map<String,String> param){
		logger.info("/selectPatientz");
		Map<Object,Object> resultMap = new HashMap<Object,Object>();

		try{
			ObjectMapper mapper = new ObjectMapper();
			String queryid = param.get("queryId");
			String query = param.get("query");
			System.err.println("query id is "+ queryid);
			System.err.println("query is "+ query);
			Result<List> ar = patientsInfoService.fetchPatients(queryid, param);
			String jdata = "";
			jdata = mapper.writeValueAsString(ar.getData());
//			logger.info(" result is " + jdata);
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jdata);
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
	}

	/**
	 * 환자 진단진료 타임라인 그래프
	 * @param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/selectList")
	public void fetch(HttpServletResponse response, @RequestBody Patient vo){
		logger.info("/selectList");
		Map<Object,Object> resultMap = new HashMap<Object,Object>();

		try{
			ObjectMapper mapper = new ObjectMapper();
			Result<List<Patient>> ar = patientService.fetch(vo.getQueryId(), vo);
			String jdata = "";
			jdata = mapper.writeValueAsString(ar.getData());
			logger.info(" result is " + jdata);
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
		logger.info("/selectEventList");
		Map<Object,Object> resultMap = new HashMap<Object,Object>();

		try{
			ObjectMapper mapper = new ObjectMapper();
			Result<List<Patient>> ar = eventService.fetch(vo.getQueryId(), vo);
			String jdata = "";
			jdata = mapper.writeValueAsString(ar.getData());
//			logger.info(" result is " + jdata);
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
		logger.info("/selectPatientMuList called ");
		try{
			ObjectMapper mapper = new ObjectMapper();
			Result<List<PatientMut>> ar = patientMutService.fetch(vo.getQueryId(), vo);
			String jdata = "";
			jdata = mapper.writeValueAsString(ar.getData());
//			logger.info(" result is " + jdata);
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jdata);
		}catch(Exception e){
			System.err.println(" error " + e.getMessage());
		}
	}

	/**
	 * BRC등록
	 * @param
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/insertBrc")
	public void insertBrc(HttpServletResponse response, @RequestBody Blood[] vo){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();

		try{
			ObjectMapper mapper = new ObjectMapper();
			String queryid = "patient.insertBrc";

			int result = bloodService.insertBrc(queryid, vo);
//			System.err.println(result);
			String jdata = "";
//			jdata = "success : "+ result;
			jdata = mapper.writeValueAsString(result);
//			logger.info(" result is " + jdata);
			response.setContentType("text/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jdata);
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
	}

}

