package com.softcen.bigcen.med.admin.researchItem.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;

public interface IResearchItemService {
	public Object selectItemCateList(Map<Object,Object> paramMap);
	public Object selectItemCateDetlList(Map<Object,Object> paramMap);
	public Object insertItemCate(Map<Object,Object> paramMap);
	public Object updateItemCate(Map<Object,Object> paramMap);
	public Object deleteItemCate(Map<Object,Object> paramMap);
	public Object insertItemCateDetl(Map<Object,Object> paramMap) throws Exception;
	public Object updateItemCateDetl(Map<Object,Object> paramMap) throws Exception;
	public Object deleteItemCateDetl(Map<Object,Object> paramMap);
	
	public Object deleteItemMgmt(Map<Object,Object> paramMap);
	public List<Map<Object,Object>> selectCatalogSchemaList(Map<Object,Object> paramMap);
	public List<Map<Object,Object>> selectCatalogTableList(Map<Object,Object> paramMap);
	public List<Map<Object,Object>> selectCatalogColumnList(Map<Object,Object> paramMap);
	public Object insertItemMgmt(Map<Object,Object> paramMap);
	public List<Map<Object,Object>> selectItemMgmtList(Map<Object,Object> paramMap);
	public Map<Object,Object> selectItemMgmtView(Map<Object,Object> paramMap);
	public Object updateItemMgmt(Map<Object,Object> paramMap) throws Exception;
	public List<Map<Object,Object>> selectCatalogColumnDateList(Map<Object,Object> paramMap);
	
	public Object selectItemMgmtTableList(Map<Object,Object> paramMap) throws Exception;
	
	public Object selectItemMgmtColumnList(Map<Object,Object> paramMap) throws Exception;
}
