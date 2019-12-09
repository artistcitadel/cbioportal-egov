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
	

	
}
