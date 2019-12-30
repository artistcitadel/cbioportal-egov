package com.softcen.bigcen.med.mutationcpm.dao;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository(value="mutationDAO")
public class MutationDAO extends BigcenMedAbstractMapperDAO{
	/**
	 * Mutation 선택 목록
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public List<Map<String,Object>> selectMutationList(Map<String,Object> params) throws Exception{
		return sqlSession.selectList("mutation.selectMutationList", params);
		
	}
	
	
	/**
	 * OncoPrint List 조회
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> selectOncoPrintList(Map<String,Object> params) throws Exception{
		return sqlSession.selectList("mutation.selectOncoPrintList", params);
		
	}
	
	/**
	 * OncoPrint Patitant List
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> selectOncoPrintPatList(Map<String,Object> params) throws Exception{
		return sqlSession.selectList("mutation.selectOncoPrintPatList", params);
		
	}
	
	/**
	 * OncoPrint cancer list
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> selectOncoPrintCancerList(Map<String,Object> params) throws Exception{
		return sqlSession.selectList("mutation.selectOncoPrintCancerList", params);
		
	}
	
	
	/**
	 * crinacal track list
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> selectClinicalTrackList(Map<String,Object> params) throws Exception{
		return sqlSession.selectList("mutation.selectClinicalTrackList", params);
		
	}
	
	

}
