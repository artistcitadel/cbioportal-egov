package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.Map;

import org.apache.log4j.Logger;

import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * 단면연구, 사례대조의 연구항목 컬럼 SQL Builder
 * @author user
 *
 */

public class SQLSelectClauseR {
	private static final Logger logger = Logger.getLogger(SQLSelectClauseR.class);
	
	
	
	/**
	 * 연구항목 컬럼값을 리턴한다.
	 * @param prefix : 컬럼 Alias
	 * @param dsMap : 연구항목
	 * @return
	 * @throws Exception
	 */
	public static String getColumnsForR(String prefix, Map<String,String> dsMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		String castOfItemType = "";
		int dataTypeLength = 0;
		
		//연구항목 길이계산 3000이상이면 varchar(32000)
		if(dsMap.get("DATA_TYPE").indexOf("varchar") >= 0){
			String tmp = dsMap.get("DATA_TYPE");
			tmp = tmp.substring(tmp.indexOf("(") + 1, tmp.length() - 1);
			dataTypeLength = Integer.valueOf(tmp);
			
		}
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + ",");
		
		if(SQL.NUM.equals(dsMap.get("ITEM_TYPE"))){
			castOfItemType = SQL.NUMERIC;
			
		}else if(SQL.DAT.equals(dsMap.get("ITEM_TYPE"))){
			//2018-09-11 추가
			if(SQL.DATE.equals(dsMap.get("DATA_TYPE"))){
				castOfItemType = SQL.DATE;
			}else {
				castOfItemType = SQL.TIMESTAMP;
			}
		}else{
			if(SQL.VERTICA.equals(QueryVO.gvDbType)){
				if(dsMap.get("DATA_TYPE").indexOf("int") >= 0){
					castOfItemType = SQL.NUMERIC;
					
				}else{
					castOfItemType = SQL.VARCHAR;
					
				}
					
				
			}else{
				if(dataTypeLength > QueryVO.DATA_TYPE_LENGTH){
					castOfItemType = SQL.VARCHAR + "("+QueryVO.CAST_SIZE+")";
					
				}else{
					castOfItemType = SQL.VARCHAR;
				}
			}
		}
		
