package com.softcen.bigcen.med.research.approve.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.admin.log.dao.LogMgmtDAO;
import com.vertica.util.ServerException;

@Repository("approveDAO")
public class ApproveDAO extends BigcenMedAbstractMapperDAO{
	
	private static final Logger logger = LoggerFactory.getLogger(LogMgmtDAO.class);
	
	public List<Map<Object, Object>> selectMySaveList(Map<Object, Object> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("approve.selectMySaveList", paramMap);
	}
		
	/**
	 * 개인조건 + 데이터 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectMySaveCount(Map<Object, Object> paramMap){
		return sqlSession.selectOne("approve.selectMySaveCount", paramMap);
		
	}
	
	/**
	 * 승인요청저장
	 * @param paramMap
	 * @return
	 */
	public Object insertPurposeData(Map<Object, Object> paramMap) {
		int ret = sqlSession.insert("approve.insertPurposeData", paramMap);
		
		return ret;
	}
	
	/**
	 * 데이터 meta 삭제
	 * @param paramMap
	 * @return
	 */
	public Object delApproveData(Map<Object, Object> paramMap) {
		int ret = sqlSession.delete("approve.delApproveData", paramMap);
		
		return ret;
	}
	
	/**
	 * 데이터 테이블 drop
	 * @param paramMap
	 * @return
	 */
	public Object dropApproveDataTable(Map<Object, Object> paramMap) {
		int ret = -1;
		try{
			ret = (Integer)sqlSessionVerticaA.delete("approve.dropApproveDataTable", paramMap);
			
		}catch(DataAccessException dae){
			ServerException se = (ServerException)dae.getRootCause();
			logger.error("error message : " + se.getMessage());
			logger.error("error code : " + se.getError().getErrorCode());
			
			ret = se.getError().getErrorCode();
			
		}
		
		return ret;
	}
	
	public List<Map<Object, Object>> selectRequestList(Map<Object, Object> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("approve.selectRequestList", paramMap);
	}
		
	/**
	 * 승인요청/조회 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectRequestCount(Map<Object, Object> paramMap){
		return sqlSession.selectOne("approve.selectRequestCount", paramMap);
		
	}
	
	/**
	 * 데이터 컬럼정보
	 * @param paramMap
	 * @return
	 */
	public Object selectDataColumnList(Map<Object, Object> paramMap){
		return sqlSession.selectList("approve.selectDataColumnList", paramMap);
		
	}
	
	/**
	 * 데이터 주기정보
	 * @param paramMap
	 * @return
	 */
	public Object selectDataResultPeriodList(Map<Object, Object> paramMap){
		return sqlSessionVerticaA.selectList("approve.selectDataResultPeriodList", paramMap);
		
	}
	
	/**
	 * 데이터
	 * @param paramMap
	 * @return
	 */
	public Object selectDataResultList(Map<Object, Object> paramMap){
		return sqlSessionVerticaA.selectList("approve.selectDataResultList", paramMap);
		
	}
	
	
	/**
	 * 승인알림 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectApproveCount(){
		return sqlSession.selectOne("approve.selectApproveCount");
		
	}
	
	/**
	 * 승인알림 리스트
	 * @param paramMap
	 * @return
	 */
	public Object selectApproveList(){
		return sqlSession.selectList("approve.selectApproveList");
	}
	
	
	/**
	 * 테이블 있는지 체크
	 * @param paramMap
	 * @return
	 */
	public Object checkTable(Map<Object, Object> paramMap){
		return sqlSessionVerticaA.selectOne("approve.checkTable", paramMap);
	}

}
