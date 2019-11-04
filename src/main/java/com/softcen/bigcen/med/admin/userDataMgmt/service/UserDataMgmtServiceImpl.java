package com.softcen.bigcen.med.admin.userDataMgmt.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.admin.userDataMgmt.dao.UserDataMgmtDAO;

@Service(value="userDataMgmtService")
public class UserDataMgmtServiceImpl extends BigcenMedAbstractServiceImpl implements IUserDataMgmtService{
	
	@Autowired
	private UserDataMgmtDAO userDataMgmtDAO;
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectUserDataList(Map<String, Object> paramMap) throws Exception{
		int nTotalCnt = 0;
		
		Map<String,Object> countMap = (HashMap)userDataMgmtDAO.selectUserDataCount(paramMap);
		
		if(paramMap.get("draw") == null){
			paramMap.put("start", Integer.valueOf(0));
			paramMap.put("length", Integer.valueOf(countMap.get("CNT").toString()));
			resultMap.put("data", userDataMgmtDAO.selectUserDataList(paramMap));
			
		}else{
			resultMap.put("draw", paramMap.get("draw"));
			resultMap.put("recordsTotal", Integer.valueOf(countMap.get("CNT").toString()));
			resultMap.put("recordsFiltered", Integer.valueOf(countMap.get("CNT").toString()));
			resultMap.put("data", userDataMgmtDAO.selectUserDataList(paramMap));
		}
		
		
		return resultMap;
	}
	
	
	public Object selectUserDataTableSize(Map<String,Object> paramMap) throws Exception{
		paramMap.put("GV_DB_TYPE", this.getGvDbType());
		return userDataMgmtDAO.selectUserDataTableSize(paramMap);
	}
	
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object deleteUserData(Map<String, Object> paramMap) throws Exception{
		int ret = -1;
		//1.테이블 삭제		
		logger.debug("1.테이블삭제 - DROP TABLE");
		ret = (Integer)userDataMgmtDAO.deleteUserTable(paramMap);
		
		//2.메타삭제	
		logger.debug("2.메타삭제 - CC_ITEM_CONT_DATA_DETL");
		userDataMgmtDAO.deleteItemContDataDetl(paramMap);
		
		//3.테이블정보 삭제	
		logger.debug("3.메타삭제 - CC_ITEM_CONT_DATA");
		userDataMgmtDAO.deleteItemContData(paramMap);
		
		
		return 0;
	}

}
