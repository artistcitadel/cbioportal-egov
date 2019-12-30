package com.softcen.bigcen.med.common.sys.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;

@Repository("sysDAO")
public class SysDAO extends BigcenMedAbstractMapperDAO{
	/**
	 * 공통코드 조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public List selectCommonCodeList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("common_sys.selectCommonCodeList", paramMap);
		
	}
	

	public Object selectItemCont(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectOne("common_sys.selectItemCont", paramMap);
		
	}
		
	public Object selectDataColumnList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("common_sys.selectDataColumnList", paramMap);
		
	}
	
	public Object selectDataResulPeriodtList(Map<Object,Object> paramMap) throws SQLException{
		paramMap.put("GV_PAT_SBST_NO", GV_PAT_SBST_NO);
		return sqlSessionVerticaA.selectList("common_sys.selectDataResulPeriodtList", paramMap);
		
	}
	
	public Object selectDataResultList(Map<Object,Object> paramMap) throws SQLException{
		paramMap.put("GV_PAT_SBST_NO", GV_PAT_SBST_NO);
		paramMap.put("SORT", SQL.ORDER_BY + GV_PAT_SBST_NO + " ASC");
		return sqlSessionVerticaA.selectList("common_sys.selectDataResultList", paramMap);
		
	}
	
	
	
	
	
	/**
	 * 연구항목 대분류 조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemCateList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("common_sys.selectItemCateList", paramMap);
		
	}
	
	/**
	 * 연구항목 중분류 조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemCateDetlList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("common_sys.selectItemCateDetlList", paramMap);
		
	}
	
	/**
	 * 연구항목 대분류 트리조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemCateTree(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("common_sys.selectItemCateTree", paramMap);
		
	}
	
	/**
	 * 연구항목트리조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemMgmtTreeList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("common_sys.selectItemMgmtTreeList", paramMap);
		
	}
	
	
	public Object selectItemContTreeList(Map<Object,Object> paramMap) throws SQLException{
		
		paramMap.put("INSTCD_YN", String.valueOf(this.GV_INSTCD_YN));
		return sqlSession.selectList("common_sys.selectItemContTreeList", paramMap);
		
	}
	
	
	/**
	 * 연구항목목록 조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemMgmtList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("common_sys.selectItemMgmtList", paramMap);
		
	}
	
	/**
	 * 연구항목 삭제
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object deleteItemMgmt(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.delete("common_sys.deleteItemMgmt", paramMap);
	}
	
	/**
	 * 연구항목 조건공유 상세목록 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectItemContDetlList(@RequestBody Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("common_sys.selectItemContDetlList", paramMap);
	}
	
	
	
	
	
	/**
	 * 연구 조회조건 상세 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteItemContDetl(Map<Object,Object> paramMap){
		return sqlSession.delete("crssec.deleteItemContDetl", paramMap);
		
	}
	
	
	/**
	 * 조회결과 데이터 정보 조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemContData(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectOne("crssec.selectItemContData", paramMap);
		
	}
	
	/**
	 * 삭제전 테이블정보 확인
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectDataResultTableCount(Map<Object,Object> paramMap) throws SQLException{
		return sqlSessionVerticaA.selectOne("crssec.selectDataResultTableCount",paramMap);
		
		
	}
	
	/**
	 * 결과 테이블 삭제
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object dropTableDataResult(Map<Object,Object> paramMap) throws SQLException{
		return sqlSessionVerticaA.delete("crssec.dropTableDataResult",paramMap);
		
		
	}
	
	public Object selectExistSchemaTableList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSessionVerticaA.selectList("common_sys.selectExistSchemaTableList",paramMap);
		
		
	}
	
	/**
	 * 공통코드목록조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	/*public Object selectCommonCodeList(@RequestBody Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("common_sys.selectExistSchemaTableList", paramMap);
	}*/
	
	/**
	 * 연구항목 조회수 Update
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object updateItemMgmtSearchCnt(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.update("common_sys.updateItemMgmtSearchCnt",paramMap);
		
		
	}
	
	/**
	 * Mutation condition list 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectItemContList(Map<String,Object> paramMap) throws Exception{
		return sqlSession.selectList("common_sys.selectItemContList", paramMap);
		
	}
	
}
