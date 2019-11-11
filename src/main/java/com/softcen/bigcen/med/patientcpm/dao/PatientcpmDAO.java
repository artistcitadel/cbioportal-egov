package com.softcen.bigcen.med.patientcpm.dao;

import java.util.List;
import java.util.Map;

import com.softcen.bigcen.med.admin.log.dao.LogMgmtDAO;
import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository(value="patientcpmDAO")
public class PatientcpmDAO extends BigcenMedAbstractMapperDAO{

	private static final Logger logger = LoggerFactory.getLogger(LogMgmtDAO.class);

	/**
	 * patient tsd and timeline
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectPatientView(Map<String, String> paramMap){
		logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("patientcpm.selectPatientView", paramMap);

	}

}
