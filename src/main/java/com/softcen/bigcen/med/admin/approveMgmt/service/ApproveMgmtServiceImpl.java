package com.softcen.bigcen.med.admin.approveMgmt.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.admin.approveMgmt.dao.ApproveMgmtDAO;

@Service("approveMgmtService")
public class ApproveMgmtServiceImpl extends BigcenMedAbstractServiceImpl implements IApproveMgmtService{
	@Autowired
	private ApproveMgmtDAO approveMgmtDAO;
	
	@Override
	public Object updateApproveData(Map<Object, Object> paramMap) {
		return approveMgmtDAO.updateApproveData(paramMap);
	}
	
	public Object selectRequestList(Map<Object, Object> paramMap){
		int nTotalCnt = 0;		
		
		nTotalCnt = (Integer)approveMgmtDAO.selectRequestCount(paramMap);
		
		resultMap.put("draw", paramMap.get("draw"));
		resultMap.put("recordsTotal", nTotalCnt);
		resultMap.put("recordsFiltered", nTotalCnt);
		resultMap.put("data", approveMgmtDAO.selectRequestList(paramMap));
		
		return resultMap;
	}
}
