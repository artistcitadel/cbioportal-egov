package com.softcen.bigcen.med.rept.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository(value="reptDAO")
public class ReptDAO extends BigcenMedAbstractMapperDAO {
	private static final Logger logger = LoggerFactory.getLogger(ReptDAO.class);
	
	public List<Object> selectReportMenuList(Map<Object, Object> paramMap) {
		return sqlSession.selectList("reptMgmt.selectReportMenuList", paramMap);
	}
	
	public List<Object> selectRGReportMenuList(Map<Object, Object> paramMap) {
		return sqlSession.selectList("reptMgmt.selectRGReportMenuList", paramMap);
	}
	public List<Object> selectReportSubMenuList(Map<Object, Object> paramMap){
		return sqlSession.selectList("reptMgmt.selectReportSubMenuList", paramMap);
	}
	
	public List<Object> selectTableauInfo(Map<Object, Object> paramMap){
		return sqlSession.selectList("reptMgmt.selectTableauInfo", paramMap);
	}
}
