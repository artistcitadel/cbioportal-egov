package com.softcen.bigcen.med.research.visualize.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.utils.PropertiesUtils;

/* mariaDB connection : sqlSession
 * vertica connection : sqlSessionVerticaA
 */

@Repository("VisualizeDAO")
public class VisualizeDAO extends BigcenMedAbstractMapperDAO {
	private static final Logger logger = LoggerFactory.getLogger(VisualizeDAO.class);
	
	// get 'olap_id'
	public Map<String, Object> selectReportId() {
		return sqlSessionVerticaA.selectOne("visualize.selectReportId");
	}

	// get 'olap_url'
	public Map<String, Object> selectOlapMgmt(Map<String, Object> reportMap) {
		return sqlSession.selectOne("visualize.selectOlapMgmt", reportMap);
	}

	public List selectExistTableList(Map<String, Object> paramMap) {
		return sqlSessionVerticaA.selectList("visualize.selectExistTableList", paramMap);
	}

	public void dropTableForVisualize(Map<String, Object> paramMap) throws Exception {
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		sqlSessionVerticaA.update("visualize.dropTableForVisualize", paramMap);
	}

	public void createTableForVisualize(Map<String, Object> paramMap) throws Exception {
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		sqlSessionVerticaA.update("visualize.createTableForVisualize", paramMap);
	}
	
	/**
	 * 사용중인(했던) OLAP_ID 리스트 조회
	 * @return
	 */
	public List<Map<String, Object>> selectUseIdList() {
		return sqlSessionVerticaA.selectList("visualize.selectUseIdList");
	}
	/**
	 * 시각화 정보테이블 조회
	 * @return
	 */
	public List<Map<String, Object>> selectOlapInfoList() {
		return sqlSession.selectList("visualize.selectOlapInfoList");
	}
	
	
}
