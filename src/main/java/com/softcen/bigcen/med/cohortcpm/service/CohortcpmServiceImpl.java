package com.softcen.bigcen.med.cohortcpm.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.cohortcpm.dao.CohortcpmDAO;
import com.softcen.bigcen.med.main.dao.DashboardDAO;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;

@Service("cohortcpmService")
public class CohortcpmServiceImpl extends BigcenMedAbstractServiceImpl implements ICohortcpmService{
	@Autowired
	private CohortcpmDAO cohortcpm;

	@Override
	public Object selectCohortContList(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		return cohortcpm.selectCohortContList(paramMap);
	}

	@Override
	public Object selectCohortTable(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		
		String tableNM = "P"+paramMap.get("PER_CODE").toString();
		
		StringBuffer sbQuery = new StringBuffer();
		sbQuery.append(SQL.SEPERATE + SQL.SELECT + "RESCH_PAT_ID");
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + "pmsdata." + tableNM);
		sbQuery.append(SQL.SEPERATE + SQL.WHERE);
		sbQuery.append(SQL.SEPERATE + "1=1");
		sbQuery.append(SQL.SEPERATE + SQL.AND + "DELETE_YN = 'N'");
		
		StringBuffer sbQueryAll = new StringBuffer();
		sbQueryAll.append(SQL.SEPERATE + SQL.SELECT + "RESCH_PAT_ID , DELETE_YN" );
		sbQueryAll.append(SQL.SEPERATE + SQL.FROM);
		sbQueryAll.append(SQL.SEPERATE + "pmsdata." + tableNM);
		sbQueryAll.append(SQL.SEPERATE + SQL.WHERE);
		sbQueryAll.append(SQL.SEPERATE + "1=1");
		
		paramMap.put("CohortTableQuery", sbQuery);
		
		Map<String,Object> resultMap = new HashMap<String,Object>();
		resultMap.put("CohortTableQuery", sbQuery);
		resultMap.put("CohortTableAllQuery", sbQueryAll);

		resultMap.put("selectCohortTable", cohortcpm.selectCohortTable(paramMap));
		
		return resultMap;
	}

	@Override
	public Object selectCohortFilteringTable(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		
		return cohortcpm.selectCohortTable(paramMap);
	}
	
	@Override
	public Object selectCohortPatientDataList(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		String tableName = "pmsdata.P" + paramMap.get("PER_CODE").toString();
		
		paramMap.put("TABLE",paramMap.get("SUBQUERY"));
		paramMap.put("TABLENAME", tableName);
		return cohortcpm.selectCohortPatientDataList(paramMap);
	}

	@Override
	public void updateCohortPatientList(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		cohortcpm.updateCohortPatientList(paramMap);
	}

	@Override
	public Object selectContChartList(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		return cohortcpm.selectContChartList(paramMap);
	}
	

	
}
