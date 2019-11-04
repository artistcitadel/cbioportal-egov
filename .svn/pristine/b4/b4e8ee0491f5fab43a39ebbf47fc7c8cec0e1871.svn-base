package com.softcen.bigcen.med.research.sharingconditions.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.research.sharingconditions.service.ISharingConditionsService;

/**
 * 조회조건저장, 연구항목 조건저장, 조건공유 관리 컨트롤러 클래스
 * @author user
 *
 */

@Controller
@RequestMapping(value="/research/sharingconditions")
public class SharingConditionsController extends BigcenMedAbstractController{
	
	@Autowired
	private ISharingConditionsService iSharingConditionsService;
	
	/**
	 * 조건명 중복 체크 요청
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/chkDuplCondNmList")
	@ResponseBody
	public Object chkDuplCondNmList(@RequestBody Map<String,Object> paramMap) throws Exception{
		resultMap = new HashMap();
		
		try{
			logger.debug(paramMap.toString());
			
			resultMap.put("dsChkDuplCondNmList", iSharingConditionsService.chkDuplCondNmList(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 조회조건 저장 요청
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/saveQueryConditions")
	@ResponseBody
	public Object saveQueryConditions(@RequestBody Map<String,Object> paramMap) throws Exception{
		resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("SEQ", iSharingConditionsService.saveQueryConditions(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	
	
	/**
	 * 조회조건 공유 요청 (과공유,전체공유)
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/saveQueryConditionsSharing")
	@ResponseBody
	public Object saveQueryConditionsSharing(@RequestBody Map<String,Object> paramMap) throws Exception{
		resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("SEQ", iSharingConditionsService.saveQueryConditionsSharing(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	
	
	

}
