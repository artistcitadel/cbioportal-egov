package com.softcen.bigcen.med.research.query.service;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;

public interface IQueryResultDataStoreService {
	
	/**
	 * 연구항목 조회결과 목록 저장 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object saveQueryResultData(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 연구항목 조회결과 목록 저장 (그리드 ROW별)
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object saveQueryResultDataByRow(Map<Object,Object> paramMap) throws Exception;
	

}
