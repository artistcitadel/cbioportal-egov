package com.softcen.bigcen.med.admin.synonymDic.service;

import java.util.List;
import java.util.Map;

public interface ISynonymService {
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public List selectSynonymCategoryList(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public List selectSynonymList(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public List selectSynonymTermListByRepTerm(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object upsertSynonym(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object deleteSynonymTerm(Map<Object,Object> paramMap) throws Exception;
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object insertSynonym(Map<Object,Object> paramMap) throws Exception;

}
