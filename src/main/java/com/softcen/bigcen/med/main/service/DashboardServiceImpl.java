package com.softcen.bigcen.med.main.service;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.maven.shared.artifact.filter.StatisticsReportingArtifactFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.main.dao.DashboardDAO;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.utils.StringUtils;

@Service("dashboardService")
public class DashboardServiceImpl extends BigcenMedAbstractServiceImpl implements IDashboardService{
	@Autowired
	private DashboardDAO dashboardDAO;
	
	@Transactional(readOnly=true,propagation=Propagation.REQUIRED)
	public Object selectDashboard(Map<Object, Object> paramMap){
		return dashboardDAO.selectDashboard(paramMap);
		
	}
	
	public Object selectDashboardChart(Map<Object, Object> paramMap){
		return dashboardDAO.selectDashboardChart(paramMap);
	}
	
	public Object selectDashboardBoard(Map<Object, Object> paramMap){
		return dashboardDAO.selectDashboardBoard(paramMap);
	}
	
	
	public Object selectSvcStatus(Map<Object, Object> paramMap){
		paramMap.put("GV_DB_TYPE", this.getGvDbType());
		return dashboardDAO.selectSvcStatus(paramMap);
	}
	
	
	public Object selectResearchTargetStat(Map<Object, Object> paramMap){
		return dashboardDAO.selectResearchTargetStat(paramMap);
	}
	
	
	public Object selectDashboardChartList(Map<Object, Object> paramMap){
		

		return dashboardDAO.selectDashboardChartList(paramMap);
		
	}
	
	public Object selectDashboardBoardList(Map<Object, Object> paramMap) throws SQLException{
		
		
		return dashboardDAO.selectDashboardBoardList(paramMap);
		
	}
	
	public Object selectDashboardBoardOneList(Map<Object, Object> paramMap) throws SQLException{
		int nTotalCnt = 0;		
		
		nTotalCnt = (Integer)dashboardDAO.selectDashboardBoardCount(paramMap);
		
		int BOARD_SEQ = Integer.parseInt((String) paramMap.get("BOARD_SEQ"));
		
		resultMap.put("draw", paramMap.get("draw"));
		resultMap.put("recordsTotal", nTotalCnt);
		resultMap.put("recordsFiltered", nTotalCnt);
		resultMap.put("data", dashboardDAO.selectDashboardBoardList(paramMap));
		
		
		return resultMap;
		
	}
	
	@Override
	public Object insertBoardData(Map<Object, Object> paramMap) {
		int insertBoardData = (Integer) dashboardDAO.insertBoardData(paramMap);
		
		paramMap.put("DOCUMENT_SEQ", paramMap.get("SEQ"));
		
		return insertBoardData;
	}
	
	@Override
	public Object insertBoardFileData(Map<Object, Object> paramMap) {
		return dashboardDAO.insertBoardFileData(paramMap);
	}
	
	@Override
	public Object updateBoardData(Map<Object, Object> paramMap) {
		return dashboardDAO.updateBoardData(paramMap);
	}
	
	@Override
	public Object deleteBoardData(Map<Object, Object> paramMap) {
		return dashboardDAO.deleteBoardData(paramMap);
	}
	
	public Object selectBoardDataDetail(Map<Object, Object> paramMap) throws SQLException{		
		return dashboardDAO.selectBoardDataDetail(paramMap);		
	}
	
	public Object selectBoardDataDetailFile(Map<Object, Object> paramMap) throws SQLException{		
		return dashboardDAO.selectBoardDataDetailFile(paramMap);		
	}
	
	public Object selectMySaveData(Map<Object, Object> paramMap) throws SQLException{		
		return dashboardDAO.selectMySaveData(paramMap);		
	}
	
	@Override
	public List<Map<Object, Object>> selectChartMgmt(Map<String, String> paramMap){
		return dashboardDAO.selectChartMgmt(paramMap);
	}
	
	@Override
	public Object deleteFile(Map<Object, Object> paramMap) {
		return dashboardDAO.deleteFile(paramMap);
	}

	@Override
	public Object selectDashboardState(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		return dashboardDAO.selectDashboardState(paramMap);
	}

	@Override
	public Object selectDashboardCohortList(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		
		return dashboardDAO.selectDashboardCohortList(paramMap);
	}

	@Override
	public Object selectDashboardCohortDetlList(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		return dashboardDAO.selectDashboardCohortDetlList(paramMap);
	}

	@Override
	public Object loadselectedChart(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		return dashboardDAO.loadselectedChart(paramMap);
	}

