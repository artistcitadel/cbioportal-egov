package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.Map;

import com.softcen.bigcen.med.research.query.vo.QueryVO;

public class SQLWhereClauseCode {
	public static String getQueryForWhereItemCode(Map<String,String> dsMap){
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQueryWhere = new StringBuffer();
		
		String incExc = "";
		String inputVal0 = "";
		String inputVal1 = "";
		String inputVal2 = "";
		String column = "";
		String popupYn = "";
		String tmpSql = "";
		
		column   	= dsMap.get("COLUMN");
		inputVal0   = String.valueOf(dsMap.get("INPUT_VAL0"));
		inputVal1   = String.valueOf(dsMap.get("INPUT_VAL1"));
		inputVal2   = String.valueOf(dsMap.get("INPUT_VAL2"));
		popupYn		= String.valueOf(dsMap.get("POPUP_YN"));
		incExc 		= String.valueOf(dsMap.get("INC_EXC"));
		
		column = dsMap.get("TABLE") + "." + dsMap.get("COLUMN");
		
		
//		CODE_TYPE가 NON 인경우	
		if("NON".equals(dsMap.get("CODE_TYPE"))){
			sbQueryWhere = new StringBuffer();
			
			String[] inputVals  = {};
			
			inputVal1 		= inputVal1.trim();
			inputVals  		= inputVal1.split("[|]");
			
			for(int j=0; j < inputVals.length; j++){
				if("".equals(tmpSql)){
					tmpSql = "'" + inputVals[j] + "'";
				}else{
					tmpSql += ",'"+inputVals[j]+"'";
				}
			}
			
			sbQueryWhere.append(column + SQL.IN + " (" + tmpSql + ")");
			

			//포함,제외로직	
			if("INC".equals(incExc)){
				sbQuery.append(sbQueryWhere.toString());
				
			}else{
				if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
					sbQueryWhere = new StringBuffer();
					
					inputVal1 		= inputVal1.trim();
					inputVals  		= inputVal1.split("[|]");
					
					for(int j=0; j < inputVals.length; j++){
						if("".equals(tmpSql)){
							tmpSql = "'" + inputVals[j] + "'";
						}else{
							tmpSql += ",'"+inputVals[j]+"'";
						}
					}
					
					sbQueryWhere.append(column + SQL.NOT_IN + " (" + tmpSql + ")");
					
					
				}else{
					sbQuery.append(SQL.SEPERATE);
					sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
					sbQuery.append(SQL.NOT_IN);
					sbQuery.append(SQL.SEPERATE);
					
					sbQuery.append("(");
						sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						sbQuery.append(SQL.FROM);
						sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
						sbQuery.append(SQL.WHERE);
						sbQuery.append(sbQueryWhere.toString());
					sbQuery.append(")");	
				}
			}
			
			
		}else{
			if("INC".equals(incExc)){
			//	CODE > JSON > 전체(allTogether)일 경우 Where조건 태우지 않음
				if("allTogether".equals(inputVal0)){
					sbQuery.append("2=2");
					
				}else{
					sbQuery.append(column + SQL.EQUAL + "'" + inputVal0 + "'");
				}
				
			}else{
				if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
					if("allTogether".equals(inputVal0)){
						sbQuery.append("2 <> 2");
						
					}else{
						sbQuery.append(column + SQL.NOT_EQUAL + "'" + inputVal0 + "'");
						
					}
					
				}else{
					sbQuery.append(SQL.SEPERATE + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
					sbQuery.append(SQL.NOT_IN);
					sbQuery.append(SQL.SEPERATE);
					
					sbQuery.append("(");
						sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						sbQuery.append(SQL.FROM);
						sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
						sbQuery.append(SQL.WHERE);
						if("allTogether".equals(inputVal0)){
							sbQuery.append("2=2");
							
						}else{
							sbQuery.append(column + SQL.EQUAL + "'" + inputVal0 + "'");
						}
						
					sbQuery.append(")");	
				}
			}
		}
		
		
		return sbQuery.toString();
	}

}
