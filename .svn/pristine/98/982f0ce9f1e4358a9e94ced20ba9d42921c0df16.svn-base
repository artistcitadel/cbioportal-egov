package com.softcen.bigcen.med.search.dao;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;


@Repository(value="searchDAO")
public class SearchDAO extends BigcenMedAbstractMapperDAO{
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectSynonymList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("search.selectSynonymList", paramMap);
	}
	
	/**
	 * 환자목록ID
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectPatSbstNoList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSessionVerticaA.selectList("search.selectPatSbstNoList", paramMap);
	}
	

}
