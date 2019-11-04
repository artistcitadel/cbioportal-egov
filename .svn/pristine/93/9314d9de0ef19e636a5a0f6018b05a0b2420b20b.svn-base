package com.softcen.bigcen.med.research.psnldta.dao;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.utils.PropertiesUtils;

/**
 * 개인자료업로드 DAO
 * @author user
 *
 */
@Repository("personalDAO")
public class PersonalDataDAO extends BigcenMedAbstractMapperDAO{
	
	/**
	 * 환자번호를 이용한 환자대체번호 변환 목록 조회 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectConvertSbstNo(Map<Object,Object> paramMap) throws Exception{
		paramMap.put("PID", PropertiesUtils.getTargetString("PAT_ID"));
		paramMap.put("SEARCH_PAT_ID_LPAD_YN", PropertiesUtils.getString("PAT_ID_LPAD_YN"));
		paramMap.put("SEARCH_PAT_ID_LPAD_SIZE", PropertiesUtils.getString("PAT_ID_LPAD_SIZE"));
		
		return sqlSessionVerticaA.selectList("research_personal_data.selectConvertSbstNo", paramMap);
	}
	
	/**
	 * 유래물비코드를 이용한 환자대체번호 변환 목록 조회 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectLabNoConvertSbstNo(Map<Object,Object> paramMap) throws Exception{
		
		return sqlSessionVerticaA.selectList("research_personal_data.selectLabNoConvertSbstNo", paramMap);
	}
	
	/**
	 * 개인자료 테이블 생성
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object createPsnlDataTable(Map<Object,Object> paramMap) throws Exception{
		sqlSessionVerticaA.insert("research_personal_data.createPsnlDataTable",paramMap);
		return 0;
	}
	
	/**
	 * 개인자료 테이블 저장
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object insertPsnlDataTable(Map<Object,Object> paramMap) throws Exception{
		return sqlSessionVerticaA.insert("research_personal_data.insertPsnlDataTable",paramMap);
	}
	
	/**
	 * 개인자료 연구항목 저장
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object insertPsnlDataItemMgmt(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.insert("research_personal_data.insertPsnlDataItemMgmt",paramMap);
		
		
	}
	
	/**
	 * 개인자료 테이블 삭제
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object dropPsnlDataTable(Map<Object,Object> paramMap) throws Exception{
		return sqlSessionVerticaA.delete("research_personal_data.dropPsnlDataTable",paramMap);
	}
	
	/**
	 * 개인자료명 중복체크 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectItemMgmtPsnlDataNmDuplicateCheck(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("research_personal_data.selectItemMgmtPsnlDataNmDuplicateCheck", paramMap);
	}


}
