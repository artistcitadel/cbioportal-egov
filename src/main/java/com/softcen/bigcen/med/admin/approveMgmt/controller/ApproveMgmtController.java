package com.softcen.bigcen.med.admin.approveMgmt.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.med.admin.approveMgmt.service.IApproveMgmtService;

@Controller
@RequestMapping(value="/admin/approveMgmt")
public class ApproveMgmtController {

	private static final Logger logger = LoggerFactory.getLogger(ApproveMgmtController.class);

	@Autowired
	private IApproveMgmtService approveMgmtService;


	@RequestMapping(value="/approveMgmtMain")
	public String approveMgmtMain(){
		return "/admin/approveMgmt.tiles";
	}

	/**
	 * 승인/거부
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/setApproveData")
	public Object updateApproveData(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START updateApproveData");
		logger.debug(paramMap.toString());

		Map<Object,Object> resultMap = new HashMap<Object,Object>();

		try{
			approveMgmtService.updateApproveData(paramMap);
			resultMap.put("ERR_CD", 		"0");
			resultMap.put("ERR_MSG", 		"OK");
			resultMap.put("APRV_YN",		paramMap.get("APRV_YN"));		//승인결과
			resultMap.put("REJT_REASON",	paramMap.get("REJT_REASON"));	//사유
			resultMap.put("CONDT_NM",		paramMap.get("CONDT_NM"));		//조건명
			resultMap.put("CONT_SEQ",		paramMap.get("CONT_SEQ"));		//조건 seq
			resultMap.put("DATA_NM",		paramMap.get("DATA_NM"));		//데이터명
			resultMap.put("DATA_SEQ",		paramMap.get("DATA_SEQ"));		//데이터 seq
			resultMap.put("DEPT_NAME",		paramMap.get("DEPT_NAME"));		//소속
			resultMap.put("PER_CODE",		paramMap.get("PER_CODE"));		//요청자 ID
			resultMap.put("PER_NAME",		paramMap.get("PER_NAME"));		//요청자명
			resultMap.put("PURPOSE_CD",		paramMap.get("PURPOSE_CD"));	//추출목적

		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}

		return resultMap;
	}

	/**
	 * 승인요청/조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getRequestList")
	public Object getApproveRequestList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectRequestList START ");

		Map<Object,Object> resultMap = new HashMap<Object,Object>();

		try{
			//resultMap.put("dsRequestList", approveService.selectRequestList(paramMap));
			resultMap = (HashMap)approveMgmtService.selectRequestList(paramMap);

			//resultMap.put("ERR_CD", "0");
			//resultMap.put("ERR_MSG", "OK");

		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}

		return resultMap;
	}

}
