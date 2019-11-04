package com.softcen.bigcen.med.common.sys.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;

public interface ISysService {
	/**
	 * 연구항목분류 트리 조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemCateTree(Map<Object,Object> paramMap) throws Exception;
	
	
	/**
	 * 공통코드 목록조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public List selectCommonCodeList(Map<Object,Object> paramMap) throws SQLException;
	
	/**
	 * 연구항목조건공유 조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemCont(Map<Object,Object> paramMap) throws SQLException;
	
	
	public Object selectItemContData(Map<Object,Object> paramMap) throws Exception;
	
	public Object selectDataColumnList(Map<Object,Object> paramMap) throws Exception;
	
	public Object selectDataResultList(Map<Object,Object> paramMap) throws Exception;
	
	
	/**
	 * 연구항목 트리조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemMgmtTreeList(Map<Object,Object> paramMap) throws SQLException;
	
	public Object selectItemContTreeList(Map<Object,Object> paramMap) throws SQLException;
	
	/**
	 * 연구항목 목록 조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemMgmtList(Map<Object,Object> paramMap) throws Exception;
	
	
	/**
	 * 연구항목 삭제
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object deleteItemMgmt(Map<Object,Object> paramMap) throws Exception;
	
	
	/**
	 * 연구항목 조건정보 목록 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object getItemContDetlList(@RequestBody Map<Object,Object> paramMap) throws Exception;
	
	
	public Object selectExistSchemaTableList(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 공통코드목록조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object getCommonCodeList(@RequestBody Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object updateItemMgmtSearchCnt(Map<Object,Object> paramMap) throws Exception;
	
	

}
