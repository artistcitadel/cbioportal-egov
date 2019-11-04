package com.softcen.bigcen.med.rept.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.rept.dao.ReptDAO;

@Service(value = "menuMgmtService")
public class ReptServiceImpl extends BigcenMedAbstractServiceImpl implements IReptService {
	@Autowired
	private ReptDAO reptDAO;
	
	@Override
	public List<Object> selectReportMenuList(Map<Object, Object> paramMap) {
		return reptDAO.selectReportMenuList(paramMap);
	}
	
	@Override
	public List<Object> selectRGReportMenuList(Map<Object, Object> paramMap) {
		return reptDAO.selectRGReportMenuList(paramMap);
	}
	
	@Override
	public List<Object> selectReportSubMenuList(Map<Object, Object> paramMap) {
		return reptDAO.selectReportSubMenuList(paramMap);
	}

	@Override
	public List<Object> selectTableauInfo(Map<Object, Object> paramMap) {
		return reptDAO.selectTableauInfo(paramMap);
	}

}