	//	기준일자 이후 (MIN)	
		if("N".equals(dsMap.get("RANGE_CD")) || StringUtils.isNull(dsMap.get("RANGE_CD"))){
			if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
				/**
				 * VERTICA
				 */
				if( SQL.VERTICA.equals(QueryVO.gvDbType)){
					sbQuery.append(SQL.CAST + "(");
						sbQuery.append(SQL.SUBSTR + "(");
							sbQuery.append(SQL.MIN + "(" + SQL.TO_CHAR + "( "+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+", '" + SQL.YYYY_MM_DD + "' )");	
							sbQuery.append("|| '|' ||");
							
							//2017-12-14 경북대수정
							if("V_MR_FORM_REC".equals(dsMap.get("TABLE")) && "RECCNTS".equals(dsMap.get("COLUMN"))){
								//2018-07-12 경북대 로직 수정
								sbQuery.append(SQL.SEPERATE);
								sbQuery.append(SQL.CASE_WHEN);
									sbQuery.append(" (");
										sbQuery.append("(V_MR_FORM_REC.DEGNITEMKIND = ANY (ARRAY['CMB', 'CHK', 'RDO', 'SSL', 'MSL', 'BOL', 'STX', 'GSU']))");
										sbQuery.append(SQL.AND);
										sbQuery.append("(V_MR_FORM_REC.RECTERMCD IS NOT NULL)");
									sbQuery.append(")");
									sbQuery.append(SQL.THEN);
									sbQuery.append(SQL.SUBSTR + "(");
										sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
										sbQuery.append(",");
										sbQuery.append(SQL.INSTR + "(");
											sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
											sbQuery.append(",':') + 1");
									sbQuery.append(")");	//substr end
								sbQuery.append(SQL.ELSE);
									sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
								sbQuery.append(SQL.END);
								sbQuery.append(")");
								
								/*sbQuery.append(SQL.SUBSTR + "(");
									sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
									sbQuery.append(",");
									sbQuery.append(SQL.INSTR + "(");
										sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
										sbQuery.append(",':') + 1");
								sbQuery.append(")");	//substr end
								sbQuery.append(")");*/
								
							}else{
								sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN")+")");
								
							}
							
							sbQuery.append(",12)");
						sbQuery.append(SQL.AS + castOfItemType);
				
				/**
				 * DB2BLU		
				 */
				}else{
					//CAST
					sbQuery.append(SQL.CAST + "(");
					{
						//SUBSTR
						sbQuery.append(SQL.SUBSTR + "(");
						{
							sbQuery.append(SQL.MIN + "("+SQL.TO_CHAR + "("+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'" + SQL.YYYY_MM_DD + "')" +")");
							sbQuery.append("|| '|' ||");
							
							if(SQL.DAT.equals(dsMap.get("ITEM_TYPE"))){
								//2018-09-11 추가
								if(SQL.DATE.equals(dsMap.get("DATA_TYPE"))) {
									sbQuery.append(SQL.MIN + "("+SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ",'"+SQL.YYYY_MM_DD+"')" + ")");
								}else {
									sbQuery.append(SQL.MIN + "("+SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ",'"+SQL.YYYY_MM_DD_HH24_MI_SS+"')" + ")");
								}
							}else{
								if(dataTypeLength > QueryVO.DATA_TYPE_LENGTH){
									sbQuery.append(SQL.MIN + "("+SQL.TO_NCHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")" + ")");	
								}else{
									sbQuery.append(SQL.MIN + "("+SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")" + ")");
								}
							}	
						}
						sbQuery.append(",12)");
					}
					sbQuery.append(SQL.AS + castOfItemType);
				}
				
			}else{
				sbQuery.append(SQL.MIN + " ( ");	
				sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			}
	//	기준일자 이전 (MAX)		
		}else if("H".equals(dsMap.get("RANGE_CD")) || StringUtils.isNull(dsMap.get("RANGE_CD"))){
			if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
				if( SQL.VERTICA.equals(QueryVO.gvDbType)){
					sbQuery.append(SQL.CAST + "(");
						sbQuery.append(SQL.SUBSTR + "(");
							sbQuery.append(SQL.MAX + "(" + SQL.TO_CHAR + "("+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+", '" + SQL.YYYY_MM_DD + "' )");
							sbQuery.append(" || '|' || ");
							
							//2017-12-14 경북대수정
							if("V_MR_FORM_REC".equals(dsMap.get("TABLE")) && "RECCNTS".equals(dsMap.get("COLUMN"))){
								//2018-07-12 경북대 로직 수정
								sbQuery.append(SQL.SEPERATE);
								sbQuery.append(SQL.CASE_WHEN);
									sbQuery.append(" (");
										sbQuery.append("(V_MR_FORM_REC.DEGNITEMKIND = ANY (ARRAY['CMB', 'CHK', 'RDO', 'SSL', 'MSL', 'BOL', 'STX', 'GSU']))");
										sbQuery.append(SQL.AND);
										sbQuery.append("(V_MR_FORM_REC.RECTERMCD IS NOT NULL)");
									sbQuery.append(")");
									sbQuery.append(SQL.THEN);
									sbQuery.append(SQL.SUBSTR + "(");
										sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
										sbQuery.append(",");
										sbQuery.append(SQL.INSTR + "(");
											sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
											sbQuery.append(",':') + 1");
									sbQuery.append(")");	//substr end
								sbQuery.append(SQL.ELSE);
									sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
								sbQuery.append(SQL.END);
								sbQuery.append(")");
								
								/*sbQuery.append(SQL.SUBSTR + "(");
									sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
									sbQuery.append(",");
									sbQuery.append(SQL.INSTR + "(");
										sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
										sbQuery.append(",':') + 1");
								sbQuery.append(")");	//substr end
								sbQuery.append(")");*/
								
							}else{
								sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN")+")");
								
							}
							
						sbQuery.append(",12)");					//SUBSTR END
					sbQuery.append(SQL.AS + castOfItemType);
					
				}else{
					//CAST 
					sbQuery.append(SQL.CAST + "(");
					{
						//SUBSTR
						sbQuery.append(SQL.SUBSTR + "(");
						{
							sbQuery.append(SQL.MAX + "("+SQL.TO_CHAR + "("+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'"+SQL.YYYY_MM_DD+"')" +")");
							sbQuery.append(" || '|' || ");
							
							if(SQL.DAT.equals(dsMap.get("ITEM_TYPE"))){
								//2018-09-11 추가
								if(SQL.DATE.equals(dsMap.get("DATA_TYPE"))) {
									sbQuery.append(SQL.MAX + "("+SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ",'"+SQL.YYYY_MM_DD+"')" + ")");
								}else {
									sbQuery.append(SQL.MIN + "("+SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ",'"+SQL.YYYY_MM_DD_HH24_MI_SS+"')" + ")");
								}
							}else{
								if(dataTypeLength > QueryVO.DATA_TYPE_LENGTH){
									sbQuery.append(SQL.MAX + "("+SQL.TO_NCHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")" + ")");	
								}else{
									sbQuery.append(SQL.MAX + "("+SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")" + ")");
								}
								
							}
						}	
						sbQuery.append(",12)");					//SUBSTR END
					}
					sbQuery.append(SQL.AS + castOfItemType);
				}
				
			}else{
				sbQuery.append(SQL.MAX + " ( ");	
				sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			}
	//	범위		
		}else{
			if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
			//	VERTICA	
				if(SQL.VERTICA.equals(QueryVO.gvDbType)){
					sbQuery.append(SQL.CAST + "(");
						sbQuery.append(SQL.SUBSTR + "(");
							sbQuery.append(SQL.MIN + "(");
								sbQuery.append(SQL.TO_CHAR + "(" + SQL.ABS + "(DATEDIFF(DAY,"+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",R_DT.BASE_DT)),'FM00999')");
								sbQuery.append(" || '|' || ");
								sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'"+SQL.YYYY_MM_DD+"')");
								sbQuery.append(" || '|' || ");
								
								//2017-12-14 경북대수정
								if("V_MR_FORM_REC".equals(dsMap.get("TABLE")) && "RECCNTS".equals(dsMap.get("COLUMN"))){
									//2018-07-12 경북대 로직 수정
									sbQuery.append(SQL.SEPERATE);
									sbQuery.append(SQL.CASE_WHEN);
										sbQuery.append(" (");
											sbQuery.append("(V_MR_FORM_REC.DEGNITEMKIND = ANY (ARRAY['CMB', 'CHK', 'RDO', 'SSL', 'MSL', 'BOL', 'STX', 'GSU']))");
											sbQuery.append(SQL.AND);
											sbQuery.append("(V_MR_FORM_REC.RECTERMCD IS NOT NULL)");
										sbQuery.append(")");
										sbQuery.append(SQL.THEN);
										sbQuery.append(SQL.SUBSTR + "(");
											sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
											sbQuery.append(",");
											sbQuery.append(SQL.INSTR + "(");
												sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
												sbQuery.append(",':') + 1");
										sbQuery.append(")");	//substr end
									sbQuery.append(SQL.ELSE);
										sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
									sbQuery.append(SQL.END);
									
									/*sbQuery.append(SQL.SUBSTR + "(");
										sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
										sbQuery.append(",");
										sbQuery.append(SQL.INSTR + "(");
											sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
											sbQuery.append(",':') + 1");
									sbQuery.append(")");	//substr end
									//sbQuery.append(")");
*/									
								}else{
									/*sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN")+")");*/
									sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
									
								}
								
						sbQuery.append("),18)");
					sbQuery.append(SQL.AS + castOfItemType);
					
				}else{
					//CAST START
					sbQuery.append(SQL.CAST + "(");		
					{
						//SUBSTR START
						sbQuery.append(SQL.SUBSTR + "(");	
						{
							//MIN START
							sbQuery.append(SQL.MIN + "(");		
							{
								//LPAD START
								sbQuery.append(SQL.LPAD + "(");		
									sbQuery.append(SQL.ABS + "(");
										sbQuery.append(SQL.DAYS + "("+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+")" + "-" + SQL.DAYS + "(R_DT.BASE_DT)");
									sbQuery.append(")");											
								sbQuery.append(",5,'0')");			//LPAD END
								sbQuery.append(" || '|' || ");
								sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'YYYY-MM-DD')");
								sbQuery.append(" || '|' || ");
								
								if(SQL.DAT.equals(dsMap.get("ITEM_TYPE"))){
									//2018-09-11 추가
									if(SQL.DATE.equals(dsMap.get("DATA_TYPE"))) {
										sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ",'"+SQL.YYYY_MM_DD+"')");
									}else {
										sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ",'"+SQL.YYYY_MM_DD_HH24_MI_SS+"')");
									}
								}else{
									if(dataTypeLength > QueryVO.DATA_TYPE_LENGTH){
										sbQuery.append(SQL.TO_NCHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")");	
									}else{
										sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")");
									}
									
								}
								
							}
							sbQuery.append(")");				//MIN END
						}
						sbQuery.append(",18)");				//SUBSTR END
					}
					sbQuery.append(SQL.AS + castOfItemType);//CAST END
				}
				
			}else{
				sbQuery.append(SQL.MIN + "(");	
				sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			}
		}
		
		sbQuery.append(")" + SQL.AS);
		sbQuery.append(prefix + "_" + dsMap.get("TABLE") + "_" + dsMap.get("COLUMN"));
		sbQuery.append("_" + String.valueOf(dsMap.get("ORDER")));
		
		return sbQuery.toString();
		
	}
	
	
	/**
	 * 연구항목 기준일자 컬럼
	 * @param prefix
	 * @param dsMap
	 * @return
	 * @throws Exception
	 */
	public static String getColumnsForRBaseDate(String prefix, Map<String,String> dsMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.SEPERATE);
		sbQuery.append(SQL.TAB2);
		sbQuery.append(",");
		
	//	이후	
		if("N".equals(dsMap.get("RANGE_CD")) || StringUtils.isNull(dsMap.get("RANGE_CD"))){
			sbQuery.append(SQL.MIN + " ( ");	
			sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
			
	//	이전		
		}else if("H".equals(dsMap.get("RANGE_CD")) || StringUtils.isNull(dsMap.get("RANGE_CD"))){
			sbQuery.append(SQL.MAX + " ( ");	
			sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
			
	//	범위		
		}else{
			if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
				if(SQL.VERTICA.equals(QueryVO.gvDbType)){
					
					//CAST START	
					sbQuery.append(SQL.CAST + "(");
					{
						//SUBSTR START
						sbQuery.append(SQL.SUBSTR + "(");
						{
							//MIN START
							sbQuery.append(SQL.MIN + "(");
							{
								sbQuery.append(SQL.TO_CHAR + "(" + SQL.ABS + "("+SQL.DATEDIFF+"("+SQL.DAY+","+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",R_DT.BASE_DT)),'FM00999')");
								sbQuery.append(" || '|' || ");
								sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'"+SQL.YYYY_MM_DD+"')");
							}
							sbQuery.append(")");
						}
						sbQuery.append(",7)");
					}
					sbQuery.append(SQL.AS + SQL.DATE);		//CAST END
						
				}else{
					//CAST START
					sbQuery.append(SQL.CAST + "(");				
					{
						//SUBSTR START
						sbQuery.append(SQL.SUBSTR + "(");		
						{
							sbQuery.append(SQL.MIN + "(");		
							{
								sbQuery.append(SQL.LPAD + "(");
									sbQuery.append(SQL.ABS + "(");
										sbQuery.append(SQL.DAYS + "("+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+")" + "-" + SQL.DAYS + "(R_DT.BASE_DT)");
									sbQuery.append(")");				
								sbQuery.append(",5,'0')");		
								sbQuery.append(" || '|' || ");
								sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'"+SQL.YYYY_MM_DD+"')");
							}
							sbQuery.append(")");				//MIN END
						}
						sbQuery.append(",7)");				//SUBSTR END
					}
					sbQuery.append(SQL.AS + SQL.DATE);	//CAST END
				}
				
			}else{
				sbQuery.append(SQL.MIN + "(");	
				sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
			}
		}
		
		sbQuery.append(") AS ");
		sbQuery.append(prefix + "_" + dsMap.get("TABLE") + "_" + dsMap.get("BASE_DT_COLUMN"));
		sbQuery.append("_DT_" + String.valueOf(dsMap.get("ORDER")));
		
		return sbQuery.toString();
		
		
	}
	

}
