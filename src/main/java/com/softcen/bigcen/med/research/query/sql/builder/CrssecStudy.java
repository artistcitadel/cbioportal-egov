package com.softcen.bigcen.med.research.query.sql.builder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.research.query.sql.helper.SQLSelectClause;
import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * 단면연구 Query Builder
 * @author user
 *
 */

@Service("crossSectionalStudy")
public class CrssecStudy extends BaseStudyModelService {
	private static final String R_TAB_CD = "R";
	
	/**
	 * 단면연구 생성자
	 */
	public CrssecStudy(){
		super();
		
	}
	
	
	
	/**
	 * 단면연구 연구항목 SQL을 반환한다.
	 * @return
	 */
	@Override
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public String getQueryForWithR() throws Exception{
		StringBuffer sbQuery = new StringBuffer();			//R SQL 전체
		StringBuffer sbQueryR = new StringBuffer();			//연구항목 개별
		
		List<Map> itemList = new ArrayList<Map>();
		List<Map> dataFieldsList = new ArrayList<Map>();
		List itemGroupList = new ArrayList();
		
		itemList = (ArrayList)this.getRitemList();
			
		//연구항목 LOOP START
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (Map<String,String>)itemList.get(i);
			
			String strPrefix 		= "";
			String strColumns		= "";
			String strColumnsBaseDt	= "";
			String strFromClauseOfRgroupJoinTable 	= "";	
			String strWhereClauseOfRgroup 	= "";
			
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
			
			
		}	//R ITEM LOOP END
		
		for(int i=0; i < dataFieldsList.size(); i++){
			Map<String,String> dsMap = (HashMap)dataFieldsList.get(i);
			this.addDataFields(dsMap);
		}
		
		sbQuery.append(sbQueryR.toString());
			
		return sbQuery.toString();
		
		
	}
}

