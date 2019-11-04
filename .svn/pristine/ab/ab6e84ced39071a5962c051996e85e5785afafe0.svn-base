package com.softcen.bigcen.med.admin.board.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.admin.log.dao.LogMgmtDAO;

@Repository(value="boardMgmtDAO")
public class BoardMgmtDAO extends BigcenMedAbstractMapperDAO{
	
	private static final Logger logger = LoggerFactory.getLogger(LogMgmtDAO.class);
	
	/*@Autowired
	private SqlSession sqlSession;*/

	/**
	 * 게시판 관리 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertBoardMgmt(Map<Object, Object> paramMap) {
		int ret = sqlSession.insert("boardMgmt.insertBoardMgmt", paramMap);
		
		return ret;
	}
	
	/**
	 * 게시판 관리 리스트
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectBoardMgmt(Map<String, String> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("boardMgmt.selectBoardMgmtList", paramMap);
		
	}
	
	/**
	 * 게시판 관리 수정
	 * @param paramMap
	 * @return
	 */
	public Object updateBoardMgmt(Map<Object, Object> paramMap) {
		int ret = sqlSession.update("boardMgmt.updateBoardMgmt", paramMap);
		
		return ret;
	}
	
	/**
	 * 게시판 관리 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteBoardMgmt(Map<Object, Object> paramMap) {
		int ret = sqlSession.delete("boardMgmt.deleteBoardMgmt", paramMap);
		
		return ret;
	}
	
	
	/**
	 * 게시판 자기 order 번호 변경
	 * @param paramMap
	 * @return
	 */
	public Object orderBoardMgmtUp(Map<Object, Object> paramMap) {
		int ret = sqlSession.update("boardMgmt.orderBoardMgmtUp", paramMap);
		
		return ret;
	}
	
	/**
	 * 게시판 바뀔 order 번호 변경
	 * @param paramMap
	 * @return
	 */
	public Object orderBoardMgmtDown(Map<Object, Object> paramMap) {
		int ret = sqlSession.update("boardMgmt.orderBoardMgmtDown", paramMap);
		
		return ret;
	}
	

}
