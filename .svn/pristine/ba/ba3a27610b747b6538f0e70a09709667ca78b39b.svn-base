package com.softcen.bigcen.med.research.sharingconditions.dao;

import java.sql.SQLException;
import java.util.Map;
import org.springframework.stereotype.Repository;
import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

/**
 * 조회조건, 연구항목조건, 공유조건 저장,수정,삭제,조회
 * @author user
 *
 */

@Repository("sharingConditionsDAO")
public class SharingConditionsDAO extends BigcenMedAbstractMapperDAO{
	/**
	 * 조회조건명 중복체크
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object chkDuplCondNmList(Map<String,Object> paramMap) throws Exception{
		return sqlSession.selectList("research_sharingconditions.chkDuplCondNmList", paramMap);
		
	}
	
	
	/**
	 * 조회조건정보를 등록한다.
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object insertItemCont(Map<String,Object> paramMap)throws Exception{
		return sqlSession.insert("research_sharingconditions.insertItemCont", paramMap);
		
	}
	
	/**
	 * 조회조건정보를 수정
	 * @param paramMap
	 * @return
	 */
	public Object updateItemCont(Map<String,Object> paramMap){
		return sqlSession.insert("research_sharingconditions.updateItemCont", paramMap);
		
	}
	
	/**
	 * 조회조건정보 삭제
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object deleteItemCont(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.delete("crssec.deleteItemCont", paramMap);
		
	}
	
	
	/**
	 * 조회조건상세정보를 등록한다.
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object insertItemContDetl(Map<String,Object> paramMap) throws Exception{
		return sqlSession.insert("research_sharingconditions.insertItemContDetl", paramMap);
		
	}
	
	/**
	 * 연구 조회조건 상세 수정
	 * @param paramMap
	 * @return
	 */
	public Object updateItemContDetl(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.insert("research_sharingconditions.updateItemContDetl", paramMap);
		
	}
	
	
	/**
	 * 기존 연구항목을 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteItemContDetl(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.delete("research_sharingconditions.deleteItemContDetl", paramMap);
		
	}
	
	/**
	 * 조회조건 공유 저장
	 * @param paramMap
	 * @return
	 */
	public Object insertItemContShared(Map<String,Object> paramMap) throws Exception{
		return sqlSession.insert("research_sharingconditions.insertItemContShared", paramMap);
		
	}
	
	/**
	 * 조회조건상세 공유 저장
	 * @param paramMap
	 * @return
	 */
	public Object insertItemContDetlShared(Map<String,Object> paramMap) throws Exception{
		return sqlSession.insert("research_sharingconditions.insertItemContDetlShared", paramMap);
		
	}
	
	/**
	 * 연구항목조건별 데이터 목록
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectItemContData(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectOne("research_sharingconditions.selectItemContData", paramMap);
		
	}
	
	/**
	 * 연구항목결과 테이블 카운트
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectDataResultTableCount(Map<Object,Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectOne("research_sharingconditions.selectDataResultTableCount",paramMap);
		
		
	}
	
	/**
	 * 연구항목결과 저장 테이블 삭제
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object dropTableDataResult(Map<Object,Object> paramMap) throws Exception{
		return sqlSessionVerticaA.delete("research_sharingconditions.dropTableDataResult",paramMap);
		
		
	}
	
	/**
	 * 연구항목 데이터 상세정보 삭제
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object deleteItemContDataDetl(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.delete("research_sharingconditions.deleteItemContDataDetl",paramMap);
		
		
	}
	
	/**
	 * 연구항목 데이터 정보 삭제
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object deleteItemContData(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.delete("research_sharingconditions.deleteItemContData",paramMap);
		
	}


	
}
