package com.softcen.bigcen.med.main.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.main.dao.LogAccessDAO;

@Service(value="logAccessService")
public class LogAccessServiceImpl implements ILogAccessService{
	@Autowired
	private LogAccessDAO logAccessDAO;
	
	
	public Object insertLogAccess(Map<Object,Object> paramMap){
		return logAccessDAO.insertLogAccess(paramMap);
	}

}
