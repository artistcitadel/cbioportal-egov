package com.softcen.bigcen.med.admin.auth.service;

import java.util.List;
import java.util.Map;

public interface IAuthService {
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public List selectAutinxList(Map<Object,Object> paramMap);
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public List selectPerAuthList(Map<Object,Object> paramMap);
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object insertAuthinx(Map<Object,Object> paramMap);
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object updateAuthinx(Map<Object,Object> paramMap);
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object deleteAuthinx(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object insertPerAuth(Map<Object,Object> paramMap);
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object deletePerAuth(Map<Object,Object> paramMap);
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public List selectMenuAuthList(Map<Object,Object> paramMap);
	
	public Object saveMenuAuth(Map<Object,Object> paramMap) throws Exception;
	
	public List selectReportMenuAuthList(Map<Object,Object> paramMap);

}
