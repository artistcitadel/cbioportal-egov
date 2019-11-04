package com.softcen.bigcen.med.research.query.service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.softcen.bigcen.med.research.query.dao.QueryDAO;
import com.softcen.bigcen.med.utils.PropertiesUtils;

@Service("queryService")
public class QueryServiceImpl implements IQueryService{
	@Autowired
	private QueryDAO queryDAO;
	
	public Object getJoinTableList(Map<Object,Object> paramMap) throws SQLException{
		return queryDAO.selectItemJoinList(paramMap);
	}
	
	
	public Object getQueryResult(Map<Object,Object> paramMap) throws SQLException{
		return queryDAO.selectCrossSectionStudyList(paramMap);
	}
	
	
	public Object selectItemCont(Map<Object,Object> paramMap) throws Exception{
		return queryDAO.selectItemCont(paramMap);
	}
	public Object selectItemContDetl(Map<Object,Object> paramMap) throws Exception{
		return queryDAO.selectItemContDetl(paramMap);
	}
	public Object selectItemContData(Map<Object,Object> paramMap) throws Exception{
		return queryDAO.selectItemContData(paramMap);
	}
	public Object selectItemContDataDetl(Map<Object,Object> paramMap) throws Exception{
		return queryDAO.selectItemContDataDetl(paramMap);
	}
	
	@SuppressWarnings("all")
	@Transactional
	public Object updateResultTable(Map<String,Object> paramMap) throws Exception{
		
		StringBuffer sbQuery = new StringBuffer();
		
		String strPAT_SBST_NO = PropertiesUtils.getTargetString("PAT_SBST_NO");
		
		sbQuery.append("UPDATE ");
		sbQuery.append(paramMap.get("TABLE_ID"));
		sbQuery.append(" SET ");
		sbQuery.append(" DEL_YN='" + paramMap.get("DEL_YN") + "'");
		sbQuery.append(" WHERE 1=1 ");
		sbQuery.append(" AND   PERIOD_CD=" + paramMap.get("PERIOD_CD"));
		sbQuery.append(" AND   "+strPAT_SBST_NO+"='"+paramMap.get(strPAT_SBST_NO)+"'");
		
		paramMap.put("SQL", sbQuery.toString());
		
		return queryDAO.updateResultTable(paramMap);
	}
	
	@SuppressWarnings("all")
	public Object getOlapInfo(Map<Object,Object> paramMap) throws Exception{
		Map olapMap = new HashMap();
		
		olapMap.put("dsItemCont", queryDAO.selectItemCont(paramMap));
		olapMap.put("dsItemContDetl", queryDAO.selectItemContDetl(paramMap));
		olapMap.put("dsItemContData", queryDAO.selectItemContData(paramMap));
		olapMap.put("dsItemContDataDetl", queryDAO.selectItemContDataDetl(paramMap));
		
		return olapMap;
	}

}
