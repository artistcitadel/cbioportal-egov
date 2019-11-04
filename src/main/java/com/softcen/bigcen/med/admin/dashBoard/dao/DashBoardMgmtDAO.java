package com.softcen.bigcen.med.admin.dashBoard.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.admin.log.dao.LogMgmtDAO;

@Repository(value="dashBoardMgmtDAO")
public class DashBoardMgmtDAO extends BigcenMedAbstractMapperDAO{
	
	private static final Logger logger = LoggerFactory.getLogger(LogMgmtDAO.class);
	
	/*@Autowired
	private SqlSession sqlSession;*/

	/**
	 * dashboard 관리 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertDashBoardMgmt(Map<Object, Object> paramMap) {
		int ret = sqlSession.insert("dashBoardMgmt.insertDashBoardMgmt", paramMap);
		
		return ret;
	}
	
	/**
	 * dashboard 관리 리스트
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectDashBoardMgmt(Map<String, String> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("dashBoardMgmt.selectDashBoardMgmt", paramMap);
		
	}
	
	/**
	 * chart 관리 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertChartMgmt(Map<Object, Object> paramMap) {
		int ret = sqlSession.insert("dashBoardMgmt.insertChartMgmt", paramMap);
		
		return ret;
	}
	
	/**
	 * chart 관리 수정
	 * @param paramMap
	 * @return
	 */
	public Object updateChartMgmt(Map<Object, Object> paramMap) {
		int ret = sqlSession.insert("dashBoardMgmt.updateChartMgmt", paramMap);
		
		return ret;
	}
	
	/**
	 * chart 관리 리스트
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectChartMgmt(Map<String, String> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("dashBoardMgmt.selectChartMgmt", paramMap);
		
	}
	
	/**
	 * chart 관리 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteChartMgmt(Map<Object, Object> paramMap) {
		int ret = sqlSession.delete("dashBoardMgmt.deleteChartMgmt", paramMap);
		
		return ret;
	}
	
	/**
	 * chart 자기 order 번호 변경
	 * @param paramMap
	 * @return
	 */
	public Object orderChartMgmtUp(Map<Object, Object> paramMap) {
		int ret = sqlSession.update("dashBoardMgmt.orderChartMgmtUp", paramMap);
		
		return ret;
	}
	
	/**
	 * chart 바뀔 order 번호 변경
	 * @param paramMap
	 * @return
	 */
	public Object orderChartMgmtDown(Map<Object, Object> paramMap) {
		int ret = sqlSession.update("dashBoardMgmt.orderChartMgmtDown", paramMap);
		
		return ret;
	}
	
	/**
	 * chart Dimension & Measures
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectChartSQL(Map<String, String> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSessionVerticaA.selectList("dashBoardMgmt.selectChartSQL", paramMap);
		
	}

}
