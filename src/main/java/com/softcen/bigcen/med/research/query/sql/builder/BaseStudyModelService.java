package com.softcen.bigcen.med.research.query.sql.builder;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.common.sys.service.ISysService;
import com.softcen.bigcen.med.research.query.service.IQueryService;
import com.softcen.bigcen.med.research.query.service.ResultServiceImpl;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.research.query.sql.helper.SQLSelectClause;
import com.softcen.bigcen.med.research.query.sql.helper.SQLUtils;
import com.softcen.bigcen.med.research.query.sql.helper.SQLWhereClause;
import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * 연구 베이스 클래스
 * @author user
 *
 */

@Service("baseStudyModelService")
public abstract class BaseStudyModelService{
	protected static final Logger logger = Logger.getLogger(BaseStudyModelService.class);
	
	@Autowired
	private ISysService sysService;
	
	@Autowired
	private IQueryService queryService;
	
	@Autowired
	private ResultServiceImpl resultService;
	
	public Map<Object,Object> modelMap;
	
	
//	조건셋
	private List itemContDetlList;
	protected List dsStudyItemList;				//연구항목
	
	public List<String> queryResultTableList;	//최종 Join을 위한 테이블 목록
	public List queryResultColumnList;			//연구항목메타목록
	private List censoredColumnList;			//중도절단
	private List periodColumnList = null;
	
	boolean isPeriodColumnYn = false;
	
	protected SQLWhereClause sqlWhereClause;
	protected SQLSelectClause sqlSelectClause;
	
