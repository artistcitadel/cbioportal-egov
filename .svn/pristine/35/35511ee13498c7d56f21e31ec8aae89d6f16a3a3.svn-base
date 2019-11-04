package com.softcen.bigcen.med.admin.researchItem.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.admin.researchItem.dao.ResearchItemDAO;

@Service(value="researchItemService")
public class ResearchItemServiceImpl extends BigcenMedAbstractServiceImpl implements IResearchItemService{
	
	@Autowired
	private ResearchItemDAO researchItemDAO;
	
	/**
	 * 
	 */
	public Object selectItemCateList(Map<Object,Object> paramMap){
		return researchItemDAO.selectItemCateList(paramMap);
	}
	
	public Object selectItemCateDetlList(Map<Object,Object> paramMap){
		return researchItemDAO.selectItemCateDetlList(paramMap);
	}
	
	
	public Object insertItemCate(Map<Object,Object> paramMap){
		return researchItemDAO.insertItemCate(paramMap);
	}
	
	public Object updateItemCate(Map<Object,Object> paramMap){
		return researchItemDAO.updateItemCate(paramMap);
	}
	
	public Object deleteItemCate(Map<Object,Object> paramMap){
		return researchItemDAO.deleteItemCate(paramMap);
	}
	
	/**
	 * 중분류등록
	 */
	public Object insertItemCateDetl(Map<Object,Object> paramMap) throws Exception{
	//	1.중분류 저장	
		researchItemDAO.insertItemCateDetl(paramMap);
		
	//	2.Item항목의 기준일자 Update	
		researchItemDAO.updateItemMgmt(paramMap);
		
		return 0;
	}
	
	/**
	 * 중분류수정
	 */
	public Object updateItemCateDetl(Map<Object,Object> paramMap) throws Exception{
		researchItemDAO.updateItemCateDetl(paramMap);
		
		researchItemDAO.updateItemMgmt(paramMap);
		
		return 0;
	}
	
	public Object deleteItemCateDetl(Map<Object,Object> paramMap){
		return researchItemDAO.deleteItemCateDetl(paramMap);
	}
	
	
	public Object deleteItemMgmt(Map<Object,Object> paramMap){
		return researchItemDAO.deleteItemMgmt(paramMap);
	}
	
	
	
	
	
	
	
	
	
	/**
	 * 스키마 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object,Object>> selectCatalogSchemaList(Map<Object,Object> paramMap){
		return researchItemDAO.selectCatalogSchemaList(paramMap);
	}
	
	
	public List<Map<Object,Object>> selectCatalogTableList(Map<Object,Object> paramMap){
		return researchItemDAO.selectCatalogTableList(paramMap);
	}

	
	public List<Map<Object,Object>> selectCatalogColumnList(Map<Object,Object> paramMap){
		return researchItemDAO.selectCatalogColumnList(paramMap);
	}
	
	public Object insertItemMgmt(Map<Object,Object> paramMap){
		return researchItemDAO.insertItemMgmt(paramMap);
	}
	
	public List<Map<Object,Object>> selectItemMgmtList(Map<Object,Object> paramMap){
		
		
		
		
		return researchItemDAO.selectItemMgmtList(paramMap);
	}
	
	public Map<Object,Object> selectItemMgmtView(Map<Object,Object> paramMap){
		return researchItemDAO.selectItemMgmtView(paramMap);
	}
	
	
	public Object updateItemMgmt(Map<Object,Object> paramMap) throws Exception{
		return researchItemDAO.updateItemMgmt(paramMap);
	}
	
	
	public List<Map<Object,Object>> selectCatalogColumnDateList(Map<Object,Object> paramMap){
		return researchItemDAO.selectCatalogColumnDateList(paramMap);
	}
	
	public Object selectItemMgmtTableList(Map<Object,Object> paramMap) throws Exception{
		return researchItemDAO.selectItemMgmtTableList(paramMap);
	}
	
	public Object selectItemMgmtColumnList(Map<Object,Object> paramMap) throws Exception{
		return researchItemDAO.selectItemMgmtColumnList(paramMap);
	}

}
