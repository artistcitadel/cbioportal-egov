package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.Map;

import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * ITEM_TYPE이 TEXT인 항목에 대한 SQL 
 * 연산자
 * 1.
 * @author user
 * 	BTWEEN
 *	<
 *	>
 *	<=
 *	>=
 *	=
 *	<>
 *	LIKE
 *	NOT LIKE
 *	REGEXP_LIKE
 *	REGEXP_NOT_LIKE
 */

public class SQLWhereClauseText{
	
	public static String getQueryForWhereItemText(Map<String,String> dsMap){
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
		
		if("Y".equals(dsMap.get("IS_NULL_OR_BLANK"))){
			sbQueryWhere.append("(");
			sbQueryWhere.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			sbQueryWhere.append(SQL.IS_NULL);
			sbQueryWhere.append(SQL.OR);
			sbQueryWhere.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			sbQueryWhere.append(SQL.EQUAL);
			sbQueryWhere.append("''");
			sbQueryWhere.append(")");
			
			if("INC".equals(incExc)){
				sbQuery.append(sbQueryWhere.toString());
				
			}else{
				if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
					sbQueryWhere = new StringBuffer();
					
					sbQueryWhere.append("(");
						sbQueryWhere.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
						sbQueryWhere.append(SQL.IS_NOT_NULL);
						sbQueryWhere.append(SQL.AND);
						sbQueryWhere.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
						sbQueryWhere.append(SQL.NOT_EQUAL);
						sbQueryWhere.append("''");
					sbQueryWhere.append(")");
					
					sbQuery.append(sbQueryWhere.toString());
					
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
						sbQuery.append(SQL.WHERE);
						sbQuery.append(sbQueryWhere.toString());
						sbQuery.append(SQL.SEPERATE);
					sbQuery.append(")");
				}
			}
			
		}else{
			if("BETWEEN".equals(inputVal0)){
				if("INC".equals(incExc)){
					sbQuery.append(column);
					sbQuery.append(SQL.BETWEEN);
					sbQuery.append(" '" + inputVal1 + "'");
					sbQuery.append(SQL.AND);
					sbQuery.append(" '" + inputVal2 + "'");
					
				}else{
					if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
						sbQuery = new StringBuffer();
						sbQuery.append(SQL.SEPERATE + column + SQL.LESS + "'" + inputVal1 + "'");
						sbQuery.append(SQL.OR + column + SQL.GREAT + "'" + inputVal2 + "'");
												
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
				
			}else if("REGEXP_LIKE".equals(inputVal0)){
				if("INC".equals(incExc)){
					sbQuery.append(inputVal0);
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
							sbQuery.append(inputVal0);
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
				
				
			}else if("REGEXP_NOT_LIKE".equals(inputVal0)){
				if("INC".equals(incExc)){
					sbQuery.append(inputVal0);
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
						sbQuery.append(inputVal0);
						sbQuery.append("(");
						sbQuery.append(dsMap.get("COLUMN"));
						sbQuery.append(",");
						sbQuery.append("'" + inputVal1 + "'");
						
						sbQuery.append(")");
					sbQuery.append(")");
				}
				
				
			}else if("LIKE".equals(inputVal0)){
				if("INC".equals(incExc)){
					if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
						sbQuery.append(SQL.UPPER + "(" + column + ")");
						sbQuery.append(SQL.LIKE);
						sbQuery.append(SQL.UPPER + "(" + "'%' || " + "'" + inputVal1 + "'" + " || '%' " + ")");
						
					}else{
						sbQuery.append(column + SQL.ILIKE);
						sbQuery.append("'%' || " + "'" + inputVal1 + "'" + " || '%' ");
					}
					
				}else{
					if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
						sbQuery = new StringBuffer();
						sbQuery.append(column + SQL.NOT_ILIKE);
						sbQuery.append("'%' || " + "'" + inputVal1 + "'" + " || '%' ");
						
						
					}else{
						sbQuery.append(SQL.SEPERATE);
						sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						sbQuery.append(SQL.NOT_IN);
						sbQuery.append("(");
							sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
							sbQuery.append(SQL.FROM);
							sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
							sbQuery.append(SQL.WHERE);
							
							if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
								sbQuery.append(SQL.UPPER + "(" + column + ")");
								sbQuery.append(SQL.LIKE);
								sbQuery.append(SQL.UPPER + "(" + "'%' || " + "'" + inputVal1 + "'" + " || '%' " + ")");
								
							}else{
								sbQuery.append(column + SQL.ILIKE);
								sbQuery.append("'%' || " + "'" + inputVal1 + "'" + " || '%' ");
							}
							
						sbQuery.append(")");
					}
					
				}
				
			}else if("NOT_LIKE".equals(inputVal0)){
				if("INC".equals(incExc)){
					if(SQL.VERTICA.equals(QueryVO.gvDbType)){
						sbQuery.append(column + SQL.NOT_ILIKE);
						sbQuery.append("'%' || " + "'" + inputVal1 + "'" + " || '%' ");
						
					}else{
						sbQuery.append(column + SQL.NOT_LIKE);
						sbQuery.append("'%' || " + "'" + inputVal1 + "'" + " || '%' ");

					}
					
					
				}else{
					if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
						sbQuery.append(column + SQL.ILIKE);
						sbQuery.append("'%' || " + "'" + inputVal1 + "'" + " || '%' ");
						
					}else{
						sbQuery.append(SQL.SEPERATE);
						sbQuery.append(dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
						sbQuery.append(SQL.NOT_IN);
						sbQuery.append("(");
							sbQuery.append(SQL.SELECT + SQL.DISTINCT + dsMap.get("TABLE") + "." + QueryVO.gvPatSbstNo);
							sbQuery.append(SQL.FROM);
							sbQuery.append(dsMap.get("SCHEMA") + "." + dsMap.get("TABLE"));
							sbQuery.append(SQL.WHERE);
							
							if(SQL.VERTICA.equals(QueryVO.gvDbType)){
								sbQuery.append(column + SQL.NOT_ILIKE);
								sbQuery.append("'%' || " + "'" + inputVal1 + "'" + " || '%' ");
								
							}else{
								sbQuery.append(column + SQL.NOT_LIKE);
								sbQuery.append("'%' || " + "'" + inputVal1 + "'" + " || '%' ");

							}
							
						sbQuery.append(")");
					}
				}
				
			}else if("EQ".equals(inputVal0)){
				if("INC".equals(incExc)){
					sbQuery.append(column);
					sbQuery.append(SQL.EQUAL + "'" + inputVal1 + "'");
					
				}else{
					if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
						sbQuery.append(column);
						sbQuery.append(SQL.NOT_EQUAL + "'" + inputVal1 + "'");
						
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
							sbQuery.append(SQL.EQUAL + "'" + inputVal1 + "'");
						sbQuery.append(")");
					}
				}
				
				
			}else if("NOT_EQ".equals(inputVal0)){
				if("INC".equals(incExc)){
					sbQuery.append(column);
					sbQuery.append(SQL.NOT_EQUAL + "'" + inputVal1 + "'");
					
				}else{
					if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
						sbQuery.append(column);
						sbQuery.append(SQL.EQUAL + "'" + inputVal1 + "'");
						
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
							sbQuery.append(SQL.NOT_EQUAL + "'" + inputVal1 + "'");
						sbQuery.append(")");
					}
				}
			}else{
				if("INC".equals(incExc)){
					sbQuery.append(column);
					sbQuery.append(SQL.BLANK + inputVal0);
					sbQuery.append(SQL.BLANK + "'" + inputVal1 + "'");
					
				}else{
					if("Y".equals(dsMap.get(SQL.CASE_WHEN_VALUE))){
					//	COL은 INPUT_VAL1보다 작다
						if("<".equals(inputVal0)){
							sbQuery.append(column + SQL.BLANK + SQL.GREAT + "'" + inputVal1 + "'");
						
					//	COL은 INPUT_VAL1보다 크다
						}else if(">".equals(inputVal0)){
							sbQuery.append(column + SQL.BLANK + SQL.LESS + "'" + inputVal1 + "'");
						
					//	COL은 INPUT_VAL1보다 작거나 같다.		
						}else if("<=".equals(inputVal0)){
							sbQuery.append(column + SQL.BLANK + SQL.GREATER_THAN_OR_EQUAL + "'" + inputVal1 + "'");
						
					//	COL은 INPUT_VAL1보다 크거나 같다.
						}else if(">=".equals(inputVal0)){
							sbQuery.append(column + SQL.BLANK + SQL.LESS_THAN_OR_EQUAL + "'" + inputVal1 + "'");
							
						}else if("<>".equals(inputVal0)){
							sbQuery.append(column + SQL.BLANK + SQL.EQUAL + "'" + inputVal1 + "'");
							
						}
						
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
							sbQuery.append(SQL.BLANK + inputVal0);
							sbQuery.append(SQL.BLANK + "'" + inputVal1 + "'");
						sbQuery.append(")");
					}					
				}
			}
		}
		
		return sbQuery.toString();
	}
	
	
	
}
