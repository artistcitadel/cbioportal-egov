package com.softcen.bigcen.med.main.service;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		List paramArray = new ArrayList();
		paramArray = (ArrayList)paramMap.get("FILTER");
		
		List tableList = new ArrayList();
		
		StringBuffer joinTableQuery = new StringBuffer();
		StringBuffer joinwhereQuery = new StringBuffer();
		
		tableList.add(paramMap.get("CREATEDTABLE"));
		String createdtable = "pmsdata." + paramMap.get("CREATEDTABLE").toString();
		joinTableQuery.append(createdtable + SQL.AS + "sb0");
		
		//전체 쿼리
		//sbQuery.append(SQL.SEPERATE + paramMap.get("COHORTSET"));
  		for(int i=0; i<paramArray.size(); i++) {
  			Map tmpMap = (HashMap)paramArray.get(i);
  			  			
  			//String BASE_SCHEMA = "pmsdev";
  			String BASE_TABLE = tmpMap.get("BASE_TABLE").toString();
  			String ITEM_ID = tmpMap.get("ITEM_ID").toString();
  			String schmatable = BASE_TABLE;
  			
  			if(tableList.indexOf(schmatable) == -1) {
  				tableList.add(schmatable);
  				int tListsz = tableList.indexOf(schmatable);
				String tAlias = "sb" + tListsz;
				joinTableQuery.append(SQL.SEPERATE + SQL.JOIN + schmatable + SQL.AS + tAlias);
				joinwhereQuery.append(SQL.SEPERATE + SQL.AND + "sb0.RESCH_PAT_ID" + SQL.EQUAL + tAlias + ".RESCH_PAT_ID");
				joinwhereQuery.append(setjoinwhereQuery(tmpMap, tAlias));
				
  			}else {
  				int tListsz = tableList.indexOf(schmatable);
				String tAlias = "sb" + tListsz;
	  			joinwhereQuery.append(setjoinwhereQuery(tmpMap, tAlias));

  			}
  			
		}
  		sbQuery.append(SQL.SEPERATE + SQL.SELECT + "sb0.RESCH_PAT_ID");
  		sbQuery.append(SQL.SEPERATE + SQL.FROM);
  		sbQuery.append(SQL.SEPERATE + joinTableQuery);
  		if(tableList.size() > 1 ) sbQuery.append(SQL.SEPERATE + SQL.ON + "1=1");
  		sbQuery.append(SQL.SEPERATE + joinwhereQuery);
  		sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
  		sbQuery.append(SQL.AND + "sb0.DELETE_YN = 'N'");
  		
  		
  		
		System.out.println(sbQuery.toString());
		paramMap2.put("FILTER_QUERY", sbQuery.toString());
		resultMap.put("all",sbQuery.toString());
		
		
		//개별 쿼리
		for(int i=0; i<paramArray.size(); i++) {
			List tableList2 = new ArrayList();
			
			StringBuffer joinTableQuery2 = new StringBuffer();
			StringBuffer joinwhereQuery2 = new StringBuffer();
			
			tableList2.add(paramMap.get("CREATEDTABLE"));
			String createdtable2 = "pmsdata." + paramMap.get("CREATEDTABLE").toString();
			joinTableQuery2.append(SQL.SEPERATE + createdtable + SQL.AS + "sb0");
			
			StringBuffer sbQuery2 = new StringBuffer();
			//sbQuery2.append(SQL.SEPERATE + paramMap.get("COHORTSET"));
			for(int j=0; j<paramArray.size(); j++) {
				if(j==i) continue;
				Map tmpMap = (HashMap)paramArray.get(j);
		
				//String BASE_SCHEMA = "pmsdev";
	  			String BASE_TABLE = tmpMap.get("BASE_TABLE").toString();
	  			String ITEM_ID = tmpMap.get("ITEM_ID").toString();
	  			String schmatable = BASE_TABLE;
	  			
	  			if(tableList2.indexOf(schmatable) == -1) {
	  				tableList2.add(schmatable);
	  				int tListsz = tableList.indexOf(schmatable);
					String tAlias = "sb" + tListsz;
					joinTableQuery2.append(SQL.SEPERATE + SQL.JOIN + schmatable + SQL.AS + tAlias);
					joinwhereQuery2.append(SQL.SEPERATE + SQL.AND + "sb0.RESCH_PAT_ID" + SQL.EQUAL + tAlias + ".RESCH_PAT_ID");
					joinwhereQuery2.append(setjoinwhereQuery(tmpMap, tAlias));
					
	  			}else {
	  				int tListsz = tableList.indexOf(schmatable);
					String tAlias = "sb" + tListsz;
		  			joinwhereQuery2.append(setjoinwhereQuery(tmpMap, tAlias));

	  			}

			}
			
			sbQuery2.append(SQL.SEPERATE + SQL.SELECT + "sb0.RESCH_PAT_ID");
	  		sbQuery2.append(SQL.SEPERATE + SQL.FROM);
	  		sbQuery2.append(SQL.SEPERATE + joinTableQuery2);
	  		if(tableList2.size() > 1 ) sbQuery2.append(SQL.SEPERATE + SQL.ON + "1=1");
	  		sbQuery2.append(SQL.SEPERATE + joinwhereQuery2);
	  		sbQuery2.append(SQL.SEPERATE + SQL.WHERE + "1=1");
	  		sbQuery2.append(SQL.SEPERATE + SQL.AND + "sb0.DELETE_YN = 'N'");
	  		
			System.out.println(sbQuery2.toString());
			
			Map<String,String> paramMap3 = new HashMap<String,String>();
			paramMap3.put("FILTER_QUERY", sbQuery2.toString());
/*			List resultArr2 = new ArrayList();
			resultArr2 = (ArrayList)dashboardDAO.selectfilterApply(paramMap3);*/
			
			Map tmpiMap = (HashMap)paramArray.get(i);
			resultMap.put(tmpiMap.get("SEQ").toString(), sbQuery2.toString());
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
		String subQuery = paramMap.get("SUB_QUERY").toString();
		String paramChartType = tmpMap.get("CHART_TYPE").toString();
		String ITEM_COLUMN = tmpMap.get("ITEM_COLUMN").toString();
		
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + "* , COUNT(*) AS CNT");
		//(SELECT count(distinct RESCH_PAT_ID) as CNT FROM pmsdev.PMGERCVEM)
		//sbQuery.append(SQL.SEPERATE + ", COUNT(*)/(SELECT count(*) FROM pmsdev."+tmpMap.get("BASE_DT_TABLE") + ")*100" + SQL.AS + "FREQ");
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + "(" );
		
		if(paramChartType.equals("GAO")) {
			String ITEM_LABEL = tmpMap.get("ITEM_LABEL").toString();
			String[] columnStr = ITEM_COLUMN.split(",");
			String[] labelStr = ITEM_LABEL.split(",");
			sbQuery.append(originQuery);
			sbQuery.append(SQL.SEPERATE + ")" + SQL.AS + "F1");
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			if(!subQuery.isEmpty()) {
				sbQuery.append(SQL.SEPERATE + SQL.AND + "F1.RESCH_PAT_ID" + SQL.IN + "(" + subQuery + ")");
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
				sbQuery.append(SQL.SEPERATE + SQL.AND + "F1.RESCH_PAT_ID" + SQL.IN + "(" + subQuery + ")");
			}
			sbQuery.append(SQL.SEPERATE + SQL.GROUP_BY + "ITEM");
			sbQuery.append(SQL.SEPERATE + SQL.ORDER_BY + "CNT DESC");
		}
		else if(paramChartType.equals("BAR")) {
			sbQuery.append(originQuery);
			sbQuery.append(SQL.SEPERATE + ")" + SQL.AS + "F1");
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			if(!subQuery.isEmpty()) {
				sbQuery.append(SQL.SEPERATE + SQL.AND + "F1.RESCH_PAT_ID" + SQL.IN + "(" + subQuery + ")");
			}
			sbQuery.append(SQL.SEPERATE + SQL.GROUP_BY + "ITEM");
			sbQuery.append(SQL.SEPERATE + SQL.ORDER_BY + "CNT DESC");
		}
		else if(paramChartType.equals("PIE")){
			sbQuery.append(originQuery);
			sbQuery.append(SQL.SEPERATE + ")" + SQL.AS + "F1");
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			if(!subQuery.isEmpty()) {
				sbQuery.append(SQL.SEPERATE + SQL.AND + "F1.RESCH_PAT_ID" + SQL.IN + "(" + subQuery + ")");
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
			String[] columnStr = ITEM_COLUMN.split(",");

			for(int j=0; j<tmpArr.size(); j++){
				List tmpArrOr = (ArrayList)tmpArr.get(j);
				sbQuery.append(SQL.SEPERATE + SQL.AND);
				//if(j!=0) sbQuery.append(SQL.OR);
				sbQuery.append(SQL.SEPERATE  + "(");
				for(int k=0; k<columnStr.length; k++) {
					if(k!=0) sbQuery.append(SQL.AND);
					sbQuery.append(SQL.SEPERATE + tAlias + "." + columnStr[k] + SQL.IN) ;
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
	
	public StringBuffer setFilteringChartQuerySec(Map tmpMap) {
		StringBuffer sbQuery = new StringBuffer();
		
		List tmpArr = (ArrayList)tmpMap.get("CONDITION");
		String BASE_TABLE = tmpMap.get("BASE_TABLE").toString();
		String ITEM_ID = tmpMap.get("ITEM_ID").toString();
		
		Map chartMap = (HashMap)dashboardDAO.selectDashboardChartDetl(tmpMap);
		
		String CHART_TYPE = chartMap.get("CHART_TYPE").toString();
		String ITEM_COLUMN = chartMap.get("ITEM_COLUMN").toString();
		
		
		
		

		
		if(CHART_TYPE.equals("PIE")) {
			sbQuery.append(SQL.SEPERATE + SQL.SELECT);
			sbQuery.append(SQL.SEPERATE + "RESCH_PAT_ID");
			sbQuery.append(SQL.SEPERATE + SQL.FROM);
			sbQuery.append(SQL.SEPERATE + "pmsdev" + "." + BASE_TABLE);
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			sbQuery.append(SQL.SEPERATE + SQL.AND + ITEM_COLUMN + SQL.IN + "(");
			for(int j=0; j<tmpArr.size(); j++){
				if(j!=0) sbQuery.append( "," );
				sbQuery.append( "'" + tmpArr.get(j).toString() + "'");					
			}
			sbQuery.append( " ) ");	
		}
		else if(CHART_TYPE.equals("GRD")) {
			if(BASE_TABLE.equals("GLIS_SV")) {
				sbQuery.append(SQL.SEPERATE + SQL.SELECT);
				sbQuery.append(SQL.SEPERATE + "T2.PATIENT_ID AS RESCH_PAT_ID");
				sbQuery.append(SQL.SEPERATE + SQL.FROM);
				sbQuery.append(SQL.SEPERATE + "pmsdev" + "." + BASE_TABLE + SQL.AS +"T1");
				sbQuery.append(SQL.SEPERATE + SQL.JOIN + "pmsdev.GLIS_CI" +  SQL.AS + "T2");
				sbQuery.append(SQL.SEPERATE + SQL.ON + "T1.SMP_ID" + SQL.EQUAL + "T2.SAMPLE_ID");
				sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
				sbQuery.append(SQL.SEPERATE + SQL.AND + ITEM_COLUMN + SQL.IN + "(");
				for(int j=0; j<tmpArr.size(); j++){
					if(j!=0) sbQuery.append( "," );
					sbQuery.append( "'" + tmpArr.get(j).toString() + "'");					
				}
				sbQuery.append( " ) ");			
			}
		}
		else if(CHART_TYPE.equals("BAR")) {
			sbQuery.append(SQL.SEPERATE + SQL.SELECT);
			sbQuery.append(SQL.SEPERATE + "RESCH_PAT_ID");
			sbQuery.append(SQL.SEPERATE + SQL.FROM);
			sbQuery.append(SQL.SEPERATE + "pmsdev" + "." + BASE_TABLE);
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			sbQuery.append(SQL.SEPERATE + SQL.AND + ITEM_COLUMN + SQL.BETWEEN + tmpArr.get(0) + SQL.AND + tmpArr.get(1));
		}
		else if(CHART_TYPE.equals("GAO")) {
			String[] columnStr = ITEM_COLUMN.split(",");

			sbQuery.append(SQL.SEPERATE + SQL.SELECT);
			sbQuery.append(SQL.SEPERATE + "RESCH_PAT_ID" + SQL.AS + "RESCH_PAT_ID");
			sbQuery.append(SQL.SEPERATE + SQL.FROM);
			sbQuery.append(SQL.SEPERATE + "pmsdev" + "." + BASE_TABLE);
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			sbQuery.append(SQL.SEPERATE);
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
		String tableName = schema +"."+"P"+paramMap.get("PER_CODE").toString();
		String newTableName = tableName +"_"+sdf.format(dt).toString();
		
		//날짜이름테이블 생성
		Map tableMap = new HashMap();
		tableMap.put("tableName", tableName);
		tableMap.put("newTableName", newTableName);
		dashboardDAO.createCohortTable(tableMap);
	
		resultMap.put("newTableName",newTableName);
		
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
			dataMap.put("BASE_TABLE",filterMap.get("BASE_TABLE"));
			dataMap.put("CHART_ID",filterMap.get("ITEM_ID"));
			dataMap.put("CRT_ID",paramMap.get("CRT_ID"));
			dataMap.put("UDT_ID",paramMap.get("UDT_ID"));
			dashboardDAO.insertCohortItemContFilter(dataMap);
			System.out.println(dataMap);
			List conditionArr = (ArrayList)filterMap.get("CONDITION");
			for(int j=0; j<conditionArr.size(); j++) {
				
				if("GAO".equals(filterMap.get("CHART_TYPE"))) {
					List conditionGAOArr = (ArrayList)conditionArr.get(j);
					for(int k=0; k<conditionGAOArr.size(); k++) {
						Map<Object, Object> detlMap = new HashMap<Object,Object>();
						Map valueMap = (HashMap)conditionGAOArr.get(j);
						//Map filterDetlMap = (HashMap)conditionArr.get(j);
						detlMap.put("CONT_FILTER_SEQ", dataMap.get("SEQ"));
						detlMap.put("CHART_SEQ", filterMap.get("SEQ"));

						detlMap.put("CRT_ID",paramMap.get("CRT_ID"));
						detlMap.put("UDT_ID",paramMap.get("UDT_ID"));
						for( Object key :  valueMap.keySet() ) {
							detlMap.put("FILTER_KEY", key);
							detlMap.put("FILTER_VALUE", valueMap.get(key));
							dashboardDAO.insertCohortItemContFilterDetl(detlMap);
						}
						
						
					}
				}
				else {
					Map<Object, Object> detlMap = new HashMap<Object,Object>();
					//Map filterDetlMap = (HashMap)conditionArr.get(j);
					detlMap.put("CONT_FILTER_SEQ", dataMap.get("SEQ"));
					detlMap.put("CHART_SEQ", filterMap.get("SEQ"));
					detlMap.put("FILTER_VALUE", conditionArr.get(j));
					detlMap.put("CRT_ID",paramMap.get("CRT_ID"));
					detlMap.put("UDT_ID",paramMap.get("UDT_ID"));
					
					dashboardDAO.insertCohortItemContFilterDetl(detlMap);
				}
				
				
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
		
		/*List tmpArr = (ArrayList)paramMap.get("TXTARR");
		String patno = "''";
		for(int i=0; i<tmpArr.size(); i++) {
			patno += ",'"+tmpArr.get(i).toString()+"'";
		}*/
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
		sbQuery.append(SQL.SEPERATE + SQL.DISTINCT + "RESCH_PAT_ID");
		sbQuery.append(SQL.SEPERATE + "," + "'N'" + SQL.AS + "DELETE_YN");
		sbQuery.append(SQL.SEPERATE + SQL.FROM + "pmsdev.CLPIMRPID");
		sbQuery.append(SQL.SEPERATE + SQL.WHERE);
		sbQuery.append(SQL.SEPERATE + "1=1");
		if(paramMap.get("KIND").equals("patnoA")) {
			sbQuery.append(SQL.SEPERATE + SQL.AND + "PATNO" + SQL.IN);
		}
		else {
			sbQuery.append(SQL.SEPERATE + SQL.AND + "RESCH_PAT_ID" + SQL.IN);
		}
		sbQuery.append(SQL.SEPERATE + "(");
		sbQuery.append(SQL.SEPERATE + "");
		sbQuery.append(SQL.SEPERATE + StringUtils.nvl(paramMap.get("TXTARR").toString(), "''") );
		sbQuery.append(SQL.SEPERATE + ")");
		sbQuery.append(SQL.SEPERATE + ")");
		System.out.println(sbQuery);
		
		paramMap.put("PatnoQuery", sbQuery);
		return dashboardDAO.selectCohortAnalysisPatno(paramMap);
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
		sbQuery.append(SQL.SEPERATE + SQL.DISTINCT + "RESCH_PAT_ID");
		sbQuery.append(SQL.SEPERATE + "," + "'N'" + SQL.AS + "DELETE_YN");
		sbQuery.append(SQL.SEPERATE + SQL.FROM + "pmsdev.MSMAMCAMN");
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
		return dashboardDAO.selectCohortAnalysisPatno(paramMap);
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
		
		Map resultMap = new HashMap();
		resultMap.put("loadselectedCohort", dashboardDAO.loadselectedChart(paramMap));
		resultMap.put("CohortTableQuery", sbQuery);
		
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
		
		return resultList;
	}
	
}
