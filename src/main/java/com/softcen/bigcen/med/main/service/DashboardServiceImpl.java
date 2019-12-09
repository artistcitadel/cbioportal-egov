package com.softcen.bigcen.med.main.service;

import java.sql.SQLException;
import java.util.ArrayList;
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
	public Object selectfilterApply(Map<Object, Object> paramMap) {
		// TODO Auto-generated method stub
		
		Map<String,String> resultMap = new HashMap<String,String>();
		Map<String,String> paramMap2 = new HashMap<String,String>();
		
		StringBuffer sbQuery = new StringBuffer();
		List paramArray = new ArrayList();
		paramArray = (ArrayList)paramMap.get("FILTER");
		
		//전체 쿼리
  		for(int i=0; i<paramArray.size(); i++) {
 			if(i!=0) sbQuery.append(SQL.SEPERATE + "INTERSECT");
			Map tmpMap = (HashMap)paramArray.get(i);
			sbQuery.append( setFilteringChartQuerySec(tmpMap) );
		}
		System.out.println(sbQuery.toString());
		paramMap2.put("FILTER_QUERY", sbQuery.toString());
		resultMap.put("all",sbQuery.toString());
		
		
		//개별 쿼리
		for(int i=0; i<paramArray.size(); i++) {
			StringBuffer sbQuery2 = new StringBuffer();
			for(int j=0; j<paramArray.size(); j++) {
				if(j==i) continue;
				
				if(sbQuery2.length() != 0) sbQuery2.append(SQL.SEPERATE + "INTERSECT");
				
				Map tmpMap = (HashMap)paramArray.get(j);
				String ITEM_ID = tmpMap.get("ITEM_ID").toString();
				
				sbQuery2.append( setFilteringChartQuerySec(tmpMap) );
			}
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
	public Object loadselectedChartFilter(Map<Object, Object> paramMap) {
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
		sbQuery.append(SQL.SEPERATE + ", COUNT(*)/(SELECT count(*) FROM pmsdev."+tmpMap.get("BASE_DT_TABLE") + ")*100" + SQL.AS + "FREQ");
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + "(" );
		
		if(paramChartType.equals("GAO")) {
			String[] columnStr = ITEM_COLUMN.split(",");
			sbQuery.append(originQuery);
			sbQuery.append(SQL.SEPERATE + ")" + SQL.AS + "F1");
			sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
			if(!subQuery.isEmpty()) {
				sbQuery.append(SQL.SEPERATE + SQL.AND + "F1.RESCH_PAT_ID" + SQL.IN + "(" + subQuery + ")");
			}
			sbQuery.append(SQL.SEPERATE + SQL.GROUP_BY);
			for(int i=0; i<columnStr.length; i++) {
				if(i!=0) sbQuery.append(" ,");
				sbQuery.append(SQL.SEPERATE + "C"+(i+1));
			}
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

		resultMap.put("CHART",dashboardDAO.loadselectedChart(paramMap2));
		resultMap.put("QUERY",sbQuery);
		return resultMap;
	}
	
	public StringBuffer setFilteringChartQuery(List paramArray) {

		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQuery2 = new StringBuffer();
		
		for(int i=0; i<paramArray.size(); i++) {
			Map tmpMap = (HashMap)paramArray.get(i);
			List tmpArr = (ArrayList)tmpMap.get("CONDITION");
			String BASE_TABLE = tmpMap.get("BASE_TABLE").toString();
			String ITEM_ID = tmpMap.get("ITEM_ID").toString();
			
			Map chartMap = (HashMap)dashboardDAO.selectDashboardChartDetl(tmpMap);
			System.out.println(chartMap);
			
			String CHART_TYPE = chartMap.get("CHART_TYPE").toString();
			String ITEM_COLUMN = chartMap.get("ITEM_COLUMN").toString();
			
			if(i!=0) sbQuery.append(SQL.SEPERATE + "INTERSECT");
			
			
			if(BASE_TABLE.equals("GLIS_SV")) {
				
				sbQuery.append(SQL.SEPERATE + SQL.SELECT);
				sbQuery.append(SQL.SEPERATE + "T2.PATIENT_ID AS PATNO");
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
			else {
				if(CHART_TYPE.equals("PIE")) {
					sbQuery.append(SQL.SEPERATE + SQL.SELECT);
					sbQuery.append(SQL.SEPERATE + "PATNO");
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
					
				}
				else if(CHART_TYPE.equals("BAR")) {
					
					sbQuery.append(SQL.SEPERATE + SQL.SELECT);
					sbQuery.append(SQL.SEPERATE + "PATNO");
					sbQuery.append(SQL.SEPERATE + SQL.FROM);
					sbQuery.append(SQL.SEPERATE + "pmsdev" + "." + BASE_TABLE);
					sbQuery.append(SQL.SEPERATE + SQL.WHERE + "1=1");
					sbQuery.append(SQL.SEPERATE + SQL.AND + ITEM_COLUMN + SQL.BETWEEN + tmpArr.get(0) + SQL.AND + tmpArr.get(1));
					
				}
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
		
		
		return null;
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
	
}
