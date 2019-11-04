package com.softcen.bigcen.med.research.dataDownload.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.research.dataDownload.dao.DataDownloadDAO;

@Service("dataDownloadService")
public class DataDownloadServiceImpl extends BigcenMedAbstractServiceImpl implements IDataDownloadService{
	@Autowired
	private DataDownloadDAO dataDownloadDAO;
	
	@Override
	public Object selectMyApplyList(Map<Object, Object> paramMap){
		/*int nTotalCnt = 0;		
		
		nTotalCnt = (Integer)dataDownloadDAO.selectMyApplyCount(paramMap);
		
		resultMap.put("draw", paramMap.get("draw"));
		resultMap.put("recordsTotal", nTotalCnt);
		resultMap.put("recordsFiltered", nTotalCnt);
		resultMap.put("data", dataDownloadDAO.selectMyApplyList(paramMap));*/
		
		return dataDownloadDAO.selectMyApplyList(paramMap);
	}
	
	@Override
	public Object dataDownload(Map<Object, Object> paramMap){			
		return dataDownloadDAO.dataDownload(paramMap);
	}
	
	@Override
	public Object dataDownloadColumn(Map<Object, Object> paramMap){			
		return dataDownloadDAO.dataDownloadColumn(paramMap);
	}
	
}
