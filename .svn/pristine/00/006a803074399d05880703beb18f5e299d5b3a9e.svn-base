package com.softcen.bigcen.med.admin.ptsbsInsert.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.admin.auth.dao.AuthDAO;
import com.softcen.bigcen.med.admin.ptsbsInsert.dao.PtsbsMgmtDAO;

@Service(value="ptsbsMgmtService")
public class PtsbsMgmtServiceImpl implements IPtsbsMgmtService{
	
	private static final Logger logger = LoggerFactory.getLogger(PtsbsMgmtServiceImpl.class);
	
	@Autowired
	private PtsbsMgmtDAO ptsbsMgmtDAO;
	
	
	@SuppressWarnings("unchecked")
	@Override
	public Object selectPtsbsMapping(List<Map<Object, Object>> paramMap) {
		// TODO Auto-generated method stub
		List resultList = new ArrayList();
		Map<Object,Object> resMap = new HashMap<Object,Object>();

		int cnt = 0;
		
		for(int i=0; i<paramMap.size(); i++) {
			Map<Object,Object> tmpMap = new HashMap<Object,Object>();
			Map<Object,Object> resultMap = new HashMap<Object,Object>();
			Map<Object,Object> checkMap = new HashMap<Object,Object>();
			
			tmpMap = paramMap.get(i);
			
			resultMap = ptsbsMgmtDAO.selectPtsbsMapping(tmpMap);
			
			if(resultMap != null){
				resultMap.put("PAT_LAB_NO", tmpMap.get("PAT_LAB_NO"));
				checkMap = (HashMap)ptsbsMgmtDAO.selectCheckPtsbsMap(resultMap);
			
				if(checkMap == null) {
					ptsbsMgmtDAO.insertCheckPtsbsMap(resultMap);
				}
				else {
					ptsbsMgmtDAO.updateCheckPtsbsMap(resultMap);
				}
				
				cnt++;
				resultList.add(resultMap);
			}		
		}
			
		resMap.put("PtsbsMappingList", resultList);
		resMap.put("success", cnt);
		resMap.put("total", paramMap.size());

		return resMap;
	}


	@Override
	public Object selectCheckPtsbsMapAll(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		return ptsbsMgmtDAO.selectCheckPtsbsMapAll(paramMap);
	}
	
	
}
