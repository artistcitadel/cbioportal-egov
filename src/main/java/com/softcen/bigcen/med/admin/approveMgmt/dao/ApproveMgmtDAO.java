package com.softcen.bigcen.med.admin.approveMgmt.dao;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.admin.log.dao.LogMgmtDAO;

@Repository("approveMgmtDAO")
public class ApproveMgmtDAO extends BigcenMedAbstractMapperDAO{

	private static final Logger logger = LoggerFactory.getLogger(LogMgmtDAO.class);

	/**
	 * 승인/거부 저장
	 * @param paramMap
	 * @return
	 */
	public Object updateApproveData(Map<Object, Object> paramMap) {
		int ret = sqlSession.update("approveMgmt.updateApproveData", paramMap);

		return ret;
	}

	public List<Map<Object, Object>> selectRequestList(Map<Object, Object> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("approve.selectRequestList", paramMap);
	}

	/**
	 * 승인요청/조회 카운트
	 * @param paramMap
	 * @return
	 */
	public Object selectRequestCount(Map<Object, Object> paramMap){
		return sqlSession.selectOne("approve.selectRequestCount", paramMap);

	}
}
