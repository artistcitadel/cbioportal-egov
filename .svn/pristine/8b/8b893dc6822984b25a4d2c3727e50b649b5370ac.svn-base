package com.softcen.bigcen.med.admin.join.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

/**
 * 관리자 > JOIN 관리 를 담당하는 DAO 
 * @author RedEye
 *
 */
@Repository(value="joinMgmtDAO")
public class JoinMgmtDAO  extends BigcenMedAbstractMapperDAO{
	private static final Logger logger = LoggerFactory.getLogger(JoinMgmtDAO.class);
	
	/**
	 * 연구항목  관리 항목 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectMgmtItemList(Map<Object, Object> paramMap){
		logger.debug("selectMgmtItemList >>>" + paramMap.toString());
		return sqlSession.selectList("joinMgmt.selectMgmtItemList", paramMap);
	}
	
	/**
	 * 연구항목  조인 관리 항목 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectJoinItemList(Map<Object, Object> paramMap){
		logger.debug("selectJoinItemList >>>" + paramMap.toString());
		return sqlSession.selectList("joinMgmt.selectJoinItemList", paramMap);
	}
	
	/**
	 * 연구항목 조인 관리 전체 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectJoinCount(Map<Object, Object> paramMap){
		return sqlSession.selectOne("joinMgmt.selectJoinCount", paramMap);
	}
	
	/**
	 * 연구항목 조인 관리 목록 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectJoinList(Map<Object, Object> paramMap){
		logger.debug("selectJoinList >>>" + paramMap.toString());
		return sqlSession.selectList("joinMgmt.selectJoinList", paramMap);
	}
	
	/**
	 * 연구항목 조인 관리 등록 중복체크
	 * @param paramMap
	 * @return
	 */
	public Object insertJoinCheck(Map<Object, Object> paramMap){
		return sqlSession.selectOne("joinMgmt.insertJoinCheck", paramMap);
	}
	/**
	 * 연구항목 조인 관리 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertJoin(Map<Object, Object> paramMap){
		return sqlSession.insert("joinMgmt.insertJoin", paramMap);
	}
	
	/**
	 * 연구항목 조인 관리 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteJoin(Map<Object, Object> paramMap){
		return sqlSession.delete("joinMgmt.deleteJoin", paramMap);
	}
	
}
