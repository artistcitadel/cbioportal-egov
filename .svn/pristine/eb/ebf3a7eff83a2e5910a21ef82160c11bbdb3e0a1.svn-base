package com.softcen.bigcen.med.research.query.dao;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

/**
 * 검색결과 목록 조장 DAO
 * @author user
 *
 */

@Repository("queryResultDataStoreDAO")
public class QueryResultDataStoreDAO extends BigcenMedAbstractMapperDAO{
	
	/**
	 * 결과목록 저장을 위한 CREATE TABLE
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object createTableForResult(Map<String,String> paramMap) throws SQLException{
		return sqlSessionVerticaA.update("query_result_data_store.createTableForResult",paramMap);
	}
	
	
	/**
	 * 결과목록 저장
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object insertDataForResult(Map<String,String> paramMap) throws SQLException{
		return sqlSessionVerticaA.update("query_result_data_store.insertDataForResult",paramMap);
	}
	
	/**
	 * 쿼리결과 메타데이터 저장
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object insertItemContData(Map<String,String> paramMap) throws SQLException{
		return sqlSession.insert("query_result_data_store.insertItemContData",paramMap);
	}
	
	/**
	 * 쿼리결과 컬럼정보 저장
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object insertItemContDataDetl(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.insert("query_result_data_store.insertItemContDataDetl",paramMap);
	}

}
