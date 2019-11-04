package com.softcen.bigcen.med.admin.dashBoard.service;

import java.util.List;
import java.util.Map;

public interface IDashBoardMgmtService {

	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object insertDashBoardMgmt(Map<Object,Object> paramMap);
	
	public List<Map<Object, Object>> selectDashBoardMgmt(Map<String, String> paramMap);
	
	public Object insertChartMgmt(Map<Object,Object> paramMap);
	
	public Object updateChartMgmt(Map<Object,Object> paramMap);
	
	public List<Map<Object, Object>> selectChartMgmt(Map<String, String> paramMap);
	
	public Object deleteChartMgmt(Map<Object,Object> paramMap);
	
	public Object orderChartMgmtUpDown(Map<Object,Object> paramMap);
	
	public List<Map<Object, Object>> selectChartSQL(Map<String, String> paramMap);

}
