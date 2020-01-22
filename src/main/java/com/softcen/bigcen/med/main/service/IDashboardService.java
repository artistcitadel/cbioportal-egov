package com.softcen.bigcen.med.main.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface IDashboardService {
	
	public void deleteMycohortCont(Map<Object, Object> paramMap) throws Exception;
	
	
	public void updateDashboardTabNo(Map<Object, Object> paramMap)  throws Exception;
	
	public Object selectSavedCohortList(Map<Object, Object> paramMap) throws Exception;
	
	public Object loadselectedCohort(Map<Object, Object> paramMap) throws Exception;
	
	public Object selectCohortAnalysisPatno(Map<Object, Object> paramMap) throws Exception;
	
	public Object selectCohortAnalysisPatnoByNo(Map<Object, Object> paramMap) throws Exception;
	
	public Object selectPatnoResultCheck(Map<Object, Object> paramMap) throws Exception;
	
	public Object selectReschPatnoResultCheck(Map<Object, Object> paramMap) throws Exception;
	
	public Object selectMainPatientChart(Map<Object, Object> paramMap) throws Exception;
	
	public Object selectCateOncotreeList(Map<Object, Object> paramMap) throws Exception;

	public Object insertCohortItemCont(Map<Object, Object> paramMap) throws Exception;
	
	public Object selectfilterApply(Map<Object, Object> paramMap) throws Exception;

	public Object selectDashboardState(Map<Object, Object> paramMap) throws Exception;
	
	public Object loadselectedChartDefault(Map<Object, Object> paramMap) throws Exception;
	
	public Object loadselectedChartFilter(Map<Object, Object> paramMap) throws Exception;
	
	public Object loadselectedChart(Map<Object, Object> paramMap) throws Exception;
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object selectDashboard(Map<Object, Object> paramMap) throws Exception;
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object selectDashboardChart(Map<Object, Object> paramMap) throws Exception;
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object selectDashboardBoard(Map<Object, Object> paramMap) throws Exception;
	
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
	public Object selectDashboardCohortDetlList(Map<Object, Object> paramMap);
	
	public Object selectResearchTargetStat(Map<Object, Object> paramMap);
	
	public Object selectDashboardCohortList(Map<Object, Object> paramMap);
	
	public Object selectDashboardChartList(Map<Object, Object> paramMap);
	
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
