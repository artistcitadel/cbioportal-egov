package com.softcen.bigcen.med.admin.dashBoard.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.admin.dashBoard.dao.DashBoardMgmtDAO;

@Service(value="dashBoardMgmtService")
public class DashBoardMgmtServiceImpl implements IDashBoardMgmtService{
	
	@Autowired
	private DashBoardMgmtDAO dashBoardMgmtDAO;

	@Override
	public Object insertDashBoardMgmt(Map<Object, Object> paramMap) {
		return dashBoardMgmtDAO.insertDashBoardMgmt(paramMap);
	}
	
	public List<Map<Object, Object>> selectDashBoardMgmt(Map<String, String> paramMap){
		return dashBoardMgmtDAO.selectDashBoardMgmt(paramMap);
	}
	
	@Override
	public Object insertChartMgmt(Map<Object, Object> paramMap) {
		return dashBoardMgmtDAO.insertChartMgmt(paramMap);
	}
	
	@Override
	public Object updateChartMgmt(Map<Object, Object> paramMap) {
		return dashBoardMgmtDAO.updateChartMgmt(paramMap);
	}
	
	@Override
	public List<Map<Object, Object>> selectChartMgmt(Map<String, String> paramMap){
		return dashBoardMgmtDAO.selectChartMgmt(paramMap);
	}
	
	@Override
	public Object deleteChartMgmt(Map<Object, Object> paramMap) {				
		return dashBoardMgmtDAO.deleteChartMgmt(paramMap);
	}
	
	@Override
	public Object orderChartMgmtUpDown(Map<Object, Object> paramMap) {
		int ret = 0;
		
		//자기 order 번호 변경
		ret = (Integer)dashBoardMgmtDAO.orderChartMgmtUp(paramMap);
		
		//바뀔 order 번호 변경
		dashBoardMgmtDAO.orderChartMgmtDown(paramMap);
				
		return ret;
	}
	
	public List<Map<Object, Object>> selectChartSQL(Map<String, String> paramMap){
		return dashBoardMgmtDAO.selectChartSQL(paramMap);
	}

}