	@Override
	public Object selectfilterApply(Map<Object, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		
		Map<String,String> resultMap = new HashMap<String,String>();
		Map<String,String> paramMap2 = new HashMap<String,String>();
		
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQuerySpcn = new StringBuffer();
		StringBuffer sbQueryAll = new StringBuffer();
		StringBuffer sbQueryAllGroupBy = new StringBuffer();
		List paramArray = new ArrayList();
		paramArray = (ArrayList)paramMap.get("FILTER");
		
		List tableList = new ArrayList();
		
		StringBuffer joinTableQuery = new StringBuffer();
		StringBuffer joinwhereQuery = new StringBuffer();
		
		tableList.add(paramMap.get("CREATEDTABLE"));
		String createdtable = "pmsdata." + paramMap.get("CREATEDTABLE").toString();
		joinTableQuery.append(createdtable + SQL.AS + "sb0");
		
		//전체 쿼리
  		for(int i=0; i<paramArray.size(); i++) {
  			Map tmpMap = (HashMap)paramArray.get(i);
  			  			
  			int tListsz = i+1;
  			String tAlias = "sb" + tListsz;
  			String EXEC_SQL = tmpMap.get("EXEC_SQL").toString(); 
  			if(EXEC_SQL.contains("#{CohortTable}")) {
  				EXEC_SQL = EXEC_SQL.replace("#{CohortTable}", createdtable);
  			}
  			
  			if("CLINICAL".equals(tmpMap.get("ITEM_CATE_ID")) || "ETC".equals(tmpMap.get("ITEM_CATE_ID"))) {
  				joinTableQuery.append(SQL.SEPERATE + SQL.JOIN + "(" + EXEC_SQL);
  	  			joinTableQuery.append(setjoinwhereQuery(tmpMap, tAlias) + ")" + SQL.AS + tAlias);
  	  			joinTableQuery.append(SQL.SEPERATE + SQL.ON + "1=1");
  	  			joinTableQuery.append(SQL.SEPERATE + SQL.AND + "sb0.RESCH_PAT_ID" + SQL.EQUAL + tAlias + ".RESCH_PAT_ID");
  			}
  			else if("GENOMIC".equals(tmpMap.get("ITEM_CATE_ID"))) {
  				joinTableQuery.append(SQL.SEPERATE + SQL.JOIN + "(" + EXEC_SQL);
  	  			joinTableQuery.append(setjoinwhereQuery(tmpMap, tAlias) + ")" + SQL.AS + tAlias);
  	  			joinTableQuery.append(SQL.SEPERATE + SQL.ON + "1=1");
  	  			joinTableQuery.append(SQL.SEPERATE + SQL.AND + "sb0.RESCH_SPCN_ID" + SQL.EQUAL + tAlias + ".RESCH_SPCN_ID");
  			}
		
		}
  		sbQuery.append(SQL.SEPERATE + SQL.SELECT + SQL.DISTINCT + "sb0.RESCH_PAT_ID");
  		sbQuery.append(SQL.SEPERATE + SQL.FROM);
  		sbQuery.append(joinTableQuery);
  		sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
  		sbQuery.append(SQL.AND + "sb0.DELETE_YN = 'N'");

  		sbQuerySpcn.append(SQL.SEPERATE + SQL.SELECT + SQL.DISTINCT + "sb0.RESCH_SPCN_ID");
  		sbQuerySpcn.append(SQL.SEPERATE + SQL.FROM);
  		sbQuerySpcn.append(joinTableQuery);
  		sbQuerySpcn.append(SQL.SEPERATE + SQL.WHERE + "1=1");
  		sbQuerySpcn.append(SQL.AND + "sb0.DELETE_YN = 'N'");
  		
  		sbQueryAll.append(SQL.SEPERATE + SQL.SELECT + SQL.DISTINCT + "sb0.RESCH_PAT_ID," + "sb0.RESCH_SPCN_ID," + "sb0.DELETE_YN");
  		sbQueryAll.append(SQL.SEPERATE + SQL.FROM);
  		sbQueryAll.append(joinTableQuery);
  		sbQueryAll.append(SQL.SEPERATE + SQL.WHERE + "1=1");
		
  		sbQueryAllGroupBy.append(SQL.SEPERATE + SQL.SELECT + "sb0.RESCH_PAT_ID," + "sb0.RESCH_SPCN_ID," + "sb0.DELETE_YN");
  		sbQueryAllGroupBy.append(SQL.SEPERATE + SQL.FROM);
  		sbQueryAllGroupBy.append(joinTableQuery);
  		sbQueryAllGroupBy.append(SQL.SEPERATE + SQL.WHERE + "1=1");
  		sbQueryAllGroupBy.append(SQL.SEPERATE + SQL.GROUP_BY + "sb0.RESCH_PAT_ID");
  		
  		System.out.println(sbQuery.toString());
		
  		paramMap2.put("FILTER_QUERY", sbQuery.toString());
		resultMap.put("all",sbQuery.toString());
		resultMap.put("sbQueryAll",sbQueryAll.toString());
		resultMap.put("sbQuerySpcn", sbQuerySpcn.toString());
		resultMap.put("sbQueryAllGroupBy", sbQueryAllGroupBy.toString());
		//개별 쿼리
		for(int i=0; i<paramArray.size(); i++) {
			List tableList2 = new ArrayList();
			
			StringBuffer joinTableQuery2 = new StringBuffer();
			StringBuffer joinwhereQuery2 = new StringBuffer();
			
			tableList2.add(paramMap.get("CREATEDTABLE"));
			String createdtable2 = "pmsdata." + paramMap.get("CREATEDTABLE").toString();
			joinTableQuery2.append(SQL.SEPERATE + createdtable + SQL.AS + "sb0");
			
			StringBuffer sbQuery2 = new StringBuffer();
			StringBuffer sbQuerySpcn2 = new StringBuffer();
			for(int j=0; j<paramArray.size(); j++) {
				if(j==i) continue;
				Map tmpMap = (HashMap)paramArray.get(j);
		
				int tListsz = j+1;
	  			String tAlias = "sb" + tListsz;
	  			String EXEC_SQL = tmpMap.get("EXEC_SQL").toString(); 
	  			if(EXEC_SQL.contains("#{CohortTable}")) {
	  				EXEC_SQL = EXEC_SQL.replace("#{CohortTable}", createdtable);
	  			}

	  			if("CLINICAL".equals(tmpMap.get("ITEM_CATE_ID")) || "ETC".equals(tmpMap.get("ITEM_CATE_ID"))) {
	  				joinTableQuery2.append(SQL.SEPERATE + SQL.JOIN + "(" + EXEC_SQL);
		  			joinTableQuery2.append(setjoinwhereQuery(tmpMap, tAlias) + ")" + SQL.AS + tAlias);
		  			joinTableQuery2.append(SQL.SEPERATE + SQL.ON + "1=1");
		  			joinTableQuery2.append(SQL.SEPERATE + SQL.AND + "sb0.RESCH_PAT_ID" + SQL.EQUAL + tAlias + ".RESCH_PAT_ID");
	  			}
	  			else if("GENOMIC".equals(tmpMap.get("ITEM_CATE_ID"))) {
	  				joinTableQuery2.append(SQL.SEPERATE + SQL.JOIN + "(" + EXEC_SQL);
	  				joinTableQuery2.append(setjoinwhereQuery(tmpMap, tAlias) + ")" + SQL.AS + tAlias);
	  				joinTableQuery2.append(SQL.SEPERATE + SQL.ON + "1=1");
	  				joinTableQuery2.append(SQL.SEPERATE + SQL.AND + "sb0.RESCH_SPCN_ID" + SQL.EQUAL + tAlias + ".RESCH_SPCN_ID");
	  			}
	  			
			}
			
			sbQuery2.append(SQL.SEPERATE + SQL.SELECT + SQL.DISTINCT + "sb0.RESCH_PAT_ID");
	  		sbQuery2.append(SQL.SEPERATE + SQL.FROM);
	  		sbQuery2.append(joinTableQuery2);
	  		sbQuery2.append(SQL.SEPERATE + SQL.WHERE + "1=1");
	  		sbQuery2.append(SQL.AND + "sb0.DELETE_YN = 'N'");
			
	  		
	  		sbQuerySpcn2.append(SQL.SEPERATE + SQL.SELECT + SQL.DISTINCT + "sb0.RESCH_SPCN_ID");
	  		sbQuerySpcn2.append(SQL.SEPERATE + SQL.FROM);
	  		sbQuerySpcn2.append(joinTableQuery2);
	  		sbQuerySpcn2.append(SQL.SEPERATE + SQL.WHERE + "1=1");
	  		sbQuerySpcn2.append(SQL.AND + "sb0.DELETE_YN = 'N'");
			
	  		System.out.println(sbQuery2.toString());
	  		System.out.println(sbQuerySpcn2.toString());
			
			Map<String,String> paramMap3 = new HashMap<String,String>();
			paramMap3.put("FILTER_QUERY", sbQuery2.toString());
			
			Map tmpiMap = (HashMap)paramArray.get(i);
			if("CLINICAL".equals(tmpiMap.get("ITEM_CATE_ID")) || "ETC".equals(tmpiMap.get("ITEM_CATE_ID")) ) {
				resultMap.put(tmpiMap.get("SEQ").toString(), sbQuery2.toString());
  			}
  			else if("GENOMIC".equals(tmpiMap.get("ITEM_CATE_ID"))) {
  				resultMap.put(tmpiMap.get("SEQ").toString(), sbQuerySpcn2.toString());
  			}
			
		}
		

		return resultMap;
	}

