package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.Map;

import com.softcen.bigcen.med.research.query.vo.QueryVO;

/**
 * SQL Where 조건에서 ITEM_TYPE이 숫자인경우
 * @author user
 *
 */

public class SQLWhereClauseNumber {
	
	public static String getQueryForWhereItemNumber(Map<String,String> dsMap){
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbQueryWhere = new StringBuffer();
		
		String incExc = "";
		String inputVal0 = "";
		String inputVal1 = "";
		String inputVal2 = "";
		String column = "";
		String popupYn = "";
		
		column   	= dsMap.get("COLUMN");
		inputVal0   = String.valueOf(dsMap.get("INPUT_VAL0"));
		inputVal1   = String.valueOf(dsMap.get("INPUT_VAL1"));
		inputVal2   = String.valueOf(dsMap.get("INPUT_VAL2"));
		popupYn		= String.valueOf(dsMap.get("POPUP_YN"));
		incExc 		= String.valueOf(dsMap.get("INC_EXC"));
		
		column = dsMap.get("TABLE") + "." + dsMap.get("COLUMN");
		
		sbQuery.append(SQL.SEPERATE);
		
		
		if("BETWEEN".equals(inputVal0)){
			if("INC".equals(incExc)){
				sbQuery.append(column);
				sbQuery.append(SQL.BLANK + inputVal0 + SQL.BLANK);
				sbQuery.append(inputVal1);
				sbQuery.append(SQL.AND);
				sbQuery.append(inputVal2);
				
			}else{
				if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
					sbQuery = new StringBuffer();
					sbQuery.append(SQL.SEPERATE + column + SQL.LESS + inputVal1);
					sbQuery.append(SQL.OR + column + SQL.GREAT + inputVal2);
					
				}else{
					sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
					sbQuery.append(SQL.NOT_IN);
					sbQuery.append("(");
						sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						sbQuery.append(SQL.FROM);
						sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
						sbQuery.append(SQL.WHERE);
						sbQuery.append(column);
						sbQuery.append(SQL.BLANK + inputVal0 + SQL.BLANK);
						sbQuery.append(inputVal1);
						sbQuery.append(SQL.AND);
						sbQuery.append(inputVal2);
						
					sbQuery.append(")");
				}		
			}
			
		}else if("EQ".equals(inputVal0)){
			if("INC".equals(incExc)){
				sbQuery.append(column + SQL.EQUAL + inputVal1);
				
			}else{
				if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
					sbQuery.append(column + SQL.NOT_EQUAL + inputVal1);
					
				}else{
					sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
					sbQuery.append(SQL.NOT_IN);
					sbQuery.append("(");
						sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						sbQuery.append(SQL.FROM);
						sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
						sbQuery.append(SQL.WHERE);
						
						//WHERE조건 적용
						sbQuery.append(column + SQL.EQUAL + inputVal1);
						
					sbQuery.append(")");	
				}
			}
			
			
		}else{
			if("INC".equals(incExc)){
				sbQuery.append(column);
				sbQuery.append(SQL.BLANK + inputVal0 + SQL.BLANK + inputVal1);
				
			}else{
				if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
				//	COL은 INPUT_VAL1보다 작다
					if("<".equals(inputVal0)){
						sbQuery.append(column + SQL.BLANK + SQL.GREAT + inputVal1);
					
				//	COL은 INPUT_VAL1보다 크다
					}else if(">".equals(inputVal0)){
						sbQuery.append(column + SQL.BLANK + SQL.LESS + inputVal1);
					
				//	COL은 INPUT_VAL1보다 작거나 같다.		
					}else if("<=".equals(inputVal0)){
						sbQuery.append(column + SQL.BLANK + SQL.GREATER_THAN_OR_EQUAL + inputVal1);
					
				//	COL은 INPUT_VAL1보다 크거나 같다.
					}else if(">=".equals(inputVal0)){
						sbQuery.append(column + SQL.BLANK + SQL.LESS_THAN_OR_EQUAL + inputVal1);
						
					}
					
				}else{
					sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
					sbQuery.append(SQL.NOT_IN);
					sbQuery.append("(");
						sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						sbQuery.append(SQL.FROM);
						sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
						sbQuery.append(SQL.WHERE);
						
						//WHERE조건 적용
						sbQuery.append(column);
						sbQuery.append(SQL.BLANK + inputVal0 + SQL.BLANK + inputVal1);
						
					sbQuery.append(")");
				}
				
			}
		}
		
		return sbQuery.toString();
	}

}
