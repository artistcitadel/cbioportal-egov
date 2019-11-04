package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.Map;

import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.StringUtils;


/**
 * 연구항목이 CODE이면서 POPUP_YN일 경우 조회조건 쿼리
 * @author user
 *
 */

public class SQLWhereClauseCodePopup {
	public static String getQueryForWhereItemCodePopup(Map<String,String> dsMap){
		StringBuffer sbQuery = new StringBuffer();
		StringBuffer sbWhere = new StringBuffer();
		
		String incExc = "";
		String inputVal1 = "";
		String inputVal2 = "";
		String column = "";
		
		column   	= dsMap.get("COLUMN");
		inputVal1   = String.valueOf(dsMap.get("INPUT_VAL1"));
		incExc 		= String.valueOf(dsMap.get("INC_EXC"));
		
		column = dsMap.get("TABLE") + "." + dsMap.get("COLUMN");
		
		String tmpSql = "";

		if("Y".equals(dsMap.get("IS_NULL_OR_BLANK"))){
			sbWhere.append("(");
			sbWhere.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			sbWhere.append(SQL.IS_NULL);
			sbWhere.append(SQL.OR);
			sbWhere.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			sbWhere.append(SQL.EQUAL);
			sbWhere.append("''");
			sbWhere.append(")");
			
			if("INC".equals(incExc)){
				sbQuery.append(sbWhere.toString());
				
			}else{
			//	CASE WHEN 조건
				if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
					sbWhere = new StringBuffer();
					
					sbWhere.append("(");
					sbWhere.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
					sbWhere.append(SQL.IS_NOT_NULL);
					sbWhere.append(SQL.AND);
					sbWhere.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
					sbWhere.append(SQL.NOT_EQUAL);
					sbWhere.append("''");
					sbWhere.append(")");
					
					sbQuery.append(sbWhere.toString());
				
			//	Where조건에 사용
				}else{
					sbQuery.append(SQL.SEPERATE);
					sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
					sbQuery.append(SQL.NOT_IN);
					sbQuery.append(SQL.SEPERATE);
					
					sbQuery.append("(");
						sbQuery.append(SQL.SEPERATE);
						sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						sbQuery.append(SQL.FROM);
						sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
						sbQuery.append(SQL.BLANK + dsMap.get("TABLE"));
						sbQuery.append(SQL.WHERE);
						sbQuery.append(sbWhere.toString());
						sbQuery.append(SQL.SEPERATE);
					sbQuery.append(")");
				}
			}
			
			
		}else{
			if("Y".equals(dsMap.get("CHK_IS_REGEXP"))) {
				inputVal2   = String.valueOf(dsMap.get("INPUT_VAL2"));
				if("INC".equals(incExc)){
					sbQuery.append("REGEXP_LIKE");
					sbQuery.append("(");
					sbQuery.append(dsMap.get("COLUMN"));
					sbQuery.append(",");
					sbQuery.append("'" + inputVal1 + "'");
					
					if(!StringUtils.isNull(dsMap.get("INPUT_VAL2"))){
						sbQuery.append(",");
						sbQuery.append("'" + inputVal2 + "'");
					}
					sbQuery.append(")");
					
				}else{
					if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
						sbQuery = new StringBuffer();
						
						sbQuery.append(SQL.REGEXP_NOT_LIKE);
						sbQuery.append("(");
						sbQuery.append(dsMap.get("COLUMN"));
						sbQuery.append(",");
						sbQuery.append("'" + inputVal1 + "'");
						
						sbQuery.append(")");
						
					}else{
						sbQuery.append(SQL.SEPERATE);
						sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						sbQuery.append(SQL.NOT_IN);
						sbQuery.append("(");
							sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
							sbQuery.append(SQL.FROM);
							sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
							sbQuery.append(SQL.WHERE);
							sbQuery.append("REGEXP_LIKE");
							sbQuery.append("(");
							sbQuery.append(dsMap.get("COLUMN"));
							sbQuery.append(",");
							sbQuery.append("'" + inputVal1 + "'");
							
							if(!StringUtils.isNull(dsMap.get("INPUT_VAL2"))){
								sbQuery.append(",");
								sbQuery.append("'" + inputVal2 + "'");
							}
							sbQuery.append(")");
						sbQuery.append(")");
					}
					
				}
			}else {
				if( StringUtils.isNull(inputVal1) || StringUtils.isEmpty(inputVal1)){
					sbQuery.append(column + " = ''");
					
				}else{
					String instCdColumn = "";
					String whereColumn 	= "";
					String[] inputVals  = {};
					
					inputVal1 		= inputVal1.trim();
					inputVals  		= inputVal1.split("[|]");
					instCdColumn 	= dsMap.get("TABLE") + "." + SQL.INSTCD;
					
				//	진단코드 전방일치 like	
					if("P_DISINX".equals(dsMap.get("POPUP_PROGRAM_ID"))){
						sbWhere = new StringBuffer();
						
						if("Y".equals(dsMap.get("INSTCD_YN"))){
							if(!"030".equals(dsMap.get("INSTCD"))){
								sbWhere.append(SQL.SEPERATE + "(");
								sbWhere.append(SQL.SEPERATE);
								sbWhere.append(dsMap.get("TABLE") + "." + SQL.INSTCD + SQL.EQUAL + "'" + dsMap.get("INSTCD") + "'");	
								sbWhere.append(SQL.AND);
								sbWhere.append(SQL.SEPERATE);
							}
						}
						int inc = 0;
						
						for(int i=0; i < inputVals.length; i++){
							if(StringUtils.isNull(inputVals[i]) || StringUtils.isEmpty(inputVals[i])){
								continue;
							}
							
							if(inc == 0){
								tmpSql = SQL.SEPERATE;
								tmpSql += "(";
								
							}else{
								if("EXC".equals(incExc) && "Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
									tmpSql += SQL.AND;
									
								}else{
									tmpSql += SQL.OR;
									
								}
								
							}
							
							tmpSql += SQL.UPPER + "(" + column + ")";
							
							if("EXC".equals(incExc) && "Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
								tmpSql += SQL.NOT_LIKE;
								
							}else{
								tmpSql += SQL.LIKE;
								
							}
							
							tmpSql += SQL.UPPER + "('" + inputVals[i] + "') || '%'";
							
							if(i == (inputVals.length - 1)){
								tmpSql += ")";
							}
							inc++;
						}
						
						
						sbWhere.append(tmpSql);
						
						if("Y".equals(dsMap.get("INSTCD_YN"))){
							if(!"030".equals(dsMap.get("INSTCD"))){
								sbWhere.append(SQL.SEPERATE + ")");
							}
						}
						
						
						if("INC".equals(incExc)){
							sbQuery.append(sbWhere.toString());
							
						}else{
							if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
								sbQuery.append(sbWhere.toString());
								
							}else{
								sbQuery.append(SQL.SEPERATE);
								sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
								sbQuery.append(SQL.NOT_IN);
								sbQuery.append(SQL.SEPERATE);
								
								sbQuery.append("(");
									sbQuery.append(SQL.SEPERATE);
									sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
									sbQuery.append(SQL.FROM);
									sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
									
									sbQuery.append(SQL.BLANK + dsMap.get("TABLE"));
									
									sbQuery.append(SQL.WHERE);
									sbQuery.append(sbWhere.toString());
									sbQuery.append(SQL.SEPERATE);
								sbQuery.append(")");
							}
							
						}
						
						
						
				//	기록지,3HT		
					}else if("P_COMMON_CODE_3HT_MR".equals(dsMap.get("POPUP_PROGRAM_ID")) || "P_COMMON_CODE_3HT".equals(dsMap.get("POPUP_PROGRAM_ID"))){
						sbWhere = new StringBuffer();
						
						if("Y".equals(dsMap.get("INSTCD_YN"))){
							if(!"030".equals(dsMap.get("INSTCD"))){
								sbWhere.append(SQL.SEPERATE + "(");
								sbWhere.append(SQL.SEPERATE);
								sbWhere.append(dsMap.get("TABLE") + "." + SQL.INSTCD + SQL.EQUAL + "'" + dsMap.get("INSTCD") + "'");	
								sbWhere.append(SQL.AND);
								sbWhere.append(SQL.SEPERATE);
							}
						}
						
						
						for(int i=0; i < inputVals.length; i++){
							if(i == 0){
								tmpSql = SQL.SEPERATE;
								tmpSql += "(";
								
							}else{
								if("EXC".equals(incExc) && "Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
									tmpSql += SQL.AND;
									
								}else{
									tmpSql += SQL.OR;
									
								}
								
							}
							
							if(SQL.VERTICA.equals(QueryVO.gvDbType)){
								tmpSql += column;
								
								if("EXC".equals(incExc) && "Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
									tmpSql += SQL.NOT_ILIKE;
									
								}else{
									tmpSql += SQL.ILIKE;
									
								}
								
								tmpSql += "'%' || '" + inputVals[i] +"' || '%'";
								
							}else{
								tmpSql += SQL.UPPER + "(" + column + ")";
								
								if("EXC".equals(incExc) && "Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
									tmpSql += SQL.ILIKE;
									
								}else{
									tmpSql += SQL.LIKE;	
									
								}
								
								tmpSql += "'%' || " + SQL.UPPER + "('"+inputVals[i]+"')" + " || '%'";
							}
							
							
							
							if(i == (inputVals.length - 1)){
								tmpSql += ")";
							}
						}
						
						sbWhere.append(tmpSql);
						
						if("Y".equals(dsMap.get("INSTCD_YN"))){
							if(!"030".equals(dsMap.get("INSTCD"))){
								sbWhere.append(SQL.SEPERATE + ")");
							}
						}
						
						
						
						if("INC".equals(incExc)){
							sbQuery.append(sbWhere.toString());
							
						}else{
							if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
								sbQuery.append(sbWhere.toString());
								
							}else{
								sbQuery.append(SQL.SEPERATE);
								sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
								sbQuery.append(SQL.NOT_IN);
								sbQuery.append(SQL.SEPERATE);
								
								sbQuery.append("(");
									sbQuery.append(SQL.SEPERATE);
									sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
									sbQuery.append(SQL.FROM);
									sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
									sbQuery.append(SQL.BLANK + dsMap.get("TABLE"));
									sbQuery.append(SQL.WHERE);
									sbQuery.append(sbWhere.toString());
									sbQuery.append(SQL.SEPERATE);
								sbQuery.append(")");
							}
							
						}
						
						
					}else{
						sbWhere = new StringBuffer();
						
						if("Y".equals(dsMap.get("INSTCD_YN"))){
							if(!"030".equals(dsMap.get("INSTCD"))){
								sbWhere.append(SQL.SEPERATE + "(");
								sbWhere.append(SQL.SEPERATE);
								sbWhere.append(dsMap.get("TABLE") + "." + SQL.INSTCD + SQL.EQUAL + "'" + dsMap.get("INSTCD") + "'");	
								sbWhere.append(SQL.AND);
								sbWhere.append(SQL.SEPERATE);
							}
						}
						
						for(int j=0; j < inputVals.length; j++){
							if("".equals(tmpSql)){
								tmpSql = "'" + inputVals[j] + "'";
							}else{
								tmpSql += ",'" + inputVals[j] + "'";
							}
						}
						
						if("EXC".equals(incExc) && "Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
							sbWhere.append(column + SQL.NOT_IN + " (" + tmpSql + ")");
							
						}else{
							sbWhere.append(column + SQL.IN + " (" + tmpSql + ")");
							
						}
						
						
						if("Y".equals(dsMap.get("INSTCD_YN"))){
							if(!"030".equals(dsMap.get("INSTCD"))){
								sbWhere.append(SQL.SEPERATE + ")");
							}
						}
						
						//포함,제외로직	
						if("INC".equals(incExc)){
							sbQuery.append(sbWhere.toString());
							
						}else{
							if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
								sbQuery.append(sbWhere.toString());
								
							}else{
								sbQuery.append(SQL.SEPERATE);
								sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
								sbQuery.append(SQL.NOT_IN);
								sbQuery.append(SQL.SEPERATE);
								
								sbQuery.append("(");
									sbQuery.append(SQL.SEPERATE);
									sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
									sbQuery.append(SQL.FROM);
									sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
									sbQuery.append(SQL.BLANK + dsMap.get("TABLE"));
									sbQuery.append(SQL.WHERE);
									sbQuery.append(sbWhere.toString());
									sbQuery.append(SQL.SEPERATE);
								sbQuery.append(")");
							}						
						}
					}
				}
			}
			
			
		}
		
		return sbQuery.toString();
	}

}
