package com.softcen.bigcen.med.cohortcpm.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface ICohortcpmService {
	
	public Object selectCohortContList(Map<Object, Object> paramMap);

	public Object selectCohortTable(Map<Object, Object> paramMap);
	
	public Object selectCohortPatientDataList(Map<Object, Object> paramMap);
	
	public Object selectCohortFilteringTable(Map<Object, Object> paramMap);
	
	public void updateCohortPatientList(Map<Object, Object> paramMap);
	
	public Object selectContChartList(Map<Object, Object> paramMap);
}