	public BaseStudyModelService(){
		this.sqlSelectClause = new SQLSelectClause();
		this.sqlWhereClause = new SQLWhereClause();
	}
	
	
	/**
	 * 연구모델 쿼리 생성 init
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes","cast"})
	public void init() throws Exception{
		
		this.censoredColumnList = new ArrayList();
		
	//	Query에서 사용하는 공통 VO설정	
		QueryVO.gvDbType = PropertiesUtils.getString("DB_TYPE");
		QueryVO.gvSchema = PropertiesUtils.getTargetString("SCHEMA");
		QueryVO.gvTablePtPatMst = PropertiesUtils.getTargetString("TABLE_PT_PAT_MST");
		QueryVO.gvPatSbstNo = PropertiesUtils.getTargetString("PAT_SBST_NO");
		QueryVO.gvBirthYmd = PropertiesUtils.getTargetString("BIRTH_YMD");
		QueryVO.gvBaseDtTimestampYn = PropertiesUtils.getString("BASE_DT_TIMESTAMP_YN");
		QueryVO.gvSearchYn = PropertiesUtils.getTargetString("SEARCH_YN");
		QueryVO.gvHeaderWithItemNmYn = PropertiesUtils.getString("HEADER_WITH_ITEM_NM_YN");
		
		QueryVO.gvMethCd = String.valueOf(this.modelMap.get("GBN_MODEL"));
		QueryVO.gvTabCd = String.valueOf(this.modelMap.get("GBN_TAB"));
		
	//	공통코드 조회
		Map<Object,Object> paramMap = new HashMap<Object,Object>();
		paramMap = new HashMap<Object,Object>();	
		paramMap.put("SEARCH_COMM_GRP_ID", "CDW_CENSORING_CD");
		
		this.censoredColumnList = (ArrayList)sysService.getCommonCodeList(paramMap);
		
		//생존분석컬럼 설정
		if(this.censoredColumnList != null){
			QueryVO.gvDeathYnColumn = SQLUtils.getCensoredColumn(this.censoredColumnList, "VALUE", "CENSORED_00");		
			QueryVO.gvTreatQualYnColumn = SQLUtils.getCensoredColumn(this.censoredColumnList, "VALUE", "CENSORED_01");	//수신자격여부
			QueryVO.gvNoVisitColumn = SQLUtils.getCensoredColumn(this.censoredColumnList, "VALUE", "CENSORED_02");		//미내원
			QueryVO.gvDoCodeColumn =  SQLUtils.getCensoredColumn(this.censoredColumnList, "VALUE", "CENSORED_03");		//처방코드
			
			QueryVO.gvDeathYnBaseDtColumn = SQLUtils.getCensoredColumn(this.censoredColumnList, "COMM_CD_EXT3", "CENSORED_00");	
			QueryVO.gvTreatQualYnBaseDtColumn = SQLUtils.getCensoredColumn(this.censoredColumnList, "COMM_CD_EXT3", "CENSORED_01");	
			QueryVO.gvNoVisitBaseDtColumn = SQLUtils.getCensoredColumn(this.censoredColumnList, "COMM_CD_EXT3", "CENSORED_02");	
			QueryVO.gvDoCodeBaseDtColumn = SQLUtils.getCensoredColumn(this.censoredColumnList, "COMM_CD_EXT3", "CENSORED_03");	
			
		}
		
	//	연구항목	
		this.itemContDetlList = (ArrayList)this.modelMap.get("dsItemColumnList");
		
	//	연구항목 설정	
		if("02".equals(QueryVO.gvTabCd)){
			this.dsStudyItemList = (ArrayList)this.modelMap.get("dsStudyItem");
			
		}
		
	//	G그룹, G메인, R그룹 	
		this.queryResultTableList = new ArrayList();
		this.queryResultColumnList = new ArrayList();
		
	}
	
	
	/**
	 * UI에서 넘어온 정보를 설정
	 * @param modelMap
	 */
	public void setModelMap(Map<Object, Object> modelMap) {
		this.modelMap = modelMap;
	}
	
	
	/**
	 * 연구항목 반환
	 * @return
	 */
	@SuppressWarnings({"rawtypes"})
	public List getItemContDetlList() {
		return this.itemContDetlList;
	}
	
	
	/**
	 * 1.그룹목록을 추출한다.
	 * 2.조건에 해당하는 환자목록을 추출한다. (this.getPatientList)
	 * 3.조건에 해당하는 각 컬럼의 값을 추출한후 환자목록과 Join한다.(this.getQueryGroup)
	 * 4.기준일자를 구한다.
	 * 
	 * @param periodMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public String getQueryForWithMain(Map<String,String> periodMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQueryMain = new StringBuffer();
		
		StringBuffer sbQueryPatSbsNo 	= new StringBuffer();	//환자목록 추출
		StringBuffer sbQueryGroup 		= new StringBuffer();
		StringBuffer sbQueryJoin 		= new StringBuffer();	//쿼리조인
		StringBuffer sbQueryColumn 		= new StringBuffer();	//컬럼
		
		StringBuffer sbMinDt = new StringBuffer();
		StringBuffer sbMaxDt = new StringBuffer();
		StringBuffer sbBasDt = new StringBuffer();
		
		List<Map> itemList = new ArrayList();					//연구항목
		List<Map> groupAndOrList = new ArrayList();				//그룹(ANdOr 포함)
		
		itemList = (ArrayList)this.modelMap.get("dsItemColumnList");
		groupAndOrList = SQLUtils.getGroupListWithAndOr(itemList);
		
		periodColumnList = new ArrayList();
		
		sbQueryPatSbsNo.append(this.getPatientList("C",itemList,  periodMap));
		
	//	각 그룹의 집합 생성	
		for(int i=0; i < groupAndOrList.size(); i++){
			Map<String,String> dsMap = groupAndOrList.get(i);
			String groupKey 	= "";
			String groupAlias 	= "";
			
			List<Map> groupTableList = new ArrayList();
			List<Map> groupItemList  = new ArrayList();
			
			groupKey 		= dsMap.get("GR_LV");
			groupAlias		= "G" + groupKey;
			groupTableList 	= SQLUtils.getGroupTableList(itemList, groupKey);
			groupItemList  	= SQLUtils.getGroupItemList(itemList, groupKey);
			
			sbQueryGroup = new StringBuffer();
			sbQueryGroup.append(this.getQueryGroup(groupKey, "C", groupTableList, groupItemList,periodMap));
			
		//	equal join, left outer join 처리	
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
		
		
		sbQueryColumn = new StringBuffer();
		
		String strQueryPeriodColumns = "";
		
		if(periodMap.size() > 0){
			strQueryPeriodColumns = SQLSelectClause.getColumnPeriodAliasMain(periodMap, this.periodColumnList);
			
			Map<String,String> resultMap = new HashMap();
			resultMap.put("ITEM_TYPE"  	,"DAT");
			resultMap.put("DATA_TYPE"  	,"date");
			resultMap.put("ITEM_SEQ"	,String.valueOf(periodMap.get("ITEM_SEQ")));
			resultMap.put("DISP_COLUMN"	,SQLSelectClause.getColumnPeriodAlias(periodMap, "", "_", "", true));
			resultMap.put("DISP_COLUMN_COMMENT"	    ,periodMap.get("TABLE_COMMENT") + "_" + periodMap.get("COLUMN_COMMENT") + "_주기_" + String.valueOf(periodMap.get("ORDER")));
			
			this.addDataFields(resultMap);
		}
		
	//	G MAIN 컬럼	
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (HashMap)itemList.get(i);
			String groupAlias 	= "";
			
			if("COHORT".equals(dsMap.get("TABLE"))){
				continue;
			}
			
			groupAlias = "G" + String.valueOf(dsMap.get("GR_LV"));
			sbQueryColumn.append(",MAX(" + groupAlias + "_" + dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_" + String.valueOf(dsMap.get("ORDER"))+ ") AS ");
			sbQueryColumn.append(groupAlias + "_" + dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_" + String.valueOf(dsMap.get("ORDER")));
			
			this.addDataFields(SQLSelectClause.getDataFieldMap(QueryVO.gvMethCd,"C",groupAlias, dsMap, false));
			
		}
		
		sbMinDt.append(this.getQueryBaseDt("MIN"));
		sbMaxDt.append(this.getQueryBaseDt("MAX"));
		sbBasDt.append(this.getQueryBaseDt("BAS"));
		
	//	Main Query	
		sbQueryMain.append(SQL.SEPERATE + SQL.SELECT);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "T." + QueryVO.gvPatSbstNo);
		if(!StringUtils.isEmpty(strQueryPeriodColumns)){
			sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "," + strQueryPeriodColumns);	
		}
		
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + sbQueryColumn.toString());
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "," + sbMinDt.toString());
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "," + sbMaxDt.toString());
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "," + sbBasDt.toString());
		sbQueryMain.append(SQL.SEPERATE + SQL.FROM + "(");
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + sbQueryPatSbsNo.toString());
		sbQueryMain.append(SQL.SEPERATE + ")T");
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + sbQueryJoin.toString());
		sbQueryMain.append(SQL.SEPERATE + SQL.GROUP_BY);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "T." + QueryVO.gvPatSbstNo);
		
		
		Map<String,String> dataFieldMap = new HashMap<String,String>();
		
		dataFieldMap.put("ITEM_TYPE"				,"DAT");
		dataFieldMap.put("DATA_TYPE"				,"timestamp");
		dataFieldMap.put("ITEM_SEQ"				,"");
		dataFieldMap.put("DISP_COLUMN"				,"BASE_DT");
		dataFieldMap.put("DISP_COLUMN_COMMENT"		,"기준일자");
		dataFieldMap.put("HIDDEN_YN"	    		,"N");
		
		this.addDataFields(dataFieldMap);
		
		
	//	WITH	
		sbQuery.append(SQL.SEPERATE + SQL.WITH);
		sbQuery.append(SQL.SEPERATE + "G1 AS( ");
		sbQuery.append(SQL.SEPERATE + sbQueryMain);
		sbQuery.append(SQL.SEPERATE + ")");
		
		return sbQuery.toString();
	}
	
	/**
	 * 환자목록
	 * @param tabCd
	 * @param itemList
	 * @param periodMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public String getPatientList(String tabCd, List<Map> itemList,Map<String,String> periodMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		StringBuffer sbQueryGroup 		= new StringBuffer();
		
		List<Map> groupAndOrList = new ArrayList();				//그룹(ANdOr 포함)
		List<String> groupJoinList = new ArrayList();
		
		groupAndOrList = SQLUtils.getGroupListWithAndOr(itemList);
		
		StringBuffer sbQueryGroupWrap = new StringBuffer();
		
		int nAndOrStart = 0;
		
		
		for(int i=0; i < groupAndOrList.size(); i++){
			Map<String,String> dsMap = (HashMap)groupAndOrList.get(i);
			String groupKey = "";
			String groupAlias = "";
			String strQuery = "";
			
			groupKey = dsMap.get("GR_LV");
			groupAlias = "g" + (i+1);
			
			List<Map> groupTableList = SQLUtils.getGroupTableList(itemList, groupKey);
			List<Map> groupItemList  = SQLUtils.getGroupItemList(itemList, groupKey);
			
			strQuery = this.getQueryPatSbstNoList(groupKey, tabCd, groupTableList, groupItemList,periodMap);
			
			boolean isNullNextOr 	= this.isNullNextOr(groupAndOrList, i);
			boolean isNullNextAnd 	= this.isNullNextAnd(groupAndOrList, i);
			boolean isOrNextAnd 	= this.isOrNextAnd(groupAndOrList, i);
			boolean isOrPrevAnd 	= this.isOrPrevAnd(groupAndOrList, i);
			boolean isAndNextAnd 	= this.isAndNextAnd(groupAndOrList, i);
			boolean isAndPrevAnd	= this.isAndPrevAnd(groupAndOrList, i);
			
			String join = dsMap.get("AND_OR");
			
			sbQueryGroup = new StringBuffer();
			
			sbQueryGroup.append(SQL.SEPERATE);
			
			if("AND".equals(join) && !StringUtils.isEmpty(sbQueryGroupWrap.toString())){
				sbQueryGroup.append(SQL.TAB1 + SQL.JOIN + SQL.SEPERATE);
			
			}else if("OR".equals(join) && !StringUtils.isEmpty(sbQueryGroupWrap.toString())){
				if(isOrPrevAnd && !isNullNextOr && nAndOrStart > 1){
					sbQueryGroup.append(SQL.SEPERATE + ")" );
				}
				
				sbQueryGroup.append(SQL.TAB1 + SQL.UNION + SQL.SEPERATE);
			}
			
			
			if(StringUtils.isNull(join) || StringUtils.isEmpty(join)){
				if(isNullNextAnd){
					sbQueryGroup.append(SQL.SEPERATE + SQL.SELECT + groupAlias + "." + QueryVO.gvPatSbstNo);
					sbQueryGroup.append(SQL.SEPERATE + SQL.FROM);
					sbQueryGroup.append(SQL.SEPERATE + "(");
					sbQueryGroup.append(SQL.SEPERATE + "(" + strQuery + ")" + groupAlias);
					
				}else{
					sbQueryGroup.append(strQuery);
					
				}
				
			}else if("OR".equals(join)){
				sbQueryGroup.append(strQuery);
				
			}else if("AND".equals(join)){
				if(StringUtils.isEmpty(sbQueryGroupWrap.toString())){
					if(isAndNextAnd){
						sbQueryGroup.append(SQL.SEPERATE + SQL.SELECT + groupAlias + "." + QueryVO.gvPatSbstNo);
						sbQueryGroup.append(SQL.SEPERATE + SQL.FROM);
						sbQueryGroup.append(SQL.SEPERATE + "(");
						sbQueryGroup.append(SQL.SEPERATE + "(" + strQuery + ")" + groupAlias);
						
					}else{
						sbQueryGroup.append(strQuery);	
					}
					
				}else{
					sbQueryGroup.append("(" + strQuery + ")" + groupAlias);
				}
			}
			
			
			if(isAndPrevAnd){
				sbQueryGroup.append(SQL.ON + "(g" + (nAndOrStart) + "." + QueryVO.gvPatSbstNo + SQL.EQUAL + groupAlias + "." + QueryVO.gvPatSbstNo + ")");
				if((groupAndOrList.size()-1) == i){
					sbQueryGroup.append(SQL.SEPERATE + ")"); 
				}
			}
			
			
		// 	현재로우가 AND 다음 로우가 OR면 t그룹생성 
			sbQueryGroupWrap.append(sbQueryGroup.toString());
			
			if(isOrNextAnd){
				groupJoinList.add(sbQueryGroupWrap.toString());
				sbQueryGroupWrap = new StringBuffer();
				nAndOrStart=0;
			}else{
				//sbQueryGroupWrap.append(sbQueryGroup.toString());
				nAndOrStart++;
			}
			
		// 	isAndOr == false이고 그룹목록의 마지막이면  
			if(!isOrNextAnd && (groupAndOrList.size()-1) == i){
				groupJoinList.add(sbQueryGroupWrap.toString());
				
			}
		}
		
		
		for(int i=0; i < groupJoinList.size(); i++){
			String strSubQuery = (String)groupJoinList.get(i);
			
			if(i==0){
				sbQuery.append(SQL.SEPERATE +SQL.SELECT + SQL.BLANK + "t" + i + "." + QueryVO.gvPatSbstNo + SQL.BLANK + SQL.FROM); 
			}
		
			sbQuery.append(SQL.SEPERATE + "(");
			sbQuery.append(strSubQuery);
			sbQuery.append(SQL.SEPERATE + ")t" + i);
			
			if(i > 0){
				sbQuery.append(SQL.SEPERATE +SQL.ON + "t" + (i-1) + "." + QueryVO.gvPatSbstNo + SQL.EQUAL + "t" + (i) + "." + QueryVO.gvPatSbstNo  ); 
			}
			
			if(groupJoinList.size()-1 > i){
				sbQuery.append(SQL.SEPERATE + SQL.JOIN);
			} 
		}
		
		return sbQuery.toString();
	}
	
	
	
	/**
	 * 환자목록 추출 SQL
	 * @param groupKey
	 * @param groupTableList
	 * @param groupItemList
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"unused","cast","rawtypes"})
	public String getQueryPatSbstNoList(String groupKey, String tabCd, List<Map> groupTableList, List<Map> groupItemList,Map<String,String> periodMap) throws Exception{
		StringBuffer sbQuery 			= new StringBuffer();
		StringBuffer sbQueryColumn 		= new StringBuffer();
		StringBuffer sbQueryFromClause 	= new StringBuffer();
		StringBuffer sbQueryWhereClause = new StringBuffer();
		String strJoinQuery = "";
		
		String strWheres = "";
		String groupAlias = "G" + groupKey;
		
		
		String strAlias = "G" + groupKey;
		StringBuffer sbQueryPeriodJoin = new StringBuffer();
		StringBuffer sbQueryPeriodWhere = new StringBuffer();

		//FROM CLAUSE	
		sbQueryFromClause.append(this.getFromClause(groupTableList));
		
		if("RQ".equals(tabCd)){
			List tmpGroupList = new ArrayList();
			for(int i=0; i < groupItemList.size(); i++){
				Map<String,String> dsMap = (HashMap)groupItemList.get(i);
				if("생존분석".equals(dsMap.get("TABLE_COMMENT")) && QueryVO.gvNoVisitColumn.equals(dsMap.get("COLUMN"))){
					continue;
				}
				
				tmpGroupList.add(dsMap);
			}
			
			strWheres = this.sqlWhereClause.getWhereClause(tmpGroupList);
			
		}else{
			strWheres = this.sqlWhereClause.getWhereClause(groupItemList);
			
		}
		
		
		if(!StringUtils.isEmpty(sbQueryPeriodJoin.toString())){
			sbQueryFromClause.append(SQL.SEPERATE + sbQueryPeriodJoin.toString());
		}
		
	//	반복주기	
		if(periodMap.size() > 0){
			sbQueryPeriodJoin.append(this.getFromClausePeriod(groupTableList,periodMap));
			sbQueryPeriodWhere.append(SQLWhereClause.getWhereClausePeriod(periodMap));
		}
		
		if(!StringUtils.isEmpty(sbQueryPeriodJoin.toString())){
			sbQueryFromClause.append(SQL.SEPERATE + sbQueryPeriodJoin.toString());
		}
		
		if(!StringUtils.isEmpty(sbQueryPeriodWhere.toString())){
			strWheres += SQL.SEPERATE + sbQueryPeriodWhere.toString();
		}
		
		if("CH".equals(QueryVO.gvMethCd) && "C".equals(tabCd)){
			strWheres += SQL.SEPERATE + SQLWhereClause.getQueryForWhereCohort(groupKey, this.getItemContDetlList());
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.SELECT );
		sbQuery.append(SQL.SEPERATE + this.getGroupPatSbstNo(groupTableList));
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(sbQueryFromClause.toString());
		sbQuery.append(SQL.SEPERATE + SQL.WHERE);
		sbQuery.append(SQL.SEPERATE + " 1=1 ");
		
		if(!StringUtils.isEmpty(strWheres)){
			sbQuery.append(SQL.SEPERATE + strWheres);
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.GROUP_BY + this.getGroupPatSbstNo(groupTableList));
		
		
		return sbQuery.toString();
		
	}
	
	
	/**
	 * 
	 * @param groupKey
	 * @param groupTableList
	 * @param groupItemList
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"unchecked","unused","cast","rawtypes"})
	public String getQueryGroup(String groupKey, String tabCd, List<Map> groupTableList, List<Map> groupItemList,Map<String,String> periodMap) throws Exception{
		StringBuffer sbQuery 			= new StringBuffer();
		StringBuffer sbQueryColumn 		= new StringBuffer();
		StringBuffer sbQueryFromClause 	= new StringBuffer();
		StringBuffer sbQueryWhereClause = new StringBuffer();
		String strJoinQuery = "";
		

		String strWheres = "";
		String groupAlias = "G" + groupKey;
		
	//	SELECT	
		for(int i=0; i < groupItemList.size(); i++){
			Map<String,String> dsMap = (HashMap)groupItemList.get(i);
			
			if("COHORT".equals(dsMap.get("TABLE"))){
				continue;
			}
			
			String column = sqlSelectClause.getColumnsForC(groupAlias, dsMap);
			String strColumnsBaseDt = "";
			
			sbQueryColumn.append(column);
			if("Y".equals(dsMap.get("BASE_DT_YN"))){
				if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
					if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
						strColumnsBaseDt = SQLSelectClause.getColumnsForCBaseDate(groupAlias, dsMap);
					}
				}	
			}
			
			if(!StringUtils.isEmpty(strColumnsBaseDt)){
				sbQueryColumn.append(strColumnsBaseDt);
			}
		}
		
		
	//	FROM CLAUSE	
		sbQueryFromClause.append(this.getFromClause(groupTableList));
		
	//	반복여부
		String strQueryPeriodColumns = "";
		String strAlias = "G" + groupKey;
		StringBuffer sbQueryPeriodJoin = new StringBuffer();
		StringBuffer sbQueryPeriodWhere = new StringBuffer();
		
		if(periodMap.size() > 0){
			sbQueryPeriodJoin.append(this.getFromClausePeriod(groupTableList,periodMap));
			sbQueryPeriodWhere.append(SQLWhereClause.getWhereClausePeriod(periodMap));
			
			strQueryPeriodColumns += SQL.MIN + "(";
			strQueryPeriodColumns += SQLSelectClause.getColumnPeriodAlias(periodMap, "", ".", "", false);
			strQueryPeriodColumns += ")";
			strQueryPeriodColumns += SQL.AS;
			strQueryPeriodColumns += SQLSelectClause.getColumnPeriodAlias(periodMap, strAlias, "_P_", "", true);
			
			periodColumnList.add(SQLSelectClause.getColumnPeriodAlias(periodMap, strAlias, "_P_", "", true));
			
		}
		
		if(!StringUtils.isEmpty(strQueryPeriodColumns)){
			sbQueryColumn.append(SQL.SEPERATE + SQL.TAB2 + "," + strQueryPeriodColumns);
		}
		
		
		if(!StringUtils.isEmpty(sbQueryPeriodJoin.toString())){
			sbQueryFromClause.append(SQL.SEPERATE + sbQueryPeriodJoin.toString());
		}
		
	//	WHERE	
		strWheres = this.sqlWhereClause.getWhereClause(groupItemList);
		
		if(!StringUtils.isEmpty(sbQueryPeriodWhere.toString())){
			strWheres += SQL.SEPERATE + sbQueryPeriodWhere.toString();
		}
		
		if("CH".equals(QueryVO.gvMethCd) && "C".equals(tabCd)){
			strWheres += SQL.SEPERATE + SQLWhereClause.getQueryForWhereCohort(groupKey, this.getItemContDetlList());
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.SELECT );
		sbQuery.append(SQL.SEPERATE + this.getGroupPatSbstNo(groupTableList));
		sbQuery.append(SQL.SEPERATE + sbQueryColumn);
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(sbQueryFromClause.toString());
		sbQuery.append(SQL.SEPERATE + SQL.WHERE);
		sbQuery.append(SQL.SEPERATE + " 1=1 ");
		
		if(!StringUtils.isEmpty(strWheres)){
			sbQuery.append(SQL.SEPERATE + strWheres);
		}
		sbQuery.append(SQL.SEPERATE + SQL.GROUP_BY + this.getGroupPatSbstNo(groupTableList));
		
		return sbQuery.toString();
		
	}
	
	
	
	/**
	 * FROM SQL
	 * @param groupTableList
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes","cast","unchecked"})
	public String getFromClause(List<Map> groupTableList) throws Exception{
		StringBuffer sbQuery 			= new StringBuffer();
		
		if(groupTableList.size() == 1){
			Map<String,String> dsMap1 = (HashMap)groupTableList.get(0);
			sbQuery.append(SQL.SEPERATE + SQL.TAB2 + dsMap1.get("SCHEMA") + "." + dsMap1.get("TABLE"));
			
			if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
				sbQuery.append(SQL.BLANK + dsMap1.get("TABLE"));
			}
			
		}else{
			for(int i=-1 ; i < groupTableList.size() - 1; i++){
				if(i < 0){
					continue;
				}
				
				Map<String,String> dsMap1 = (HashMap)groupTableList.get(i);
				Map<String,String> dsMap2 = (HashMap)groupTableList.get(i+1);
				
				Map joinMap = new HashMap();
				joinMap.put("SEARCH_TABLE_1", dsMap1.get("TABLE"));
				joinMap.put("SEARCH_TABLE_2", dsMap2.get("TABLE"));
				
				if(StringUtils.isEmpty(sbQuery.toString())){
					sbQuery.append(SQL.SEPERATE + SQL.TAB2 + dsMap1.get("SCHEMA") + "." + dsMap1.get("TABLE"));
					
					if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
						sbQuery.append(SQL.BLANK + dsMap1.get("TABLE"));
					}
					
					sbQuery.append(SQL.SEPERATE + SQL.JOIN);
					sbQuery.append(SQL.SEPERATE + SQL.TAB2 + dsMap2.get("SCHEMA") + "." + dsMap2.get("TABLE"));
					
					if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
						sbQuery.append(SQL.BLANK + dsMap2.get("TABLE"));
					}
					
					sbQuery.append(SQL.SEPERATE + SQL.ON);
					sbQuery.append(SQL.SEPERATE + SQL.TAB2 + this.getJoinQuery(joinMap));
					
				}else{
					sbQuery.append(SQL.SEPERATE + SQL.JOIN);
					sbQuery.append(SQL.SEPERATE + SQL.TAB2 + dsMap2.get("SCHEMA") + "." + dsMap2.get("TABLE"));
					
					if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
						sbQuery.append(SQL.BLANK + dsMap2.get("TABLE"));
					}
					
					
					sbQuery.append(SQL.SEPERATE + SQL.ON);
					sbQuery.append(SQL.SEPERATE + SQL.TAB2 + this.getJoinQuery(joinMap));
				}
			}
		}
		
		
		return sbQuery.toString();
	}
	
	
	/**
	 * 단면연구 반복데이터 From Clause Query를 반환한다. 
	 * @param groupTableList
	 * @param periodMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes","cast","unchecked"})
	private String getFromClausePeriod(List<Map> groupTableList,Map<String,String> periodMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		boolean isDuplicateTable = false;
		
		//반복주기 테이블 중복여부 체크	
		for(int i=0; i < groupTableList.size(); i++){
			Map<String,String> dsMap = (HashMap)groupTableList.get(i);
			
			if(dsMap.get("TABLE").equals(periodMap.get("TABLE"))){
				isDuplicateTable = true;
			}
		}
		
		//반복테이블과 연구항목테이블이 중복되지 않으면
		if(!isDuplicateTable){
			Map joinMap = new HashMap();
			Map<String,String> tableMap = (HashMap)groupTableList.get(groupTableList.size() - 1);
			
			joinMap.put("SEARCH_TABLE_1", tableMap.get("TABLE"));
			joinMap.put("SEARCH_TABLE_2", periodMap.get("TABLE"));
			
			sbQuery.append(SQL.SEPERATE + SQL.TAB2 + SQL.JOIN);
			sbQuery.append(SQL.SEPERATE + SQL.TAB2 + periodMap.get("SCHEMA") + "." + periodMap.get("TABLE"));
			
			if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
				sbQuery.append(SQL.BLANK + periodMap.get("TABLE"));
			}
			
			sbQuery.append(SQL.SEPERATE + SQL.TAB2 + SQL.ON);
			sbQuery.append(SQL.SEPERATE + SQL.TAB2 + this.getJoinQuery(joinMap));
		}
		
		return sbQuery.toString();
	}
	
	
	
	
	
	/**
	 * group별 min/max/base date를 구한다.
	 * @param gbnMinMaxBas
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"unchecked","unused","cast","rawtypes"})
	private String getQueryBaseDt(String gbnMinMaxBas) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		List<String> dateList = new ArrayList<String>();
		
		List itemList = (ArrayList)this.modelMap.get("dsItemColumnList");
		List<String> groupList = SQLUtils.getGroupList(itemList);
		
		for(int i=0; i < groupList.size(); i++){
			String groupKey 	= "";
			String groupAlias 	= "";
			String strWheres 	= "";
			
			List<Map> groupTableList = new ArrayList();
			List<Map> groupItemList  = new ArrayList();
			
			
			groupKey 		= groupList.get(i);
			groupAlias		= "G" + groupKey;
			groupTableList 	= SQLUtils.getGroupTableList(itemList, groupKey);
			groupItemList  	= SQLUtils.getGroupItemList(itemList, groupKey);
			
			for(int j=0; j < groupItemList.size(); j++){
				Map<String,String> dsMap = (HashMap)groupItemList.get(j);
				
				if("Y".equals(dsMap.get("BASE_DT_YN"))){
					String strDate = "";
					
					if("MIN".equals(gbnMinMaxBas)){
						strDate = SQL.MIN + "(" + SQL.NVL + "(" + groupAlias + "." + groupAlias + "_" + dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_DT_" + String.valueOf(dsMap.get("ORDER")) + ",'1900-01-01'))";
						
					}else if("MAX".equals(gbnMinMaxBas)){
						strDate = SQL.MAX + "(" + SQL.NVL + "(" + groupAlias + "." + groupAlias + "_" + dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_DT_" + String.valueOf(dsMap.get("ORDER")) + ",'1900-01-01'))";
						
					}else if("BAS".equals(gbnMinMaxBas)){
						strDate = SQL.MIN + "(" + SQL.NVL + "(" + groupAlias + "." + groupAlias + "_" + dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_DT_" + String.valueOf(dsMap.get("ORDER")) + ",'1900-01-01'))";
						
					}
					dateList.add(strDate);
				}
			}	
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.GREATEST + "(");
		
		if(dateList.size() == 0){
			sbQuery.append("'1900-01-01'");
			
		}else{
			for(int i=0; i < dateList.size() ; i++){
				sbQuery.append(dateList.get(i));
				
				if(i < (dateList.size() - 1)){
					sbQuery.append(",");
				}
			}
		}
		
		if("MIN".equals(gbnMinMaxBas)){
			if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
				sbQuery.append(SQL.SEPERATE + ",'1900-01-01') AS G1__MIN_DT");	
			}else{
				sbQuery.append(SQL.SEPERATE + ") AS G1__MIN_DT");
			}
				
			
		}else if("MAX".equals(gbnMinMaxBas)){
			if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
				sbQuery.append(SQL.SEPERATE + ",'1900-01-01') AS G1__MAX_DT");
				
			}else{
				sbQuery.append(SQL.SEPERATE + ") AS G1__MAX_DT");
				
			}
			
			
		}else if("BAS".equals(gbnMinMaxBas)){
			if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
				sbQuery.append(SQL.SEPERATE + ",'1900-01-01') AS G1__BASE_DT");
			}else{
				sbQuery.append(SQL.SEPERATE + ") AS G1__BASE_DT");
			}
			
			
		}
		
		return sbQuery.toString();
	}
	
	
	
	
	
	
	/**
	 * 기준일자, 최초 적용 Query
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes","unused","cast","unchecked"})
	public String getQueryForWithRdt() throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		StringBuffer sbQueryRdt = new StringBuffer();
		
		sbQueryRdt.append("R_DT AS (");
		sbQueryRdt.append(SQL.SEPERATE + SQL.SELECT);
		sbQueryRdt.append(SQL.SEPERATE + "	Y." + QueryVO.gvPatSbstNo + ",			");
		
		sbQueryRdt.append(SQL.SEPERATE + "Y.MIN_DT,");
		sbQueryRdt.append(SQL.SEPERATE + "Y.MAX_DT,");
		sbQueryRdt.append(SQL.SEPERATE + "Y.BASE_DT");
		
		sbQueryRdt.append(SQL.SEPERATE + SQL.FROM);
		sbQueryRdt.append(SQL.SEPERATE + "	(                                       ");
		sbQueryRdt.append(SQL.SEPERATE + "		"+SQL.SELECT+"                              ");
		sbQueryRdt.append(SQL.SEPERATE + "			Z." + QueryVO.gvPatSbstNo + ",       ");
		sbQueryRdt.append(SQL.SEPERATE + "			MIN( Z.MIN_DT ) AS MIN_DT,      ");
		sbQueryRdt.append(SQL.SEPERATE + "			MAX( Z.MAX_DT ) AS MAX_DT,      ");
		sbQueryRdt.append(SQL.SEPERATE + "			MAX( Z.BASE_DT ) AS BASE_DT     ");
		sbQueryRdt.append(SQL.SEPERATE + SQL.TAB2 + SQL.FROM);
		sbQueryRdt.append(SQL.SEPERATE + "			(                               ");
		sbQueryRdt.append(SQL.SEPERATE + "				"+SQL.SELECT+"                      ");
		sbQueryRdt.append(SQL.SEPERATE + "					" + QueryVO.gvPatSbstNo + ", ");
		sbQueryRdt.append(SQL.SEPERATE + "					G1__MIN_DT AS MIN_DT,   ");
		sbQueryRdt.append(SQL.SEPERATE + "					G1__MAX_DT AS MAX_DT,   ");
		sbQueryRdt.append(SQL.SEPERATE + "					G1__MIN_DT AS BASE_DT   ");
		sbQueryRdt.append(SQL.SEPERATE + SQL.TAB2 + SQL.FROM);
		sbQueryRdt.append(SQL.SEPERATE + "					G1                      ");
		sbQueryRdt.append(SQL.SEPERATE + "			) Z                             ");
		sbQueryRdt.append(SQL.SEPERATE + SQL.GROUP_BY);
		sbQueryRdt.append(SQL.SEPERATE + "			Z."+QueryVO.gvPatSbstNo+"                   ");
		sbQueryRdt.append(SQL.SEPERATE + "	) Y                                     ");
		
	//	-----------------------------------------------------------	
	//	Query Assembly
		sbQuery.append(sbQueryRdt.toString());
		
		
	//	최초여부
		List<Map> itemList = new ArrayList<Map>();
		List<Map> itemFirstList = new ArrayList<Map>();	
		List<String> groupList = new ArrayList<String>();	
		
		itemList = (ArrayList)this.modelMap.get("dsItemColumnList");
		
		groupList = SQLUtils.getGroupList(itemList);
		
		StringBuffer sbQueryGroup = new StringBuffer();
		StringBuffer sbQueryFirstYn = new StringBuffer();
		
		String strWheres = "";
		
		
		for(int i=0; i < groupList.size(); i++){
			String groupKey = groupList.get(i);
			
			List<Map> groupTableList = SQLUtils.getGroupTableList(itemList, groupKey);
			List<Map> groupItemList  = SQLUtils.getGroupItemList(itemList, groupKey);
			
			boolean isFirstYn = false;
			
			for(int j=0; j < groupItemList.size(); j++){
				Map<String,String> dsMap = groupItemList.get(j);
				
				if("Y".equals(dsMap.get("FIRST_YN"))){
					itemFirstList.add(dsMap);
				}
			}
		}
		StringBuffer sbQueryFirstList = new StringBuffer();
		
		if(itemFirstList.size() > 0){
			for(int i=0; i < itemFirstList.size(); i++){
				Map<String,String> dsMap = itemFirstList.get(i);
				sbQueryFirstList.append(SQL.AND);
				sbQueryFirstList.append(SQL.NOT_EXISTS + "(");
				
				{
					sbQueryFirstList.append(SQL.SEPERATE + SQL.SELECT);
					sbQueryFirstList.append(SQL.SEPERATE + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
					sbQueryFirstList.append(SQL.SEPERATE + SQL.FROM);
					sbQueryFirstList.append(SQL.SEPERATE + dsMap.get("SCHEMA") + "." + dsMap.get("TABLE") + SQL.BLANK + dsMap.get("TABLE"));
					sbQueryFirstList.append(SQL.SEPERATE + SQL.WHERE);
					sbQueryFirstList.append(SQL.SEPERATE + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo + " = " + "Y." + QueryVO.gvPatSbstNo);
					sbQueryFirstList.append(SQL.SEPERATE + SQL.AND);
					sbQueryFirstList.append(SQL.SEPERATE + sqlWhereClause.getWhereQuery(dsMap));
					sbQueryFirstList.append(SQL.SEPERATE + SQL.AND);
					sbQueryFirstList.append(SQL.SEPERATE + dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN") + " < " + "Y.BASE_DT");
				}
				sbQueryFirstList.append(SQL.SEPERATE + ")");
				
			}
			
			sbQueryFirstYn.append(sbQueryFirstList.toString());
			
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.WHERE);
		sbQuery.append(SQL.SEPERATE + " 1 = 1	");
		
		if(!StringUtils.isEmpty(sbQueryFirstYn.toString())){			
			sbQuery.append(SQL.SEPERATE + sbQueryFirstYn.toString());
		}
		
		sbQuery.append(SQL.SEPERATE + ")	");
		
		return sbQuery.toString();
	}
	
	
	/**
	 * 연구항목은 하위클래스에서 구현한다.
	 * @return
	 */
	public abstract String getQueryForWithR() throws Exception;
	
