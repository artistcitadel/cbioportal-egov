package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.Map;

import com.softcen.bigcen.med.research.query.vo.QueryVO;

public class SQLWhereClauseDate {
	public static String getQueryForWhereItemDate(Map<String,String> dsMap){
		StringBuffer sbQuery = new StringBuffer();
		
		String incExc = "";
		String inputVal0 = "";
		String inputVal1 = "";
		String inputVal2 = "";
		String column = "";
		
		column   	= dsMap.get("COLUMN");
		inputVal0   = String.valueOf(dsMap.get("INPUT_VAL0"));
		inputVal1   = String.valueOf(dsMap.get("INPUT_VAL1"));
		inputVal2   = String.valueOf(dsMap.get("INPUT_VAL2"));
		incExc 		= String.valueOf(dsMap.get("INC_EXC"));
		
		column = dsMap.get("TABLE") + "." + dsMap.get("COLUMN");
		
		if("INC".equals(incExc)){
			sbQuery.append(column);
			sbQuery.append(SQL.BETWEEN);
			sbQuery.append(" '" + inputVal1 + "'");
			sbQuery.append(SQL.AND);
			sbQuery.append(" '" + inputVal2 + "'");
			
		}else{
			if(dsMap.containsKey(SQL.CASE_WHEN_VALUE)){
				sbQuery = new StringBuffer();
				sbQuery.append(SQL.SEPERATE + column + SQL.LESS + inputVal1);
				sbQuery.append(SQL.OR + column + SQL.GREAT + inputVal2);
				
			}else{
				sbQuery.append(SQL.SEPERATE);
				sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
				sbQuery.append(SQL.NOT_IN);
				sbQuery.append("(");
					sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
					sbQuery.append(SQL.FROM);
					sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
					sbQuery.append(SQL.WHERE);
					
					sbQuery.append(column);
					sbQuery.append(SQL.BETWEEN);
					sbQuery.append(" '" + inputVal1 + "'");
					sbQuery.append(SQL.AND);
					sbQuery.append(" '" + inputVal2 + "'");
					
				sbQuery.append(")");
			}
			
			
			
		}
		
		return sbQuery.toString();
	}

}
