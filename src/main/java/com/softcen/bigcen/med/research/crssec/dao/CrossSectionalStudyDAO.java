package com.softcen.bigcen.med.research.crssec.dao;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;

@Repository(value="crossSectionalStudyDAO")
public class CrossSectionalStudyDAO extends BigcenMedAbstractMapperDAO{
	
	
	/**
	 * 연구항목내용 조회
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	/*public Object selectItemCont(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectOne("crssec.selectItemCont", paramMap);
		
	}*/
	
	
	/*public Object selectItemContData(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectOne("crssec.selectItemContData", paramMap);
		
	}*/
	
	public Object selectDataColumnList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("crssec.selectDataColumnList", paramMap);
		
	}
	
	public Object selectDataResulPeriodtList(Map<Object,Object> paramMap) throws SQLException{
		paramMap.put("GV_PAT_SBST_NO", GV_PAT_SBST_NO);
		return sqlSessionVerticaA.selectList("crssec.selectDataResulPeriodtList", paramMap);
		
	}
	
	public Object selectDataResultList(Map<Object,Object> paramMap) throws SQLException{
		paramMap.put("GV_PAT_SBST_NO", GV_PAT_SBST_NO);
		paramMap.put("SORT", SQL.ORDER_BY + GV_PAT_SBST_NO + " ASC");
		return sqlSessionVerticaA.selectList("crssec.selectDataResultList", paramMap);
		
	}
	
	public Object selectRegexSearchDataList(Map<Object,Object> paramMap) throws SQLException{
		paramMap.put("SORT", SQL.ORDER_BY + GV_PAT_SBST_NO + " ASC");
		return sqlSessionVerticaA.selectList("crssec.selectRegexSearchDataList", paramMap);
		
	}
	
	public Object selectDataResultTableSize(Map<Object,Object> paramMap) throws SQLException{
		return sqlSessionVerticaA.selectOne("crssec.selectDataResultTableSize",paramMap);
		
		
	}
		

}
