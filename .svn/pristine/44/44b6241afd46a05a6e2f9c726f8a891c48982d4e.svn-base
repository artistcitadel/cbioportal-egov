package com.softcen.bigcen.med.research.query.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.main.service.ILogAccessService;
import com.softcen.bigcen.med.utils.PropertiesUtils;


@Service("resultService")
public class ResultServiceImpl {
	
	@Autowired
	private IQueryService queryService;
	
	@Autowired
	private ILogAccessService logAccessService;
	
	/**
	 * SQL 결과목록 조회
	 * @param queryMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("all")
	public Map getResultList(String query, int period) throws SQLException, Exception{
		Map<Object,Object> resultMap = new HashMap();
		Map<Object,Object> paramMap = new HashMap();
		List list = new ArrayList();
		
		paramMap.put("QUERY", query);
		paramMap.put("PERIOD", period);
		
		list = (ArrayList)queryService.getQueryResult(paramMap);
		
		resultMap.put("dsList"		,list);
		resultMap.put("dsPeriodNm"	,period + "주기");
		resultMap.put("dsCount"		,list.size());
		resultMap.put("dsQuery"		,query);
		
		return resultMap;
		
	}
	
	
	/**
	 * SQL 결과목록 조회
	 * @param queryMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("all")
	public Map getResultList(String query, int period, Map<Object,Object> paramMap) throws SQLException, Exception{
		Map<Object,Object> resultMap = new HashMap();
		List list = new ArrayList();
		
		paramMap.put("QUERY", query);
		paramMap.put("PERIOD", period);
		paramMap.put("MESSAGE", query);
		
		logAccessService.insertLogAccess(paramMap);
		
		list = (ArrayList)queryService.getQueryResult(paramMap);
		
		resultMap.put("dsList"		,list);
		resultMap.put("dsPeriodNm"	,period + "주기");
		resultMap.put("dsCount"		,list.size());
		resultMap.put("dsQuery"		,query);
		
		return resultMap;
		
	}
	
	
	
	
	
	
	
}