	/**
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes","cast"})
	public String getQueryForMain(int period) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbColumns 	= new StringBuffer();
		
		sbColumns = new StringBuffer();
		
		for(int i=0; i < this.queryResultColumnList.size(); i++){
			Map dsMap = (HashMap)this.queryResultColumnList.get(i);
			
			String strColumn = (String)dsMap.get("DISP_COLUMN");
			
			if(StringUtils.isEmpty(sbColumns.toString())){
				sbColumns.append(SQL.SEPERATE + strColumn);
				
			}else{
				sbColumns.append(SQL.SEPERATE + "," + strColumn);
			}
		}
		
		if(SQL.DB2BLU.equals(QueryVO.gvDbType)){			
			if("Y".equals(QueryVO.gvSearchYn)){
				sbColumns.append(SQL.SEPERATE + SQL.TAB1 + ",'N' AS SEARCH_YN");	
			}
			
			sbColumns.append(SQL.SEPERATE + SQL.TAB1 + ",'N' AS CHART_YN");
			sbColumns.append(SQL.SEPERATE + SQL.TAB1 + ",'N' AS DEL_YN");
			sbColumns.append(SQL.SEPERATE + SQL.TAB1 + ",null AS CHART_DT");
			sbColumns.append(SQL.SEPERATE + SQL.TAB1 + ",NOW() AS CRT_DT");
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + "X." + QueryVO.gvPatSbstNo);
		sbQuery.append(SQL.SEPERATE + "," + period + " AS PERIOD_CD");
		sbQuery.append(SQL.SEPERATE + "," + sbColumns.toString());
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + "( ");
		
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.DISTINCT + QueryVO.gvPatSbstNo);
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + "	G1");
		sbQuery.append(SQL.SEPERATE + ") X");
		sbQuery.append(SQL.SEPERATE + SQL.LEFT_OUTER_JOIN + "G1");
		sbQuery.append(SQL.SEPERATE + " ON ");
		sbQuery.append(SQL.SEPERATE + " X." + QueryVO.gvPatSbstNo + " = G1." + QueryVO.gvPatSbstNo + " ");
		
	//	기준일자가 있으면	
		sbQuery.append(SQL.SEPERATE + SQL.JOIN + "R_DT ON ");
		sbQuery.append(SQL.SEPERATE + " X." + QueryVO.gvPatSbstNo + " = R_DT." + QueryVO.gvPatSbstNo + " ");
		
		
	//	연구항목, 생존분석, 사례대조와 MAIN테이블 JOIN
		for(int i=0; i < this.queryResultTableList.size(); i++){
			String tableId = (String)this.queryResultTableList.get(i);
			
			if(tableId.equals("CA") || tableId.equals("CO")){
				sbQuery.append(SQL.SEPERATE + SQL.TAB1);
				sbQuery.append(SQL.JOIN);
				sbQuery.append(tableId);
				
			}else{
				sbQuery.append(SQL.SEPERATE + SQL.TAB1);
				sbQuery.append(SQL.LEFT_OUTER_JOIN);
				sbQuery.append(tableId);
				
			}
			
			sbQuery.append(SQL.ON);
			sbQuery.append(" X." + QueryVO.gvPatSbstNo + " = " + tableId + "." + QueryVO.gvPatSbstNo + " ");
			
			
		}
		
		//경북대 요청 결과쿼리 정렬(기준일자,환자대체번호) 20190918 by 최종호
		sbQuery.append(" " + SQL.ORDER_BY + " R_DT.BASE_DT, R_DT."+ QueryVO.gvPatSbstNo +" ASC ");
		
		return sbQuery.toString();
	}
	
	
	
	
	
	
	
	
	
	/**
	 * JOIN 컬럼 SQL 생성
	 * @param joinMap
	 * @return
	 */
	