	@Override
	public Object loadselectedChartFilter(Map<Object, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map tmpMap = (HashMap)paramMap.get("ROW");
		StringBuffer sbQuery = new StringBuffer();
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		Map<Object,Object> paramMap2 = new HashMap<Object,Object>();

		String originQuery = tmpMap.get("ORIGIN_SQL").toString();
		if(originQuery.contains("#{CohortTable}")) {
			originQuery = originQuery.replace("#{CohortTable}", paramMap.get("CohortTable").toString());
		}
		String subQuery = paramMap.get("SUB_QUERY").toString();
		String paramChartType = tmpMap.get("CHART_TYPE").toString();
		String ITEM_COLUMN = tmpMap.get("ITEM_COLUMN").toString();
		String reschIdStr = "";
		
		if("CLINICAL".equals(tmpMap.get("ITEM_CATE_ID")) || "ETC".equals(tmpMap.get("ITEM_CATE_ID"))) {
			reschIdStr = "F1.RESCH_PAT_ID";
			
		}
		else if("GENOMIC".equals(tmpMap.get("ITEM_CATE_ID"))) {
			reschIdStr = "F1.RESCH_SPCN_ID";
			
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + "* , COUNT(*) AS CNT");
		//(SELECT count(distinct RESCH_PAT_ID) as CNT FROM pmsdev.PMGERCVEM)
		//sbQuery.append(SQL.SEPERATE + ", COUNT(*)/(SELECT count(*) FROM pmsdev."+tmpMap.get("BASE_DT_TABLE") + ")*100" + SQL.AS + "FREQ");
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + "(" );
		
