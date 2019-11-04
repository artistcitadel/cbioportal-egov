package com.softcen.bigcen.med.research.query.service;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;

public interface IQueryService {
	public Object selectItemCont(Map<Object,Object> paramMap) throws Exception;
	
	public Object selectItemContDetl(Map<Object,Object> paramMap) throws Exception;
	
	public Object selectItemContData(Map<Object,Object> paramMap) throws Exception;
	
	public Object selectItemContDataDetl(Map<Object,Object> paramMap) throws Exception;
	
	@Transactional
	public Object updateResultTable(Map<String,Object> paramMap) throws Exception;
	
	/**
	 * JOIN관계목록 조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object getJoinTableList(Map<Object,Object> paramMap) throws SQLException;
	
	/**
	 * 쿼리결과
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object getQueryResult(Map<Object,Object> paramMap) throws SQLException;
	
	/**
	 * OLAP관련정보 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object getOlapInfo(Map<Object,Object> paramMap) throws Exception;

}
