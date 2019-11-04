package com.softcen.bigcen.med.admin.userDataMgmt.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.admin.log.dao.LogMgmtDAO;
import com.vertica.util.ServerException;

@Repository(value="userDataMgmtDAO")
public class UserDataMgmtDAO extends BigcenMedAbstractMapperDAO{
	
	private static final Logger logger = LoggerFactory.getLogger(LogMgmtDAO.class);
	
	public Object selectUserDataCount(Map<String, Object> paramMap){
		return sqlSession.selectOne("sys_user_data_mgmt.selectUserDataCount", paramMap);
	}
	
	public List<Map<String,Object>> selectUserDataList(Map<String, Object> paramMap){
		return sqlSession.selectList("sys_user_data_mgmt.selectUserDataList", paramMap);
	}
	
	public Object selectUserDataTableSize(Map<String,Object> paramMap) {
		return sqlSessionVerticaA.selectList("sys_user_data_mgmt.selectUserDataTableSize", paramMap);
	}
	
	public Object deleteUserTable(Map<String, Object> paramMap) {
		int ret = -1;
		try{
			ret = (Integer)sqlSessionVerticaA.delete("sys_user_data_mgmt.dropUserDataTable", paramMap);
			
		}catch(DataAccessException dae){
			ServerException se = (ServerException)dae.getRootCause();
			logger.error("error message : " + se.getMessage());
			logger.error("error code : " + se.getError().getErrorCode());
			
			ret = se.getError().getErrorCode();
			
		}
		
		return ret;
	}
	
	public Object deleteItemContDataDetl(Map<String, Object> paramMap){
		return sqlSession.selectList("sys_user_data_mgmt.deleteItemContDataDetl", paramMap);
	}
	
	public Object deleteItemContData(Map<String, Object> paramMap){
		return sqlSession.selectList("sys_user_data_mgmt.deleteItemContData", paramMap);
	}
	

}