		if(paramChartType.equals("GAO")) {
			String ITEM_LABEL = tmpMap.get("ITEM_LABEL").toString();
			String[] columnStr = ITEM_COLUMN.split("\\|");
			String[] labelStr = ITEM_LABEL.split(",");
			sbQuery.append(originQuery);
			sbQuery.append(SQL.SEPERATE + ")" + SQL.AS + "F1");
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			if(!subQuery.isEmpty()) {
				sbQuery.append(SQL.SEPERATE + SQL.AND + reschIdStr + SQL.IN + "(" + subQuery + ")");
			}
			sbQuery.append(SQL.SEPERATE + SQL.GROUP_BY);
			/*for(int i=0; i<labelStr.length; i++) {
				if(i!=0) sbQuery.append(" ,");
				sbQuery.append(SQL.SEPERATE + "C"+(i+1));
			}*/
			sbQuery.append(SQL.SEPERATE + "CKEY");
			sbQuery.append(SQL.SEPERATE + SQL.ORDER_BY + "CNT DESC");
		}
		else if(paramChartType.equals("GRD")) {
			sbQuery.append(originQuery);
			sbQuery.append(SQL.SEPERATE + ")" + SQL.AS + "F1");
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			if(!subQuery.isEmpty()) {
				sbQuery.append(SQL.SEPERATE + SQL.AND + reschIdStr + SQL.IN + "(" + subQuery + ")");
			}
			sbQuery.append(SQL.SEPERATE + SQL.GROUP_BY + "ITEM");
			sbQuery.append(SQL.SEPERATE + SQL.ORDER_BY + "CNT DESC");
		}
		else if(paramChartType.equals("BAR")) {
			sbQuery.append(originQuery);
			sbQuery.append(SQL.SEPERATE + ")" + SQL.AS + "F1");
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			if(!subQuery.isEmpty()) {
				sbQuery.append(SQL.SEPERATE + SQL.AND +  reschIdStr + SQL.IN + "(" + subQuery + ")");
			}
			sbQuery.append(SQL.SEPERATE + SQL.GROUP_BY + "ITEM");
			sbQuery.append(SQL.SEPERATE + SQL.ORDER_BY + "CNT DESC");
		}
		else if(paramChartType.equals("PIE")){
			sbQuery.append(originQuery);
			sbQuery.append(SQL.SEPERATE + ")" + SQL.AS + "F1");
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			if(!subQuery.isEmpty()) {
				sbQuery.append(SQL.SEPERATE + SQL.AND + reschIdStr + SQL.IN + "(" + subQuery + ")");
			}
			sbQuery.append(SQL.SEPERATE + SQL.GROUP_BY + "ITEM");
			sbQuery.append(SQL.SEPERATE + SQL.ORDER_BY + "CNT DESC");
		}
				
