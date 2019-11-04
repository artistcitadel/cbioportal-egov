package com.softcen.bigcen.med.research.query.dao;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;


@Repository("queryDAO")
public class QueryDAO extends BigcenMedAbstractMapperDAO{
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemJoinList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("study_common.selectItemJoinList", paramMap);
	}
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectCrossSectionStudyList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSessionVerticaA.selectList("study_common.selectCrossSectionStudyList", paramMap);
	}
	
	
	public Object selectItemCont(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("study_common.selectItemCont",paramMap);
	}
	public Object selectItemContDetl(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("study_common.selectItemContDetl",paramMap);
	}
	public Object selectItemContData(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("study_common.selectItemContData",paramMap);
	}
	public Object selectItemContDataDetl(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("study_common.selectItemContDataDetl",paramMap);
	}
	
	public Object updateResultTable(Map<String,Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("study_common.updateResultTable",paramMap);
	}
}
