package com.softcen.bigcen.med.admin.log.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.admin.log.dao.LogMgmtDAO;

@Service(value="logMgmtService")
public class LogMgmtServiceImpl extends BigcenMedAbstractServiceImpl implements ILogMgmtService {
	@Autowired
	private LogMgmtDAO logMgmtDAO;
	
	/**
	 * 
	 */
	public Object selectWebLogList(Map<Object, Object> paramMap){
		int nTotalCnt = 0;		
		
		nTotalCnt = (Integer)logMgmtDAO.selectWebLogCount(paramMap);
		
		resultMap.put("draw", paramMap.get("draw"));
		resultMap.put("recordsTotal", nTotalCnt);
		resultMap.put("recordsFiltered", nTotalCnt);
		resultMap.put("data", logMgmtDAO.selectWebLogList(paramMap));
		
		return resultMap;
	}
	
	public Object selectEtlLogList(Map<Object, Object> paramMap) throws Exception{
		int nTotalCnt = 0;		
		
		nTotalCnt = (Integer)logMgmtDAO.selectEtlLogCount(paramMap);
		
		resultMap.put("draw", paramMap.get("draw"));
		resultMap.put("recordsTotal", nTotalCnt);
		resultMap.put("recordsFiltered", nTotalCnt);
		resultMap.put("data", logMgmtDAO.selectEtlLogList(paramMap));
		
		return resultMap;
	}
	

}
