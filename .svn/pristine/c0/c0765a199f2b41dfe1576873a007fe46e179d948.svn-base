package com.softcen.bigcen.cmm.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.softcen.bigcen.cmm.vo.BigcenMedVO;
import com.softcen.bigcen.med.utils.PropertiesUtils;

public class BigcenMedAbstractServiceImpl extends BigcenMedVO{
	protected Logger logger = LoggerFactory.getLogger(super.getClass());
	
	protected Map<Object,Object> resultMap;
	protected String GV_SCHEMA;
	protected String GV_PAT_SBST_NO;
	
	
	public BigcenMedAbstractServiceImpl(){
		try{
			this.resultMap = new HashMap<Object,Object>();
			this.GV_SCHEMA = PropertiesUtils.getTargetString("SCHEMA");	
			this.GV_PAT_SBST_NO = PropertiesUtils.getTargetString("PAT_SBST_NO");	
			this.setGvDbType(PropertiesUtils.getString("DB_TYPE"));
			
		}catch(Exception e){
			logger.error("BigcenMedAbstractServiceImpl ERROR " + e.getMessage());
		}
	}
}
