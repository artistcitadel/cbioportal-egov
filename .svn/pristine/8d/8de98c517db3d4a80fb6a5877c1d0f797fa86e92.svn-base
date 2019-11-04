package com.softcen.bigcen.med.research.approve.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.research.approve.dao.ApproveDAO;

@Service("approveService")
public class ApproveServiceImpl extends BigcenMedAbstractServiceImpl implements IApproveService{
	@Autowired
	private ApproveDAO approveDAO;
	
	public Object selectMySaveList(Map<Object, Object> paramMap){
		/*int nTotalCnt = 0;		
		
		nTotalCnt = (Integer)approveDAO.selectMySaveCount(paramMap);
		
		resultMap.put("draw", paramMap.get("draw"));
		resultMap.put("recordsTotal", nTotalCnt);
		resultMap.put("recordsFiltered", nTotalCnt);
		resultMap.put("data", approveDAO.selectMySaveList(paramMap));*/
		
		return approveDAO.selectMySaveList(paramMap);
	}
	
	@Override
	public Object insertPurposeData(Map<Object, Object> paramMap) {
		return approveDAO.insertPurposeData(paramMap);
	}
	
	@Override
	public Object delApproveData(Map<Object, Object> paramMap) {
		approveDAO.delApproveData(paramMap);
		
		return approveDAO.dropApproveDataTable(paramMap);
	}
	
	public Object selectRequestList(Map<Object, Object> paramMap){
		/*int nTotalCnt = 0;		
		
		nTotalCnt = (Integer)approveDAO.selectRequestCount(paramMap);
		
		resultMap.put("draw", paramMap.get("draw"));
		resultMap.put("recordsTotal", nTotalCnt);
		resultMap.put("recordsFiltered", nTotalCnt);
		resultMap.put("data", approveDAO.selectRequestList(paramMap));*/
		
		return approveDAO.selectRequestList(paramMap);
	}
	
	public Object selectDataColumnList(Map<Object,Object> paramMap) throws Exception{
		return approveDAO.selectDataColumnList(paramMap);		
	}
	
	public Object selectDataResultPeriodList(Map<Object,Object> paramMap) throws Exception{
		return approveDAO.selectDataResultPeriodList(paramMap);		
	}
	
	public Object selectDataResultList(Map<Object,Object> paramMap) throws Exception{
		return approveDAO.selectDataResultList(paramMap);		
	}
	
	public Object selectApproveCount() throws Exception{
		return approveDAO.selectApproveCount();		
	}
	
	public Object selectApproveList() throws Exception{
		return approveDAO.selectApproveList();		
	}
	
	public Object checkTable(Map<Object,Object> paramMap) throws Exception{
		return approveDAO.checkTable(paramMap);		
	}
	
}
