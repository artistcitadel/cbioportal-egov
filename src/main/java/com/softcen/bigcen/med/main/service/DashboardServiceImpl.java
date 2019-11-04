package com.softcen.bigcen.med.main.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.main.dao.DashboardDAO;

@Service("dashboardService")
public class DashboardServiceImpl extends BigcenMedAbstractServiceImpl implements IDashboardService{
	@Autowired
	private DashboardDAO dashboardDAO;
	
	@Transactional(readOnly=true,propagation=Propagation.REQUIRED)
	public Object selectDashboard(Map<Object, Object> paramMap){
		return dashboardDAO.selectDashboard(paramMap);
		
	}
	
	public Object selectDashboardChart(Map<Object, Object> paramMap){
		return dashboardDAO.selectDashboardChart(paramMap);
	}
	
	public Object selectDashboardBoard(Map<Object, Object> paramMap){
		return dashboardDAO.selectDashboardBoard(paramMap);
	}
	
	
	public Object selectSvcStatus(Map<Object, Object> paramMap){
		paramMap.put("GV_DB_TYPE", this.getGvDbType());
		return dashboardDAO.selectSvcStatus(paramMap);
	}
	
	
	public Object selectResearchTargetStat(Map<Object, Object> paramMap){
		return dashboardDAO.selectResearchTargetStat(paramMap);
	}
	
	
	public Object selectDashboardChartList(Map<Object, Object> paramMap) throws SQLException{
		
		
		return dashboardDAO.selectDashboardChartList(paramMap);
		
	}
	
	public Object selectDashboardBoardList(Map<Object, Object> paramMap) throws SQLException{
		
		
		return dashboardDAO.selectDashboardBoardList(paramMap);
		
	}
	
	public Object selectDashboardBoardOneList(Map<Object, Object> paramMap) throws SQLException{
		int nTotalCnt = 0;		
		
		nTotalCnt = (Integer)dashboardDAO.selectDashboardBoardCount(paramMap);
		
		int BOARD_SEQ = Integer.parseInt((String) paramMap.get("BOARD_SEQ"));
		
		resultMap.put("draw", paramMap.get("draw"));
		resultMap.put("recordsTotal", nTotalCnt);
		resultMap.put("recordsFiltered", nTotalCnt);
		resultMap.put("data", dashboardDAO.selectDashboardBoardList(paramMap));
		
		
		return resultMap;
		
	}
	
	@Override
	public Object insertBoardData(Map<Object, Object> paramMap) {
		int insertBoardData = (Integer) dashboardDAO.insertBoardData(paramMap);
		
		paramMap.put("DOCUMENT_SEQ", paramMap.get("SEQ"));
		
		return insertBoardData;
	}
	
	@Override
	public Object insertBoardFileData(Map<Object, Object> paramMap) {
		return dashboardDAO.insertBoardFileData(paramMap);
	}
	
	@Override
	public Object updateBoardData(Map<Object, Object> paramMap) {
		return dashboardDAO.updateBoardData(paramMap);
	}
	
	@Override
	public Object deleteBoardData(Map<Object, Object> paramMap) {
		return dashboardDAO.deleteBoardData(paramMap);
	}
	
	public Object selectBoardDataDetail(Map<Object, Object> paramMap) throws SQLException{		
		return dashboardDAO.selectBoardDataDetail(paramMap);		
	}
	
	public Object selectBoardDataDetailFile(Map<Object, Object> paramMap) throws SQLException{		
		return dashboardDAO.selectBoardDataDetailFile(paramMap);		
	}
	
	public Object selectMySaveData(Map<Object, Object> paramMap) throws SQLException{		
		return dashboardDAO.selectMySaveData(paramMap);		
	}
	
	@Override
	public List<Map<Object, Object>> selectChartMgmt(Map<String, String> paramMap){
		return dashboardDAO.selectChartMgmt(paramMap);
	}
	
	@Override
	public Object deleteFile(Map<Object, Object> paramMap) {
		return dashboardDAO.deleteFile(paramMap);
	}
}
