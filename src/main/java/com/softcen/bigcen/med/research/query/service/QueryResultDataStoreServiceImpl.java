package com.softcen.bigcen.med.research.query.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.research.query.dao.QueryResultDataStoreDAO;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * 
 * @author user
 *
 */


@Service("queryResultDataService")
public class QueryResultDataStoreServiceImpl extends BigcenMedAbstractServiceImpl implements IQueryResultDataStoreService{
	@Autowired
	private QueryResultDataStoreDAO queryResultDataStoreDAO;
	
	
	
	/**
	 * 쿼리결과데이터 저장
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","unchecked","rawtypes"})
	public Object saveQueryResultData(Map<Object,Object> paramMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		String tableId	= "";
		String columns 	= "";
		
		List<Map<Object,Object>> dsQueryResultList = new ArrayList<Map<Object,Object>>();
		List<Map<String,String>> dsQueryColumnList = new ArrayList<Map<String,String>>();
		
		Map resultMap = new HashMap();
		Map<String,String> paramMap2 = new HashMap<String,String>();
		
		
		try{
			QueryVO.gvDbType = PropertiesUtils.getString("DB_TYPE");
			QueryVO.gvSearchYn = PropertiesUtils.getTargetString("SEARCH_YN");

			dsQueryResultList = (ArrayList<Map<Object,Object>>)paramMap.get("dsStudyItemTargetResult");
			dsQueryColumnList = (ArrayList<Map<String,String>>)this.getMetaDataList(paramMap);

			tableId = this.getCreateTableId(paramMap);
			columns = this.getColumns(paramMap);
			
			//1. CREATE TABLE
			paramMap2 = this.getQueryCreateTable(tableId, columns);
			queryResultDataStoreDAO.createTableForResult(paramMap2);
			logger.info("1.Create Table Success.");
			
			
			//2.INSERT DATA TABLE
			for(int i=0; i < dsQueryResultList.size(); i++){
				Map<String,String> dsMap = (HashMap)dsQueryResultList.get(i);
				
				sbQuery = new StringBuffer();
				
				if(SQL.VERTICA.equals(QueryVO.gvDbType)){
					sbQuery.append(SQL.SEPERATE + SQL.INSERT_INTO + tableId);		//INSERT INTO TABLE
					sbQuery.append(SQL.SEPERATE + SQL.SELECT);
					sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "A.*");
						
					if("Y".equals(PropertiesUtils.getTargetString("SEARCH_YN"))){
						sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",'N' AS SEARCH_YN");
					}
						
					sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",'N' AS CHART_YN");
					sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",'N' AS DEL_YN");
					sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",null AS CHART_DT");
					sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",NOW() AS CRT_DT");
					sbQuery.append(SQL.SEPERATE + SQL.FROM + "(");
					sbQuery.append(SQL.SEPERATE + dsMap.get("dsQuery"));
					sbQuery.append(SQL.SEPERATE + ")A");
					
				}else{
					sbQuery.append(SQL.SEPERATE + SQL.INSERT_INTO + tableId);		//INSERT INTO TABLE
					sbQuery.append(SQL.SEPERATE + dsMap.get("dsQuery"));
					
				}
				paramMap2 = new HashMap();
				paramMap2.put("INSERT_QUERY", sbQuery.toString());
				
				queryResultDataStoreDAO.insertDataForResult(paramMap2);
				
			}
			logger.info("2.TABLE INSERT COMPLETE !!!!");
			
			
			//3.연구항목메타등록
			paramMap2 = this.getItemContData(paramMap, tableId, dsQueryResultList);
			queryResultDataStoreDAO.insertItemContData(paramMap2);
			logger.info("3.ITEM_CONT_DATA INSERT COMPLETE !!!!");
			
			
			//4.컬럼메타정보등록
			Map<String,String> paramMap3 = new HashMap();
			List dsItemContDataDetlList = this.getItemContDataDetl(dsQueryResultList, dsQueryColumnList, paramMap2);
			
			for(int i=0; i < dsItemContDataDetlList.size(); i++){
				Map dsMap = (HashMap)dsItemContDataDetlList.get(i);
				queryResultDataStoreDAO.insertItemContDataDetl(dsMap);	
			}
			logger.info("4.ITEM_CONT_DATA_DETL INSERT COMPLETE !!!!");
			
			
			resultMap.put("CONT_SEQ", paramMap2.get("CONT_SEQ"));
			resultMap.put("DATA_SEQ", paramMap2.get("SEQ"));
			
			
		}catch(Exception e){
			logger.debug("SAVE DATA ERROR : " + e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	
	/**
	 * 연구항목 조회결과 목록 저장 (그리드 ROW별)
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","unchecked","rawtypes"})
	public Object saveQueryResultDataByRow(Map<Object,Object> paramMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		String tableId	= "";
		String columns 	= "";
		String values 	= "";
		
		List<Map<Object,Object>> dsQueryResultList = new ArrayList<Map<Object,Object>>();
		List<Map<String,String>> dsQueryColumnList = new ArrayList<Map<String,String>>();
		
		Map resultMap = new HashMap();
		Map<String,String> paramMap2 = new HashMap<String,String>();
		
		try{
			//DB TYPE 설정
			QueryVO.gvDbType = PropertiesUtils.getString("DB_TYPE");
			QueryVO.gvSearchYn = PropertiesUtils.getTargetString("SEARCH_YN");

			dsQueryResultList = (ArrayList<Map<Object,Object>>)paramMap.get("dsStudyItemTargetResult");
			dsQueryColumnList = (ArrayList<Map<String,String>>)this.getMetaDataList(paramMap);

			tableId = this.getCreateTableId(paramMap);
			columns = this.getColumns(paramMap);
			
			//1.CREATE TABLE
			paramMap2 = this.getQueryCreateTable(tableId, columns);
			queryResultDataStoreDAO.createTableForResult(paramMap2);
			logger.info(QueryVO.LOG_SYMBOL + "1.CREATE TABLE SUCCESS." + paramMap2.toString());
			
			
			//2.INSERT
			values  = "";
			columns = "";
			
			for(int i=0; i < dsQueryResultList.size(); i++){
				Map map = (HashMap)dsQueryResultList.get(i);
				
				List dsList = (ArrayList)map.get("dsList");
				
				for(int j=0; j < dsList.size(); j++){
					Map map2 = (HashMap)dsList.get(j);
					
					sbQuery = new StringBuffer();
					columns = "";
					values  = "";
					
					Iterator iter = map2.keySet().iterator();
					
					while(iter.hasNext()){
						Object key = iter.next();
						String tmpValues = String.valueOf(map2.get(key));
						tmpValues = tmpValues.replaceAll("'", "''");
						
						if(StringUtils.isEmpty(columns)){
							columns = key.toString();
							values  = "'" + tmpValues + "'";
							
						}else{
							columns += "," + key.toString();
							values  += ",'"+ tmpValues + "'";
						}
					}
					
					columns += ",CHART_YN";
					values  += ",'N'";
					
					columns += ",CHART_DT";
					values  += ",null";
					
					columns += ",DEL_YN";
					values  += ",'N'";
					
					columns += ",CRT_DT";
					values  += ",NOW()";
					
					sbQuery.append(SQL.INSERT_INTO + tableId + "(");
						sbQuery.append(columns);
					sbQuery.append(")");
					
					sbQuery.append(SQL.VALUES + "(");
						sbQuery.append(values);
					sbQuery.append(")");
					
					Map<String,String> queryMap = new HashMap();
					
					queryMap.put("INSERT_QUERY", sbQuery.toString());
					
					queryResultDataStoreDAO.insertDataForResult(queryMap);
				}
			}
			
			logger.info("2.TABLE INSERT COMPLETE !!!!");
			logger.info(QueryVO.LOG_SYMBOL + "2.INSERT SUCCESS.");
			
		//	3.ITEM_CONT_DATA - 데이터 마스터 정보
			paramMap2 = this.getItemContData(paramMap, tableId, dsQueryResultList);
			queryResultDataStoreDAO.insertItemContData(paramMap2);
			logger.info(QueryVO.LOG_SYMBOL + "3.ITEM_CONT_DATA INSERT SUCCESS." + paramMap2.toString());
			
			
		//	4.ITEM_CONT_DATA_DETL - 데이터 상세정보
			List dsItemContDataDetlList = this.getItemContDataDetl(dsQueryResultList, dsQueryColumnList, paramMap2);
			
			for(int i=0; i < dsItemContDataDetlList.size(); i++){
				Map dsMap = (HashMap)dsItemContDataDetlList.get(i);
				queryResultDataStoreDAO.insertItemContDataDetl(dsMap);	
				
			}
			
			logger.info("4.ITEM_CONT_DATA_DETL INSERT COMPLETE !!!!");
			
			resultMap.put("CONT_SEQ", paramMap2.get("CONT_SEQ"));
			resultMap.put("DATA_SEQ", paramMap2.get("SEQ"));
			
			logger.debug(QueryVO.LOG_SYMBOL + resultMap.toString());
			
			
		}catch(Exception e){
			logger.debug(QueryVO.LOG_SYMBOL + " SAVE DATA BY ROW ERROR : " + e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	/**
	 * CREATE TABLE ID 채번
	 * TABLE ID : TM_{USER_ID}_{TIMESTAMP}
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	private String getCreateTableId(Map<Object,Object> paramMap) throws Exception{
		String tableId = "";
		
		tableId = PropertiesUtils.getTargetString("PSNL_DATA_SCHEMA");
		tableId += ".TM_";
		tableId += String.valueOf(paramMap.get("PER_CODE"));
		tableId += "_";
		tableId += StringUtils.getTimeStamp();
		
		return tableId;
	}
	
	
	/**
	 * CREATE TABLE DDL  
	 * @param tableId
	 * @param columns
	 * @return
	 * @throws Exception
	 */
	private Map<String,String> getQueryCreateTable(String tableId, String columns) throws Exception{
		Map<String,String> paramMap = new HashMap<String,String>();
		
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.CREATE + SQL.TABLE + tableId + "(");
		sbQuery.append(SQL.SEPERATE + columns + ")");
		
