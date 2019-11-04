package com.softcen.bigcen.med.research.query.sql.builder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.research.query.sql.helper.SQLSelectClause;
import com.softcen.bigcen.med.research.query.sql.helper.SQLUtils;
import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.DateUtils;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * 코호트연구 Query Builder
 * @author user
 *
 */


@Service("cohortStudy")
public class CohortStudy extends BaseStudyModelService{
	private static final String R_TAB_CD = "R";
	
	public CohortStudy() throws Exception{
		super();
		
	}
	
	
	@Override
	@SuppressWarnings({"rawtypes","cast"})
	public String getQueryForWithR() throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQueryOutline = new StringBuffer();
		
		int periodCnt = 0;
		
		String strPrefix = "";
		
		List<Map<String,String>> itemList = new ArrayList<Map<String,String>>();
		List<Map<String,String>> studyItemList = new ArrayList<Map<String,String>>();		//AGG가 ALL이 아닌 항목
		List<Map<String,String>> studyItemAggAllList = new ArrayList<Map<String,String>>();	//AGG가 ALL
		
		List<Map> dataFieldsList = new ArrayList<Map>();
		
		itemList = (ArrayList)this.getRitemList();
		
	
		studyItemList = SQLUtils.getStudyItemChort(itemList);				
		studyItemAggAllList = SQLUtils.getStudyItemChortAggAll(itemList);	
		
		
	//	연구항목 Loop	
		for(int i=0; i < studyItemList.size(); i++){
			Map<String,String> dsMap = (Map<String,String>)studyItemList.get(i);
			
			//aggregation이 PER이면 주기를 계산(월/분기/년)
			if("PER".equals(dsMap.get("AGG"))){
				periodCnt = this.getTermCnt(dsMap.get("RANGE_CD"));
				
			}else{
				periodCnt = 0;
				
			}
			
			strPrefix = R_TAB_CD + i;
			
			//주기가 0이면
			if( periodCnt == 0){
				sbQueryOutline.append(this.getFromClauseOfCohortR(dsMap, strPrefix, 0));
				
				if(i < (studyItemList.size()-1)){
					sbQueryOutline.append(",");	
				}
				
				dataFieldsList.add(SQLSelectClause.getDataFieldMap(QueryVO.gvMethCd,R_TAB_CD,strPrefix, dsMap, false));
				
				if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
					if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
						dataFieldsList.add(SQLSelectClause.getDataFieldMap(QueryVO.gvMethCd,R_TAB_CD,strPrefix, dsMap, true));
					}	
				}
				