		paramMap2.put("DATAQUERY",sbQuery);
		System.out.println(sbQuery);
		resultMap.put("CHART",dashboardDAO.loadselectedChart(paramMap2));
		resultMap.put("QUERY",sbQuery);
		return resultMap;
	}
	
	public StringBuffer setjoinwhereQuery(Map tmpMap, String tAlias) {

		StringBuffer sbQuery = new StringBuffer();
		
		List tmpArr = (ArrayList)tmpMap.get("CONDITION");
		String BASE_TABLE = tmpMap.get("BASE_TABLE").toString();
		String BASE_SCHEMA = "pmsdev";
		String ITEM_ID = tmpMap.get("ITEM_ID").toString();
		
		Map chartMap = (HashMap)dashboardDAO.selectDashboardChartDetl(tmpMap);
		
		String CHART_TYPE = chartMap.get("CHART_TYPE").toString();
		String ITEM_COLUMN = chartMap.get("ITEM_COLUMN").toString();
		String EXEC_SQL = chartMap.get("EXEC_SQL").toString();
		
		if(CHART_TYPE.equals("PIE")) {
			
			sbQuery.append(SQL.SEPERATE + SQL.AND + ITEM_COLUMN + SQL.IN + "(");
			for(int j=0; j<tmpArr.size(); j++){
				if(j!=0) sbQuery.append( "," );
				sbQuery.append( "'" + tmpArr.get(j).toString() + "'");					
			}
			sbQuery.append( " ) ");	
		}
		else if(CHART_TYPE.equals("GRD")) {
				sbQuery.append(SQL.SEPERATE + SQL.AND + ITEM_COLUMN + SQL.IN + "(");
				for(int j=0; j<tmpArr.size(); j++){
					if(j!=0) sbQuery.append( "," );
					sbQuery.append( "'" + tmpArr.get(j).toString() + "'");					
				}
				sbQuery.append( " ) ");			
		}
		else if(CHART_TYPE.equals("BAR")) {
			sbQuery.append(SQL.SEPERATE + SQL.AND + ITEM_COLUMN +
					SQL.BETWEEN + tmpArr.get(0) + SQL.AND + tmpArr.get(1));
		}
		else if(CHART_TYPE.equals("GAO")) {
			String[] columnStr = ITEM_COLUMN.split("\\|");

			for(int j=0; j<tmpArr.size(); j++){
				List tmpArrOr = (ArrayList)tmpArr.get(j);
				sbQuery.append(SQL.SEPERATE + SQL.AND);
				//if(j!=0) sbQuery.append(SQL.OR);
				sbQuery.append(SQL.SEPERATE  + "(");
				for(int k=0; k<columnStr.length; k++) {
					if(k!=0) sbQuery.append(SQL.AND);
					sbQuery.append(SQL.SEPERATE + columnStr[k] + SQL.IN) ;
					sbQuery.append("(");
					for(int z=0; z<tmpArrOr.size(); z++) {
						if(z!=0) sbQuery.append(",");
						Map orMap = (HashMap)tmpArrOr.get(z);
						sbQuery.append( "'" +orMap.get(columnStr[k]).toString() + "'");
					}
					sbQuery.append(")");
				}
				sbQuery.append( " ) ");	
			}
			
		}
		
		return sbQuery;
	}
	
	@Override
	public Object insertCohortItemCont(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		Map<Object, Object> resultMap = new HashMap<Object, Object>();
		
		
		
		//파일명 설정
		Date dt = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss"); 
		String schema = "pmsdata";
		String tableName;
		String newTableName;
		String tableQuery;
		tableName = schema +"."+"P"+paramMap.get("PER_CODE").toString();
		newTableName = tableName +"_"+sdf.format(dt).toString();
		tableQuery = "("+paramMap.get("TABLENAME").toString() + ")";
		
		//날짜이름테이블 생성
		Map tableMap = new HashMap();
		tableMap.put("tableName", tableQuery);
		tableMap.put("newTableName", newTableName);
		dashboardDAO.createCohortTable(tableMap);
	
		resultMap.put("newTableName",newTableName);
		
		Map ddlMap = new HashMap();
		StringBuffer sbDDLQueryPat = new StringBuffer();
		StringBuffer sbDDLQuerySpcn = new StringBuffer();
		sbDDLQueryPat.append(SQL.CREATE +"INDEX RESCH_PAT_ID_IDX USING BTREE" + SQL.ON + newTableName +"(RESCH_PAT_ID)");
		sbDDLQuerySpcn.append(SQL.CREATE +"INDEX RESCH_SPCN_ID_IDX USING BTREE" + SQL.ON + newTableName +"(RESCH_SPCN_ID)");
		
		ddlMap.put("PatnoQuery", sbDDLQueryPat);
		dashboardDAO.selectCohortAnalysisPatno(ddlMap);
		
		ddlMap.put("PatnoQuery", sbDDLQuerySpcn);
		dashboardDAO.selectCohortAnalysisPatno(ddlMap);
		
		paramMap.put("TABLE_NM", newTableName);
		dashboardDAO.insertCohortItemCont(paramMap);
		
		//System.out.println(paramMap);
		List selectedArr = new ArrayList();
		List filterArr = new ArrayList();
		selectedArr = (ArrayList)paramMap.get("SELECTED_CHART");
		filterArr  = (ArrayList)paramMap.get("FILTER");
		for(int i=0; i<selectedArr.size(); i++) {
			Map<Object, Object> dataMap = new HashMap<Object,Object>();
			Map chartMap = (HashMap)selectedArr.get(i);
			dataMap.put("CONT_SEQ",paramMap.get("SEQ"));
			dataMap.put("CHART_SEQ",chartMap.get("SEQ"));
			
			dataMap.put("CRT_ID",paramMap.get("CRT_ID"));
			dataMap.put("UDT_ID",paramMap.get("UDT_ID"));
			dashboardDAO.insertCohortItemContChart(dataMap);
			
		}
		for(int i=0; i<filterArr.size(); i++) {
			Map<Object, Object> dataMap = new HashMap<Object,Object>();
			Map filterMap = (HashMap)filterArr.get(i);

			dataMap.put("CONT_SEQ",paramMap.get("SEQ"));
			dataMap.put("CHART_SEQ",filterMap.get("SEQ"));
			dataMap.put("CHART_TYPE",filterMap.get("CHART_TYPE"));
			//dataMap.put("BASE_TABLE",filterMap.get("BASE_TABLE"));
			dataMap.put("CHART_ID",filterMap.get("ITEM_ID"));
			dataMap.put("CRT_ID",paramMap.get("CRT_ID"));
			dataMap.put("UDT_ID",paramMap.get("UDT_ID"));
			dashboardDAO.insertCohortItemContFilter(dataMap);
			System.out.println(dataMap);
			
			List conditionArr = (ArrayList)filterMap.get("CONDITION");
			if("GAO".equals(filterMap.get("CHART_TYPE"))) {
				for(int j=0; j<conditionArr.size(); j++) {
					List conditionGAOArr = (ArrayList)conditionArr.get(j);
					for(int k=0; k<conditionGAOArr.size(); k++) {
						Map<Object, Object> detlMap = new HashMap<Object,Object>();
						Map valueMap = (HashMap)conditionGAOArr.get(k);
						//Map filterDetlMap = (HashMap)conditionArr.get(j);
						detlMap.put("CONT_FILTER_SEQ", dataMap.get("SEQ"));
						detlMap.put("CHART_SEQ", filterMap.get("SEQ"));

						detlMap.put("CRT_ID",paramMap.get("CRT_ID"));
						detlMap.put("UDT_ID",paramMap.get("UDT_ID"));
						String filterKey = "";
						String filterValue = "";
						/*for( Object key :  valueMap.keySet() ) {
							detlMap.put("FILTER_KEY", key);
							detlMap.put("FILTER_VALUE", valueMap.get(key));
							filterKey += key;
							
						}*/
						filterKey = String.join("|", valueMap.keySet());
						filterValue = String.join("|", valueMap.values());
						detlMap.put("FILTER_KEY", filterKey);
						detlMap.put("FILTER_VALUE", filterValue);
						
						dashboardDAO.insertCohortItemContFilterDetl(detlMap);
					}
			
				}
			}
			else {
					Map<Object, Object> detlMap = new HashMap<Object,Object>();
					detlMap.put("CONT_FILTER_SEQ", dataMap.get("SEQ"));
					detlMap.put("CHART_SEQ", filterMap.get("SEQ"));
					
					String filterValue = String.join("|", conditionArr);
					
					detlMap.put("FILTER_VALUE", filterValue);
					
					detlMap.put("CRT_ID",paramMap.get("CRT_ID"));
					detlMap.put("UDT_ID",paramMap.get("UDT_ID"));
					
					dashboardDAO.insertCohortItemContFilterDetl(detlMap);
			}
				
				
			
			
		}
		
		
		return resultMap;
	}

	@Override
	public Object selectCateOncotreeList(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		return dashboardDAO.selectCateOncotreeList(paramMap);
	}

	@Override
	public Object selectMainPatientChart(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		return dashboardDAO.selectMainPatientChart(paramMap);
	}

	@Override
	public Object selectPatnoResultCheck(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		return dashboardDAO.selectPatnoResultCheck(paramMap);
	}

	@Override
	public Object selectReschPatnoResultCheck(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		return dashboardDAO.selectReschPatnoResultCheck(paramMap);
	}

	@Override
	public Object selectCohortAnalysisPatnoByNo(Map<Object, Object> paramMap) {
		
		paramMap.put("PATNO", paramMap.get("TXTARR"));
		
		
		String flag;
		String tableNM = "P"+paramMap.get("PER_CODE").toString();
		Map chkMap = new HashMap();
		chkMap.put("SCHEMA", "pmsdata");
		chkMap.put("TABLE", tableNM);
		
		flag = (String)dashboardDAO.selectCheckCohortTable(chkMap);
		
		if(flag.equals("1")) {
			StringBuffer sbdropQuery = new StringBuffer();
			sbdropQuery.append(SQL.SEPERATE + "TRUNCATE" + SQL.TABLE + "pmsdata." + tableNM);
			Map dropMap = new HashMap();
			dropMap.put("PatnoQuery", sbdropQuery);
			dashboardDAO.selectCohortAnalysisPatno(dropMap);
		}
		StringBuffer sbQuery = new StringBuffer();

		if(flag.equals("1")) {
			sbQuery.append(SQL.SEPERATE + SQL.INSERT_INTO + "pmsdata.P"+paramMap.get("PER_CODE").toString());
		}
		else {
			sbQuery.append(SQL.SEPERATE + SQL.CREATE + SQL.TABLE + "pmsdata.P"+paramMap.get("PER_CODE").toString() + SQL.AS);
		}
		sbQuery.append(SQL.SEPERATE + "(");
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.DISTINCT + "a.RESCH_PAT_ID, b.PRCI_MEDIC_RESCH_SPCN_ID as RESCH_SPCN_ID, 'N' as DELETE_YN");
		//sbQuery.append(SQL.SEPERATE + SQL.DISTINCT + "RESCH_PAT_ID");
		//sbQuery.append(SQL.SEPERATE + "," + "'N'" + SQL.AS + "DELETE_YN");
		sbQuery.append(SQL.SEPERATE + SQL.FROM + "pmsdev.MSMAMCAMN a");
		sbQuery.append(SQL.SEPERATE + SQL.JOIN + "pmsdev.PMGEMSPCN b" + SQL.ON +"a.RESCH_PAT_ID = b.RESCH_PAT_ID");
		sbQuery.append(SQL.SEPERATE + SQL.WHERE);
		sbQuery.append(SQL.SEPERATE + "1=1");
		if(paramMap.get("KIND").equals("patnoA")) {
			sbQuery.append(SQL.SEPERATE + SQL.AND + "PATNO" + SQL.IN);
		}
		else {
			sbQuery.append(SQL.SEPERATE + SQL.AND + "a.RESCH_PAT_ID" + SQL.IN);
		}
		sbQuery.append(SQL.SEPERATE + "(");
		sbQuery.append(SQL.SEPERATE + "");
		sbQuery.append(SQL.SEPERATE + StringUtils.nvl(paramMap.get("TXTARR").toString(), "''") );
		sbQuery.append(SQL.SEPERATE + ")");
		sbQuery.append(SQL.SEPERATE + ")");
		System.out.println(sbQuery);
		
		paramMap.put("PatnoQuery", sbQuery);
		
		Map resultMap = new HashMap();
		resultMap.put("SUCCESS", dashboardDAO.selectCohortAnalysisPatno(paramMap));

		if(!flag.equals("1")) {
			Map ddlMap = new HashMap();
			StringBuffer sbDDLQueryPat = new StringBuffer();
			StringBuffer sbDDLQuerySpcn = new StringBuffer();
			sbDDLQueryPat.append(SQL.CREATE +"INDEX RESCH_PAT_ID_IDX USING BTREE" + SQL.ON + "pmsdata.P"+paramMap.get("PER_CODE").toString() +"(RESCH_PAT_ID)");
			sbDDLQuerySpcn.append(SQL.CREATE +"INDEX RESCH_SPCN_ID_IDX USING BTREE" + SQL.ON + "pmsdata.P"+paramMap.get("PER_CODE").toString() +"(RESCH_SPCN_ID)");
			
			ddlMap.put("PatnoQuery", sbDDLQueryPat);
			dashboardDAO.selectCohortAnalysisPatno(ddlMap);
			
			ddlMap.put("PatnoQuery", sbDDLQuerySpcn);
			dashboardDAO.selectCohortAnalysisPatno(ddlMap);
		}
		
		return resultMap;
	}
	
	
	@Override
	public Object selectCohortAnalysisPatno(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		
		String flag;
		String tableNM = "P"+paramMap.get("PER_CODE").toString();
		Map chkMap = new HashMap();
		chkMap.put("SCHEMA", "pmsdata");
		chkMap.put("TABLE", tableNM);
		
		flag = (String)dashboardDAO.selectCheckCohortTable(chkMap);
		
		if(flag.equals("1")) {
			StringBuffer sbdropQuery = new StringBuffer();
			sbdropQuery.append(SQL.SEPERATE + "TRUNCATE" + SQL.TABLE + "pmsdata." + tableNM);
			Map dropMap = new HashMap();
			dropMap.put("PatnoQuery", sbdropQuery);
			dashboardDAO.selectCohortAnalysisPatno(dropMap);
		}

		StringBuffer sbQuery = new StringBuffer();
		
		if(flag.equals("1")) {
			sbQuery.append(SQL.SEPERATE + SQL.INSERT_INTO + "pmsdata.P"+paramMap.get("PER_CODE").toString());
		}
		else {
			sbQuery.append(SQL.SEPERATE + SQL.CREATE + SQL.TABLE + "pmsdata.P"+paramMap.get("PER_CODE").toString() + SQL.AS);
		}
		sbQuery.append(SQL.SEPERATE + "(");
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.DISTINCT + "a.RESCH_PAT_ID, b.PRCI_MEDIC_RESCH_SPCN_ID as RESCH_SPCN_ID, 'N' as DELETE_YN");
		//sbQuery.append(SQL.SEPERATE + "," + "'N'" + SQL.AS + "DELETE_YN");
		sbQuery.append(SQL.SEPERATE + SQL.FROM + "pmsdev.MSMAMCAMN a");
		sbQuery.append(SQL.SEPERATE + SQL.JOIN + "pmsdev.PMGEMSPCN b" + SQL.ON +"a.RESCH_PAT_ID = b.RESCH_PAT_ID");
		sbQuery.append(SQL.SEPERATE + SQL.WHERE);
		
		List codeList = new ArrayList();
		codeList = (ArrayList)paramMap.get("codelist");
		for(int i=0; i<codeList.size(); i++) {
			if(i != 0) sbQuery.append(SQL.SEPERATE + SQL.OR);
			
			sbQuery.append(SQL.SEPERATE + "(");
			
			Map tmpMap = (HashMap)codeList.get(i);
			String[] CNMN_CRCN_CD = tmpMap.get("CNMN_CRCN_CD").toString().split(",");
			sbQuery.append(SQL.SEPERATE + "CRCN_CD" + SQL.IN);
			sbQuery.append(SQL.SEPERATE + "(");
			for(int j=0; j<CNMN_CRCN_CD.length; j++) {
				if(j!=0) sbQuery.append(",");
				sbQuery.append("'" + CNMN_CRCN_CD[j] + "'");
			}
			sbQuery.append(SQL.SEPERATE + ")");
			
			String[] CNMN_PRMR_ORGAN_CD = tmpMap.get("CNMN_PRMR_ORGAN_CD").toString().split(",");
			sbQuery.append(SQL.SEPERATE + SQL.AND + "PRMR_ORGAN_CD" + SQL.IN);
			sbQuery.append(SQL.SEPERATE + "(");
			for(int j=0; j<CNMN_PRMR_ORGAN_CD.length; j++) {
				if(j!=0) sbQuery.append(",");
				sbQuery.append("'" + CNMN_PRMR_ORGAN_CD[j] + "'");
			}
			sbQuery.append(SQL.SEPERATE + ")");
			if(tmpMap.containsKey("CNMN_MRPH_DIAG_CD")) {
				String[] CNMN_MRPH_DIAG_CD = tmpMap.get("CNMN_MRPH_DIAG_CD").toString().split(",");
				sbQuery.append(SQL.SEPERATE + SQL.AND + "MRPH_DIAG_CD" + SQL.IN);
				sbQuery.append(SQL.SEPERATE + "(");
				for(int j=0; j<CNMN_MRPH_DIAG_CD.length; j++) { 
					if(j!=0) sbQuery.append(",");
					sbQuery.append("'" + CNMN_MRPH_DIAG_CD[j] + "'");
				}
				sbQuery.append(SQL.SEPERATE + ")");
			}

			sbQuery.append(SQL.SEPERATE + ")");
			
		}
		sbQuery.append(SQL.SEPERATE + ")");
		System.out.println(sbQuery);
		paramMap.put("PatnoQuery", sbQuery);
		
		Map resultMap = new HashMap();
		resultMap.put("SUCCESS", dashboardDAO.selectCohortAnalysisPatno(paramMap));
		
		if(!flag.equals("1")) {
			Map ddlMap = new HashMap();
			StringBuffer sbDDLQueryPat = new StringBuffer();
			StringBuffer sbDDLQuerySpcn = new StringBuffer();
			sbDDLQueryPat.append(SQL.CREATE +"INDEX RESCH_PAT_ID_IDX USING BTREE" + SQL.ON + "pmsdata.P"+paramMap.get("PER_CODE").toString() +"(RESCH_PAT_ID)");
			sbDDLQuerySpcn.append(SQL.CREATE +"INDEX RESCH_SPCN_ID_IDX USING BTREE" + SQL.ON + "pmsdata.P"+paramMap.get("PER_CODE").toString() +"(RESCH_SPCN_ID)");
			
			ddlMap.put("PatnoQuery", sbDDLQueryPat);
			dashboardDAO.selectCohortAnalysisPatno(ddlMap);
			
			ddlMap.put("PatnoQuery", sbDDLQuerySpcn);
			dashboardDAO.selectCohortAnalysisPatno(ddlMap);
		}
		
		return resultMap;
	}

	@Override
	public Object loadselectedCohort(Map<Object, Object> paramMap) throws Exception {
		List tableList = new ArrayList();
		tableList = (ArrayList)paramMap.get("TABLE_LIST");
		String selectCol = "RESCH_PAT_ID";
		StringBuffer sbQuery = new StringBuffer();
		
		for(int i=0; i<tableList.size(); i++) {
			
			if(i==0) {
				sbQuery.append(SQL.SEPERATE + SQL.SELECT + selectCol);
				sbQuery.append(SQL.SEPERATE + SQL.FROM + tableList.get(i));
				sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
				sbQuery.append(SQL.SEPERATE + SQL.AND + "DELETE_YN = 'N'");
			}
			else {
				sbQuery.append(SQL.SEPERATE + SQL.UNION);

				sbQuery.append(SQL.SEPERATE + SQL.SELECT + selectCol);
				sbQuery.append(SQL.SEPERATE + SQL.FROM + tableList.get(i));
				sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
				sbQuery.append(SQL.SEPERATE + SQL.AND + "DELETE_YN = 'N'");
			}
		}
		
		paramMap.put("DATAQUERY", sbQuery);
		
		StringBuffer sbQuery2 = new StringBuffer();
		
		for(int i=0; i<tableList.size(); i++) {
			
			if(i==0) {
				sbQuery2.append(SQL.SEPERATE + SQL.SELECT + selectCol + ",DELETE_YN");
				sbQuery2.append(SQL.SEPERATE + SQL.FROM + tableList.get(i));
				sbQuery2.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			}
			else {
				sbQuery2.append(SQL.SEPERATE + SQL.UNION);
				
				sbQuery2.append(SQL.SEPERATE + SQL.SELECT + selectCol + ",DELETE_YN");
				sbQuery2.append(SQL.SEPERATE + SQL.FROM + tableList.get(i));
				sbQuery2.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			}
		}
		
		Map resultMap = new HashMap();
		resultMap.put("loadselectedCohort", dashboardDAO.loadselectedChart(paramMap));
		resultMap.put("CohortTableQuery", sbQuery);
		resultMap.put("CohortTableQueryAll", sbQuery2);

		return resultMap;
	}

	@Override
	public Object loadselectedChartDefault(Map<Object, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object selectSavedCohortList(Map<Object, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub

		List cohortList = (ArrayList)paramMap.get("CONT_SEQ");
		List resultList = new ArrayList();
		
		for(int i=0; i<cohortList.size(); i++) {
			Map tmpMap = new HashMap();
			tmpMap.put("SEQ", cohortList.get(i));
			resultList.add(dashboardDAO.selectSavedCohortList(tmpMap));
		}
		
		StringBuffer sbQueryUnion = new StringBuffer();
		
		for(int i=0; i<resultList.size(); i++) {
			Map svCohortMap = (HashMap)resultList.get(i);
			
			if(i==0) {
				sbQueryUnion.append(SQL.SEPERATE + SQL.SELECT + "*");
				sbQueryUnion.append(SQL.SEPERATE + SQL.FROM + svCohortMap.get("TABLE_NM"));
				sbQueryUnion.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			}
			else {
				sbQueryUnion.append(SQL.SEPERATE + SQL.UNION);

				sbQueryUnion.append(SQL.SEPERATE + SQL.SELECT + "*");
				sbQueryUnion.append(SQL.SEPERATE + SQL.FROM + svCohortMap.get("TABLE_NM"));
				sbQueryUnion.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			}
		}
	
		String flag;
		String tableNM = "P"+paramMap.get("PER_CODE").toString();
		Map chkMap = new HashMap();
		chkMap.put("SCHEMA", "pmsdata");
		chkMap.put("TABLE", tableNM);
		
		flag = (String)dashboardDAO.selectCheckCohortTable(chkMap);
		
		if(flag.equals("1")) {
			StringBuffer sbdropQuery = new StringBuffer();
			sbdropQuery.append(SQL.SEPERATE + "TRUNCATE" + SQL.TABLE + "pmsdata." + tableNM);
			Map dropMap = new HashMap();
			dropMap.put("PatnoQuery", sbdropQuery);
			dashboardDAO.selectCohortAnalysisPatno(dropMap);
		}
		StringBuffer sbQuery = new StringBuffer();

		if(flag.equals("1")) {
			sbQuery.append(SQL.SEPERATE + SQL.INSERT_INTO + "pmsdata.P"+paramMap.get("PER_CODE").toString());
		}
		else {
			sbQuery.append(SQL.SEPERATE + SQL.CREATE + SQL.TABLE + "pmsdata.P"+paramMap.get("PER_CODE").toString() + SQL.AS);
		}
		//sbQuery.append(SQL.SEPERATE + "(");
		sbQuery.append(sbQueryUnion);
		//sbQuery.append(SQL.SEPERATE + ")");
		System.out.println(sbQuery);
		
		paramMap.put("PatnoQuery", sbQuery);
		dashboardDAO.selectCohortAnalysisPatno(paramMap);
		
		if(!flag.equals("1")) {
			Map ddlMap = new HashMap();
			StringBuffer sbDDLQueryPat = new StringBuffer();
			StringBuffer sbDDLQuerySpcn = new StringBuffer();
			sbDDLQueryPat.append(SQL.CREATE +"INDEX RESCH_PAT_ID_IDX USING BTREE" + SQL.ON + "pmsdata.P"+paramMap.get("PER_CODE").toString() +"(RESCH_PAT_ID)");
			sbDDLQuerySpcn.append(SQL.CREATE +"INDEX RESCH_SPCN_ID_IDX USING BTREE" + SQL.ON + "pmsdata.P"+paramMap.get("PER_CODE").toString() +"(RESCH_SPCN_ID)");
			
			ddlMap.put("PatnoQuery", sbDDLQueryPat);
			dashboardDAO.selectCohortAnalysisPatno(ddlMap);
			
			ddlMap.put("PatnoQuery", sbDDLQuerySpcn);
			dashboardDAO.selectCohortAnalysisPatno(ddlMap);
		}
		
		
		
		return resultList;
	}

	@Override
	public void updateDashboardTabNo(Map<Object, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		dashboardDAO.updateDashboardTabNo(paramMap);
	}

	@Override
	public void deleteMycohortCont(Map<Object, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		List contArr = (ArrayList)paramMap.get("CHKSEQ");
		for(int i=0; i<contArr.size(); i++) {
			paramMap.put("SEQ", contArr.get(i));
			dashboardDAO.deleteMycohortCont(paramMap);
			
			Map delMap = new HashMap();
			delMap.put("CONT_SEQ", contArr.get(i));
			List filterArr = (ArrayList)dashboardDAO.selectMycohortContFilter(delMap);
			
			dashboardDAO.deleteMycohortContChart(delMap);
			dashboardDAO.deleteMycohortContFilter(delMap);
			
			
			for(int j=0; j<filterArr.size(); j++) {
				Map filterDelMap = new HashMap();
				filterDelMap.put("CONT_FILTER_SEQ", filterArr.get(j));
				
				dashboardDAO.deleteMycohortContFilterDetl(filterDelMap);
			}
			
			
		}
		
		
	}
	
}
