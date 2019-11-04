package com.softcen.bigcen.med.main.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository(value="loginDAO")
public class LoginDAO extends BigcenMedAbstractMapperDAO{
	/*@Autowired
	private SqlSession sqlSession;*/
	
	/**
	 * 사용자 정보 조회
	 * @param paramMap
	 * @return
	 */
	public Object selectPerinx(Map<Object, Object> paramMap){
		Map<Object, Object> perinxMap = sqlSession.selectOne("cc_perinx.selectPerinx", paramMap);
		return perinxMap;
	}
	
	
	public Object changePerPass(Map<Object, Object> paramMap){
		//Map<Object, Object> resultMap = sqlSession.update("cc_perinx.updatePerinx", paramMap);
		return sqlSession.update("cc_perinx.updatePerinx", paramMap);
	}
	
	public Object updateUserPassword(Map userMap) {
		// TODO Auto-generated method stub
		return sqlSession.update("cc_perinx.updateUserPassword", userMap);
	}
	
	
	/**
	 * 경북대 - 최초 로그인 FLAG 값 업데이트
	 * @param paramMap
	 * @return
	 */
	public Object firstFlagUpdate(Map<Object, Object> paramMap){
		return sqlSession.update("cc_perinx.firstFlagUpdate", paramMap);
	}
	

}
