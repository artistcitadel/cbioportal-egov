package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

public class SQLWhereClause {
	private static Logger logger = Logger.getLogger(SQLWhereClause.class);
	
	
	@SuppressWarnings({ "rawtypes","cast","unchecked"})
	public String getWhereClause(List<Map> groupItemList) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		String sqlWhere = "";
		
		boolean isCurrNullNextAnd = false;
		boolean isCurrNullNextOr = false;
		boolean isCurrAndNextOr = false;
		boolean isCurrOrNextOr = false;
		boolean isCurrOrNextAnd = false;
		boolean isCurrAndNextAnd = false;
		
		if(groupItemList.size() == 1){
			Map<String,String> dsMap = (HashMap)groupItemList.get(0);
			//sbQuery.append(StringUtils.nvl(dsMap.get("AND_OR"), SQL.AND));
			sbQuery.append(SQL.AND);
			sbQuery.append(this.getWhereQuery(dsMap));
			
			// 2019-05-17 사업장코드 추가 by 최종호
			if("Y".equals(String.valueOf(PropertiesUtils.getTargetString("INSTCD_YN")))){
				String schemaStr = dsMap.get("SCHEMA");
				if(!"USR".equals(schemaStr)){
					if("031".equals(dsMap.get("INSTCD")) || "032".equals(dsMap.get("INSTCD"))){
						sbQuery.append(SQL.AND);
						sbQuery.append(dsMap.get("TABLE")+".INSTCD="+dsMap.get("INSTCD"));	
						sbQuery.append(SQL.SEPERATE);
					}
				}
			}
			
			return sbQuery.toString();
		}
		
