package com.softcen.bigcen.med.admin.synonymDic.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository(value="synonimDAO")
public class SynonymDAO extends BigcenMedAbstractMapperDAO{
	/*@Autowired
	private SqlSession sqlSession;*/
	
	public List selectSynonymCategoryList(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("synonym.selectSynonymCategoryList", paramMap);
		
	}
	 
	/**
	 * 대표Term 목록조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public List selectSynonymList(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("synonym.selectSynonymList", paramMap);
		
	}
	
	/**
	 * 대표Term별 동의어 목록조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public List selectSynonymTermListByRepTerm(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("synonym.selectSynonymTermListByRepTerm", paramMap);
		
	}
	
	public Object insertSynonym(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.insert("synonym.insertSynonym", paramMap);
		
	}
	
	
	public Object upsertSynonym(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.insert("synonym.upsertSynonymTerm", paramMap);
		
	}
	
	public Object insertSynonymItemMap(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.insert("synonym.insertSynonymItemMap", paramMap);
		
	}
	
	
	public Object deleteSynonymTerm(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.insert("synonym.deleteSynonymTerm", paramMap);
		
	}

}
