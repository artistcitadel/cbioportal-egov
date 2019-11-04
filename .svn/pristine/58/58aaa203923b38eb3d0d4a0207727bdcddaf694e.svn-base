package com.softcen.bigcen.med.main.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface IDashboardService {
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object selectDashboard(Map<Object, Object> paramMap);
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object selectDashboardChart(Map<Object, Object> paramMap);
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object selectDashboardBoard(Map<Object, Object> paramMap);
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object selectSvcStatus(Map<Object, Object> paramMap);
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object selectResearchTargetStat(Map<Object, Object> paramMap);
	
	
	public Object selectDashboardChartList(Map<Object, Object> paramMap) throws SQLException;
	
	public Object selectDashboardBoardList(Map<Object, Object> paramMap) throws SQLException;
	
	public Object selectDashboardBoardOneList(Map<Object, Object> paramMap) throws SQLException;
	
	public Object insertBoardData(Map<Object,Object> paramMap);
	
	public Object insertBoardFileData(Map<Object,Object> paramMap);
	
	public Object updateBoardData(Map<Object,Object> paramMap);
	
	public Object deleteBoardData(Map<Object,Object> paramMap);
	
	public Object selectBoardDataDetail(Map<Object, Object> paramMap) throws SQLException;
	
	public Object selectMySaveData(Map<Object, Object> paramMap) throws SQLException;

	public List<Map<Object, Object>> selectChartMgmt(Map<String, String> paramMap);
	
	public Object selectBoardDataDetailFile(Map<Object, Object> paramMap) throws SQLException;
	
	public Object deleteFile(Map<Object,Object> paramMap) throws Exception;
	
}
