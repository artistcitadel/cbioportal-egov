package com.softcen.bigcen.med.research.query.sql.builder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.research.query.sql.helper.SQLSelectClause;
import com.softcen.bigcen.med.research.query.sql.helper.SQLUtils;
import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * 사례대조연구 Query Builder
 * @author abcd
 *
 */

@Service("casCtrlStudy")
public class CasCtrlStudy extends BaseStudyModelService{
	private static final String R_TAB_CD = "R";
	
	public CasCtrlStudy() throws Exception{
		super();
		
	}
	
	/**
	 * 기준일자 R_DT
	 */
	@Override
	public String getQueryForWithRdt() throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.SEPERATE + "R_DT AS(");
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "Y." + QueryVO.gvPatSbstNo + ", ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "X.SEX, ");
		
		//DB2BLU
		if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
			sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "YEAR(SYSDATE) - YEAR(X."+QueryVO.gvBirthYmd+")" + SQL.AS + "AGE, ");
			sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "TRUNC(YEAR(sysdate) - YEAR(X."+PropertiesUtils.getTargetString("BIRTH_YMD")+")) / 10 * 10" + SQL.AS + "AGE_CD, ");
			sbQuery.append(SQL.SEPERATE + SQL.VARCHAR_FORMAT + "(Y.MIN_DT,'YYYY-MM-DD') " + SQL.AS + "MIN_DT,");
			sbQuery.append(SQL.SEPERATE + SQL.VARCHAR_FORMAT + "(Y.MAX_DT,'YYYY-MM-DD') " + SQL.AS + "MAX_DT,");
			sbQuery.append(SQL.SEPERATE + SQL.VARCHAR_FORMAT + "(Y.BASE_DT,'YYYY-MM-DD') " + SQL.AS + "BASE_DT");
			
		}else{
			sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "DATEDIFF(YEAR,X."+QueryVO.gvBirthYmd+",sysdate) as AGE, ");
			sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "TRUNC(datediff(YEAR,X."+QueryVO.gvBirthYmd+",sysdate)/ 1000,0)* 10 as AGE_CD, ");
			sbQuery.append(SQL.SEPERATE + "Y.MIN_DT,");
			sbQuery.append(SQL.SEPERATE + "Y.MAX_DT,");
			sbQuery.append(SQL.SEPERATE + "Y.BASE_DT");
		}
		
		
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "( ");
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "	Z." + QueryVO.gvPatSbstNo + ",");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "	" + SQL.MIN + "( Z.MIN_DT ) AS MIN_DT,    ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "	" + SQL.MAX + "( Z.MAX_DT ) AS MAX_DT,    ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "	" + SQL.MAX + "( Z.BASE_DT ) AS BASE_DT   ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "	(                             ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "			" + QueryVO.gvPatSbstNo + ",          ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "			G1__MIN_DT AS MIN_DT, ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "			G1__MAX_DT AS MAX_DT, ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "			G1__BASE_DT AS BASE_DT");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "			G1                    ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "	) Z                           ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + SQL.GROUP_BY);
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + "	Z." + QueryVO.gvPatSbstNo + "                 ");
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + ") Y ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + SQL.JOIN);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + QueryVO.gvSchema);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + ".");
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + QueryVO.gvTablePtPatMst);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + " X");
	//	sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "CRDW.PT_PAT_MST X on ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + SQL.ON);
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "Y." + QueryVO.gvPatSbstNo + " = X." + QueryVO.gvPatSbstNo +" ");
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + SQL.WHERE);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "1=1 ");
		
		sbQuery.append(SQL.SEPERATE + ")");
		
		return sbQuery.toString();
	}
	
	/**
	 * 연구항목 QUERY문을 리턴한다.
	 */
	@SuppressWarnings("all")
	@Override
	public String getQueryForWithR() throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQueryR = new StringBuffer();
		
		List<Map> dataFieldsList = new ArrayList();
		List<Map> itemList = new ArrayList();
		List itemGroupList = new ArrayList();
		
		itemList = (ArrayList)this.getRitemList();
		
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (Map<String,String>)itemList.get(i);
			
			String strPrefix 		= "";
			String strColumns		= "";
			String strColumnsBaseDt	= "";
			String strFromClauseOfRgroupJoinTable = "";	
			String strWhereClauseOfRgroup = "";
			
			strPrefix = R_TAB_CD + i;
			
		//	그룹 LV = 0
			dataFieldsList.add(SQLSelectClause.getDataFieldMap(QueryVO.gvMethCd,R_TAB_CD,strPrefix, dsMap, false));
			
			if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
				if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
					strColumnsBaseDt = this.sqlSelectClause.getColumnsForRBaseDate(strPrefix, dsMap);
				}	
			}
			strColumns = this.sqlSelectClause.getColumnsForR(strPrefix, dsMap);
			
			if(!StringUtils.isEmpty(strColumnsBaseDt)){
				dataFieldsList.add(SQLSelectClause.getDataFieldMap(QueryVO.gvMethCd,R_TAB_CD,strPrefix, dsMap, true));
				strColumns += strColumnsBaseDt;
			}
			
			sbQueryR.append(SQL.SEPERATE + strPrefix + SQL.AS + "(" );
			sbQueryR.append(SQL.SEPERATE + SQL.TAB1 + SQL.SELECT);
			sbQueryR.append(SQL.SEPERATE + SQL.TAB2 + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
			sbQueryR.append(SQL.SEPERATE + strColumns);
			sbQueryR.append(SQL.SEPERATE + SQL.TAB1 + SQL.FROM);
			sbQueryR.append(SQL.SEPERATE + SQL.TAB2 + dsMap.get("SCHEMA") + "." + dsMap.get("TABLE") + SQL.BLANK + dsMap.get("TABLE"));
			sbQueryR.append(SQL.JOIN + "R_DT" + SQL.ON + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
			sbQueryR.append(SQL.EQUAL + "R_DT." + QueryVO.gvPatSbstNo);
			
			itemGroupList = this.getItemListByGroup(dsMap.get("GR_LV"));
			
			if("0".equals(dsMap.get("GR_LV"))){
				Map dsMap2 = (HashMap)itemGroupList.get(0);
				
				if("Y".equals(dsMap2.get("INSTCD_YN")) && !"030".equals(dsMap2.get("INSTCD"))){
					strWhereClauseOfRgroup = SQL.SEPERATE;
					strWhereClauseOfRgroup += dsMap2.get("TABLE") + "." + SQL.INSTCD + SQL.EQUAL + "'" + dsMap2.get("INSTCD") + "'";
				}
				
			}else{
				strFromClauseOfRgroupJoinTable = this.getQueryForFromClauseOfRgroupJoinTable(itemGroupList);
				strWhereClauseOfRgroup = this.getQueryForWhereClauseOfRgroup(itemGroupList);
				
			}
			
			if(!StringUtils.isEmpty(strFromClauseOfRgroupJoinTable)){
				sbQueryR.append(strFromClauseOfRgroupJoinTable);
				
			}
			
		//	WHERE절	
			sbQueryR.append(SQL.SEPERATE + SQL.TAB1 + "WHERE	1=1 ");
			sbQueryR.append(SQL.SEPERATE + this.getQueryForWhereClauseOfGroupBaseDtRange(dsMap));
			
			if(!StringUtils.isEmpty(strWhereClauseOfRgroup)){
				sbQueryR.append(SQL.SEPERATE + SQL.TAB2 + SQL.AND + strWhereClauseOfRgroup);
			}
			
			sbQueryR.append(SQL.SEPERATE + SQL.TAB1 + SQL.GROUP_BY);
			sbQueryR.append(SQL.SEPERATE + SQL.TAB1 + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
			
			sbQueryR.append(SQL.SEPERATE + ")");
			
			if(i < itemList.size() - 1){
				sbQueryR.append(",");	
			}
			
			this.queryResultTableList.add(strPrefix);
		}
		
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap = (HashMap)dataFieldsList.get(i);
			this.addDataFields(dsMap);
			
		}
		
		sbQuery.append(sbQueryR.toString());
		
		return sbQuery.toString();
		
	}
	

	
	
	
	@SuppressWarnings("all")
	public String getQueryForWithCaseControl(String tabCd) throws Exception{
		StringBuffer sbQuery 			= new StringBuffer();
		StringBuffer sbQueryMain 		= new StringBuffer();	//Main Query(환자목록+그룹쿼리)
		StringBuffer sbQueryPatSbsNo 	= new StringBuffer();	//환자목록쿼리
		StringBuffer sbQueryGroup 		= new StringBuffer();	//그룹쿼리
		StringBuffer sbQueryJoin 		= new StringBuffer();	//쿼리조인
		StringBuffer sbQueryColumn 		= new StringBuffer();	//컬럼
		
		List<String> groupList = new ArrayList();	//그룹
		List itemList = new ArrayList();	//연구항목
		List gCaseControlItemMgmtList = new ArrayList();
		
		if("CA".equals(tabCd)){
			itemList = (ArrayList)this.modelMap.get("dsCaseGroupList");
			
		}else if("CO".equals(tabCd) || "CO2".equals(tabCd)){
			itemList = (ArrayList)this.modelMap.get("dsControlGroupList");
			
		}
		
		
		if(itemList.size() == 0){
			return sbQuery.toString();
		}
		
		groupList = SQLUtils.getGroupList(itemList);
		

	//	조건에 해당하는 모든 환자목록
		String strCaseGroupQuery = "";
		
	//	조회건수 구할때 사례군 환자목록 조회후 적용
		sbQueryPatSbsNo.append(this.getPatientList(tabCd, itemList, new HashMap()));	
		
		if("CA".equals(tabCd) && "Y".equals(this.modelMap.get("CONTROL_GROUP_CNT"))){
			return sbQuery.toString();
		}
		
		
	//	각 그룹의 집합 생성	
		for(int i=0; i < groupList.size(); i++){
			String groupKey 	= "";
			String groupAlias 	= "";
			
			List<Map> groupTableList = new ArrayList();
			List<Map> groupItemList  = new ArrayList();
			
			groupKey 		= groupList.get(i);
			groupAlias		= "G" + groupKey;
			groupTableList 	= SQLUtils.getGroupTableList(itemList, groupKey);
			groupItemList  	= SQLUtils.getGroupItemList(itemList, groupKey);
			
			sbQueryGroup = new StringBuffer();
			sbQueryGroup.append(this.getQueryGroup(groupKey, tabCd, groupTableList, groupItemList,new HashMap()));
			
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
		
	//	Main Query	
		sbQueryMain.append(SQL.SEPERATE + SQL.SELECT);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "T." + QueryVO.gvPatSbstNo);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + sbQueryColumn.toString());

		sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + "," + SQL.MAX + "(R_DT.SEX) AS SEX");
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + "," + SQL.MAX + "(R_DT.AGE) AS AGE");
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + "," + SQL.MAX + "(R_DT.AGE_CD) AS AGE_CD");	
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + ",RANDOM() AS RANO");
		
		
//		------------------------------------------------------
	//	Z COLUMN
	//	각 그룹의 집합 생성	
		StringBuffer sbQueryZcolumn = new StringBuffer();
		for(int i=0; i < groupList.size(); i++){
			String groupKey 	= "";
			String groupAlias 	= "";
			
			List<Map> groupTableList = new ArrayList();
			List<Map> groupItemList  = new ArrayList();
			
			groupKey 		= groupList.get(i);
			groupAlias		= "G" + groupKey;
			groupTableList 	= SQLUtils.getGroupTableList(itemList, groupKey);
			groupItemList  	= SQLUtils.getGroupItemList(itemList, groupKey);
			
			for(int j=0; j < groupItemList.size(); j++){
				Map<String,String> dsMap = (HashMap)groupItemList.get(j);
				String columns = "";
				String columnsAlias = "";
				
				columns = groupAlias + "_";
				columns += dsMap.get("TABLE") + "_" +  dsMap.get("COLUMN") + "_" + String.valueOf(dsMap.get("ORDER"));
				
				columnsAlias = groupAlias + "_" + tabCd + "_";
				columnsAlias += dsMap.get("TABLE") + "_" +  dsMap.get("COLUMN") + "_" + String.valueOf(dsMap.get("ORDER"));
				
				sbQueryZcolumn.append(SQL.SEPERATE + "," + SQL.MAX + "("+columns+")" + SQL.AS + columnsAlias);
				
				logger.debug(dsMap.toString());
			}
		}
		sbQueryMain.append(sbQueryZcolumn.toString());
		
		
		
		sbQueryMain.append(SQL.SEPERATE + SQL.FROM + "(");
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + sbQueryPatSbsNo.toString());
		sbQueryMain.append(SQL.SEPERATE + ")T");
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + sbQueryJoin.toString());
		
		sbQueryMain.append(SQL.JOIN);
		sbQueryMain.append("R_DT");
		sbQueryMain.append(SQL.ON);
		sbQueryMain.append("R_DT." + QueryVO.gvPatSbstNo + " = " + "T." + QueryVO.gvPatSbstNo);
		sbQueryMain.append(SQL.SEPERATE + SQL.WHERE);
		sbQueryMain.append(SQL.SEPERATE + " 1=1 ");
		
		//사례군 대상환자 제외로직 추가		
		//if("CO".equals(tabCd) && "Y".equals(this.modelMap.get("CONTROL_GROUP_CNT"))){
		if("CO".equals(tabCd) && !"Y".equals(this.modelMap.get("CONTROL_GROUP_CNT"))){
        	 sbQueryMain.append(SQL.SEPERATE + SQL.AND);
        	 sbQueryMain.append(SQL.SEPERATE + "T." + QueryVO.gvPatSbstNo + SQL.NOT_IN);
        	 sbQueryMain.append("(");
        	 sbQueryMain.append(SQL.SELECT + QueryVO.gvPatSbstNo + SQL.FROM + "CA");
        	 sbQueryMain.append(")");
        }
		
		sbQueryMain.append(SQL.SEPERATE + SQL.GROUP_BY);
		sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "T." + QueryVO.gvPatSbstNo);
		
	//	-----------------------------------------------------	
	//	Z
		StringBuffer sbQuerySubMain = new StringBuffer();	//X Subquery
		sbQuerySubMain.append(SQL.SEPERATE + SQL.SELECT);
		
		if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
			sbQuerySubMain.append(SQL.SEPERATE + SQL.COALESCE + "(Z."+QueryVO.gvPatSbstNo+","+SQL.NULL+")" + SQL.AS + QueryVO.gvPatSbstNo);
			sbQuerySubMain.append(SQL.SEPERATE + "," + SQL.COALESCE + "(Z.SEX,"+SQL.NULL+")" + SQL.AS + "SEX");
			sbQuerySubMain.append(SQL.SEPERATE + "," + SQL.COALESCE + "(Z.AGE,"+SQL.NULL+")" + SQL.AS + "AGE");
			sbQuerySubMain.append(SQL.SEPERATE + "," + SQL.COALESCE + "(Z.AGE_CD,"+SQL.NULL+")" + SQL.AS + "AGE_CD");
			
		}else{
			sbQuerySubMain.append(SQL.SEPERATE + SQL.COALESCE + "(Z."+QueryVO.gvPatSbstNo+")" + SQL.AS + QueryVO.gvPatSbstNo);
			sbQuerySubMain.append(SQL.SEPERATE + "," + SQL.COALESCE + "(Z.SEX)" + SQL.AS + "SEX");
			sbQuerySubMain.append(SQL.SEPERATE + "," + SQL.COALESCE + "(Z.AGE)" + SQL.AS + "AGE");
			sbQuerySubMain.append(SQL.SEPERATE + "," + SQL.COALESCE + "(Z.AGE_CD)" + SQL.AS + "AGE_CD");
			
		}
		sbQuerySubMain.append(SQL.SEPERATE + "," + "row_number() over() " + SQL.AS + " TNO");
		
	//	------------------------------------------------------
	//	Z COLUMN
	//	각 그룹의 집합 생성	
		sbQueryZcolumn = new StringBuffer();
		for(int i=0; i < groupList.size(); i++){
			String groupKey 	= "";
			String groupAlias 	= "";
			
			List<Map> groupTableList = new ArrayList();
			List<Map> groupItemList  = new ArrayList();
			
			groupKey 		= groupList.get(i);
			groupAlias		= "G" + groupKey;
			groupTableList 	= SQLUtils.getGroupTableList(itemList, groupKey);
			groupItemList  	= SQLUtils.getGroupItemList(itemList, groupKey);
			
			for(int j=0; j < groupItemList.size(); j++){
				Map<String,String> dsMap = (HashMap)groupItemList.get(j);
				String columns = "";
				
				columns = groupAlias + "_" + tabCd + "_";
				columns += dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_" + String.valueOf(dsMap.get("ORDER"));
				
				sbQueryZcolumn.append(SQL.SEPERATE + "," + SQL.COALESCE + "(Z."+columns+","+SQL.NULL+")" + SQL.AS + columns);
				
				logger.debug(dsMap.toString());
			}
		}
		sbQuerySubMain.append(sbQueryZcolumn.toString());
		
		sbQuerySubMain.append(SQL.SEPERATE + SQL.FROM);
		sbQuerySubMain.append(SQL.SEPERATE + "(");
		sbQuerySubMain.append(SQL.SEPERATE + SQL.TAB1 + sbQueryMain.toString());	//환자목록 + 그룹집합
		sbQuerySubMain.append(SQL.SEPERATE + ")Z");
		
	//	SQL Assemble	
		sbQuery.append(SQL.SEPERATE + tabCd + " AS( ");
		sbQuery.append(SQL.SEPERATE + "SELECT ");
		sbQuery.append(SQL.SEPERATE + "X." + QueryVO.gvPatSbstNo + "");
		sbQuery.append(SQL.SEPERATE + ",X.SEX");
		sbQuery.append(SQL.SEPERATE + ",X.AGE");
		sbQuery.append(SQL.SEPERATE + ",X.AGE_CD");
		
		if("SM".equals(this.modelMap.get("CC_MAT_CD"))){
			sbQuery.append(SQL.SEPERATE + ",ROW_NUMBER() OVER( PARTITION BY X.SEX ) AS RNO");
			
		}else if("ASM".equals(this.modelMap.get("CC_MAT_CD"))){
			sbQuery.append(SQL.SEPERATE + ",ROW_NUMBER() OVER( PARTITION BY X.SEX ) AS RNO");
			
		}else{
			sbQuery.append(SQL.SEPERATE + ",ROW_NUMBER() OVER() AS RNO");
		}
		
		
		sbQueryZcolumn = new StringBuffer();
		for(int i=0; i < groupList.size(); i++){
			String groupKey 	= "";
			String groupAlias 	= "";
			
			List<Map> groupTableList = new ArrayList();
			List<Map> groupItemList  = new ArrayList();
			
			groupKey 		= groupList.get(i);
			groupAlias		= "G" + groupKey;
			groupTableList 	= SQLUtils.getGroupTableList(itemList, groupKey);
			groupItemList  	= SQLUtils.getGroupItemList(itemList, groupKey);
			
			for(int j=0; j < groupItemList.size(); j++){
				Map<String,String> dsMap = (HashMap)groupItemList.get(j);
				String columns = "";
				
				columns = groupAlias + "_" + tabCd + "_";
				columns += dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_" + String.valueOf(dsMap.get("ORDER"));
				
				sbQueryZcolumn.append(SQL.SEPERATE + "," + columns);
				
				logger.debug(dsMap.toString());
			}
		}
		sbQuery.append(sbQueryZcolumn.toString());
		
		
		
		if("CA".equals(tabCd)){
			for(int i=0; i < groupList.size(); i++){
				String groupKey 	= "";
				String groupAlias 	= "";
				
				List<Map> groupTableList = new ArrayList();
				List<Map> groupItemList  = new ArrayList();
				
				groupKey 		= groupList.get(i);
				groupAlias		= "G" + groupKey;
				groupTableList 	= SQLUtils.getGroupTableList(itemList, groupKey);
				groupItemList  	= SQLUtils.getGroupItemList(itemList, groupKey);
				
				for(int j=0; j < groupItemList.size(); j++){
					Map<String,String> dsMap = (HashMap)groupItemList.get(j);
					String columns = "";
					
					columns = groupAlias + "_" + tabCd + "_";
					columns += dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_" + String.valueOf(dsMap.get("ORDER"));
					
					Map<String,String> colsMap = new HashMap();
					
					colsMap.put("METH_CD"					,"CC");
					colsMap.put("TAB_CD"					,tabCd);
					colsMap.put("ITEM_TYPE"				,dsMap.get("ITEM_TYPE"));
					colsMap.put("DATA_TYPE"				,dsMap.get("DATA_TYPE"));
					colsMap.put("ITEM_SEQ"				,String.valueOf(dsMap.get("ITEM_SEQ")));
					colsMap.put("DISP_COLUMN"				,columns);
					colsMap.put("DISP_COLUMN_COMMENT"		,"사례대조_" + dsMap.get("COLUMN_COMMENT") + SQL.UNDERSCORE + String.valueOf(dsMap.get("ORDER")));
					colsMap.put("HIDDEN_YN"	    		,"N");
					
					this.addDataFields(colsMap);
				}
			}
		}
		
		
		
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + "(");
		sbQuery.append(SQL.SEPERATE + sbQuerySubMain.toString());
		
	//	대조군(사례군에 선택된 환자 제외)
		if("CO".equals(tabCd)){
			sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + SQL.WHERE);
			sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + "Z." + QueryVO.gvPatSbstNo);
			sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + " NOT IN ");
			sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + " ( ");
				sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + SQL.SELECT);
				sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + QueryVO.gvPatSbstNo);
				sbQueryMain.append(SQL.SEPERATE + SQL.TAB2 + SQL.FROM + " CA ");
			sbQueryMain.append(SQL.SEPERATE + SQL.TAB1 + " ) ");
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB1  + ")X");
		
	//	샘플링 숫자 적용	
		if("CA".equals(tabCd)){
			if(!StringUtils.isNull(this.modelMap.get("CC_SAM_NUM")) && !StringUtils.isEmpty(this.modelMap.get("CC_SAM_NUM").toString())){
				int nSamplNum = Integer.valueOf(this.modelMap.get("CC_SAM_NUM").toString());
				int nTno = 100000000;
				
				if(nSamplNum > 0){
					nTno = nSamplNum;
				}
				
				sbQuery.append(SQL.SEPERATE + SQL.WHERE);
				sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "X.TNO <= " + nTno);
				
			}
	
	//	대조군 배수 적용		
		}else if("CO".equals(tabCd) || "CO2".equals(tabCd)){		//else if("CO".equals(tabCd)){
			if(!StringUtils.isNull(this.modelMap.get("CC_SAM_NUM")) && !StringUtils.isEmpty(this.modelMap.get("CC_SAM_NUM").toString())){
				int nSamNum = Integer.valueOf(this.modelMap.get("CC_SAM_NUM").toString());
				int nContCd = Integer.valueOf(this.modelMap.get("CC_CONT_CD").toString());
				
				int nTno = 100000000;
				
				if(nSamNum > 0){
					if(nContCd == 0 || nContCd == 1){
						nTno = nSamNum * 1;
					}else{
						nTno = nSamNum * nContCd;
					}
				}
				
				sbQuery.append(SQL.SEPERATE + SQL.WHERE);
				sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "X.TNO <= " + nTno);	
			}
		}
		
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB1  + ")");
		
		this.queryResultTableList.add(tabCd);
		
		return sbQuery.toString();
		
	}
	
	
	
	
	/**
	 * 사례군+대조군
	 * @return
	 * @throws Exception
	 */
	public String getQueryForWithCaseControlUnionAll() throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.SEPERATE + " CC AS ( ");
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "'CASE' AS CA_CO,");
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "CA.*");
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "CA");
		sbQuery.append(SQL.SEPERATE + SQL.JOIN);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "CO");
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.ON + "CA.RNO=CO.RNO");
		
		if("AM".equals(this.modelMap.get("CC_MAT_CD"))){
			sbQuery.append(SQL.SEPERATE + SQL.AND + "CA.AGE_CD = CO.AGE_CD");
			
		}else if("SM".equals(this.modelMap.get("CC_MAT_CD"))){
			sbQuery.append(SQL.SEPERATE + SQL.AND + "CA.SEX = CO.SEX");
			
		}else if("ASM".equals(this.modelMap.get("CC_MAT_CD"))){
			sbQuery.append(SQL.SEPERATE + SQL.AND + "CA.AGE_CD = CO.AGE_CD");
			sbQuery.append(SQL.SEPERATE + SQL.AND + "CA.SEX = CO.SEX");
			
		}
			
		sbQuery.append(SQL.SEPERATE + SQL.UNION_ALL);
				
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "'CONTROL' AS CA_CO,");
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "CO.*");
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "CO");
		sbQuery.append(SQL.SEPERATE + SQL.JOIN);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "CA");
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.ON + "CA.RNO=CO.RNO");
		
		if("AM".equals(this.modelMap.get("CC_MAT_CD"))){
			sbQuery.append(SQL.SEPERATE + SQL.AND + "CA.AGE_CD = CO.AGE_CD");
			
		}else if("SM".equals(this.modelMap.get("CC_MAT_CD"))){
			sbQuery.append(SQL.SEPERATE + SQL.AND + "CA.SEX = CO.SEX");
			
		}else if("ASM".equals(this.modelMap.get("CC_MAT_CD"))){
			sbQuery.append(SQL.SEPERATE + SQL.AND + "CA.AGE_CD = CO.AGE_CD");
			sbQuery.append(SQL.SEPERATE + SQL.AND + "CA.SEX = CO.SEX");
			
		}
		
		sbQuery.append(SQL.SEPERATE + " ORDER BY 1,2,3,4,5 ");
		sbQuery.append(SQL.SEPERATE + " ) ");
		
		this.queryResultTableList.add("CC");
		
		return sbQuery.toString();
	}
	
	
	/**
	 * 대조군 2배수일때 UnionAll
	 * @return
	 * @throws Exception
	 */
	public String getQueryForWithCaseControlUnionAll2X() throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.SEPERATE + "CC2 AS (");
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "'CONTROL2' AS CA_CO,CO2.*");
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.FROM + "CO2");
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.WHERE + "1=1");
		sbQuery.append(SQL.SEPERATE + SQL.AND);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + "CO2." + PropertiesUtils.getTargetString("PAT_SBST_NO"));
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + SQL.NOT_IN);
		sbQuery.append(SQL.SEPERATE + "(");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + SQL.SELECT + PropertiesUtils.getTargetString("PAT_SBST_NO"));
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + SQL.FROM + "CC");
		sbQuery.append(SQL.SEPERATE + SQL.TAB3 + ")");
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + ")");
		
		return sbQuery.toString();
		
	}
	
	public String getQueryForMainCaseControl(int period, boolean isMultiple) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		List<Map<String,String>> dataFieldsList = this.getDataFields();
		
		String strColumns = ""; 
		
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap = dataFieldsList.get(i);
			
			String column = dsMap.get("dataField");
			
			if( column.indexOf("CA_") >= 0 ||
				"CA_CO".equals(column) 	|| 
				QueryVO.gvPatSbstNo.equals(column) ||
				"SEX".equals(column) ||
				"RNO".equals(column) ||
				"AGE".equals(column) ||
				"AGE_CD".equals(column)){
				column = "X." + column;
				
			}
			
			if(StringUtils.isEmpty(strColumns)){
				strColumns = column;
				
			}else{
				strColumns += SQL.SEPERATE;
				strColumns += "," + column;
			}
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + strColumns);
		
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + "( ");
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + " * ");
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",1 AS PERIOD_CD");
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + SQL.TAB1 + " CC ");
		
		
	//	2배수일때 추가할것	
		if(isMultiple){
			sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "UNION ALL");
			sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "SELECT");
			sbQuery.append(SQL.SEPERATE + SQL.TAB1 + " CC2.* ");
			sbQuery.append(SQL.SEPERATE + SQL.TAB1 + ",1 AS PERIOD_CD");
			sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "FROM CC2");
		}
	
		
		sbQuery.append(SQL.SEPERATE + ") ");
		sbQuery.append(SQL.SEPERATE + "X ");
		sbQuery.append(SQL.SEPERATE + SQL.LEFT_OUTER_JOIN);	/* 모집단 항목표시*/
		sbQuery.append(SQL.SEPERATE + " G1 ");
		sbQuery.append(SQL.SEPERATE + SQL.ON);
		sbQuery.append(SQL.SEPERATE + "X."+QueryVO.gvPatSbstNo+"=G1."+QueryVO.gvPatSbstNo);	/* 모집단 항목표시*/
		sbQuery.append(SQL.SEPERATE + SQL.JOIN);	
		sbQuery.append(SQL.SEPERATE + "R_DT");	/* 모집단 항목표시*/
		sbQuery.append(SQL.SEPERATE + SQL.ON);	/* 모집단 항목표시*/
		sbQuery.append(SQL.SEPERATE + "X."+QueryVO.gvPatSbstNo+"=R_DT."+QueryVO.gvPatSbstNo);	/* 모집단 항목표시*/
		
	//	연구항목	
		for(int i=0; i < this.queryResultTableList.size(); i++){
			String tableId = (String)this.queryResultTableList.get(i);
			
			if(tableId.equals("CA") || tableId.equals("CO")){
				//sbQuery.append(SQL.SEPERATE + SQL.TAB1 + " JOIN " + tableId);
				
			}else{
				if(tableId.equals("CC")){
					continue;
				}
				sbQuery.append(SQL.SEPERATE + SQL.TAB1 + "LEFT OUTER JOIN " + tableId);
				sbQuery.append(" ON ");
				sbQuery.append(" X." + QueryVO.gvPatSbstNo + " = " + tableId + "." + QueryVO.gvPatSbstNo + " ");
				
			}
		}
		
		//경북대 요청 결과쿼리 정렬(기준일자,환자대체번호) 20190918 by 최종호
		sbQuery.append(SQL.ORDER_BY + "1, R_DT.BASE_DT, R_DT."+ QueryVO.gvPatSbstNo +",3,4 ASC");
		//sbQuery.append(SQL.ORDER_BY + "1,3,4 ASC");
		
		return sbQuery.toString();
		
	}
	
	

}