	//	그룹별 연구항목 	
		for(int i=0; i < groupItemList.size(); i++){
			sqlWhere = "";

			Map<String,String> dsMap = (HashMap)groupItemList.get(i);
			
			isCurrNullNextAnd 	= SQLWhereClause.isCurrNullNextAnd(i, groupItemList);
			isCurrNullNextOr 	= SQLWhereClause.isCurrNullNextOR(i, groupItemList);
			isCurrAndNextOr 	= SQLWhereClause.isCurrAndNextOR(i, groupItemList);
			isCurrOrNextOr 		= SQLWhereClause.isCurrOrNextOR(i, groupItemList);
			isCurrOrNextAnd 	= SQLWhereClause.isCurrOrNextAnd(i, groupItemList);
			isCurrAndNextAnd	= SQLWhereClause.isCurrAndNextAnd(i, groupItemList);
			
		//	처음 sbQuery가 Empty면	
			if(StringUtils.isEmpty(sbQuery.toString())){
				
			//	현재 연구항목이 Null이고 다음항목이 And	
				if(isCurrNullNextAnd){
					if(StringUtils.isNull(dsMap.get("AND_OR")) || StringUtils.isEmpty(dsMap.get("AND_OR"))){
						sbQuery.append(SQL.AND);
					}else{
						sbQuery.append(StringUtils.nvl(dsMap.get("AND_OR"), ""));	
					}
					
					sbQuery.append(this.getWhereQuery(dsMap));	
					sbQuery.append(SQL.SEPERATE);
					
				}
			
			//	현재 연구항목이 Null이고 다음항목이 Or
				if(isCurrNullNextOr){
					if(StringUtils.isNull(dsMap.get("AND_OR")) || StringUtils.isEmpty(dsMap.get("AND_OR"))){
						sbQuery.append(SQL.AND);
					}else{
						sbQuery.append(StringUtils.nvl(dsMap.get("AND_OR"), ""));	
					}
					
					sbQuery.append(StringUtils.nvl(dsMap.get("AND_OR"), ""));
					sbQuery.append("(");
					sbQuery.append(this.getWhereQuery(dsMap));	
					sbQuery.append(SQL.SEPERATE);
				}
			}
			
		//	현재 연구항목이 And이고 다음항목이 And	
			if(isCurrAndNextAnd){
				sqlWhere = this.getWhereQuery(dsMap);
				
				if(!StringUtils.isEmpty(sqlWhere)){
					sbQuery.append(dsMap.get("AND_OR"));
					sbQuery.append(sqlWhere);	
					sbQuery.append(SQL.SEPERATE);
				}
				
			}
			
			
		//	현재 연구항목이 And이고 다음항목이 Or	
			if(isCurrAndNextOr){
				sbQuery.append(dsMap.get("AND_OR"));
				sbQuery.append(SQL.SEPERATE + "(");
				sbQuery.append(this.getWhereQuery(dsMap));	
				sbQuery.append(SQL.SEPERATE);
				
			}
			
		
		//	현재 연구항목이 Or이고 다음항목이 Or	
			if(isCurrOrNextOr){
				if(i == 0){
					sbQuery.append(SQL.AND);
					sbQuery.append("(");
				}else{
					sbQuery.append(dsMap.get("AND_OR"));
				}
				
				sbQuery.append(this.getWhereQuery(dsMap));	
				sbQuery.append(SQL.SEPERATE);
				

			}
			
			
		//	현재 연구항목이 Or이고 다음항목이 And		
			if(isCurrOrNextAnd){
				if(i == 0){
					sbQuery.append(SQL.AND);
					sbQuery.append("(");
					
					sbQuery.append(this.getWhereQuery(dsMap));	
					sbQuery.append(SQL.TAB1 + ")");
					sbQuery.append(SQL.SEPERATE);
					
				}else{
					sbQuery.append(dsMap.get("AND_OR"));
					sbQuery.append(this.getWhereQuery(dsMap));	
					sbQuery.append(SQL.TAB1 + ")");
					sbQuery.append(SQL.SEPERATE);
				}
			}
			
			
		//	연구항목의 끝이면	
			if((groupItemList.size() - 1) == i){
				sqlWhere = this.getWhereQuery(dsMap);
				
				if(!StringUtils.isEmpty(sqlWhere)){
					sbQuery.append(dsMap.get("AND_OR"));
					sbQuery.append(sqlWhere);	
					sbQuery.append(SQL.SEPERATE);	
				}
				
				
				if("OR".equals(dsMap.get("AND_OR"))){
					sbQuery.append(")");
				}
			}
			
			
			// 2019-04-29 사업장코드 추가 by 최종호
			if("Y".equals(String.valueOf(PropertiesUtils.getTargetString("INSTCD_YN")))){
				String schemaStr = dsMap.get("SCHEMA");
				String tableStr = dsMap.get("TABLE");
				if(!"USR".equals(schemaStr)){
					if(!"PT_PAT_MSTR".equals(tableStr)){
						if("031".equals(dsMap.get("INSTCD")) || "032".equals(dsMap.get("INSTCD"))){
							sbQuery.append(SQL.AND);
							sbQuery.append(dsMap.get("TABLE")+".INSTCD="+dsMap.get("INSTCD"));	
							sbQuery.append(SQL.SEPERATE);
						}
					}
				}
			}
		}
		
