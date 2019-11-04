package com.softcen.bigcen.med.admin.commonCode.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

/**
 * 관리자 > 공통코드 관리 를 담당하는 DAO 
 * @author RedEye
 *
 */
@Repository(value="commonCodeMgmtDAO")
public class CommonCodeMgmtDAO extends BigcenMedAbstractMapperDAO{
	private static final Logger logger = LoggerFactory.getLogger(CommonCodeMgmtDAO.class);
	
	/**
	 * 그룹코드 전체 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectGroupCodeCount(Map<Object, Object> paramMap){
		return sqlSession.selectOne("commonCode.groupCodeCount", paramMap);
	}
	
	/**
	 * 그룹코드 목록 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectGroupCodeList(Map<Object, Object> paramMap){
		logger.debug("selectGroupCodeList >>>" + paramMap.toString());
		return sqlSession.selectList("commonCode.groupCodeList", paramMap);
	}
	
	/**
	 * 코드관리에서 사용 할 그룹코드 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> codeGroupCodeList(Map<Object, Object> paramMap){
		logger.debug("selectGroupCodeList >>>" + paramMap.toString());
		return sqlSession.selectList("commonCode.codeGroupCodeList", paramMap);
	}
	
	/**
	 * 그룹코드 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertGroupCode(Map<Object, Object> paramMap){
		return sqlSession.insert("commonCode.insertGroupCode", paramMap);
	}
	/**
	 * 그룹코드 수정
	 * @param paramMap
	 * @return
	 */
	public Object updateGroupCode(Map<Object, Object> paramMap){
		return sqlSession.update("commonCode.updateGroupCode", paramMap);
	}
	/**
	 * 그룹코드 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteGroupCode(Map<Object, Object> paramMap){
		return sqlSession.delete("commonCode.deleteGroupCode", paramMap);
	}
	/**
	 * 그룹코드 삭제 시 관련된 코드 리스트 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteCodeList(Map<Object, Object> paramMap){
		return sqlSession.insert("commonCode.deleteCodeList", paramMap);
	}
	/**
	 * 코드 전체 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectCodeCount(Map<Object, Object> paramMap){
		return sqlSession.selectOne("commonCode.codeCount", paramMap);
	}
	
	/**
	 * 코드 목록 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectCodeList(Map<Object, Object> paramMap){
		logger.debug("selectcodeList >>>" + paramMap.toString());
		logger.debug("selectcodeList >>>" + paramMap.get("COMM_GRP_SEQ"));
		return sqlSession.selectList("commonCode.codeList", paramMap);
	}
	
	/**
	 * 코드 순서 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> codeOrderList(Map<Object, Object> paramMap){
		return sqlSession.selectList("commonCode.codeOrderList", paramMap);
	}
	
	/**
	 * 코드 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertCode(Map<Object, Object> paramMap){
		return sqlSession.insert("commonCode.insertCode", paramMap);
	}
	/**
	 * 코드 수정(바뀔 SORT 번호)
	 * @param paramMap
	 * @return
	 */
	public Object updateChangeCode(Map<Object, Object> paramMap){
		return sqlSession.update("commonCode.updateChangeCode", paramMap);
	}
	/**
	 * 코드 수정(자기 SORT 번호)
	 * @param paramMap
	 * @return
	 */
	public Object updateCode(Map<Object, Object> paramMap){
		return sqlSession.update("commonCode.updateCode", paramMap);
	}
	/**
	 * 코드 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteCode(Map<Object, Object> paramMap){
		return sqlSession.delete("commonCode.deleteCode", paramMap);
	}
}
