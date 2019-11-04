package com.softcen.bigcen.med.research.casctrl.service;

import java.util.Map;

public interface ICasCtrlService {
	
	/**
	 * 환자선택
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object searchPatientSearchList(Map<Object,Object> paramMap) throws Exception;
	
	
	/**
	 * 연구항목조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object searchStudyItemTargetList(Map<Object,Object> paramMap) throws Exception;

}
