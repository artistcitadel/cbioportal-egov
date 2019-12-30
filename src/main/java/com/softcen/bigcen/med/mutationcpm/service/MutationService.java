package com.softcen.bigcen.med.mutationcpm.service;

import java.util.List;
import java.util.Map;

public interface MutationService {
	/**
	 * Mutation 목록 조회
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> getMutationList(Map<String,Object> params) throws Exception;
	
	
	/**
	 * 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> getOncoPrintList(Map<String,Object> params) throws Exception;
	
	/**
	 * 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> getOncoPrintPatList(Map<String,Object> params) throws Exception;
	
	
	/**
	 * 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> getOncoPrintCancerList(Map<String,Object> params) throws Exception;
	
	
	/**
	 * getClinicalTrackList
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> getClinicalTrackList(Map<String,Object> params) throws Exception;

}
