package com.softcen.bigcen.med.admin.log.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.utils.PropertiesUtils;

@Repository(value="logMgmtDAO")
public class LogMgmtDAO extends BigcenMedAbstractMapperDAO{
	private static final Logger logger = LoggerFactory.getLogger(LogMgmtDAO.class);
	
	/*@Autowired
	private SqlSession sqlSession;*/
	
	/**
	 * 웹로그 정보 목록 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectWebLogList(Map<Object, Object> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("log.selectWebLogList", paramMap);
		
	}
	
	/**
	 * 웹로그 전체 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectWebLogCount(Map<Object, Object> paramMap){
		return sqlSession.selectOne("log.selectWebLogCount", paramMap);
		
	}
	
	public List<Map<Object, Object>> selectEtlLogList(Map<Object, Object> paramMap) throws Exception{
		//logger.debug(">>>" + paramMap.toString());
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		return sqlSessionVerticaA.selectList("log.selectEtlLogList", paramMap);
		
	}
	
	/**
	 * ETL로그 전체 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectEtlLogCount(Map<Object, Object> paramMap) throws Exception{
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		return sqlSessionVerticaA.selectOne("log.selectEtlLogCount", paramMap);
		
	}

}