		paramMap.put("CREATE_TABLE_QUERY", sbQuery.toString());
		
		return paramMap;
	}
	
	
	/**
	 * 
	 * @param paramMap
	 * @param tableId
	 * @param dsQueryResultList
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","unchecked","rawtypes"})
	private Map<String,String> getItemContData(Map paramMap,String tableId, List dsQueryResultList) throws Exception{
		int tableCnt = 0;
		Map paramMap2 = new HashMap();
		
		Map dsItemContMap = (HashMap)paramMap.get("dsItemCont");
		
		paramMap2.put("PER_CODE", String.valueOf(paramMap.get("PER_CODE")));
		paramMap2.put("CONT_SEQ", String.valueOf(dsItemContMap.get("SEQ")));
		paramMap2.put("DATA_NM", String.valueOf(paramMap.get("DATA_NM")));
		paramMap2.put("TAB_CD", String.valueOf(paramMap.get("TAB_CD")));
		paramMap2.put("DATA_SEQ", "1");
		paramMap2.put("TABLE_ID", tableId);
		
		for(int i=0; i < dsQueryResultList.size(); i++){
			Map map = (HashMap)dsQueryResultList.get(i);
			
			if(map.containsKey("dsList")){
				tableCnt = ((ArrayList)map.get("dsList")).size();
				
			}
		}
		paramMap2.put("TABLE_CNT", String.valueOf(tableCnt));
		
		return paramMap2;
	}
	
	/**
	 * 
	 * @param dsQueryResultList : 결과 목록
	 * @param dsQueryColumnList : 컬럼 목록
	 * @param paramMap2 : DATA_SEQ
	 * @return
	 * @throws Exception
	 */
	private List<Map> getItemContDataDetl(List<Map<Object,Object>> dsQueryResultList, List<Map<String,String>> dsQueryColumnList,Map<String,String> paramMap2) throws Exception{
		Map<String,String> paramMap3 = new HashMap();
		List<Map> dsItemContDataDetlList = new ArrayList<Map>();
		String strHiddenYn="";
		
		for(int i=0; i < dsQueryColumnList.size(); i++){
			Map<String,String> dsMap = (HashMap<String,String>)dsQueryColumnList.get(i);
			
			if(i == 0){
				strHiddenYn = this.getHiddenYn(dsQueryResultList, dsMap.get("dataField"));
				
				paramMap3 = new HashMap();
				paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
				paramMap3.put("COLUMN_ID", dsMap.get("dataField"));
				paramMap3.put("COLUMN_COMMENT", dsMap.get("text"));
				paramMap3.put("OLAP_YN", "Y");
				paramMap3.put("DATA_TYPE", dsMap.get("DATA_TYPE"));
				paramMap3.put("ITEM_SEQ", dsMap.get("ITEM_SEQ"));
				paramMap3.put("ITEM_TYPE", dsMap.get("ITEM_TYPE"));
				paramMap3.put("HIDDEN_YN", strHiddenYn);
				dsItemContDataDetlList.add(paramMap3);
				
				
				paramMap3 = new HashMap();
				paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
				paramMap3.put("COLUMN_ID", "DEL_YN");
				paramMap3.put("COLUMN_COMMENT", "삭제여부");
				paramMap3.put("OLAP_YN", "N");
				paramMap3.put("DATA_TYPE", "");
				paramMap3.put("ITEM_SEQ", "");
				paramMap3.put("ITEM_TYPE", "");
				paramMap3.put("HIDDEN_YN", strHiddenYn);
				dsItemContDataDetlList.add(paramMap3);
				
				if("Y".equals(PropertiesUtils.getTargetString("SEARCH_YN"))){
					paramMap3 = new HashMap();
					paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
					paramMap3.put("COLUMN_ID", "SEARCH_YN");
					paramMap3.put("COLUMN_COMMENT", "검색여부");
					paramMap3.put("OLAP_YN", "N");
					paramMap3.put("DATA_TYPE", "");
					paramMap3.put("ITEM_SEQ", "");
					paramMap3.put("ITEM_TYPE", "");
					paramMap3.put("HIDDEN_YN", strHiddenYn);
					dsItemContDataDetlList.add(paramMap3);
				}
				
				paramMap3 = new HashMap();
				paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
				paramMap3.put("COLUMN_ID", "CHART_YN");
				paramMap3.put("COLUMN_COMMENT", "차트여부");
				paramMap3.put("OLAP_YN", "N");
				paramMap3.put("DATA_TYPE", "");
				paramMap3.put("ITEM_SEQ", "");
				paramMap3.put("ITEM_TYPE", "");
				paramMap3.put("HIDDEN_YN", strHiddenYn);
				dsItemContDataDetlList.add(paramMap3);
				
				paramMap3 = new HashMap();
				paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
				paramMap3.put("COLUMN_ID", "CHART_DT");
				paramMap3.put("COLUMN_COMMENT", "차트일자");
				paramMap3.put("OLAP_YN", "N");
				paramMap3.put("DATA_TYPE", "");
				paramMap3.put("ITEM_SEQ", "");
				paramMap3.put("ITEM_TYPE", "");
				paramMap3.put("HIDDEN_YN", strHiddenYn);
				dsItemContDataDetlList.add(paramMap3);
				

				paramMap3 = new HashMap();
				paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
				paramMap3.put("COLUMN_ID", "CRT_DT");
				paramMap3.put("COLUMN_COMMENT", "생성일자");
				paramMap3.put("OLAP_YN", "N");
				paramMap3.put("DATA_TYPE", "");
				paramMap3.put("ITEM_SEQ", "");
				paramMap3.put("ITEM_TYPE", "");
				paramMap3.put("HIDDEN_YN", strHiddenYn);
				
				dsItemContDataDetlList.add(paramMap3);
				
				
				
			}else{
				paramMap3 = new HashMap();
				paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
				paramMap3.put("COLUMN_ID", dsMap.get("dataField"));
				paramMap3.put("COLUMN_COMMENT", dsMap.get("text"));
				paramMap3.put("OLAP_YN", "Y");
				paramMap3.put("DATA_TYPE", dsMap.get("DATA_TYPE"));
				paramMap3.put("ITEM_SEQ", dsMap.get("ITEM_SEQ"));
				paramMap3.put("ITEM_TYPE", dsMap.get("ITEM_TYPE"));
				
				strHiddenYn = this.getHiddenYn(dsQueryResultList, dsMap.get("dataField"));
				paramMap3.put("HIDDEN_YN", strHiddenYn);
				
				dsItemContDataDetlList.add(paramMap3);
			}
			
		}
		
		return dsItemContDataDetlList;
	}
	
	
	
	
	/**
	 * 연구항목 결과 MetaList를 CREATE DDL문을 생성하기 위한 Columns를 반환한다.
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked","unused"})
	private String getColumns(Map<Object,Object> paramMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		List<Map<Object,Object>> dsResultInfo = new ArrayList<Map<Object,Object>>();
		List<Map<String,String>> dsMetaDataList = new ArrayList<Map<String,String>>();
		
		dsResultInfo = (ArrayList<Map<Object,Object>>)paramMap.get("dsStudyItemTargetResult");
		
		for(int i=0; i < dsResultInfo.size(); i++){
			Map<String,Object> dsMap = (HashMap)dsResultInfo.get(i);
			
			if(i == 0 && !StringUtils.isNull(dsMap.get("dsMetaDataList"))){
				dsMetaDataList = (ArrayList)dsMap.get("dsMetaDataList");
				
				for(int j=0; j < dsMetaDataList.size(); j++){
					Map<String,String> dsMap2 = (HashMap<String,String>)dsMetaDataList.get(j);
					
					//sbQuery가 empty면 환자대체번호 컬럼
					if(StringUtils.isEmpty(sbQuery.toString())){
						sbQuery.append(SQL.SEPERATE);
						sbQuery.append(dsMap2.get("dataField") + SQL.BLANK + "varchar(10)");
						
					}else{
						sbQuery.append(SQL.SEPERATE + ",");
						sbQuery.append(dsMap2.get("dataField") + SQL.BLANK + dsMap2.get("DATA_TYPE"));
						
					}			
				}
				
				//검색여부
				if("Y".equals(PropertiesUtils.getTargetString("SEARCH_YN"))){
					sbQuery.append(SQL.SEPERATE + ",");
					sbQuery.append("SEARCH_YN varchar(1)");
					
				}
				
				sbQuery.append(SQL.SEPERATE + ",");
				sbQuery.append("CHART_YN varchar(1)");
				
				sbQuery.append(SQL.SEPERATE + ",");
				sbQuery.append("DEL_YN varchar(1)");
				
				sbQuery.append(SQL.SEPERATE + ",");
				sbQuery.append("CHART_DT timestamp");
				
				sbQuery.append(SQL.SEPERATE + ",");
				sbQuery.append("CRT_DT timestamp");
				
			}
		}
		
		return sbQuery.toString();
		
	}
	
	
	private List<Map<String,String>> getMetaDataList(Map<Object,Object> paramMap) throws Exception{
		List<Map<Object,Object>> dsResultInfo = new ArrayList<Map<Object,Object>>();
		List<Map<String,String>> dsMetaDataList = new ArrayList();
		
		dsResultInfo = (ArrayList<Map<Object,Object>>)paramMap.get("dsStudyItemTargetResult");
		
		for(int i=0; i < dsResultInfo.size(); i++){
			Map<String,Object> dsMap = (HashMap)dsResultInfo.get(i);
			
			if(i == 0 && !StringUtils.isNull(dsMap.get("dsMetaDataList"))){
				dsMetaDataList = (ArrayList)dsMap.get("dsMetaDataList");
			}
		}
		
		return dsMetaDataList;
	}
	
	/**
	 * Hidden YN 컬럼여부를 반환
	 * @param dsStudyItemTargetResult
	 * @param dataFields
	 * @return
	 */
	@SuppressWarnings({"cast","unchecked","unused","rawtypes"})
	private String getHiddenYn(List dsStudyItemTargetResult, String dataFields){
		String strHiddenYn = "";
		List dsMetaDataList = new ArrayList();
		
		for(int i=0; i < dsStudyItemTargetResult.size(); i++){
			Map map = (HashMap)dsStudyItemTargetResult.get(i);
			
			dsMetaDataList = (ArrayList)map.get("dsMetaDataList");
			
			for(int j=0; j < dsMetaDataList.size(); j++){
				Map<String,String> dsMap = (HashMap)dsMetaDataList.get(j);
				
				
				
				if(dataFields.equals(dsMap.get("dataField"))){
					if(StringUtils.isNull(dsMap.get("HIDDEN_YN")) || StringUtils.isEmpty(dsMap.get("HIDDEN_YN"))){
						if(StringUtils.isEmpty(strHiddenYn)){
							strHiddenYn += "N";	
						}else{
							strHiddenYn += ",N";
						}
						
							
					}else if("Y".equals(dsMap.get("HIDDEN_YN"))){
						if(StringUtils.isEmpty(strHiddenYn)){
							strHiddenYn += "Y";	
						}else{
							strHiddenYn += ",Y";
						}
							
					}else if("N".equals(dsMap.get("HIDDEN_YN"))){
						if(StringUtils.isEmpty(strHiddenYn)){
							strHiddenYn += "N";	
						}else{
							strHiddenYn += ",N";
						}
					}
				}
			}
			
		}
		
		return strHiddenYn;
	}
	
	
	
	
	
	/**
	 * 쿼리결과데이터 저장
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	/*
	@SuppressWarnings({"cast","unchecked","rawtypes"})
	public Object saveQueryResultData(Map<Object,Object> paramMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		String tableId	= "";
		String columns 	= "";
		
		List<Map<Object,Object>> dsQueryResultList = new ArrayList<Map<Object,Object>>();
		List<Map<String,String>> dsQueryColumnList = new ArrayList<Map<String,String>>();
		
		Map resultMap = new HashMap();
		Map<String,String> paramMap2 = new HashMap<String,String>();
		
		
		try{
			//DB TYPE 설정
			QueryVO.gvDbType = PropertiesUtils.getString("DB_TYPE");
			QueryVO.gvSearchYn = PropertiesUtils.getTargetString("SEARCH_YN");

			dsQueryResultList = (ArrayList<Map<Object,Object>>)paramMap.get("dsStudyItemTargetResult");
			dsQueryColumnList = (ArrayList<Map<String,String>>)this.getMetaDataList(paramMap);

			tableId = this.getCreateTableId(paramMap);
			columns = this.getColumns(paramMap);
			
			//1. CREATE TABLE
			paramMap2 = this.getQueryCreateTable(tableId, columns);
			queryResultDataStoreDAO.createTableForResult(paramMap2);
			logger.info("1.Create Table Success.");
			
			
			//2.INSERT DATA TABLE
			for(int i=0; i < dsQueryResultList.size(); i++){
				Map<String,String> dsMap = (HashMap)dsQueryResultList.get(i);
				
				sbQuery = new StringBuffer();
				
				if(SQL.VERTICA.equals(QueryVO.gvDbType)){
					sbQuery.append(SQL.SEPERATE + SQL.INSERT_INTO + tableId);		//INSERT INTO TABLE
					sbQuery.append(SQL.SEPERATE + SQL.SELECT);
					sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "A.*");
						
					if("Y".equals(PropertiesUtils.getTargetString("SEARCH_YN"))){
						sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",'N' AS SEARCH_YN");
					}
						
					sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",'N' AS CHART_YN");
					sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",'N' AS DEL_YN");
					sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",null AS CHART_DT");
					sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",NOW() AS CRT_DT");
					sbQuery.append(SQL.SEPERATE + SQL.FROM + "(");
					sbQuery.append(SQL.SEPERATE + dsMap.get("dsQuery"));
					sbQuery.append(SQL.SEPERATE + ")A");
					
				}else{
					sbQuery.append(SQL.SEPERATE + SQL.INSERT_INTO + tableId);		//INSERT INTO TABLE
					sbQuery.append(SQL.SEPERATE + dsMap.get("dsQuery"));
					
				}
				paramMap2 = new HashMap();
				paramMap2.put("INSERT_QUERY", sbQuery.toString());
				
				queryResultDataStoreDAO.insertDataForResult(paramMap2);
				
			}
			
			logger.info("2.TABLE INSERT COMPLETE !!!!");
			
			
			//3.연구항목메타등록
			{
				int tableCnt = 0;
				paramMap2 = new HashMap();
				
				Map dsItemContMap = (HashMap)paramMap.get("dsItemCont");
				
				paramMap2.put("PER_CODE", String.valueOf(paramMap.get("PER_CODE")));
				paramMap2.put("CONT_SEQ", String.valueOf(dsItemContMap.get("SEQ")));
				paramMap2.put("DATA_NM", String.valueOf(paramMap.get("DATA_NM")));
				paramMap2.put("DATA_SEQ", "1");
				paramMap2.put("TABLE_ID", tableId);
				
				for(int i=0; i < dsQueryResultList.size(); i++){
					Map map = (HashMap)dsQueryResultList.get(i);
					
					if(map.containsKey("dsList")){
						tableCnt = ((ArrayList)map.get("dsList")).size();
						
					}
				}
				paramMap2.put("TABLE_CNT", String.valueOf(tableCnt));
				
				queryResultDataStoreDAO.insertItemContData(paramMap2);
			}
			logger.info("3.ITEM_CONT_DATA INSERT COMPLETE !!!!");
			
			
			//4.컬럼메타정보등록
			Map<String,String> paramMap3 = new HashMap();
			List dsItemContDataDetlList = new ArrayList();
			String strHiddenYn="";
			
			for(int i=0; i < dsQueryColumnList.size(); i++){
				Map<String,String> dsMap = (HashMap<String,String>)dsQueryColumnList.get(i);
				
				if(i == 0){
					strHiddenYn = this.getHiddenYn(dsQueryResultList, dsMap.get("dataField"));
					
					paramMap3 = new HashMap();
					paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
					paramMap3.put("COLUMN_ID", dsMap.get("dataField"));
					paramMap3.put("COLUMN_COMMENT", dsMap.get("text"));
					paramMap3.put("OLAP_YN", "Y");
					paramMap3.put("DATA_TYPE", dsMap.get("DATA_TYPE"));
					paramMap3.put("ITEM_SEQ", dsMap.get("ITEM_SEQ"));
					paramMap3.put("ITEM_TYPE", dsMap.get("ITEM_TYPE"));
					paramMap3.put("HIDDEN_YN", strHiddenYn);
					dsItemContDataDetlList.add(paramMap3);
					
					
					paramMap3 = new HashMap();
					paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
					paramMap3.put("COLUMN_ID", "DEL_YN");
					paramMap3.put("COLUMN_COMMENT", "삭제여부");
					paramMap3.put("OLAP_YN", "N");
					paramMap3.put("DATA_TYPE", "");
					paramMap3.put("ITEM_SEQ", "");
					paramMap3.put("ITEM_TYPE", "");
					paramMap3.put("HIDDEN_YN", strHiddenYn);
					dsItemContDataDetlList.add(paramMap3);
					
					if("Y".equals(PropertiesUtils.getTargetString("SEARCH_YN"))){
						paramMap3 = new HashMap();
						paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
						paramMap3.put("COLUMN_ID", "SEARCH_YN");
						paramMap3.put("COLUMN_COMMENT", "검색여부");
						paramMap3.put("OLAP_YN", "N");
						paramMap3.put("DATA_TYPE", "");
						paramMap3.put("ITEM_SEQ", "");
						paramMap3.put("ITEM_TYPE", "");
						paramMap3.put("HIDDEN_YN", strHiddenYn);
						dsItemContDataDetlList.add(paramMap3);
					}
					
					paramMap3 = new HashMap();
					paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
					paramMap3.put("COLUMN_ID", "CHART_YN");
					paramMap3.put("COLUMN_COMMENT", "차트여부");
					paramMap3.put("OLAP_YN", "N");
					paramMap3.put("DATA_TYPE", "");
					paramMap3.put("ITEM_SEQ", "");
					paramMap3.put("ITEM_TYPE", "");
					paramMap3.put("HIDDEN_YN", strHiddenYn);
					dsItemContDataDetlList.add(paramMap3);
					
					paramMap3 = new HashMap();
					paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
					paramMap3.put("COLUMN_ID", "CHART_DT");
					paramMap3.put("COLUMN_COMMENT", "차트일자");
					paramMap3.put("OLAP_YN", "N");
					paramMap3.put("DATA_TYPE", "");
					paramMap3.put("ITEM_SEQ", "");
					paramMap3.put("ITEM_TYPE", "");
					paramMap3.put("HIDDEN_YN", strHiddenYn);
					dsItemContDataDetlList.add(paramMap3);
					

					paramMap3 = new HashMap();
					paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
					paramMap3.put("COLUMN_ID", "CRT_DT");
					paramMap3.put("COLUMN_COMMENT", "생성일자");
					paramMap3.put("OLAP_YN", "N");
					paramMap3.put("DATA_TYPE", "");
					paramMap3.put("ITEM_SEQ", "");
					paramMap3.put("ITEM_TYPE", "");
					paramMap3.put("HIDDEN_YN", strHiddenYn);
					
					dsItemContDataDetlList.add(paramMap3);
					
					
					
				}else{
					paramMap3 = new HashMap();
					paramMap3.put("DATA_SEQ", String.valueOf(paramMap2.get("SEQ")));
					paramMap3.put("COLUMN_ID", dsMap.get("dataField"));
					paramMap3.put("COLUMN_COMMENT", dsMap.get("text"));
					paramMap3.put("OLAP_YN", "Y");
					paramMap3.put("DATA_TYPE", dsMap.get("DATA_TYPE"));
					paramMap3.put("ITEM_SEQ", dsMap.get("ITEM_SEQ"));
					paramMap3.put("ITEM_TYPE", dsMap.get("ITEM_TYPE"));
					
					strHiddenYn = this.getHiddenYn(dsQueryResultList, dsMap.get("dataField"));
					paramMap3.put("HIDDEN_YN", strHiddenYn);
					
					dsItemContDataDetlList.add(paramMap3);
				}
				
			}
			for(int i=0; i < dsItemContDataDetlList.size(); i++){
				Map dsMap = (HashMap)dsItemContDataDetlList.get(i);
				queryResultDataStoreDAO.insertItemContDataDetl(dsMap);	
				
			}
			
			logger.info("4.ITEM_CONT_DATA_DETL INSERT COMPLETE !!!!");
			
			
			resultMap.put("CONT_SEQ", paramMap2.get("CONT_SEQ"));
			resultMap.put("DATA_SEQ", paramMap2.get("SEQ"));
			
			logger.debug(QueryVO.LOG_SYMBOL + resultMap.toString());
			
		}catch(Exception e){
			logger.debug("SAVE DATA ERROR : " + e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}*/

}