		return sbQuery.toString();
	}
	
	
	
	
	
	/**
	 * 반복주기 WHERE SQL절
	 * @param periodMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast"})
	public static String getWhereClausePeriod(Map<String,String> periodMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + SQL.AND);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + periodMap.get("TABLE") + "." + periodMap.get("COLUMN"));
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + SQL.BETWEEN);
		sbQuery.append(SQL.SEPERATE + SQL.TAB2);
		sbQuery.append("'" + periodMap.get("INPUT_VAL1") + "'");
		sbQuery.append(SQL.AND);
		sbQuery.append("'" + periodMap.get("INPUT_VAL2") + "'");
		
		return sbQuery.toString();
	}
	
	
	/**
	 * Query Where By ITEM_TYPE
	 * @param dsMap
	 * @return
	 */
	public String getWhereQuery(Map<String,String> dsMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		dsMap.put(SQL.CASE_WHEN_VALUE, "N");
		
		//ITEM TYPE이 CODE	
		if("COD".equals(dsMap.get("ITEM_TYPE"))){
			sbQuery.append(SQL.SEPERATE);
			
			//팝업여부 (Y일경우)	
			if("Y".equals(dsMap.get("POPUP_YN"))){
				sbQuery.append(SQLWhereClauseCodePopup.getQueryForWhereItemCodePopup(dsMap));
				
			}else{
				sbQuery.append(SQLWhereClauseCode.getQueryForWhereItemCode(dsMap));
			}
			
		//ITEM TYPE이 TEXT		
		}else if("TEX".equals(dsMap.get("ITEM_TYPE"))){
			sbQuery.append(SQL.SEPERATE);
			sbQuery.append(SQLWhereClauseText.getQueryForWhereItemText(dsMap));
			
		//ITEM TYPE이 DATE		
		}else if("DAT".equals(dsMap.get("ITEM_TYPE"))){
			sbQuery.append(SQL.SEPERATE);
			sbQuery.append(SQLWhereClauseDate.getQueryForWhereItemDate(dsMap));
			
		//ITEM TYPE이 NUMBER	
		}else if("NUM".equals(dsMap.get("ITEM_TYPE"))){
			sbQuery.append(SQL.SEPERATE);
			sbQuery.append(SQLWhereClauseNumber.getQueryForWhereItemNumber(dsMap));
			
			
		}	
		
		return sbQuery.toString();
	}
	
	
	/**
	 * 
	 * @param dsMap
	 * @param whereTypeCd
	 * @return
	 * @throws Exception
	 */
	public String getWhereQueryForAggregateValue(Map<String,String> dsMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		dsMap.put(SQL.CASE_WHEN_VALUE, "Y");
		
	//	ITEM TYPE이 CODE	
		if("COD".equals(dsMap.get("ITEM_TYPE"))){
			sbQuery.append(SQL.SEPERATE);
			
		//	팝업여부 (Y일경우)	
			if("Y".equals(dsMap.get("POPUP_YN"))){
				sbQuery.append(SQLWhereClauseCodePopup.getQueryForWhereItemCodePopup(dsMap));
				
			}else{
				sbQuery.append(SQLWhereClauseCode.getQueryForWhereItemCode(dsMap));
			}
			
		//ITEM TYPE이 TEXT		
		}else if("TEX".equals(dsMap.get("ITEM_TYPE"))){
			sbQuery.append(SQL.SEPERATE);
			sbQuery.append(SQLWhereClauseText.getQueryForWhereItemText(dsMap));
			
		//ITEM TYPE이 DATE		
		}else if("DAT".equals(dsMap.get("ITEM_TYPE"))){
			sbQuery.append(SQL.SEPERATE);
			sbQuery.append(SQLWhereClauseDate.getQueryForWhereItemDate(dsMap));
			
		//ITEM TYPE이 NUMBER	
		}else if("NUM".equals(dsMap.get("ITEM_TYPE"))){
			sbQuery.append(SQL.SEPERATE);
			sbQuery.append(SQLWhereClauseNumber.getQueryForWhereItemNumber(dsMap));
			
			
		}	
		
		
		return sbQuery.toString();
	}
	
	
	
	/**
	 * 코호트 연구 등록기간, 종료일자 Query Where 조건
	 * @param groupKey
	 * @param itemList
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unused","unchecked"})
	public static String getQueryForWhereCohort(String groupKey, List itemList){
		StringBuffer sbQuery = new StringBuffer();
		
	//	등록기간
		String rgstTermFrDt 	= "";
		String rgstTermToDt 	= "";
		String rschTermDt 		= "";	//연구종료일	
		
		Map<String,String> dsRgstTermMap = (HashMap)itemList.get(0);
		Map<String,String> dsRschTermMap = (HashMap)itemList.get(1);

	//	연구등록기간 기준일자구하기
		rgstTermFrDt = dsRgstTermMap.get("INPUT_VAL1");
		rgstTermToDt = dsRgstTermMap.get("INPUT_VAL2");
		rschTermDt 	= dsRschTermMap.get("INPUT_VAL1");
		
		for(int i=2; i < itemList.size(); i++){
			Map<String,String> dsMap = (HashMap)itemList.get(i);
			
			if(groupKey.equals(dsMap.get("GR_LV"))){
				if("Y".equals(dsMap.get("BASE_DT_YN"))){
					if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
						sbQuery.append(SQL.SEPERATE);
						sbQuery.append("AND " + dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
						sbQuery.append(" BETWEEN ");
						sbQuery.append(" '"+rgstTermFrDt+"' AND '"+rgstTermToDt+"'");

					}
				}
			}
		}
		
		return sbQuery.toString();
	}
	
	/**
	 * 현재 Row가 NULL이고 다음 Row가 AND 여부
	 * @param i
	 * @param itemList
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public static boolean isCurrNullNextAnd(int i, List<Map> itemList){
		if((itemList.size() - 1) == i){
			return false;
		}
		
		Map<String,String> dsMap1 = itemList.get(i);
		Map<String,String> dsMap2 = itemList.get(i+1);
	
		String andOr 		= dsMap1.get("AND_OR");  	 //현재로우
		String andOrNext 	= dsMap2.get("AND_OR");   //다음로우
		
		if((StringUtils.isNull(andOr) || StringUtils.isEmpty(andOr)) && "AND".equals(andOrNext)){
			return true;
		}else{
			return false;
		}
	}
	
	
	/**
	 * 현재 Row가 NULL이고 다음 Row가 OR여부
	 * @param i
	 * @param itemList
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public static boolean isCurrNullNextOR(int i, List<Map> itemList){
		if((itemList.size() - 1) == i){
			return false;
		}
		
		Map<String,String> dsMap1 = itemList.get(i);
		Map<String,String> dsMap2 = itemList.get(i+1);
	
		String andOr 		= dsMap1.get("AND_OR");  	 //현재로우
		String andOrNext 	= dsMap2.get("AND_OR");   //다음로우
		
		if((StringUtils.isNull(andOr) || StringUtils.isEmpty(andOr)) && "OR".equals(andOrNext)){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 현재 Row가 AND이고 다음 Row가 OR여부
	 * @param i
	 * @param itemList
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public static boolean isCurrAndNextOR(int i, List<Map> itemList){
		if((itemList.size() - 1) == i){
			return false;
		}
		
		Map<String,String> dsMap1 = itemList.get(i);
		Map<String,String> dsMap2 = itemList.get(i+1);
	
		String andOr 		= dsMap1.get("AND_OR");  	 //현재로우
		String andOrNext 	= dsMap2.get("AND_OR");   //다음로우
		
		if("AND".equals(andOr) && "OR".equals(andOrNext)){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 현재 Row가 AND이고 다음 Row가 AND 여부
	 * @param i
	 * @param itemList
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public static boolean isCurrAndNextAnd(int i, List<Map> itemList){
		if((itemList.size() - 1) == i){
			return false;
		}
		
		Map<String,String> dsMap1 = itemList.get(i);
		Map<String,String> dsMap2 = itemList.get(i+1);
	
		String andOr 		= dsMap1.get("AND_OR");  	 //현재로우
		String andOrNext 	= dsMap2.get("AND_OR");   //다음로우
		
		if("AND".equals(andOr) && "AND".equals(andOrNext)){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 현재 Row가 OR이고 다음 Row가 OR 여부
	 * @param i
	 * @param itemList
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public static boolean isCurrOrNextOR(int i, List<Map> itemList){
		if((itemList.size() - 1) == i){
			return false;
		}
		
		Map<String,String> dsMap1 = itemList.get(i);
		Map<String,String> dsMap2 = itemList.get(i+1);
	
		String andOr 		= dsMap1.get("AND_OR");  	 //현재로우
		String andOrNext 	= dsMap2.get("AND_OR");   //다음로우
		
		if("OR".equals(andOr) && "OR".equals(andOrNext)){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 현재 Row가 OR이고 다음 Row가 AND 여부
	 * @param i
	 * @param itemList
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public static boolean isCurrOrNextAnd(int i, List<Map> itemList){
		if((itemList.size() - 1) == i){
			return false;
		}
		
		Map<String,String> dsMap1 = itemList.get(i);
		Map<String,String> dsMap2 = itemList.get(i+1);
	
		String andOr 		= dsMap1.get("AND_OR");  	 //현재로우
		String andOrNext 	= dsMap2.get("AND_OR");   //다음로우
		
		if("OR".equals(andOr) && "AND".equals(andOrNext)){
			return true;
		}else{
			return false;
		}
	}
	
}
