package com.softcen.bigcen.med.main.dao;

import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository(value="logAccessDAO")
public class LogAccessDAO extends BigcenMedAbstractMapperDAO{
	
	/*@Autowired
	SqlSession sqlSession;*/
	
	public Object insertLogAccess(Map<Object,Object> paramMap){
		int ret = sqlSession.insert("cc_log_access.insertLogAccess", paramMap);
		return ret;
	}

}
