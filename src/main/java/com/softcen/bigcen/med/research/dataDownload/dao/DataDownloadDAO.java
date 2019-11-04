package com.softcen.bigcen.med.research.dataDownload.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.admin.log.dao.LogMgmtDAO;

@Repository("dataDownloadDAO")
public class DataDownloadDAO extends BigcenMedAbstractMapperDAO{
	
	private static final Logger logger = LoggerFactory.getLogger(LogMgmtDAO.class);
	
	public List<Map<Object, Object>> selectMyApplyList(Map<Object, Object> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("dataDownload.selectMyApplyList", paramMap);
	}
	
	/**
	 * 승인목록 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectMyApplyCount(Map<Object, Object> paramMap){
		return sqlSession.selectOne("dataDownload.selectMyApplyCount", paramMap);
		
	}
	
	public List<Map<Object, Object>> dataDownload(Map<Object, Object> paramMap){
		return sqlSessionVerticaA.selectList("dataDownload.dataDownload", paramMap);
	}
	
	public List<Map<Object, Object>> dataDownloadColumn(Map<Object, Object> paramMap){
		return sqlSession.selectList("dataDownload.dataDownloadColumn", paramMap);
	}
	

}
