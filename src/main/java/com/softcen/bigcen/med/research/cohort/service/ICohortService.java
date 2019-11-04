package com.softcen.bigcen.med.research.cohort.service;

import java.util.Map;

public interface ICohortService {
	/**
	 * 코호트연구-환자선택조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object searchPatientSearchList(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 코호트연구-연구항목조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object searchStudyItemTargetList(Map<Object,Object> paramMap) throws Exception;
	

}
