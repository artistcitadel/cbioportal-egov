package com.softcen.bigcen.med.common.sys.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import twitter4j.JSONArray;
import twitter4j.JSONException;
import twitter4j.JSONObject;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.common.sys.dao.ModalDAO;

@Service("modalService")
public class ModalServiceImpl extends BigcenMedAbstractServiceImpl implements IModalService{
	@Autowired
	private ModalDAO modalDAO;
	
	/**
	 * 
	 */
	
	public List<Map<Object, Object>> selectDiseaseCodeW(Map<String, String> paramMap) throws Exception{
		return modalDAO.selectDiseaseCodeW(paramMap);
	}
	
	public List<Map<Object, Object>> selectDiseaseParentCodeListW(Map<String, String> paramMap) throws Exception{
		return modalDAO.selectDiseaseParentCodeListW(paramMap);
	}
	
	public Object selectDiseaseCodeTreeW(Map<Object,Object> paramMap) throws Exception{
		List<Object> treeList = new ArrayList<Object>();
		
		treeList = (ArrayList)modalDAO.selectDiseaseCodeTreeW(paramMap);
		
		logger.debug(treeList.toString());
		return treeList;
		
	}
	
	public Object selectSearchSelectItemContDetlWList(Map<Object,Object> paramMap) throws SQLException{
		return modalDAO.selectSearchSelectItemContDetlWList(paramMap);
	}
	
	@Override
	public Object insertDiseaseCodeForTreeW(Map<Object, Object> paramMap) throws SQLException{
		String insertMode = (String) paramMap.get("insertMode");
		int result = 0;
		
		int maxSeq = modalDAO.selectLovMaxSeq(paramMap);
		paramMap.put("maxSeq", maxSeq);
		
		if (insertMode.equals("P") || insertMode.equals("K")) {
			String jsonArrData = paramMap.get("data").toString();
			String instcdFlag = "N";
			try {
				JSONArray jArr = new JSONArray(jsonArrData);
				
				for (int i = 0; i < jArr.length(); i++) {
					JSONObject obj = new JSONObject(jArr.get(i).toString());
					Iterator it = obj.keys();
					
					while (it.hasNext()) {
						String key = (String) it.next();
						String value = obj.getString(key);
						if (key.equals("병원구분코드")) {
							paramMap.put("INSTCD", value.trim());
						} else if (key.contains("코드")) {
							paramMap.put("code", value.trim());
						} else if (key.equals("한글명")) {
							paramMap.put("knam", value);
						} else if (key.equals("영문명")) {
							paramMap.put("enam", value);
						}
					}
					
					result = (Integer)modalDAO.insertDiseaseCodeForTreeW(paramMap);
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
			
			//modalDAO.insertDiseaseCodeForTreeW(paramMap);
		} else if (insertMode.equals("D") || insertMode.equals("A") || insertMode.equals("G") || insertMode.equals("J")) {
			result = (Integer)modalDAO.insertDiseaseShareCodeForTreeW(paramMap);
		}
		
		return result;
	}
	
	@Override
	public Object updateDiseaseCodeForTreeW(Map<Object, Object> paramMap) throws SQLException{
		String insertMode = (String) paramMap.get("insertMode");
		int result = 0;
		
		try {
			modalDAO.deleteDiseaseCodeForTreeW(paramMap);
			
			String jsonArrData = paramMap.get("data").toString();
			
			JSONArray jArr = new JSONArray(jsonArrData);
			
			for (int i = 0; i < jArr.length(); i++) {
				JSONObject obj = new JSONObject(jArr.get(i).toString());
				Iterator it = obj.keys();
				
				while (it.hasNext()) {
					String key = (String) it.next();
					String value = obj.getString(key);
					if (key.equals("병원구분코드")) {
						paramMap.put("INSTCD", value.trim());
					} else if (key.contains("코드")) {
						paramMap.put("code", value.trim());
					} else if (key.equals("한글명")) {
						paramMap.put("knam", value);
					} else if (key.equals("영문명")) {
						paramMap.put("enam", value);
					}
				}
				result = (Integer)modalDAO.insertDiseaseCodeForTreeW(paramMap);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		
		return result;
	}
	
	@Override
	public Object deleteDiseaseCodeForTreeW(Map<Object, Object> paramMap) throws Exception{
		return modalDAO.deleteDiseaseCodeForTreeW(paramMap);
	}
	
	public List<Map<Object, Object>> selectSelectBoxP(Map<String, String> paramMap) throws Exception{
		return modalDAO.selectSelectBoxP(paramMap);
	}
	
	public List<Map<Object, Object>> selectCodeListP(Map<String, String> paramMap) throws Exception{
		return modalDAO.selectCodeListP(paramMap);
	}
	
	public List<Map<Object, Object>> selectDiseaseParentCodeListP(Map<String, String> paramMap) throws Exception{
		return modalDAO.selectDiseaseParentCodeListP(paramMap);
	}
	
	public List<Map<Object, Object>> selectCommonCodeList(Map<String, String> paramMap) throws Exception{
		return modalDAO.selectCommonCodeList(paramMap);
	}
	
	public List<Map<Object, Object>> selectUpperCommonCodeList(Map<String, String> paramMap){
		return modalDAO.selectUpperCommonCodeList(paramMap);
	}
	
	public List<Map<Object, Object>> selectCommonCodeList_3HT_MR_EDIT(Map<String, String> paramMap) throws Exception{
		return modalDAO.selectCommonCodeList_3HT_MR_EDIT(paramMap);
	}
	
	public List<Map<Object, Object>> selectCommonCodeList_3HT_MR_LIST(Map<String, String> paramMap) throws Exception{
		return modalDAO.selectCommonCodeList_3HT_MR_LIST(paramMap);
	}
	
	public List<Map<Object, Object>> selectCommonCodeList_3HT_MR_CHECK(Map<String, String> paramMap) throws Exception{
		return modalDAO.selectCommonCodeList_3HT_MR_CHECK(paramMap);
	}
	
	public List<Map<Object, Object>> selectKeyWordCodeList(Map<String, String> paramMap){
		return modalDAO.selectKeyWordCodeList(paramMap);
	}
	
	public List<Map<Object, Object>> selectKeyWordCodeDetlList(Map<String, String> paramMap){
		return modalDAO.selectKeyWordCodeDetlList(paramMap);
	}
	
}