	@SuppressWarnings("all")
	public String getJoinQuery(Map joinMap){
		String strJoinSQL = "";
		List joinList = new ArrayList();

		try{
			joinList = (ArrayList)queryService.getJoinTableList(joinMap);
			
			if(joinList.size() == 0){
				String srcColumn = "";
				String tgtColumn = "";
				
				srcColumn  = String.valueOf(joinMap.get("SEARCH_TABLE_1"));
				srcColumn += "." + QueryVO.gvPatSbstNo;
				tgtColumn += String.valueOf(joinMap.get("SEARCH_TABLE_2"));
				tgtColumn += "." + QueryVO.gvPatSbstNo;
				
				strJoinSQL = srcColumn + " = " + tgtColumn;
				
				strJoinSQL += "\n";
				
			}else{
				for(int j = 0; j < joinList.size(); j++){
					Map resultMap = (HashMap)joinList.get(j);
					
					String srcColumn = "";
					String tgtColumn = "";
					
					srcColumn  = String.valueOf(resultMap.get("TABLE_1"));
					srcColumn += ".";
					srcColumn += String.valueOf(resultMap.get("COLUMN_1"));
					
					tgtColumn  = String.valueOf(resultMap.get("TABLE_2"));
					tgtColumn += ".";
					tgtColumn += String.valueOf(resultMap.get("COLUMN_2"));
					
					if(StringUtils.isEmpty(strJoinSQL)){
						strJoinSQL = srcColumn + " = " + tgtColumn;
						
					}else{
						strJoinSQL += SQL.AND + srcColumn  + " = " + tgtColumn;
						
					}
					
					strJoinSQL += SQL.SEPERATE;
				}
			}
			
		}catch(Exception e){
			logger.error("getJoinSQL ERROR : " + e.getMessage());
			throw new RuntimeException(e);
		}
		
		return strJoinSQL;
		
	}
	
	
	
	
	/**
	 * Query 결과목록
	 * @param query
	 * @param period
	 * @return
	 * @throws Exception
	 */
	public Map getResultList(String query, int period, Map<Object,Object> paramMap) throws SQLException,Exception{
		return resultService.getResultList(query, period, paramMap);
	}
	
	
	/**
	 * 
	 * @param list
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public List<String> getUniqueTableList(List list) throws Exception{

		List tmpList = new ArrayList();
		List uniqueTableList = new LinkedList();
		
		for(int i=0; i < list.size(); i++){
			Map itemMap = (HashMap)list.get(i);
			
			tmpList.add(itemMap.get("SCHEMA") + "." + itemMap.get("TABLE"));
			
		}
		uniqueTableList = new LinkedList(new HashSet<Object>(tmpList));
		
		return uniqueTableList;
	}
	
	
	/**
	 * Group별 연구항목 목록
	 * @param strGrLv
	 * @return
	 */
	@SuppressWarnings("all")
	public List getItemListByGroup(String strGrLv) {
		List retList = new ArrayList();

		List itemList = (ArrayList)this.modelMap.get("dsStudyItem");
		
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (HashMap)itemList.get(i);
			
			if(strGrLv.equals(dsMap.get("GR_LV"))){
				retList.add(dsMap);
			}
		}
		return retList;
		
	}
	
	
	/**
	 * 쿼리생성시 사용한 컬럼목록
	 * @param dataFieldsMap
	 * @throws Exception
	 */
	@SuppressWarnings("all")
	public void addDataFields(Map dataFieldMap) throws Exception{
		if( this.queryResultColumnList == null){
			this.queryResultColumnList = new ArrayList();
			
		}
		
		this.queryResultColumnList.add(dataFieldMap);
	}
	
	@SuppressWarnings("all")
	public void removeDataFields() throws Exception{
		this.queryResultColumnList = new ArrayList();
		
	}
	
	

	
	/**
	 * JqxGrid DataFields
	 * @return
	 */
	@SuppressWarnings({"unchecked","rawtypes","cast"})
	public List getDataFields(){
		List list = new ArrayList();
		Map<String,String> dataFieldMap = new HashMap<String,String>();

		if("CC".equals(QueryVO.gvMethCd)){
			dataFieldMap = new HashMap<String,String>();
			dataFieldMap.put("dataField"	,"CA_CO");
			dataFieldMap.put("text"			,"사례대조구분");
			dataFieldMap.put("ITEM_TYPE"	,"COD");
			dataFieldMap.put("DATA_TYPE"	,"varchar(10)");
			dataFieldMap.put("ITEM_SEQ"	,"");
			list.add(dataFieldMap);
			
			dataFieldMap = new HashMap<String,String>();
			dataFieldMap.put("dataField"	,QueryVO.gvPatSbstNo);
			dataFieldMap.put("text"			,"환자대체번호");
			dataFieldMap.put("ITEM_TYPE"	,"COD");
			dataFieldMap.put("DATA_TYPE"	,"varchar(10)");
			dataFieldMap.put("ITEM_SEQ"	,"");
			list.add(dataFieldMap);
			
			dataFieldMap = new HashMap<String,String>();
			dataFieldMap.put("dataField"	,"SEX");
			dataFieldMap.put("text"			,"성별");
			dataFieldMap.put("ITEM_TYPE"	,"COD");
			dataFieldMap.put("DATA_TYPE"	,"char(1)");
			dataFieldMap.put("ITEM_SEQ"	,"");
			list.add(dataFieldMap);
			
			dataFieldMap = new HashMap<String,String>();
			dataFieldMap.put("dataField"	,"AGE");
			dataFieldMap.put("text"			,"AGE");
			dataFieldMap.put("ITEM_TYPE"	,"NUM");
			dataFieldMap.put("DATA_TYPE"	,"int");
			dataFieldMap.put("ITEM_SEQ"	,"");
			list.add(dataFieldMap);
			
			dataFieldMap = new HashMap<String,String>();
			dataFieldMap.put("dataField"	,"RNO");
			dataFieldMap.put("text"			,"RNO");
			dataFieldMap.put("ITEM_TYPE"	,"NUM");
			dataFieldMap.put("DATA_TYPE"	,"int");
			dataFieldMap.put("ITEM_SEQ"	,"");
			list.add(dataFieldMap);
			
			dataFieldMap = new HashMap<String,String>();
			dataFieldMap.put("dataField"	,"PERIOD_CD");
			dataFieldMap.put("text"		,"주기번호");
			dataFieldMap.put("ITEM_TYPE"	,"NUM");
			dataFieldMap.put("DATA_TYPE"	,"int");
			dataFieldMap.put("ITEM_SEQ"	,"");
			list.add(dataFieldMap);
			
		}else{
			dataFieldMap = new HashMap<String,String>();
			dataFieldMap.put("dataField"	,QueryVO.gvPatSbstNo);
			dataFieldMap.put("text"		,"환자대체번호");
			dataFieldMap.put("ITEM_TYPE"	,"COD");
			dataFieldMap.put("DATA_TYPE"	,"varchar(10)");
			dataFieldMap.put("ITEM_SEQ"	,"");
			list.add(dataFieldMap);
			
			dataFieldMap = new HashMap<String,String>();
			dataFieldMap.put("dataField"	,"PERIOD_CD");
			dataFieldMap.put("text"		,"주기번호");
			dataFieldMap.put("ITEM_TYPE"	,"NUM");
			dataFieldMap.put("DATA_TYPE"	,"int");
			dataFieldMap.put("ITEM_SEQ"	,"");
			list.add(dataFieldMap);
		}
		
		
		int nRcnt = 0;	//연구항목 카운트
		for(int i=0; i < this.queryResultColumnList.size(); i++){
			Map<String,String> dsMap = (HashMap<String,String>)this.queryResultColumnList.get(i);
			
			String dataField = "";
			
			dataField = String.valueOf(dsMap.get("DISP_COLUMN"));
			
			dataFieldMap = new HashMap<String,String>();
			dataFieldMap.put("dataField"	,dataField);
			
			dataFieldMap.put("text"			,(String)dsMap.get("DISP_COLUMN_COMMENT"));
			dataFieldMap.put("ITEM_TYPE"	,(String)dsMap.get("ITEM_TYPE"));
			dataFieldMap.put("DATA_TYPE"	,(String)dsMap.get("DATA_TYPE"));
			dataFieldMap.put("ITEM_SEQ"		,String.valueOf(dsMap.get("ITEM_SEQ")));
			dataFieldMap.put("HIDDEN_YN"	,String.valueOf(dsMap.get("HIDDEN_YN")));
			
			list.add(dataFieldMap);
		}
		
		return list;
		
	}
	
	
	/**
	 * 각 그룹별 환자대체번호를 구한다.
	 * @param groupTableList
	 * @return
	 */
	@SuppressWarnings({"unchecked","rawtypes","cast"})
	public String getGroupPatSbstNo(List groupTableList){
		Map<String,String> dsMap = (HashMap)groupTableList.get(0);
		
		String strPatSbsbtNo = "";
		
		strPatSbsbtNo = dsMap.get("TABLE").toString();
		strPatSbsbtNo += ".";
		strPatSbsbtNo += QueryVO.gvPatSbstNo;
		
		return strPatSbsbtNo;
		
	}
	
	

	/**
	 * 연구항목 목록 리턴 
	 * ITEM_TYPE_GUBUN = STUDY_ITEM
	 * @return
	 */
	@SuppressWarnings({"cast","unchecked"})
	protected List<Map<String,Object>> getRitemList(){
		List<Map<String,Object>> itemList = new ArrayList<Map<String,Object>>();
		
		List<Map<String,Object>> list = (ArrayList<Map<String,Object>>)this.modelMap.get("dsStudyItem");
		
		for(int i=0; i < list.size(); i++){
			Map<String,Object> dsMap = (HashMap<String,Object>)list.get(i);
			
			if("STUDY_ITEM".equals(dsMap.get("ITEM_TYPE_GUBUN"))){
				itemList.add(dsMap);
			}
		}
		
		return itemList;
		
	}
	
	

	
	/**
	 * 연구항목에서 그룹으로 묶여져 있는 항목에 대한 JOIN SQL을 반환한다.
	 * @param itemGroupList
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes"})
	protected String getQueryForFromClauseOfRgroupJoinTable(List itemGroupList) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		List<String> groupTableList = this.getUniqueTableList(itemGroupList);
		
		if(groupTableList.size() > 1){
			Map<String,Object> joinMap = new HashMap<String,Object>();
			
			for(int i=0; i < groupTableList.size(); i++){
				if(i == 0){
					continue;
				}
				
				joinMap.put("SEARCH_TABLE_1", groupTableList.get(i-1));
				joinMap.put("SEARCH_TABLE_2", groupTableList.get(i));
				
				if(StringUtils.isEmpty(sbQuery.toString())){
					sbQuery = new StringBuffer();
					
					sbQuery.append(SQL.SEPERATE + SQL.JOIN);
					sbQuery.append(groupTableList.get(i));
					sbQuery.append(SQL.ON);
					sbQuery.append(this.getJoinQuery(joinMap));
					
				}else{
					sbQuery.append(SQL.SEPERATE + SQL.JOIN);
					sbQuery.append(groupTableList.get(i));
					sbQuery.append(SQL.ON);
					sbQuery.append(this.getJoinQuery(joinMap));
					
				}
			}
		}
		
		return sbQuery.toString();
	}
	
	/**
	 * 연구항목 이전/이후/범위 조건 SQL
	 * @param dsMap
	 * @return
	 * @throws Exception
	 */
	protected String getQueryForWhereClauseOfGroupBaseDtRange(Map<String,String> dsMap) throws Exception{
		StringBuffer sbQueryForR = new StringBuffer();
		
		if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
			if("R".equals(dsMap.get("RANGE_CD"))){			//범위
				sbQueryForR.append(SQL.SEPERATE + SQL.TAB2);
				sbQueryForR.append(SQL.AND);
				sbQueryForR.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
				sbQueryForR.append(SQL.BETWEEN);
				sbQueryForR.append(" R_DT.BASE_DT - " + StringUtils.nvl(dsMap.get("RANGE_DN"), "0"));
				sbQueryForR.append(SQL.AND);
				sbQueryForR.append(" R_DT.BASE_DT + " + StringUtils.nvl(dsMap.get("RANGE_DN"), "0"));
				
			}else if("N".equals(dsMap.get("RANGE_CD"))){	//이후
				sbQueryForR.append(SQL.SEPERATE + SQL.TAB2);
				sbQueryForR.append(SQL.AND);
				sbQueryForR.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
				sbQueryForR.append(" >= ");
				sbQueryForR.append(" R_DT.BASE_DT");
				
			}else if("H".equals(dsMap.get("RANGE_CD"))){	//이전
				sbQueryForR.append(SQL.SEPERATE + SQL.TAB2);
				sbQueryForR.append(SQL.AND);
				sbQueryForR.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
				sbQueryForR.append(" < ");
				sbQueryForR.append(" R_DT.BASE_DT");
				
			}else if("T".equals(dsMap.get("RANGE_CD"))){	//당일
				sbQueryForR.append(SQL.SEPERATE + SQL.TAB2);
				sbQueryForR.append(SQL.AND);
				sbQueryForR.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
				sbQueryForR.append(" = ");
				sbQueryForR.append(" R_DT.BASE_DT");
				
			}else if("P".equals(dsMap.get("RANGE_CD"))){	//당일이전
				sbQueryForR.append(SQL.SEPERATE + SQL.TAB2);
				sbQueryForR.append(SQL.AND);
				sbQueryForR.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
				sbQueryForR.append(SQL.BETWEEN);
				sbQueryForR.append(" R_DT.BASE_DT - " + StringUtils.nvl(dsMap.get("RANGE_DN"), "0"));
				sbQueryForR.append(SQL.AND);
				sbQueryForR.append(" R_DT.BASE_DT - 1 ");
				
			}else if("A".equals(dsMap.get("RANGE_CD"))){	//당일이후
				sbQueryForR.append(SQL.SEPERATE + SQL.TAB2);
				sbQueryForR.append(SQL.AND);
				sbQueryForR.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
				sbQueryForR.append(SQL.BETWEEN);
				sbQueryForR.append(" R_DT.BASE_DT ");
				sbQueryForR.append(SQL.AND);
				sbQueryForR.append(" R_DT.BASE_DT + " + StringUtils.nvl(dsMap.get("RANGE_DN"), "0"));
			}
		}
		
		return sbQueryForR.toString();
	}
	
	/**
	 * R Group Where clause SQL문을 반환한다.
	 * @param itemGroupList
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes","unchecked"})
	protected String getQueryForWhereClauseOfRgroup(List itemGroupList) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		for(int i=0; i < itemGroupList.size(); i++){
			Map<String,String> dsMap = (HashMap<String,String>)itemGroupList.get(i);
			
			if("STUDY_ITEM".equals(dsMap.get("ITEM_TYPE_GUBUN"))){
				continue;
			}
			
			if(StringUtils.isEmpty(sbQuery.toString())){
				sbQuery = new StringBuffer();
				sbQuery.append(SQL.SEPERATE);
				sbQuery.append(sqlWhereClause.getWhereQuery(dsMap));
				

			}else{
				sbQuery.append(SQL.SEPERATE);
				sbQuery.append(SQL.AND);
				sbQuery.append(sqlWhereClause.getWhereQuery(dsMap));
			}
		}
		
		return sbQuery.toString();
	}
	

	
	/**
	* current row AND, next row OR
	* @param groupList
	* @param idx
	* @return
	*/
	@SuppressWarnings({"rawtypes","cast","unchecked"})
	public boolean isNullNextOr(List<Map> groupList,int idx){
		if((groupList.size() - 1) == idx){
			return false;
		}
		
		Map<String,String> dsMap1 = groupList.get(idx);
		Map<String,String> dsMap2 = groupList.get(idx+1);
	
		String andOr 		= dsMap1.get("AND_OR");  	 //현재로우
		String andOrNext 	= dsMap2.get("AND_OR");   //다음로우
		
		if(StringUtils.isNull(andOr) && andOrNext.equals("OR")){
			return true;
		}else{
			return false;
		}
	}
	
	
	/**
	* current row AND, prev row AND
	* @param groupList
	* @param idx
	* @return
	*/
	@SuppressWarnings({"rawtypes","cast","unchecked"})
	public boolean isNullNextAnd(List<Map> groupList,int idx){
		if((groupList.size() - 1) == idx){
			return false;
		}
		
		Map<String,String> dsMap1 = groupList.get(idx);
		Map<String,String> dsMap2 = groupList.get(idx+1);
	
		String andOr = dsMap1.get("AND_OR");  	 //현재로우
		String andOrNext = dsMap2.get("AND_OR");   //다음로우
		
		
		//현재가 empty 또는 and고, 다음이 and면
		if(StringUtils.isNull(andOr) && "AND".equals(andOrNext)){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	* current row AND, next row OR
	* @param groupList
	* @param idx
	* @return
	*/
	@SuppressWarnings({"rawtypes","cast","unchecked"})
	public boolean isOrNextAnd(List<Map> groupList,int idx){
		if((groupList.size() - 1) == idx){
			return false;
		}
		
		Map<String,String> dsMap1 = groupList.get(idx);
		Map<String,String> dsMap2 = groupList.get(idx+1);
	
		String andOr = dsMap1.get("AND_OR");  	 //현재로우
		String andOrNext = dsMap2.get("AND_OR");   //다음로우	
	
		if("OR".equals(andOr) && andOrNext.equals("AND")){
			return true;
		}else{
			return false;
		}
	}
	
	
	/**
	* current row AND, prev row AND
	* @param groupList
	* @param idx
	* @return
	*/
	@SuppressWarnings({"rawtypes","cast","unchecked"})
	public boolean isAndPrevAnd(List<Map> groupList,int idx){
		if(idx == 0){
			return false;
		}
		
		Map<String,String> dsMap1 = groupList.get(idx);
		Map<String,String> dsMap2 = groupList.get(idx-1);
	
		String andOr = dsMap1.get("AND_OR");  	 //현재로우
		String andOrPrev = dsMap2.get("AND_OR");   //다음로우	
		
		
		//현재가 empty 또는 and고, 다음이 and면
		if((StringUtils.isEmpty(andOrPrev) || andOrPrev.equals("AND")) && andOr.equals("AND")){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	* current row AND, prev row AND
	* @param groupList
	* @param idx
	* @return
	*/
	@SuppressWarnings({"rawtypes","cast","unchecked"})
	public boolean isAndNextAnd(List<Map> groupList,int idx){
		if((groupList.size() - 1) == idx){
			return false;
		}
		
		Map<String,String> dsMap1 = groupList.get(idx);
		Map<String,String> dsMap2 = groupList.get(idx+1);
	
		String andOr = dsMap1.get("AND_OR");  	 //현재로우
		String andOrNext = dsMap2.get("AND_OR");   //다음로우	
		
		//현재가 empty 또는 and고, 다음이 and면
		if("AND".equals(andOr) && "AND".equals(andOrNext)){
			return true;
		}else{
			return false;
		}
	}

	/**
	* current row OR, next row AND
	* @param groupList
	* @param idx
	* @return
	*/
	@SuppressWarnings({"rawtypes","cast","unchecked"})
	public boolean isOrPrevAnd(List<Map> groupList,int idx){
		if(idx == 0){
			return false;
		}
		
		Map<String,String> dsMap1 = groupList.get(idx);
		Map<String,String> dsMap2 = groupList.get(idx-1);
	
		String andOr = dsMap1.get("AND_OR");  	 //현재로우
		String andOrPrev = dsMap2.get("AND_OR");   //다음로우	
		
		//현재가 empty 또는 and고, 다음이 and면
		if("AND".equals(andOrPrev) && andOr.equals("OR")){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 연구항목 조회수 증가
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes","cast","unchecked"})
	public Object updateItemMgmtSearchCnt(Map<Object,Object> paramMap) throws Exception{
		List<Map> itemList = new ArrayList<Map>();
		
		itemList = (ArrayList)paramMap.get("dsItemColumnList");
		
		for (Map map : itemList) {
			sysService.updateItemMgmtSearchCnt(map);
		}
		
		
		itemList = (ArrayList)paramMap.get("dsPeriodList");
		for (Map map : itemList) {
			sysService.updateItemMgmtSearchCnt(map);
		}
		
		itemList = (ArrayList)paramMap.get("dsStudyItem");
		for (Map map : itemList) {
			sysService.updateItemMgmtSearchCnt(map);
		}
		
		return 0;
	}
	

	
}
