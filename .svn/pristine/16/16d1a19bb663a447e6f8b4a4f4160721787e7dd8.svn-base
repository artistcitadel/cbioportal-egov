package com.softcen.bigcen.cmm.dao;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.softcen.bigcen.med.utils.PropertiesUtils;

public abstract class BigcenMedAbstractMapperDAO {
	@Autowired
	@Resource(name = "sqlSession-common")
	protected SqlSession sqlSession;

	@Autowired
	@Resource(name = "sqlSession-verticaA")
	protected SqlSession sqlSessionVerticaA;
	
	protected String GV_SCHEMA;
	protected String GV_PAT_SBST_NO;
	protected String GV_INSTCD_YN;
	protected Logger logger = Logger.getLogger(BigcenMedAbstractMapperDAO.class);
	
	public BigcenMedAbstractMapperDAO(){
		try{
			this.GV_SCHEMA = PropertiesUtils.getTargetString("SCHEMA");	
			this.GV_PAT_SBST_NO = PropertiesUtils.getTargetString("PAT_SBST_NO");	
			this.GV_INSTCD_YN =  PropertiesUtils.getTargetString("INSTCD_YN");
			
		}catch(Exception e){
			logger.error("BigcenMedAbstractServiceImpl ERROR " + e.getMessage());
		}
	}
}
