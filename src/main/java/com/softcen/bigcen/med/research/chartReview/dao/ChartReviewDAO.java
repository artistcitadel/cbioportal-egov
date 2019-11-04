package com.softcen.bigcen.med.research.chartReview.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.admin.log.dao.LogMgmtDAO;

@Repository("chartReivewDAO")
public class ChartReviewDAO extends BigcenMedAbstractMapperDAO{
	
	private static final Logger logger = LoggerFactory.getLogger(LogMgmtDAO.class);
	
	public List<Map<Object, Object>> selectMySaveList(Map<Object, Object> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("chartReview.selectMySaveList", paramMap);
	}
	
	/**
	 * 개인조건 + 데이터 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectMySaveCount(Map<Object, Object> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectOne("chartReview.selectMySaveCount", paramMap);
		
	}
	
	public Object updateDataDel(Map<Object, Object> paramMap) {
		int ret = sqlSessionVerticaA.update("chartReview.updateDataDel", paramMap);
		return ret;
	}
	
	public Object alterColumnAdd(Map<Object, Object> paramMap) {
		int ret = sqlSessionVerticaA.update("chartReview.alterColumnAdd", paramMap);
		return ret;
	}
	
	public Object insertDataColumn(Map<Object, Object> paramMap) {
		int ret = sqlSession.insert("chartReview.insertDataColumn", paramMap);
		return ret;
	}
	
	public Object alterColumnDel(Map<Object, Object> paramMap) {
		int ret = sqlSessionVerticaA.update("chartReview.alterColumnDel", paramMap);
		return ret;
	}
	
	public Object deleteDataColumn(Map<Object, Object> paramMap) {
		int ret = sqlSession.delete("chartReview.deleteDataColumn", paramMap);
		return ret;
	}
	
	public Object updateDataVal(Map<Object, Object> paramMap) {
		int ret = sqlSessionVerticaA.update("chartReview.updateDataVal", paramMap);
		return ret;
	}
	
	public Object selectPatId(Map<Object, Object> paramMap) {
		return sqlSessionVerticaA.selectList("chartReview.selectPatId", paramMap);
	}
	
	

}