				this.queryResultTableList.add(strPrefix);
				
			}else{
				for(int j=0; j < periodCnt; j++){
					strPrefix = R_TAB_CD + i + SQL.UNDERSCORE + j;
					sbQueryOutline.append(this.getFromClauseOfCohortR(dsMap, strPrefix, j));
					
					if(i < (studyItemList.size()-1) || j < (periodCnt - 1)){
						sbQueryOutline.append(",");	
					}
					
					dataFieldsList.add(SQLSelectClause.getDataFieldPeriodMap(QueryVO.gvMethCd,R_TAB_CD,strPrefix, dsMap, false, j));
					
					if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
						if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
							dataFieldsList.add(SQLSelectClause.getDataFieldMap(QueryVO.gvMethCd,R_TAB_CD,strPrefix, dsMap, true));
						}	
					}
					
					this.queryResultTableList.add(strPrefix);
					
				}
			}
		}
		
		//전체가 있을경우
		for(int i=0; i < studyItemAggAllList.size(); i++){
			StringBuffer sbQueryAll = new StringBuffer();
			Map<String,String> dsMap = (HashMap<String,String>)studyItemAggAllList.get(i);
			
			strPrefix = R_TAB_CD + (studyItemList.size() + (i+1));
			sbQueryOutline.append(this.getFromClauseOfCohortRdummy(dsMap, strPrefix, 0));
			
			dataFieldsList.add(SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, false));
			
			if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
				if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
					dataFieldsList.add(SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, true));
					//dataFieldsList.add(SQLSelectClause.getDataFieldMap(QueryVO.gvMethCd,R_TAB_CD,strPrefix, dsMap, true));
				}	
			}
			
			this.queryResultTableList.add(strPrefix);
			
			
		}

	//	---------------------------------------------------
	//	dataFieldsList
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap = (HashMap<String,String>)dataFieldsList.get(i);
			this.addDataFields(dsMap);
		}
		
		sbQuery.append(sbQueryOutline.toString());
		
		return sbQuery.toString();
	}
	
	
	
	
	public String getQueryForWithRAll(Map<String,String> itemMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQueryAll = new StringBuffer();
		StringBuffer sbQueryOutline = new StringBuffer();
		
		List<Map<String,String>> itemList = new ArrayList<Map<String,String>>();
		List<Map<String,String>> studyItemList = new ArrayList<Map<String,String>>();
		List<Map<String,String>> studyItemAggAllList = new ArrayList<Map<String,String>>();
		
		List<Map<String,String>> dataFieldsList = new ArrayList<Map<String,String>>();
		Map<String,String> dataFieldMap  = new HashMap<String,String>();
		
		String itemOrder  	= "";
		String paramOrder 	= "";
		String strPrefix 	= "";
		String tmpQuery 	= "";
		
		int nPeriodCnt 		= 0;
		
		this.queryResultTableList = new ArrayList<String>();
		
		itemList = (ArrayList)this.getRitemList();
		
		studyItemList = SQLUtils.getStudyItemChort(itemList);
		studyItemAggAllList = SQLUtils.getStudyItemChortAggAll(itemList);
		
		
		//Aggregation이 ALL이 아니면 가상테이블을 만든다.	
		for(int i=0; i < studyItemList.size(); i++){
			Map<String,String> dsMap = (HashMap<String,String>)studyItemList.get(i);
			
			if("PER".equals(dsMap.get("AGG"))){
				nPeriodCnt = this.getTermCnt(dsMap.get("RANGE_CD"));
				
			}else{
				nPeriodCnt = 0;
			}
			
			sbQueryAll = new StringBuffer();
			
			if( nPeriodCnt == 0){
				strPrefix = R_TAB_CD + i;
				
				tmpQuery = this.getFromClauseOfCohortRdummy(dsMap, strPrefix, 0);
				sbQueryAll.append(tmpQuery);
				
				dataFieldMap = SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, false);
				dataFieldsList.add(dataFieldMap);
				
				if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
					if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
						dataFieldMap = SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, true);
						dataFieldsList.add(dataFieldMap);
					}	
				}
				
				this.queryResultTableList.add(strPrefix);
				
			}else{
				for(int j=0; j < nPeriodCnt; j++){
					strPrefix = R_TAB_CD + i + SQL.UNDERSCORE + j;
									
					tmpQuery = this.getFromClauseOfCohortRdummy(dsMap, strPrefix, j);
					dataFieldMap = SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, false);
					
					sbQueryAll.append(tmpQuery);
					dataFieldsList.add(dataFieldMap);
					
					if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
						if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
							dataFieldMap = SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, true);
							dataFieldsList.add(dataFieldMap);
						}	
					}
					
					this.queryResultTableList.add(strPrefix);
				}
			}
			
			sbQueryOutline.append(sbQueryAll.toString());
		}
		
		//
		for(int i=0; i < studyItemAggAllList.size(); i++){
			Map<String,String> dsMap = (HashMap<String,String>)studyItemAggAllList.get(i);
			
			itemOrder = String.valueOf(dsMap.get("ORDER"));
			paramOrder = String.valueOf(itemMap.get("ORDER"));
			
			strPrefix = R_TAB_CD + ((studyItemList.size() + i));
			
			if(itemOrder.equals(paramOrder)){
				tmpQuery = "";
				tmpQuery = this.getFromClauseOfCohortR(dsMap, strPrefix, 0);
				
				dataFieldMap = new HashMap<String,String>();
				dataFieldMap = SQLSelectClause.getDataFieldMap(QueryVO.gvMethCd,R_TAB_CD,strPrefix, dsMap, false);
				
				sbQueryOutline.append(",");
				sbQueryOutline.append(tmpQuery);
				
				dataFieldsList.add(dataFieldMap);
				
				if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
					if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
						dataFieldMap = new HashMap<String,String>();
						dataFieldMap = SQLSelectClause.getDataFieldMap(QueryVO.gvMethCd,R_TAB_CD,strPrefix, dsMap, true);
						dataFieldsList.add(dataFieldMap);
					}	
				}
				
				this.queryResultTableList.add(strPrefix);
				
			}else{
				tmpQuery = "";
				tmpQuery = this.getFromClauseOfCohortRdummy(dsMap, strPrefix, 0);
				
				dataFieldMap = new HashMap<String,String>();
				dataFieldMap = SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, false);
				
				//sbQueryOutline.append(",");
				sbQueryOutline.append(tmpQuery);
				
				dataFieldsList.add(dataFieldMap);
				
				if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
					if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
						dataFieldMap = new HashMap<String,String>();
						dataFieldMap = SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, true);
						dataFieldsList.add(dataFieldMap);
					}	
				}
				
				this.queryResultTableList.add(strPrefix);
				
			}
		}
		
		
	//	dataFieldsList
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap = (HashMap)dataFieldsList.get(i);
			this.addDataFields(dsMap);
		}
		
		sbQuery.append(sbQueryOutline.toString());
		
		
		return sbQuery.toString();
	}
	
	
	
	/**
	 * 코호트연구-생존분석-사건정의 SQL Builder
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","unchecked","rawtypes"})
	public String getQueryForWithEvent() throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQueryMain = new StringBuffer();
		StringBuffer sbQueryPatSbsNo 	= new StringBuffer();	//환자목록 추출
		StringBuffer sbQueryGroup 		= new StringBuffer();
		StringBuffer sbQueryJoin 		= new StringBuffer();	//쿼리조인
		StringBuffer sbQueryColumn 		= new StringBuffer();	//컬럼
		
		List<String> groupList = new ArrayList();				//그룹
		List<Map> itemList = new ArrayList();					//연구항목
		List<Map> dataFieldsList 	= new ArrayList();				//JqxGrid DataFields
		Map<String,String> termMap = this.getTermRange();			//연구기간
		
		itemList = (ArrayList)this.modelMap.get("dsEventList");
		
		if(itemList.size() == 0){
			return sbQuery.toString();
		}
		
		groupList = SQLUtils.getGroupList(itemList);
		
		//조건에 해당하는 모든 환자목록
		sbQueryPatSbsNo.append(this.getPatientList("RE", itemList, new HashMap()));
		
		
		//각 그룹의 집합 생성	
		for(int i=0; i < groupList.size(); i++){
			String groupKey 	= "";
			String groupAlias 	= "";
			String strWheres 	= "";
			
			StringBuffer sbQueryFromClause 	= new StringBuffer();
			
			List<Map> groupTableList = new ArrayList();
			List<Map> groupItemList  = new ArrayList();
			
			Map<String,String> dataFieldMap = new HashMap();
			
			groupKey 		= groupList.get(i);
			groupAlias		= "RE_" + groupKey;
			groupTableList 	= SQLUtils.getGroupTableList(itemList, groupKey);
			groupItemList  	= SQLUtils.getGroupItemList(itemList, groupKey);
			
			String strColumns = "";
			for(int j=0; j < groupItemList.size(); j++){
				Map<String,String> dsMap = (HashMap)groupItemList.get(j);
				
				dataFieldsList.add(SQLSelectClause.getDataFieldMap("CH","RE",groupAlias, dsMap, false));
				strColumns += SQLSelectClause.getColumns(groupAlias, dsMap);
				
			//	사건정의 BASE	_DT_COLUMN
				if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
					if("ENT_DATE".equals(dsMap.get("COLUMN"))){
						continue;
						
					}
					dataFieldsList.add(SQLSelectClause.getDataFieldMap("CH","RE",groupAlias, dsMap, true));
					strColumns += SQLSelectClause.getColumnsForBaseDate(groupAlias, dsMap);
				}
			}
			
		//	----------------------------------------	
		//	사건정의 EVENT_DT
			String strQueryEventDt = this.getQueryEventStopDt(groupKey, itemList);
			if(!StringUtils.isEmpty(strQueryEventDt)){
				strColumns += ",";
				strColumns += SQL.CASE_WHEN;
				strColumns += strQueryEventDt;
				strColumns += SQL.BETWEEN;				
				strColumns += "'"+termMap.get("RGST_TERM_FROM")+"' "+SQL.AND+" '"+termMap.get("RSCH_TERM_TO")+"' ";
				strColumns += SQL.THEN;
				strColumns += strQueryEventDt;
				strColumns += SQL.END;
				strColumns += " AS " + groupAlias + "_STOP_DT";
				
				dataFieldMap = new HashMap();
				dataFieldMap.put("ITEM_TYPE"			,"DAT");
				dataFieldMap.put("DATA_TYPE"			,"date");
				dataFieldMap.put("ITEM_SEQ"				,"");
				dataFieldMap.put("DISP_COLUMN"			,groupAlias + "_STOP_DT");
				dataFieldMap.put("DISP_COLUMN_COMMENT"	,groupAlias + "_사건일자");
				dataFieldsList.add(dataFieldMap);
			}
			
			sbQueryGroup = new StringBuffer();
			sbQueryFromClause.append(this.getOutlineQuerySurvivalAnalysis(groupTableList));
			
		//	WHERE	
			strWheres = this.sqlWhereClause.getWhereClause(groupItemList);
			
			for(int j=0; j < groupItemList.size(); j++){
				Map<String,String> dsMap = (HashMap)groupItemList.get(j);
				

				if(QueryVO.gvDeathYnColumn.equals(dsMap.get("COLUMN"))){
					strWheres += SQL.SEPERATE + SQL.AND;
					strWheres += dsMap.get("TABLE") + "." + QueryVO.gvDeathYnBaseDtColumn;	//울산,경북대 통합
					strWheres += SQL.BETWEEN;
					strWheres += " R_DT.BASE_DT ";
					strWheres += SQL.AND;
					strWheres += "'" + termMap.get("RSCH_TERM_TO") + "'";
					
				}
			//	수진자격상실여부 조건
				if(QueryVO.gvTreatQualYnColumn.equals(dsMap.get("COLUMN"))){
					strWheres += SQL.SEPERATE + SQL.AND;
					strWheres += dsMap.get("TABLE") + "." + QueryVO.gvTreatQualYnBaseDtColumn;	//울산,경북대 통합
					strWheres += SQL.BETWEEN;
					strWheres += " R_DT.BASE_DT ";
					strWheres += SQL.AND;
					strWheres += "'" + termMap.get("RSCH_TERM_TO") + "'";
					
					
				}
				
			}
			
			sbQueryGroup.append(SQL.SEPERATE + SQL.SELECT);
			sbQueryGroup.append(SQL.SEPERATE + this.getGroupPatSbstNo(groupTableList));
			sbQueryGroup.append(SQL.SEPERATE + strColumns);
			sbQueryGroup.append(SQL.SEPERATE + SQL.FROM);
			sbQueryGroup.append(sbQueryFromClause.toString());
			sbQueryGroup.append(SQL.SEPERATE + SQL.WHERE);
			sbQueryGroup.append(SQL.SEPERATE + " 1 = 1");
			
			if(!StringUtils.isEmpty(strWheres)){
				sbQueryGroup.append(SQL.SEPERATE + strWheres);
			}
			sbQueryGroup.append(SQL.SEPERATE + SQL.GROUP_BY + this.getGroupPatSbstNo(groupTableList));
			
			
			String groupAndOr = SQLUtils.getGroupAndOr(groupItemList);
			
			if(StringUtils.isEmpty(groupAndOr) || "OR".equals(groupAndOr)){
				sbQueryJoin.append(SQL.SEPERATE + SQL.LEFT_OUTER_JOIN);
			}else{
				sbQueryJoin.append(SQL.SEPERATE + SQL.JOIN);
			}
			
			sbQueryJoin.append(SQL.SEPERATE + " ( ");
			sbQueryJoin.append(SQL.SEPERATE + sbQueryGroup.toString());
			sbQueryJoin.append(SQL.SEPERATE + " ) ");
			sbQueryJoin.append(SQL.SEPERATE + " " + groupAlias);
			sbQueryJoin.append(SQL.ON);
			sbQueryJoin.append("(");
				sbQueryJoin.append("T." + QueryVO.gvPatSbstNo);
				sbQueryJoin.append(" = ");
				sbQueryJoin.append(groupAlias + "." + QueryVO.gvPatSbstNo);
			sbQueryJoin.append(")");
			sbQueryJoin.append(SQL.SEPERATE);
			
		}	
	
	//	MAIN 컬럼	
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap = (HashMap)dataFieldsList.get(i);
			
			if("COHORT".equals(dsMap.get("TABLE"))){
				continue;
			}
			
			sbQueryColumn.append(SQL.SEPERATE + "," + SQL.MAX + "(" + dsMap.get("DISP_COLUMN") + ")");
			sbQueryColumn.append(SQL.AS);
			sbQueryColumn.append(dsMap.get("DISP_COLUMN"));
		}
		
		sbQueryMain.append(SQL.SEPERATE + SQL.SELECT);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "T." + QueryVO.gvPatSbstNo);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + sbQueryColumn.toString());
		sbQueryMain.append(SQL.SEPERATE + SQL.FROM + "(");
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + sbQueryPatSbsNo.toString());
		sbQueryMain.append(SQL.SEPERATE + ")T");
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + sbQueryJoin.toString());
		sbQueryMain.append(SQL.SEPERATE + SQL.GROUP_BY);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "T." + QueryVO.gvPatSbstNo);
		
	//	RE Main QUERY Generator	
		sbQuery.append(SQL.SEPERATE + "RE AS( ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.SELECT);
		
	//	column	
		String strAllColumns 		= "";
		strAllColumns += SQL.SEPERATE + "Z." + QueryVO.gvPatSbstNo;
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap =  (HashMap)dataFieldsList.get(i);
			
			strAllColumns += "," + dsMap.get("DISP_COLUMN");
			
			this.addDataFields(dsMap);
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + strAllColumns);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "( ");
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + sbQueryMain.toString());
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ")Z ");
		sbQuery.append(SQL.SEPERATE + ")");
		sbQuery.append("");
		
		this.queryResultTableList.add("RE");
		
		return sbQuery.toString();
	}
	
	
	
	/**
	 * 코호트연구-생존분석-중도절단 SQL Builder
	 * @return
	 */
	@SuppressWarnings("all")
	public String getQueryForWithCensoredData() throws Exception{
		StringBuffer sbQuery 			= new StringBuffer();
		StringBuffer sbQueryMain 		= new StringBuffer();
		StringBuffer sbQueryPatSbsNo 	= new StringBuffer();	//환자목록 추출
		StringBuffer sbQueryGroup 		= new StringBuffer();
		StringBuffer sbQueryJoin 		= new StringBuffer();	//쿼리조인
		StringBuffer sbQueryColumn 		= new StringBuffer();	//컬럼
		
		List<String> groupList = new ArrayList();				//그룹
		List<Map> itemList = new ArrayList();					//연구항목
		List<Map> dataFieldsList 	= new ArrayList();			//JqxGrid DataFields
		Map<String,String> termMap = this.getTermRange();		//연구기간
		
		String dispColumn = "";
		String dispColumnComment = "";
		
	//	중도절단 목록	
		itemList = (ArrayList)this.modelMap.get("dsCensoredDataList");
		
	//	연구항목이 없으면 리턴	
		if(itemList.size() == 0){
			return sbQuery.toString();
		}
		
	//	1.그룹셋 만들기
		groupList = SQLUtils.getGroupList(itemList);
		
	//	조건에 해당하는 모든 환자목록
		sbQueryPatSbsNo.append(this.getPatientList("RQ", itemList, new HashMap()));
		
	//	각 그룹의 집합 생성	
		for(int i=0; i < groupList.size(); i++){
			String groupKey 	= "";
			String groupAlias 	= "";
			String strWheres 	= "";
			
			StringBuffer sbQueryFromClause 	= new StringBuffer();
			StringBuffer sbQueryWhereClause = new StringBuffer();
			
			List<Map> groupTableList = new ArrayList();
			List<Map> groupItemList  = new ArrayList();
			
			Map<String,String> dataFieldMap = new HashMap();
			
			groupKey 		= groupList.get(i);
			groupAlias		= "RQ_" + groupKey;
			groupTableList 	= SQLUtils.getGroupTableList(itemList, groupKey);
			groupItemList  	= SQLUtils.getGroupItemList(itemList, groupKey);
			
			String strColumns = "";
			for(int j=0; j < groupItemList.size(); j++){
				Map<String,String> dsMap = (HashMap)groupItemList.get(j);
				
				dataFieldsList.add(SQLSelectClause.getDataFieldMap("CH","RQ",groupAlias, dsMap, false));
				strColumns += SQLSelectClause.getColumns(groupAlias, dsMap);
				
			//	사건정의 BASE	_DT_COLUMN
				if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
					if("생존분석".equals(dsMap.get("TABLE_COMMENT")) && QueryVO.gvNoVisitColumn.equals(dsMap.get("COLUMN"))){
						continue;
						
					}
					dataFieldsList.add(SQLSelectClause.getDataFieldMap("CH","RQ",groupAlias, dsMap, true));
					strColumns += SQLSelectClause.getColumnsForBaseDate(groupAlias, dsMap);
				}
			}
			
			String strQueryEventDt = this.getQueryEventStopDt(groupKey, itemList);
			if(!StringUtils.isEmpty(strQueryEventDt)){
				strColumns += ",";
				strColumns += SQL.CASE_WHEN;
					strColumns += strQueryEventDt;
					strColumns += SQL.BETWEEN;
					strColumns += "'"+termMap.get("RGST_TERM_FROM")+"' " + SQL.AND + " '"+termMap.get("RSCH_TERM_TO")+"' ";
					
				strColumns += SQL.THEN;
					strColumns += strQueryEventDt;
					
				strColumns += SQL.END;
				strColumns += SQL.AS + groupAlias + "_STOP_DT";
				
				dispColumn = groupAlias + "_STOP_DT";
				dispColumnComment = groupAlias + "_중도절단일자";
				
				dataFieldMap = new HashMap();
				dataFieldMap.put("ITEM_TYPE"			,"DAT");
				dataFieldMap.put("DATA_TYPE"			,"date");
				dataFieldMap.put("ITEM_SEQ"				,"");
				dataFieldMap.put("DISP_COLUMN"			,dispColumn);
				dataFieldMap.put("DISP_COLUMN_COMMENT"	,dispColumnComment);
				dataFieldsList.add(dataFieldMap);
			}	
						
			sbQueryGroup = new StringBuffer();
			sbQueryFromClause.append(this.getOutlineQuerySurvivalAnalysis(groupTableList));
			

		//	WHERE	
			List tmpGroupList = new ArrayList();
			for(int j=0; j < groupItemList.size(); j++){
				Map<String,String> dsMap = (HashMap)groupItemList.get(j);
				
			//	미내원은 컬럼에만 사용함	
				if("생존분석".equals(dsMap.get("TABLE_COMMENT")) && QueryVO.gvNoVisitColumn.equals(dsMap.get("COLUMN"))){
					continue;
				}
				
				tmpGroupList.add(dsMap);
			}
			
			strWheres = this.sqlWhereClause.getWhereClause(tmpGroupList);
			
		//	사망여부,수진자격여부 조건 추가	
			for(int j=0; j < groupItemList.size(); j++){
				Map<String,String> dsMap = (HashMap)groupItemList.get(j);
				
				if(QueryVO.gvDeathYnColumn.equals(dsMap.get("COLUMN"))){
					strWheres += SQL.SEPERATE + SQL.AND;
					strWheres += dsMap.get("TABLE") + "." + QueryVO.gvDeathYnBaseDtColumn;	//울산,경북대 통합
					strWheres += SQL.BETWEEN;
					strWheres += " R_DT.BASE_DT ";
					strWheres += SQL.AND;
					strWheres += "'" + termMap.get("RSCH_TERM_TO") + "'";
					
				}
			//	수진자격상실여부 조건
				if(QueryVO.gvTreatQualYnColumn.equals(dsMap.get("COLUMN"))){
					strWheres += SQL.SEPERATE + SQL.AND;
					strWheres += dsMap.get("TABLE") + "." + QueryVO.gvTreatQualYnBaseDtColumn;	//울산,경북대 통합
					strWheres += SQL.BETWEEN;
					strWheres += " R_DT.BASE_DT ";
					strWheres += SQL.AND;
					strWheres += "'" + termMap.get("RSCH_TERM_TO") + "'";
					
					
				}
			}
				
			
			sbQueryGroup.append(SQL.SEPERATE + SQL.SELECT);
			sbQueryGroup.append(SQL.SEPERATE + this.getGroupPatSbstNo(groupTableList));
			sbQueryGroup.append(SQL.SEPERATE + strColumns);
			sbQueryGroup.append(SQL.SEPERATE + SQL.FROM);
			sbQueryGroup.append(sbQueryFromClause.toString());
			sbQueryGroup.append(SQL.SEPERATE + SQL.WHERE);
			sbQueryGroup.append(SQL.SEPERATE + " 1 = 1");
			
			if(!StringUtils.isEmpty(strWheres)){
				sbQueryGroup.append(SQL.SEPERATE + strWheres);
			}
			sbQueryGroup.append(SQL.SEPERATE + SQL.GROUP_BY + this.getGroupPatSbstNo(groupTableList));
			
			
			String groupAndOr = SQLUtils.getGroupAndOr(groupItemList);
			
			if(StringUtils.isEmpty(groupAndOr) || "OR".equals(groupAndOr)){
				sbQueryJoin.append(SQL.SEPERATE + SQL.LEFT_OUTER_JOIN);
			}else{
				sbQueryJoin.append(SQL.SEPERATE + SQL.JOIN);
			}
			
			sbQueryJoin.append(SQL.SEPERATE + " ( ");
			sbQueryJoin.append(SQL.SEPERATE + sbQueryGroup.toString());
			sbQueryJoin.append(SQL.SEPERATE + " ) ");
			sbQueryJoin.append(SQL.SEPERATE + " " + groupAlias);
			sbQueryJoin.append(SQL.ON);
			sbQueryJoin.append("(");
				sbQueryJoin.append("T." + QueryVO.gvPatSbstNo);
				sbQueryJoin.append(" = ");
				sbQueryJoin.append(groupAlias + "." + QueryVO.gvPatSbstNo);
			sbQueryJoin.append(")");
			sbQueryJoin.append(SQL.SEPERATE);
			
		}	
		
		//MAIN 컬럼	
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap = (HashMap)dataFieldsList.get(i);
			String groupAlias 	= "";
			
			if("COHORT".equals(dsMap.get("TABLE"))){
				continue;
			}
			
			sbQueryColumn.append(SQL.SEPERATE + "," + SQL.MAX + "(" + dsMap.get("DISP_COLUMN") + ")");
			sbQueryColumn.append(SQL.AS);
			sbQueryColumn.append(dsMap.get("DISP_COLUMN"));
		}
		
		sbQueryMain.append(SQL.SEPERATE + SQL.SELECT);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "T." + QueryVO.gvPatSbstNo);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + sbQueryColumn.toString());
		sbQueryMain.append(SQL.SEPERATE + SQL.FROM + "(");
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + sbQueryPatSbsNo.toString());
		sbQueryMain.append(SQL.SEPERATE + ")T");
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + sbQueryJoin.toString());
		sbQueryMain.append(SQL.SEPERATE + SQL.GROUP_BY);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "T." + QueryVO.gvPatSbstNo);
		
	//	RE Main QUERY Generator	
		sbQuery.append(SQL.SEPERATE + "RQ AS( ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.SELECT);
		
	//	column	
		String strAllColumns 		= "";
		strAllColumns += SQL.SEPERATE + "Z." + QueryVO.gvPatSbstNo;
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap =  (HashMap)dataFieldsList.get(i);
			
			strAllColumns += "," + dsMap.get("DISP_COLUMN");
			
			this.addDataFields(dsMap);
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + strAllColumns);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "( ");
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + sbQueryMain.toString());
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ")Z ");
		sbQuery.append(SQL.SEPERATE + ")");
		sbQuery.append("");
		
		this.queryResultTableList.add("RQ");
		
		return sbQuery.toString();
		
	}
	
	

	
	/**
	 * 연구항목 Aggregation이 전체가 아닌 Query문을 반환한다.
	 * @param dsMap
	 * @param strPrefix
	 * @param period
	 * @return
	 * @throws Exception
	 */
	private String getFromClauseOfCohortR(Map<String,String> dsMap, String strPrefix, int period) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		Map<String,String> termRangeMap = new HashMap<String,String>();
		
		int periodDays = 0;
		
		String strColumns = "";
		String strColumnsBaseDt="";
		String strFromClauseOfRgroupJoinTable = "";	
		String strWhereClauseOfRgroup = "";
		
		termRangeMap = this.getTermRange();
		
		if("PER".equals(dsMap.get("AGG"))){
			periodDays = this.getTermDays(dsMap.get("RANGE_CD"));
		}
		
		List itemGroupList = this.getItemListByGroup(dsMap.get("GR_LV"));
		
		if( !"0".equals(dsMap.get("GR_LV"))){
			strFromClauseOfRgroupJoinTable = this.getQueryForFromClauseOfRgroupJoinTable(itemGroupList);
			strWhereClauseOfRgroup = this.getQueryForWhereClauseOfRgroup(itemGroupList);
		}
		
		
		sbQuery.append(SQL.SEPERATE + strPrefix + SQL.AS + "(" );
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
		
		if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
			if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
				strColumnsBaseDt = this.sqlSelectClause.getColumnsForRCohortBaseDate(strPrefix, dsMap);
			}	
		}
		
		strColumns = this.sqlSelectClause.getColumnsForRCohort(strPrefix, dsMap);
		
		if(!StringUtils.isEmpty(strColumnsBaseDt)){
			strColumns += strColumnsBaseDt;
		}
		
		sbQuery.append(strColumns);
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
		sbQuery.append(SQL.BLANK + dsMap.get("TABLE"));
		sbQuery.append(SQL.JOIN + "R_DT" + SQL.ON);
		sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
		sbQuery.append(" = ");
		sbQuery.append("R_DT." + QueryVO.gvPatSbstNo);
		
		if(!StringUtils.isEmpty(strFromClauseOfRgroupJoinTable)){
			sbQuery.append(strFromClauseOfRgroupJoinTable);
		}
		
	//	WHERE절	
		sbQuery.append(SQL.SEPERATE + SQL.TAB1);
		sbQuery.append(SQL.WHERE);
		sbQuery.append(" 1=1");
		sbQuery.append(SQL.SEPERATE);
		
		if("Y".equals(dsMap.get("INSTCD_YN")) && !"030".equals(dsMap.get("INSTCD"))){
			sbQuery.append(SQL.AND);
			sbQuery.append(dsMap.get("TABLE") + "." + SQL.INSTCD + SQL.EQUAL + "'" + dsMap.get("INSTCD") + "'");
		}
		
	//	기준일자가 있으면	
		if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
			if(!"ALL".equals(dsMap.get("AGG"))){
			
				sbQuery.append(SQL.AND);
				sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
				
				
				//AGG가 이전이면	
				if("PAST".equals(dsMap.get("AGG"))){
					sbQuery.append(" < R_DT.BASE_DT ");
					
				}else if("T".equals(dsMap.get("AGG"))){	//당일
					sbQuery.append(" = ");
					sbQuery.append(" R_DT.BASE_DT");
					
				}else if("P".equals(dsMap.get("AGG"))){	//당일이전
					sbQuery.append(SQL.BETWEEN);
					sbQuery.append(" R_DT.BASE_DT - " + StringUtils.nvl(dsMap.get("RANGE_DN"), "0"));
					sbQuery.append(SQL.AND);
					sbQuery.append(" R_DT.BASE_DT - 1 ");
					
				}else if("A".equals(dsMap.get("AGG"))){	//당일이후
					sbQuery.append(SQL.BETWEEN);
					sbQuery.append(" R_DT.BASE_DT ");
					sbQuery.append(SQL.AND);
					sbQuery.append(" R_DT.BASE_DT + " + StringUtils.nvl(dsMap.get("RANGE_DN"), "0"));
				}else{
					sbQuery.append(" >= R_DT.BASE_DT ");
					sbQuery.append(SQL.SEPERATE);
					sbQuery.append(SQL.AND);
					sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
					sbQuery.append(SQL.BETWEEN);
					sbQuery.append("R_DT.BASE_DT ");
					sbQuery.append(SQL.AND);
					sbQuery.append("'" + termRangeMap.get("RSCH_TERM_TO") + "'");
				}
				
				
			//	기준일자 편차
				if("PER".equals(dsMap.get("AGG"))){
					sbQuery.append(SQL.SEPERATE);
					sbQuery.append(SQL.AND);
					sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
					sbQuery.append(SQL.BETWEEN);
					sbQuery.append(" R_DT.BASE_DT + ("+periodDays+" * "+period+")");
					
					if(dsMap.containsKey("RANGE_DN") && !"".equals(dsMap.get("RANGE_DN"))){
						sbQuery.append(" - ");
						sbQuery.append(dsMap.get("RANGE_DN"));
							
					}
					sbQuery.append(SQL.SEPERATE);
					sbQuery.append(SQL.AND);
					sbQuery.append(" R_DT.BASE_DT + ("+periodDays+" * "+period+")");
					
					if(dsMap.containsKey("RANGE_DN") && !"".equals(dsMap.get("RANGE_DN"))){
						sbQuery.append(" + ");
						sbQuery.append(dsMap.get("RANGE_DN"));
							
					}
				}
			}
		}
		
		if(!StringUtils.isEmpty(strWhereClauseOfRgroup)){
			sbQuery.append(SQL.SEPERATE + SQL.TAB2);
			sbQuery.append(SQL.AND + strWhereClauseOfRgroup);
		}
		
		
		if(!"ALL".equals(dsMap.get("AGG"))){
			sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.GROUP_BY);
			sbQuery.append(SQL.SEPERATE + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
		}
		
		
		sbQuery.append(SQL.SEPERATE + ")");
		
		return sbQuery.toString();
	}
	
	/**
	 * Aggregation이 전체인 연구항목에 대한 Dummy Query를 반환한다. 
	 * @param dsMap
	 * @param strPrefix
	 * @param period
	 * @return
	 * @throws Exception
	 */
	private String getFromClauseOfCohortRdummy(Map<String,String> dsMap, String strPrefix, int period) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		String strColumns = "";
		String strColumnsBaseDt = "";
		
		if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
			if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
				strColumnsBaseDt = SQLSelectClause.getColumnsForRCohortAggBaseDateVirtual(strPrefix, dsMap);
			}	
		}
		
		strColumns = SQLSelectClause.getColumnsForRCohortVirtual(strPrefix, dsMap);
		
		if(!StringUtils.isEmpty(strColumnsBaseDt)){
			strColumns += strColumnsBaseDt;
		}
		
		
		sbQuery.append(",");
		sbQuery.append(SQL.SEPERATE + strPrefix + SQL.AS + "(");
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + "''" + SQL.AS + QueryVO.gvPatSbstNo);	
		sbQuery.append(SQL.SEPERATE + strColumns);
		
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		
		//DB2BLU
		if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
			sbQuery.append(SQL.SEPERATE + SQL.SYSIBM_SYSDUMMY1);
			
		}else{
			sbQuery.append(SQL.SEPERATE + SQL.DUAL);
			
		}
		
		sbQuery.append(SQL.SEPERATE + ")");
		
		return sbQuery.toString();
	}
	
	
	/**
	 * 연구기간 범위
	 * @return
	 */
	@SuppressWarnings({"unchecked"})
	private Map<String,String> getTermRange() {
		Map<String,String> resultMap = new HashMap<String,String>();
		
		List<Map<String,String>> itemList = this.getItemContDetlList();
		
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (HashMap<String,String>)itemList.get(i);
			
			if("RGST_TERM".equals(dsMap.get("COLUMN"))){
				resultMap.put("RGST_TERM_FROM", dsMap.get("INPUT_VAL1"));
				resultMap.put("RGST_TERM_TO", dsMap.get("INPUT_VAL2"));
			}
			
			if("RSCH_TERM".equals(dsMap.get("COLUMN"))){
				resultMap.put("RSCH_TERM_TO", dsMap.get("INPUT_VAL1"));
			}
		}
		
		return resultMap;
	}
	
	
	/**
	 * 주기 코드에 따른 Term Count수 
	 * 날짜 / 주기코드 (예 : 370 / 365)
	 * Term Count만큼 연구항목이 반복된다.
	 * @param rangeCd
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	private int getTermCnt(String rangeCd){
		int retVal = 0;
		Map<String,String> termRangeMap = new HashMap();
		
		termRangeMap = this.getTermRange();
		
		int termDays = DateUtils.getDaysDiff(termRangeMap.get("RGST_TERM_FROM"), 
				 							 termRangeMap.get("RSCH_TERM_TO"));
		
		if("Y".equals(rangeCd)){
			retVal = termDays / 365;
			
		}else if("Q".equals(rangeCd)){
			retVal = termDays / 90;
			
		}else if("M".equals(rangeCd)){
			retVal = termDays / 30;
			
		}
		
		return retVal;
	}
	
	/**
	 * 주기 코드에 따른 날짜 리턴
	 * @param rangeCd
	 * @return
	 */
	@SuppressWarnings({"cast"})
	private int getTermDays(String rangeCd){
		int retVal = 0;
		
		if("Y".equals(rangeCd)){
			retVal = 365;
			
		}else if("Q".equals(rangeCd)){
			retVal = 90;
			
		}else if("M".equals(rangeCd)){
			retVal = 30;
			
		}
		
		return retVal;
	}
	
	
	/**
	 * 생존분석 사건정의,중도절단 Date 구하기
	 * 연구항목중 가장 작은 날짜를 리턴한다.
	 * @param groupKey
	 * @param itemList
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	private String getQueryEventStopDt(String groupKey, List itemList){
		String strQuery = "";
		List<String> listEventStopDt = new ArrayList<String>();
		List<Map> groupItemList = new ArrayList<Map>();
		
	//	연구항목 전체	
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (HashMap)itemList.get(i);
			
			if(groupKey.equals(dsMap.get("GR_LV"))){
				groupItemList.add(dsMap);
			}
		}
		
	//	그룹별 항목리스트	
		for(int i=0; i < groupItemList.size(); i++){
			if(i == 0) continue;
			
			Map<String,String> dsMap1 = (HashMap)groupItemList.get(i-1);
			Map<String,String> dsMap2 = (HashMap)groupItemList.get(i);
			
			if(!StringUtils.isEmpty(dsMap1.get("BASE_DT_COLUMN")) && !StringUtils.isEmpty(dsMap2.get("BASE_DT_COLUMN"))){
				String strAndOr = dsMap2.get("AND_OR");
				
				if(StringUtils.isEmpty(strQuery)){										
					if("생존분석".equals(dsMap1.get("TABLE_COMMENT")) && QueryVO.gvNoVisitColumn.equals(dsMap1.get("COLUMN"))){
						if("OR".equals(strAndOr)){
							strQuery = SQL.LEAST + "(";
							strQuery += SQL.MIN + "(" + dsMap2.get("TABLE") + "." + dsMap2.get("BASE_DT_COLUMN") + ")";
							strQuery += ",";
							strQuery += SQL.MAX + "(ADD_MONTHS(" + dsMap1.get("TABLE") + "." + dsMap1.get("BASE_DT_COLUMN") + ","+dsMap1.get("INPUT_VAL0")+"))";
							strQuery += ")";
							
						}else{
							if(StringUtils.isNull(dsMap1.get("AND_OR")) && "OR".equals(strAndOr)){
								strQuery = SQL.LEAST + "(";
								strQuery += SQL.MIN + "(" + dsMap2.get("TABLE") + "." + dsMap2.get("BASE_DT_COLUMN") + ")";
								strQuery += ",";
								strQuery += SQL.MAX + "(ADD_MONTHS(" + dsMap1.get("TABLE") + "." + dsMap1.get("BASE_DT_COLUMN") + ","+dsMap1.get("INPUT_VAL0")+"))";
								strQuery += ")";
								
							}else{
								strQuery = SQL.GREATEST + "(";
								strQuery += SQL.MAX + "(" + dsMap2.get("TABLE") + "." + dsMap2.get("BASE_DT_COLUMN") + ")";
								strQuery += ",";
								strQuery += SQL.MAX + "(ADD_MONTHS(" + dsMap1.get("TABLE") + "." + dsMap1.get("BASE_DT_COLUMN") + ","+dsMap1.get("INPUT_VAL0")+"))";
								strQuery += ")";	
							}
							
							
						}
						
					}else{
						if("OR".equals(strAndOr)){
							strQuery = SQL.LEAST + "(";
							strQuery += SQL.MIN + "(" + dsMap2.get("TABLE") + "." + dsMap2.get("BASE_DT_COLUMN") + ")";
							strQuery += ",";
							strQuery += SQL.MIN + "(" + dsMap1.get("TABLE") + "." + dsMap1.get("BASE_DT_COLUMN") + ")";
							strQuery += ")";
							
						}else{
							if(StringUtils.isNull(dsMap1.get("AND_OR")) && "OR".equals(strAndOr)){
								strQuery = SQL.LEAST + "(";
								strQuery += SQL.MIN + "(" + dsMap2.get("TABLE") + "." + dsMap2.get("BASE_DT_COLUMN") + ")";
								strQuery += ",";
								strQuery += SQL.MIN + "(" + dsMap1.get("TABLE") + "." + dsMap1.get("BASE_DT_COLUMN") + ")";
								strQuery += ")";
								
							}else{
								strQuery = SQL.GREATEST + "(";
								strQuery += SQL.MAX + "(" + dsMap2.get("TABLE") + "." + dsMap2.get("BASE_DT_COLUMN") + ")";
								strQuery += ",";
								strQuery += SQL.MAX + "(" + dsMap1.get("TABLE") + "." + dsMap1.get("BASE_DT_COLUMN") + ")";
								strQuery += ")";
							}
						}
					}
				}else{
					if("생존분석".equals(dsMap2.get("TABLE_COMMENT")) && QueryVO.gvNoVisitColumn.equals(dsMap2.get("COLUMN"))){
						if("OR".equals(strAndOr)){
							strQuery = SQL.LEAST + "(";
							
						}else{
							if(StringUtils.isNull(dsMap1.get("AND_OR")) && "OR".equals(strAndOr)){
								strQuery = SQL.LEAST + "(";
							}else{
								strQuery = SQL.GREATEST + "(";
							}
							
							
						}
						strQuery += SQL.MAX + "(ADD_MONTHS(" + dsMap2.get("TABLE") + "." + dsMap2.get("BASE_DT_COLUMN") + ","+dsMap2.get("INPUT_VAL0")+"))";
						strQuery += ",";
						
					}else{
						if("OR".equals(strAndOr)){
							strQuery = SQL.LEAST + "(";
							strQuery += SQL.MIN + "(" + dsMap2.get("TABLE") + "." + dsMap2.get("BASE_DT_COLUMN") + ")";
							strQuery += ",";
							
						}else{
							if(StringUtils.isNull(dsMap1.get("AND_OR")) && "OR".equals(strAndOr)){
								strQuery = SQL.LEAST + "(";
								strQuery += SQL.MIN + "(" + dsMap2.get("TABLE") + "." + dsMap2.get("BASE_DT_COLUMN") + ")";
								strQuery += ",";
								
							}else{

								strQuery = SQL.GREATEST + "(";
								strQuery += SQL.MAX + "(" + dsMap2.get("TABLE") + "." + dsMap2.get("BASE_DT_COLUMN") + ")";
								strQuery += ",";
							}
						}	
					}
				}
				listEventStopDt.add(strQuery);
			}
		}

		
		
		String strEventDtQuery = "";
		String tmpParentheses = "";
		
		for(int i = listEventStopDt.size()-1; i >= 0; i--){
			String strStopDt = listEventStopDt.get(i);
			
			if(StringUtils.isEmpty(strEventDtQuery)){
				strEventDtQuery = strStopDt;
				
			}else{
				strEventDtQuery += strStopDt;
				
			}
			
			if(i > 0){
				tmpParentheses += ")";
			}
		}
		
		return strEventDtQuery + tmpParentheses;
	}
	
	
	
	/**
	 * 그룹별 테이블 목록으로 SQL을 생성한다.
	 * @param tableList
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes","cast","unchecked"})
	public String getOutlineQuerySurvivalAnalysis(List tableList) throws Exception{
		StringBuffer sbQuery = new StringBuffer();

		String strJoinQuery = "";
		
		Map joinMap = new HashMap();
		
		if(tableList.size() == 1){
			Map<String,String> dsMap1 = (HashMap)tableList.get(0);
			strJoinQuery = SQL.SEPERATE;
			strJoinQuery += " R_DT " + SQL.JOIN;
			strJoinQuery += dsMap1.get("SCHEMA") + "." + dsMap1.get("TABLE");
			
			if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
				strJoinQuery += SQL.BLANK + dsMap1.get("TABLE");
			}
			
			strJoinQuery += SQL.ON + SQL.SEPERATE;
			strJoinQuery += "R_DT." + QueryVO.gvPatSbstNo;
			strJoinQuery += " = ";
			strJoinQuery += dsMap1.get("TABLE") + "." + QueryVO.gvPatSbstNo;
			
		}else{
			for(int i=0; i < tableList.size(); i++){
				if(i == 0){
					continue;
				}
				
				Map<String,String> dsMap1 = (HashMap)tableList.get(i-1);
				Map<String,String> dsMap2 = (HashMap)tableList.get(i);
				
				joinMap = new HashMap();
				joinMap.put("SEARCH_TABLE_1", dsMap1.get("TABLE"));
				joinMap.put("SEARCH_TABLE_2", dsMap2.get("TABLE"));
				
				if(StringUtils.isEmpty(strJoinQuery)){
					strJoinQuery = SQL.SEPERATE;
					strJoinQuery += " R_DT " + SQL.JOIN;
					strJoinQuery += dsMap1.get("SCHEMA") + "." + dsMap1.get("TABLE");
					
					if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
						strJoinQuery += SQL.BLANK + dsMap1.get("TABLE");
					}
					
					strJoinQuery += SQL.ON;
					strJoinQuery += SQL.SEPERATE;
					strJoinQuery += "R_DT." + QueryVO.gvPatSbstNo;
					strJoinQuery += " = ";
					strJoinQuery += dsMap1.get("TABLE") + "." + QueryVO.gvPatSbstNo;
					strJoinQuery += SQL.JOIN;
					strJoinQuery += dsMap2.get("SCHEMA") + "." + dsMap2.get("TABLE");
					
					if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
						strJoinQuery += SQL.BLANK + dsMap2.get("TABLE");
					}
					
					strJoinQuery += SQL.ON;
					strJoinQuery += this.getJoinQuery(joinMap);
					
				}else{
					strJoinQuery += SQL.SEPERATE;
					strJoinQuery += SQL.JOIN;
					strJoinQuery += dsMap2.get("SCHEMA") + "." + dsMap2.get("TABLE");
					
					if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
						strJoinQuery += SQL.BLANK + dsMap2.get("TABLE");
					}
					
					strJoinQuery += SQL.ON;
					strJoinQuery += this.getJoinQuery(joinMap);
				}
			}
		}
		
		sbQuery.append(strJoinQuery);
		
		return sbQuery.toString();
	}
	
	
	/**
	 * 코호트 연구항목 Query Builder
	 */
	/*@SuppressWarnings({"all"})
	public String getQueryForWithR_old() throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQueryOutline = new StringBuffer();
		List<Map> groupTableList = new ArrayList<Map>();
		List itemList = new ArrayList();
		
		List dataFieldsList = new ArrayList();
		
		Map<String,String> termRangeMap = new HashMap();
		
		int nItemIdx = 1;
		int nItemCnt = 1;
		
		itemList = (ArrayList)this.modelMap.get("dsStudyItem");
		
	//	연구항목 Count구하기.	
		nItemCnt = SQLUtils.getStudyItemCount(itemList,"");
		List dsItemList = SQLUtils.getStudyItemChort(itemList);
		
		termRangeMap = this.getTermRange();
		
	//	연구항목 Loop	
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (Map<String,String>)itemList.get(i);
			
			if("STUDY_ITEM".equals(dsMap.get("ITEM_TYPE_GUBUN")) && !"ALL".equals(dsMap.get("AGG"))){
				int periodCnt = 0;
				int periodDays= 0;
				
				if("PER".equals(dsMap.get("AGG"))){
					periodCnt = this.getTermCnt(dsMap.get("RANGE_CD"));
					periodDays = this.getTermDays(dsMap.get("RANGE_CD"));
				}
				
				List list = this.getItemListByGroup(dsMap.get("GR_LV"));
				
				String strJoin = "";
				String strWheres = "";
				
				if( !"0".equals(dsMap.get("GR_LV"))){
					List list2 = this.getUniqueTableList(list);
					
					if(list2.size() > 1){
						Map joinMap = new HashMap();
						
						for(int j=0; j < list2.size(); j++){
							String table = (String)list2.get(j);
							
							if(j == 0){
								continue;
							}
							
							joinMap.put("SEARCH_TABLE_1", (String)list2.get(j-1));
							joinMap.put("SEARCH_TABLE_2", (String)list2.get(j));
							
							if(StringUtils.isEmpty(strJoin)){
								strJoin = SQL.SEPERATE;
								strJoin += SQL.JOIN + table + SQL.ON; 
								strJoin += this.getJoinQuery(joinMap);	
							}else{
								strJoin += SQL.SEPERATE;
								strJoin += SQL.JOIN + table + SQL.ON; 
								strJoin += this.getJoinQuery(joinMap);
							}
						}
					}
					
					strWheres = "";
					
					for(int j=0; j < list.size(); j++){
						Map dsMap2 = (HashMap)list.get(j);
						
						if("STUDY_ITEM".equals(dsMap2.get("ITEM_TYPE_GUBUN"))){
							continue;
						}
						
						if(StringUtils.isEmpty(strWheres)){
							strWheres = SQL.SEPERATE;
							strWheres += sqlWhereClause.getWhereQuery(dsMap2);
						}else{
							strWheres += SQL.SEPERATE;
							strWheres += SQL.AND + sqlWhereClause.getWhereQuery(dsMap2);
						}
					}
				}
				
				String strPrefix = "";
				
				if( periodCnt == 0){
					strPrefix = "G1_R" + nItemIdx;
					sbQueryOutline.append(SQL.SEPERATE + "G1_R" + nItemIdx + " AS (" );
					sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1 + SQL.SELECT);
					sbQueryOutline.append(SQL.SEPERATE + SQL.TAB2 + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
				
					String strColumns = "";
					String strColumnsBaseDt="";
					
					dataFieldsList.add(SQLSelectClause.getDataFieldMap("CH","R",strPrefix, dsMap, false));
					
					Map<String,String> dsBaseDtMap = new HashMap();
					
					if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
						if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
							strColumnsBaseDt = this.sqlSelectClause.getColumnsForRCohortBaseDate(strPrefix, dsMap);
						}	
					}
					
					strColumns = this.sqlSelectClause.getColumnsForRCohort(strPrefix, dsMap);
					
					if(!StringUtils.isEmpty(strColumnsBaseDt)){
						dataFieldsList.add(SQLSelectClause.getDataFieldMap("CH","R",strPrefix, dsMap, true));
						strColumns += strColumnsBaseDt;
					}
					
					sbQueryOutline.append(strColumns);
					
					sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1 + SQL.FROM);
					sbQueryOutline.append(SQL.SEPERATE + SQL.TAB2 + dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
					
					//DB_TYPE = DB2BLU
					if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
						sbQueryOutline.append(SQL.BLANK + dsMap.get("TABLE"));
						
					}
					
					sbQueryOutline.append(SQL.JOIN + "R_DT" + SQL.ON);
					sbQueryOutline.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
					sbQueryOutline.append(" = ");
					sbQueryOutline.append("R_DT." + QueryVO.gvPatSbstNo);
					
					if(!StringUtils.isEmpty(strJoin)){
						sbQueryOutline.append(strJoin);
					}
					
				//	WHERE절	
					sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1);
					sbQueryOutline.append(SQL.WHERE);
					sbQueryOutline.append(" 1=1");
					sbQueryOutline.append(SQL.SEPERATE);
					
				//	기준일자가 있으면	
					if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
						sbQueryOutline.append(SQL.AND);
						sbQueryOutline.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
						
						
						//AGG가 이전이면	
						if("PAST".equals(dsMap.get("AGG"))){
							sbQueryOutline.append(" < R_DT.BASE_DT ");
							
						}else{
							sbQueryOutline.append(" >= R_DT.BASE_DT ");
							sbQueryOutline.append(SQL.SEPERATE);
							sbQueryOutline.append(SQL.AND);
							sbQueryOutline.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
							sbQueryOutline.append(SQL.BETWEEN);
							sbQueryOutline.append("R_DT.BASE_DT ");
							sbQueryOutline.append(SQL.AND);
							sbQueryOutline.append("'" + termRangeMap.get("RSCH_TERM_TO") + "'");
						}
						
						
					//	기준일자 편차
						if("PER".equals(dsMap.get("AGG"))){
							sbQueryOutline.append(SQL.SEPERATE);
							sbQueryOutline.append(SQL.AND);
							sbQueryOutline.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
							sbQueryOutline.append(SQL.BETWEEN);
							sbQueryOutline.append(" R_DT.BASE_DT + ("+periodDays+" * 0)");
							
							if(dsMap.containsKey("RANGE_DN") && !"".equals(dsMap.get("RANGE_DN"))){
								sbQueryOutline.append(" - ");
								sbQueryOutline.append(dsMap.get("RANGE_DN"));
									
							}
							sbQueryOutline.append(SQL.SEPERATE);
							sbQueryOutline.append(SQL.AND);
							sbQueryOutline.append(" R_DT.BASE_DT + ("+periodDays+" * 0)");
							
							if(dsMap.containsKey("RANGE_DN") && !"".equals(dsMap.get("RANGE_DN"))){
								sbQueryOutline.append(" + ");
								sbQueryOutline.append(dsMap.get("RANGE_DN"));
									
							}
						}
					}
					
					if(!StringUtils.isEmpty(strWheres)){
						sbQueryOutline.append(SQL.SEPERATE + SQL.TAB2);
						sbQueryOutline.append(SQL.AND + strWheres);
					}
					
					sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1);
					sbQueryOutline.append(SQL.GROUP_BY);
					sbQueryOutline.append(SQL.SEPERATE);
					sbQueryOutline.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
					
					sbQueryOutline.append(SQL.SEPERATE + ")");
					
					if(nItemIdx < nItemCnt){
						sbQueryOutline.append(",");	
					}
					
					this.queryResultTableList.add(strPrefix);
					
				}else{
					for(int j=0; j < periodCnt; j++){
						strPrefix = "G1_R" + nItemIdx + "_" + j;
						
						dataFieldsList.add(SQLSelectClause.getDataFieldPeriodMap("CH","R",strPrefix, dsMap, false, j));
						this.queryResultTableList.add(strPrefix);
						
						sbQueryOutline.append(SQL.SEPERATE + strPrefix + " AS (" );
						sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1 + SQL.SELECT);
						sbQueryOutline.append(SQL.SEPERATE + SQL.TAB2 + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						
						String strColumns = "";
						String strColumnsBaseDt="";
						
						Map<String,String> dsBaseDtMap = new HashMap();
						
						if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
							if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
								strColumnsBaseDt = this.sqlSelectClause.getColumnsForRCohortBaseDate(strPrefix, dsMap);
							}	
						}
						
						strColumns = this.sqlSelectClause.getColumnsForRCohort(strPrefix, dsMap);
						
						if(!StringUtils.isEmpty(strColumnsBaseDt)){
							dataFieldsList.add(SQLSelectClause.getDataFieldPeriodMap("CH","R",strPrefix, dsMap, true, j));	//.getDataFieldMap(strPrefix, dsMap, true, j));
							strColumns += strColumnsBaseDt;
						}
						
						sbQueryOutline.append(strColumns);
						
						sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1);
						sbQueryOutline.append(SQL.FROM);
						sbQueryOutline.append(SQL.SEPERATE + SQL.TAB2 + dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
						
						//DB_TYPE = DB2BLU
						if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
							sbQueryOutline.append(SQL.BLANK + dsMap.get("TABLE"));
							
						}
						
						sbQueryOutline.append(SQL.JOIN);
						sbQueryOutline.append("R_DT");
						sbQueryOutline.append(SQL.ON);
						sbQueryOutline.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						sbQueryOutline.append(" = ");
						sbQueryOutline.append("R_DT." + QueryVO.gvPatSbstNo);
						
						if(!StringUtils.isEmpty(strJoin)){
							sbQueryOutline.append(strJoin);
							
						}
						
					//	WHERE절	
						sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1 + "WHERE	1=1 ");
						sbQueryOutline.append(SQL.SEPERATE);
						
					//	기준일자가 있으면	
						if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
							sbQueryOutline.append(SQL.AND);
							sbQueryOutline.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
							
							//AGG가 이전이면	
							if("PAST".equals(dsMap.get("AGG"))){
								sbQueryOutline.append(" < R_DT.BASE_DT ");
								
							}else{
								sbQueryOutline.append(" >= R_DT.BASE_DT ");
								sbQueryOutline.append(SQL.SEPERATE);
								sbQueryOutline.append(SQL.AND);
								sbQueryOutline.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
								sbQueryOutline.append(SQL.BETWEEN);
								sbQueryOutline.append("R_DT.BASE_DT ");
								sbQueryOutline.append(SQL.AND);
								sbQueryOutline.append("'" + termRangeMap.get("RSCH_TERM_TO") + "'");
							}
							
						//	기준일자 편차
							if("PER".equals(dsMap.get("AGG"))){
								sbQueryOutline.append(SQL.SEPERATE);
								sbQueryOutline.append(SQL.AND);
								sbQueryOutline.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
								sbQueryOutline.append(SQL.BETWEEN);
								sbQueryOutline.append(" R_DT.BASE_DT + ("+periodDays+" * "+j+")");
								
								if(dsMap.containsKey("RANGE_DN") && !"".equals(dsMap.get("RANGE_DN"))){
									sbQueryOutline.append(" - ");
									sbQueryOutline.append(dsMap.get("RANGE_DN"));
										
								}
								sbQueryOutline.append(SQL.SEPERATE);
								sbQueryOutline.append(SQL.AND);
								sbQueryOutline.append(" R_DT.BASE_DT + ("+periodDays+" * "+j+")");
								
								if(dsMap.containsKey("RANGE_DN") && !"".equals(dsMap.get("RANGE_DN"))){
									sbQueryOutline.append(" + ");
									sbQueryOutline.append(dsMap.get("RANGE_DN"));
								}
							}
						}
						
						if(!StringUtils.isEmpty(strWheres)){
							sbQueryOutline.append(SQL.SEPERATE + SQL.TAB2 + " AND " + strWheres);
						}
						
						sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1 + SQL.GROUP_BY);
						sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1 + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						
						sbQueryOutline.append(SQL.SEPERATE + ")");
						
						if(nItemIdx < nItemCnt || j < (periodCnt - 1)){
							sbQueryOutline.append(",");	
						}
						
					}
				}
				
				nItemIdx++;
			}
		}
		
		
		
		List dsAggAllItemList = SQLUtils.getStudyItemChortAggAll(itemList);
		
		for(int i=0; i < dsAggAllItemList.size(); i++){
			StringBuffer sbQueryAll = new StringBuffer();
			Map<String,String> dsMap = (HashMap)dsAggAllItemList.get(i);
			
			String strPrefix = "G1_R" + (dsItemList.size() + (i+1));
			
			String strColumns = "";
			String strColumnsBaseDt="";
			
			dataFieldsList.add(SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, false));
			
			Map<String,String> dsBaseDtMap = new HashMap();
			
			if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
				if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
					strColumnsBaseDt = SQLSelectClause.getColumnsForRCohortAggBaseDateVirtual(strPrefix, dsMap);
				}	
			}
			
			strColumns = SQLSelectClause.getColumnsForRCohortVirtual(strPrefix, dsMap);
			
			if(!StringUtils.isEmpty(strColumnsBaseDt)){
				dataFieldsList.add(SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, true));
				strColumns += strColumnsBaseDt;
			}
			
			
			sbQueryAll.append(",");
			sbQueryAll.append(SQL.SEPERATE + strPrefix + SQL.AS + "(");
			sbQueryAll.append(SQL.SEPERATE + SQL.SELECT);
			sbQueryAll.append(SQL.SEPERATE + "''" + SQL.AS + QueryVO.gvPatSbstNo);	
			sbQueryAll.append(SQL.SEPERATE + strColumns);
			
			sbQueryAll.append(SQL.SEPERATE + SQL.FROM);
			
			//DB2BLU
			if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
				sbQueryAll.append(SQL.SEPERATE + SQL.SYSIBM_SYSDUMMY1);
				
			}else{
				sbQueryAll.append(SQL.SEPERATE + SQL.DUAL);
				
			}
			
			
			sbQueryAll.append(SQL.SEPERATE + ")");
			
			sbQueryOutline.append(sbQueryAll.toString());
			
			this.queryResultTableList.add(strPrefix);
			
		}
		

	//	---------------------------------------------------
	//	dataFieldsList
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap = (HashMap)dataFieldsList.get(i);
			this.addDataFields(dsMap);
		}
		
		sbQuery.append(sbQueryOutline.toString());
		
		return sbQuery.toString();
	}
	
	*/
	
	
	/*
	@SuppressWarnings("all")
	public String getQueryForWithRAll_old(Map<String,String> itemMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQueryOutline = new StringBuffer();
		String itemOrder  = "";
		String paramOrder = "";
		
		List<Map> groupTableList = new ArrayList<Map>();
		List itemList = new ArrayList();
		
		this.queryResultTableList = new ArrayList();
		
		List dataFieldsList = new ArrayList();
		
		Map<String,String> termRangeMap = new HashMap();
		
		int termDays = 0;
		int nItemIdx = 1;
		int nItemCnt = 1;
		
		itemList = (ArrayList)this.modelMap.get("dsStudyItem");
		
		termRangeMap = this.getTermRange();
		
		termDays = DateUtils.getDaysDiff(termRangeMap.get("RGST_TERM_FROM"), 
										 termRangeMap.get("RSCH_TERM_TO"));
		
	//	연구항목 Count구하기.	
		nItemCnt = SQLUtils.getStudyItemCount(itemList,"ALL");
		List dsItemList = SQLUtils.getStudyItemChort(itemList);
		

		for(int i=0; i < dsItemList.size(); i++){
			StringBuffer sbQueryAll = new StringBuffer();
			Map<String,String> dsMap = (HashMap)dsItemList.get(i);
			
			
			int periodCnt = 0;
			int periodDays= 0;
			
			if("PER".equals(dsMap.get("AGG"))){
				periodCnt = this.getTermCnt(dsMap.get("RANGE_CD"));
				periodDays = this.getTermDays(dsMap.get("RANGE_CD"));
			}
			
			String strPrefix ="";
			
			if( periodCnt == 0){
				//strPrefix = "G1_R" + (i+1);
				strPrefix = R_TAB_CD + (i+1);
				String strColumns = "";
				String strColumnsBaseDt="";
				
				dataFieldsList.add(SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, false));
				
				Map<String,String> dsBaseDtMap = new HashMap();
				
				if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
					if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
						strColumnsBaseDt = SQLSelectClause.getColumnsForRCohortAggBaseDateVirtual(strPrefix, dsMap);
					}	
				}
				
				strColumns = SQLSelectClause.getColumnsForRCohortVirtual(strPrefix, dsMap);
				
				if(!StringUtils.isEmpty(strColumnsBaseDt)){
					dataFieldsList.add(SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, true));
					strColumns += strColumnsBaseDt;
				}
				
				if(i > 0){
					sbQueryAll.append(",");	
				}
				
				sbQueryAll.append(SQL.SEPERATE + strPrefix + SQL.AS + "(");
				sbQueryAll.append(SQL.SEPERATE + SQL.SELECT);
				sbQueryAll.append(SQL.SEPERATE + "''" + SQL.AS + QueryVO.gvPatSbstNo);	
				sbQueryAll.append(SQL.SEPERATE + strColumns);
				
				sbQueryAll.append(SQL.SEPERATE + SQL.FROM);
				
				//DB2BLU
				if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
					sbQueryAll.append(SQL.SEPERATE + SQL.SYSIBM_SYSDUMMY1);
					
				}else{
					sbQueryAll.append(SQL.SEPERATE + SQL.DUAL);
					
				}
				
				sbQueryAll.append(SQL.SEPERATE + ")");
				
				this.queryResultTableList.add(strPrefix);
				
			}else{
				for(int j=0; j < periodCnt; j++){
					strPrefix = R_TAB_CD + nItemIdx + "_" + j;
					
					String strColumns = "";
					String strColumnsBaseDt="";
					
					dataFieldsList.add(SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, false));
					
					Map<String,String> dsBaseDtMap = new HashMap();
					
					if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
						if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
							strColumnsBaseDt = SQLSelectClause.getColumnsForRCohortAggBaseDateVirtual(strPrefix, dsMap);
						}	
					}
					
					strColumns = SQLSelectClause.getColumnsForRCohortVirtual(strPrefix, dsMap);
					
					if(!StringUtils.isEmpty(strColumnsBaseDt)){
						dataFieldsList.add(SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, true));
						strColumns += strColumnsBaseDt;
					}
					
					if(i > 0){
						sbQueryAll.append(",");	
					}
					
					sbQueryAll.append(SQL.SEPERATE + strPrefix + SQL.AS + "(");
					sbQueryAll.append(SQL.SEPERATE + SQL.SELECT);
					sbQueryAll.append(SQL.SEPERATE + "''" + SQL.AS + QueryVO.gvPatSbstNo);	
					sbQueryAll.append(SQL.SEPERATE + strColumns);
					sbQueryAll.append(SQL.SEPERATE + SQL.FROM);
					
					//DB2BLU
					if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
						sbQueryAll.append(SQL.SEPERATE + SQL.SYSIBM_SYSDUMMY1);
						
					}else{
						sbQueryAll.append(SQL.SEPERATE + SQL.DUAL);
						
					}
					
					
					sbQueryAll.append(SQL.SEPERATE + ")");
					
					this.queryResultTableList.add(strPrefix);
					
				}
				
			}
			
			sbQueryOutline.append(sbQueryAll.toString());
			
			
			
		}
		
		
		
	//	연구항목 Loop	
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (Map<String,String>)itemList.get(i);
			itemOrder = String.valueOf(dsMap.get("ORDER"));
			paramOrder = String.valueOf(itemMap.get("ORDER"));
			
			if("STUDY_ITEM".equals(dsMap.get("ITEM_TYPE_GUBUN")) && "ALL".equals(dsMap.get("AGG")) && itemOrder.equals(paramOrder)){
				List list = this.getItemListByGroup(dsMap.get("GR_LV"));
				
				String strJoin = "";
				String strWheres = "";
				
				if( !"0".equals(dsMap.get("GR_LV"))){
					List list2 = this.getUniqueTableList(list);
					
					if(list2.size() > 1){
						Map joinMap = new HashMap();
						
						for(int j=0; j < list2.size(); j++){
							String table = (String)list2.get(j);
							
							if(j == 0){
								continue;
							}
							
							joinMap.put("SEARCH_TABLE_1", (String)list2.get(j-1));
							joinMap.put("SEARCH_TABLE_2", (String)list2.get(j));
							
							if(StringUtils.isEmpty(strJoin)){
								strJoin = SQL.SEPERATE;
								strJoin += SQL.JOIN + table + SQL.ON; 
								strJoin += this.getJoinQuery(joinMap);	
							}else{
								strJoin += SQL.SEPERATE;
								strJoin += SQL.JOIN + table + SQL.ON; 
								strJoin += this.getJoinQuery(joinMap);
							}
						}
					}
					
					strWheres = "";
					
					for(int j=0; j < list.size(); j++){
						Map dsMap2 = (HashMap)list.get(j);
						
						if("STUDY_ITEM".equals(dsMap2.get("ITEM_TYPE_GUBUN"))){
							continue;
						}
						
						if(StringUtils.isEmpty(strWheres)){
							strWheres = SQL.SEPERATE;
							strWheres += sqlWhereClause.getWhereQuery(dsMap2);
						}else{
							strWheres += SQL.SEPERATE;
							strWheres += SQL.AND + sqlWhereClause.getWhereQuery(dsMap2);
						}
					}
				}
				
				String strPrefix = "";
				
				strPrefix = "G1_R" + (dsItemList.size() + (nItemIdx));
				strPrefix = R_TAB_CD + (dsItemList.size() + (nItemIdx));
				sbQueryOutline.append(",");	
				sbQueryOutline.append(SQL.SEPERATE + "G1_R" + (dsItemList.size() + (nItemIdx)) + " AS (" );
				sbQueryOutline.append(SQL.SEPERATE + R_TAB_CD + (dsItemList.size() + (nItemIdx)) + " AS (" );
				sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1 + SQL.SELECT);
				sbQueryOutline.append(SQL.SEPERATE + SQL.TAB2 + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
			
				String strColumns = "";
				String strColumnsBaseDt="";
				
				dataFieldsList.add(SQLSelectClause.getDataFieldMap("CH","R",strPrefix, dsMap, false));
				
				Map<String,String> dsBaseDtMap = new HashMap();
				
				if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
					if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
						strColumnsBaseDt = this.sqlSelectClause.getColumnsForRCohortBaseDate(strPrefix, dsMap);
					}	
				}
				
				strColumns = this.sqlSelectClause.getColumnsForRCohort(strPrefix, dsMap);
				
				if(!StringUtils.isEmpty(strColumnsBaseDt)){
					dataFieldsList.add(SQLSelectClause.getDataFieldMap("CH","R",strPrefix, dsMap, true));
					strColumns += strColumnsBaseDt;
				}
				
				sbQueryOutline.append(strColumns);
				
				sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1 + SQL.FROM);
				sbQueryOutline.append(SQL.SEPERATE + SQL.TAB2 + dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
				
				//DB_TYPE = DB2BLU
				if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
					sbQueryOutline.append(SQL.BLANK + dsMap.get("TABLE"));
					
				}
				
				sbQueryOutline.append(SQL.JOIN + " R_DT " + SQL.ON);
				sbQueryOutline.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
				sbQueryOutline.append(" = ");
				sbQueryOutline.append("R_DT." + QueryVO.gvPatSbstNo);
				
				if(!StringUtils.isEmpty(strJoin)){
					sbQueryOutline.append(strJoin);
				}
				
			//	WHERE절	
				sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1);
				sbQueryOutline.append(SQL.WHERE);
				sbQueryOutline.append(" 1=1");
				sbQueryOutline.append(SQL.SEPERATE);
				
			//	기준일자가 있으면	
				if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
					sbQueryOutline.append(SQL.AND);
					sbQueryOutline.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
					
					//AGG가 이전이면	
					if("PAST".equals(dsMap.get("AGG"))){
						sbQueryOutline.append(" < R_DT.BASE_DT ");
						
					}else{
						sbQueryOutline.append(" >= R_DT.BASE_DT ");
						sbQueryOutline.append(SQL.SEPERATE);
						sbQueryOutline.append(SQL.AND);
						sbQueryOutline.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
						sbQueryOutline.append(SQL.BETWEEN);
						sbQueryOutline.append("R_DT.BASE_DT ");
						sbQueryOutline.append(SQL.AND);
						sbQueryOutline.append("'" + termRangeMap.get("RSCH_TERM_TO") + "'");
					}
					
				}
				
				if(!StringUtils.isEmpty(strWheres)){
					sbQueryOutline.append(SQL.SEPERATE + SQL.TAB2);
					sbQueryOutline.append(SQL.AND + strWheres);
				}
				
				sbQueryOutline.append(SQL.SEPERATE + SQL.TAB1);
				sbQueryOutline.append(SQL.SEPERATE + ")");
				
				if(nItemIdx < (nItemCnt - 1)){
					
				}

				this.queryResultTableList.add(strPrefix);
				
				nItemIdx++;
			}else if("STUDY_ITEM".equals(dsMap.get("ITEM_TYPE_GUBUN")) && "ALL".equals(dsMap.get("AGG")) && !itemOrder.equals(paramOrder)){
				StringBuffer sbQueryAll = new StringBuffer();
				
				String strPrefix = "G1_R" + (dsItemList.size() + (nItemIdx));
				String strPrefix = R_TAB_CD + (dsItemList.size() + (nItemIdx));
				String strColumns = "";
				String strColumnsBaseDt="";
				
				dataFieldsList.add(SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, false));
				
				Map<String,String> dsBaseDtMap = new HashMap();
				
				if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
					if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
						strColumnsBaseDt = SQLSelectClause.getColumnsForRCohortAggBaseDateVirtual(strPrefix, dsMap);
					}	
				}
				
				strColumns = SQLSelectClause.getColumnsForRCohortVirtual(strPrefix, dsMap);
				
				if(!StringUtils.isEmpty(strColumnsBaseDt)){
					dataFieldsList.add(SQLSelectClause.getDataFieldVirtualMap(strPrefix, dsMap, true));
					strColumns += strColumnsBaseDt;
				}
				
				
				sbQueryAll.append(",");
				sbQueryAll.append(SQL.SEPERATE + strPrefix + SQL.AS + "(");
				sbQueryAll.append(SQL.SEPERATE + SQL.SELECT);
				sbQueryAll.append(SQL.SEPERATE + "''" + SQL.AS + QueryVO.gvPatSbstNo);	
				sbQueryAll.append(SQL.SEPERATE + strColumns);
				
				sbQueryAll.append(SQL.SEPERATE + SQL.FROM);
				
				//DB2BLU
				if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
					sbQueryAll.append(SQL.SEPERATE + SQL.SYSIBM_SYSDUMMY1);
					
				}else{
					sbQueryAll.append(SQL.SEPERATE + SQL.DUAL);
					
				}
				
				//sbQueryAll.append(SQL.SEPERATE + SQL.DUAL);
				
				sbQueryAll.append(SQL.SEPERATE + ")");
				
				sbQueryOutline.append(sbQueryAll.toString());
				
				this.queryResultTableList.add(strPrefix);
				
				nItemIdx++;
			}
		}
		
		
		
	//	dataFieldsList
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap = (HashMap)dataFieldsList.get(i);
			this.addDataFields(dsMap);
		}
		
		sbQuery.append(sbQueryOutline.toString());
		
		return sbQuery.toString();
	}
	*/
	
}



