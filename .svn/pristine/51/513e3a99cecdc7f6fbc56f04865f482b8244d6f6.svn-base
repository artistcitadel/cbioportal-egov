package com.softcen.bigcen.med.search.service;

import java.util.List;
import java.util.Map;

public interface ISearchService {
	/**
	 * 환자목록 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectPatSbstNoList(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 동의어 목록
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectSynonymList(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 서식지검색
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Map<Object,Object> searchRequest(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 환자별 서식지 검색
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Map<Object,Object> searchRequestByPatSbstNo(Map<Object,Object> paramMap) throws Exception;
	
	
	public List<String> typeahead(Map<Object,Object> paramMap) throws Exception;
	
	

}
