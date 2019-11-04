package com.softcen.bigcen.med.research.query.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.research.crssec.service.ICrossSectionalStudyService;
import com.softcen.bigcen.med.research.query.service.IQueryResultDataStoreService;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.research.query.vo.QueryVO;

/**
 * 연구조회 결과 목록 저장을 위한 컨트롤러
 * @author user
 *
 */

@Controller
@RequestMapping("/research/queryResultDataStore")
public class QueryResultDataStoreController extends BigcenMedAbstractController{
	@Autowired
	private IQueryResultDataStoreService iQueryResultDataService;
	
	@Autowired
	private ICrossSectionalStudyService iCrossSectionalStudyService;
	
	/**
	 * 쿼리결과 목록 저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/saveResultData")
	@SuppressWarnings({"unchecked"})
	public Object saveQueryResultData(@RequestBody Map<Object,Object> paramMap){
		logger.info(QueryVO.LOG_SYMBOL + "saveQueryResultData START");
		
		resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap<Object,Object>)iQueryResultDataService.saveQueryResultData(paramMap);
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
		
	}
	
	/**
	 * 사례대조 로우별 결과 데이터 저장
	 * @param paramMap
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/saveResultDataByRow")
	public Object saveResultDataByRow(@RequestBody Map<Object,Object> paramMap, HttpServletRequest req){
		logger.info(QueryVO.LOG_SYMBOL + "saveStudyItemTargetResultRow START");
		
		resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug(QueryVO.LOG_SYMBOL + paramMap.get("INSTCD"));
			logger.debug(QueryVO.LOG_SYMBOL + paramMap.get("PER_CODE"));
			logger.debug(QueryVO.LOG_SYMBOL + paramMap.get("DATA_NM"));
			
			resultMap = (HashMap)iQueryResultDataService.saveQueryResultDataByRow(paramMap);
			
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
		
	}
	

}
