package com.softcen.bigcen.med.admin.user.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository(value="userDAO")
public class UserDAO extends BigcenMedAbstractMapperDAO{
	private static final Logger logger = LoggerFactory.getLogger(UserDAO.class);
	
	/*@Autowired
	private SqlSession sqlSession;*/
	
	/**
	 * 사용자 전체 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectPerinxCount(Map<Object, Object> paramMap){
		return sqlSession.selectOne("user.selectPerInxCount", paramMap);
		
	}
	
	/**
	 * 사용자 정보 목록 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectPerinxList(Map<Object, Object> paramMap){
		
		Map<String,String> paramMap2 = (HashMap)paramMap;
		paramMap2.put("SEARCH_INSTCD_YN", "Y");
		
		return sqlSession.selectList("user.selectPerInxList", paramMap2);
		
	}
	
	/**
	 * 사용자 정보 수정
	 * @param paramMap
	 * @return
	 */
	public Object updatePerinx(Map<Object, Object> paramMap){
		return sqlSession.update("user.updatePerInx", paramMap);
	}
	
	
	/**
	 * 사용자 정보 목록 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectPerinxAllList(Map<Object, Object> paramMap){
		return sqlSession.selectList("user.selectPerinxAllList", paramMap);
		
	}
	
}
