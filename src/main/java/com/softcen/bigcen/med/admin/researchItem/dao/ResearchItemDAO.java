package com.softcen.bigcen.med.admin.researchItem.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository(value="researchItemDAO")
public class ResearchItemDAO extends BigcenMedAbstractMapperDAO{
	
	/*@Autowired
	private SqlSession sqlSession;
	*/
	
	/**
	 * 대분류조회
	 * @param paramMap
	 * @return
	 */
	public Object selectItemCateList(Map<Object,Object> paramMap){
		//dashboard
		//List list = (ArrayList)sqlSession.selectList("dashboard.selectDashboardSummary", paramMap);
		
		//System.out.println(list.toString());
		
		
		
		return sqlSession.selectList("research_item.selectItemCateList", paramMap);
	}
	
	/**
	 * 중분류조회
	 * @param paramMap
	 * @return
	 */
	public Object selectItemCateDetlList(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.selectItemCateDetlList", paramMap);
	}
	
	
	public Object insertItemCate(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.insertItemCate", paramMap);
	}
	
	public Object updateItemCate(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.updateItemCate", paramMap);
	}
	
	public Object deleteItemCate(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.deleteItemCate", paramMap);
	}
	
	
	public Object insertItemCateDetl(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("research_item.insertItemCateDetl", paramMap);
	}
	
	public Object updateItemCateDetl(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("research_item.updateItemCateDetl", paramMap);
	}
	
	public Object deleteItemCateDetl(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.deleteItemCateDetl", paramMap);
	}
	
	
	
	/**
	 * 스키마 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object,Object>> selectCatalogSchemaList(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.selectCatalogSchemaList", paramMap);
	}
	
	/**
	 * 테이블 조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object,Object>> selectCatalogTableList(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.selectCatalogTableList", paramMap);
	}
	
	/**
	 * 컬럼조회(date 타입만)
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object,Object>> selectCatalogColumnDateList(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.selectCatalogColumnDateList", paramMap);
	}

	/**
	 * 컬럼조회
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object,Object>> selectCatalogColumnList(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.selectCatalogColumnList", paramMap);
	}
	
	/**
	 * 연구항목저장
	 * @param paramMap
	 * @return
	 */
	public Object insertItemMgmt(Map<Object,Object> paramMap){
		return sqlSession.insert("research_item.insertItemMgmt", paramMap);
	}
	
	
	public List<Map<Object,Object>> selectItemMgmtList(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.selectItemMgmtList", paramMap);
	}
	
	
	public Map<Object,Object> selectItemMgmtView(Map<Object,Object> paramMap){
		return sqlSession.selectOne("research_item.selectItemMgmtList", paramMap);
	}
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object updateItemMgmt(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.insert("research_item.updateItemMgmt", paramMap);
	}
	
	
	public Object deleteItemMgmt(Map<Object,Object> paramMap){
		return sqlSession.selectList("research_item.deleteItemMgmt", paramMap);
	}
	
	
	public Object selectItemMgmtTableList(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("research_item.selectItemMgmtTableList", paramMap);
	}
	
	public Object selectItemMgmtColumnList(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("research_item.selectItemMgmtColumnList", paramMap);
	}
}
