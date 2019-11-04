package com.softcen.bigcen.med.research.crssec.service;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;

public interface ICrossSectionalStudyService {
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	//public Object selectItemCont(Map<Object,Object> paramMap) throws SQLException;
	
	
	
	/**
	 * 연구항목조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	/*public Object selectItemMgmtList(Map<Object,Object> paramMap) throws SQLException;*/
	
	/**
	 * 단면연구 환자선택 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object searchPatientSearchList(Map<Object,Object> paramMap) throws SQLException,Exception;
	
	/**
	 * 단면연구항목대상 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object searchStudyItemTargetList(Map<Object,Object> paramMap) throws Exception;
	
	
	
	
	
	//public Object selectItemContData(Map<Object,Object> paramMap) throws Exception;
	
	public Object selectDataColumnList(Map<Object,Object> paramMap) throws Exception;
	
	public Object selectDataResultList(Map<Object,Object> paramMap) throws Exception;
	
	public Object selectRegexSearchDataList(Map<Object,Object> paramMap) throws Exception;
	

}
