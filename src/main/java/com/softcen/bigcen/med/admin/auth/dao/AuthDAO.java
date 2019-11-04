package com.softcen.bigcen.med.admin.auth.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository(value="authDAO")
public class AuthDAO extends BigcenMedAbstractMapperDAO{
	
	/**
	 * 권한정보목록조회
	 * @param paramMap
	 * @return
	 */
	public List selectAutinxList(Map<Object,Object> paramMap){
		return sqlSession.selectList("auth.selectAutinxList", paramMap);
		
	}
	
	/**
	 * 사용자-권한매핑목록 조회
	 * @param paramMap
	 * @return
	 */
	public List selectPerAuthList(Map<Object,Object> paramMap){
		return sqlSession.selectList("auth.selectPerAuthList", paramMap);
		
	}
	
	/**
	 * 권한정보 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertAuthinx(Map<Object,Object> paramMap){
		int ret = sqlSession.insert("auth.insertAutinx", paramMap);
		
		return ret;
	}
	
	/**
	 * 권한정보 수정
	 * @param paramMap
	 * @return
	 */
	public Object updateAuthinx(Map<Object,Object> paramMap){
		int ret = sqlSession.insert("auth.updateAutinx", paramMap);
		
		return ret;
	}
	
	/**
	 * 권한삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteAuthinx(Map<Object,Object> paramMap) throws Exception{
		return  sqlSession.delete("auth.deleteAutinx", paramMap);
	}
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object insertPerAuth(Map<Object,Object> paramMap){
		List dsPerAuth = new ArrayList();
		
		dsPerAuth = (List)paramMap.get("dsPerAuthList");
		
		for(int i=0; i < dsPerAuth.size(); i++){
			Map<Object,Object> mapRow = (HashMap)dsPerAuth.get(i);
			
			mapRow.put("AUT_CODE", paramMap.get("AUT_CODE").toString());
			mapRow.put("CRT_ID", paramMap.get("CRT_ID").toString());
			mapRow.put("UDT_ID", paramMap.get("UDT_ID").toString());
			
			sqlSession.insert("auth.insertPerAuth", mapRow);
		}
		
		
		return 0;
	}
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object deletePerAuth(Map<Object,Object> paramMap){
		return sqlSession.delete("auth.deletePerAuth", paramMap);
		
		
	}
	
	
	public List selectMenuAuthList(Map<Object,Object> paramMap){
		return sqlSession.selectList("auth.selectMenuAuthList", paramMap);
		
	}
	
	
	public Object insertMenuAuth(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.insert("auth.insertMenuAuth", paramMap);
		
	}
	
	
	public Object deleteMenuAuth(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.insert("auth.deleteMenuAuth", paramMap);
		
	}
	
	public List selectReportMenuAuthList(Map<Object,Object> paramMap){
		return sqlSession.selectList("auth.selectReportMenuAuthList", paramMap);
		
	}

}
