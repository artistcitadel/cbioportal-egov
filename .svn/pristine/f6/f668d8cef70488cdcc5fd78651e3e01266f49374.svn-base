package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.Map;

import org.apache.log4j.Logger;

import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.StringUtils;

public class SQLSelectClauseRCohort {
	private static final Logger logger = Logger.getLogger(SQLSelectClauseRCohort.class);
	
	/**
	 * 코호트연구항목 Column
	 * @param prefix
	 * @param dsMap
	 * @return
	 */
	public static String getColumnsForRCohort(String prefix, Map<String,String> dsMap){
		StringBuffer sbQuery = new StringBuffer();
		
		String castOfItemType = "";
		String columnOfItemType = "";
		
		columnOfItemType = dsMap.get("TABLE") + "." + dsMap.get("COLUMN");
		
		int dataTypeLength = 0;
		
		
		//연구항목 길이계산 3000이상이면 varchar(32000)
		if(dsMap.get("DATA_TYPE").indexOf("varchar") >= 0){
			String tmp = dsMap.get("DATA_TYPE");
			
			tmp = tmp.substring(tmp.indexOf("(") + 1, tmp.length() - 1);
			dataTypeLength = Integer.valueOf(tmp);
			
		}
		
		
		if(SQL.NUM.equals(dsMap.get("ITEM_TYPE"))){
			castOfItemType = SQL.NUMERIC;
			
		}else if(SQL.DAT.equals(dsMap.get("ITEM_TYPE"))){
			//2018-09-11 추가
			if(SQL.DATE.equals(dsMap.get("DATA_TYPE"))) {
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
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + ",");
		
		//AGG가 NULL OR EMPTY면 최대값 리턴
		if( StringUtils.isNull(dsMap.get("AGG")) || StringUtils.isEmpty(dsMap.get("AGG"))){
			sbQuery.append(SQL.SEPERATE + SQL.TAB2);
			sbQuery.append(SQL.MAX + "(" + columnOfItemType + ")");
			
			
		}else if("FIRST".equals(dsMap.get("AGG"))){
			if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
				if(SQL.VERTICA.equals(QueryVO.gvDbType)){
					sbQuery.append(SQL.CAST + "(");
						sbQuery.append(SQL.SUBSTR + "(");
							sbQuery.append(SQL.MIN + "(");
								sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'"+SQL.YYYY_MM_DD+"') ");
								sbQuery.append(" || '|' || ");
								
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
										sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
										sbQuery.append(",");
										sbQuery.append(SQL.INSTR + "(");
											sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
											sbQuery.append(",':') + 1");
									sbQuery.append(")");	//substr end
*/									
								}else{
									sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
									
								}
							sbQuery.append(")"); //min end
						sbQuery.append(",12)");
					sbQuery.append(SQL.AS + castOfItemType);
					sbQuery.append(")");	
					
				}else{
					sbQuery.append(SQL.CAST + "(");	
						sbQuery.append(SQL.SUBSTR + "(");
							sbQuery.append(SQL.MIN + "(");
							sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'"+SQL.YYYY_MM_DD+"') ");
							sbQuery.append(")");
							sbQuery.append(" || '|' || ");
							
							if(SQL.DAT.equals(dsMap.get("ITEM_TYPE"))){
								//2018-09-11 추가
								if(SQL.DATE.equals(dsMap.get("DATA_TYPE"))) {
									sbQuery.append(SQL.MIN + "(" + SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ",'"+SQL.YYYY_MM_DD+"')" + ")");
								}else {
									sbQuery.append(SQL.MIN + "(" + SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ",'"+SQL.YYYY_MM_DD_HH24_MI_SS+"')" + ")");
								}
							}else{
								if(dataTypeLength > QueryVO.DATA_TYPE_LENGTH){
									sbQuery.append(SQL.MAX + "(" + SQL.TO_NCHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")" + ")");
								}else{
									sbQuery.append(SQL.MAX + "(" + SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")" + ")");
								}
							}
						sbQuery.append(",12)");
					sbQuery.append(SQL.AS + castOfItemType);	
					sbQuery.append(")");						
				}
				
				
			}else{
				sbQuery.append(SQL.MIN + "(");	
					sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
				sbQuery.append(")");	
			}
			
		}else if("LAST".equals(dsMap.get("AGG")) || "PAST".equals(dsMap.get("AGG")) || "T".equals(dsMap.get("AGG")) || "P".equals(dsMap.get("AGG")) || "A".equals(dsMap.get("AGG"))){
			if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
				if(SQL.VERTICA.equals(QueryVO.gvDbType)){
					sbQuery.append(SQL.CAST + "(");
						sbQuery.append(SQL.SUBSTR + "(");
							sbQuery.append(SQL.MAX + "(");
								sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'"+SQL.YYYY_MM_DD+"') ");
								sbQuery.append(" || '|' || ");
								
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
										sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
										sbQuery.append(",");
										sbQuery.append(SQL.INSTR + "(");
											sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
											sbQuery.append(",':') + 1");
									sbQuery.append(")");	//substr end
*/									
								}else{
									sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
									
								}
								
							sbQuery.append(")");
						sbQuery.append(",12)");
					sbQuery.append(SQL.AS + castOfItemType);
					sbQuery.append(")");
					
				}else{
					sbQuery.append(SQL.CAST + "(");	
						sbQuery.append(SQL.SUBSTR + "(");
							sbQuery.append(SQL.MAX + "(");
							sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'"+SQL.YYYY_MM_DD+"') ");
							sbQuery.append(")");
							sbQuery.append(" || '|' || ");
							
							if(SQL.DAT.equals(dsMap.get("ITEM_TYPE"))){
								//2018-09-11 추가
								if(SQL.DATE.equals(dsMap.get("DATA_TYPE"))) {
									sbQuery.append(SQL.MAX + "(" + SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ",'"+SQL.YYYY_MM_DD+"')" + ")");
								}else {
									sbQuery.append(SQL.MAX + "(" + SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ",'"+SQL.YYYY_MM_DD_HH24_MI_SS+"')" + ")");
								}
							}else{
								if(dataTypeLength > QueryVO.DATA_TYPE_LENGTH){
									sbQuery.append(SQL.MAX + "(" + SQL.TO_NCHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")" + ")");
								}else{
									sbQuery.append(SQL.MAX + "(" + SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")" + ")");
								}
								
							}
						sbQuery.append(",12)");
					sbQuery.append(SQL.AS + castOfItemType);	
					sbQuery.append(")");			
				}
				
				
			}else{
				sbQuery.append(SQL.MAX + "(");	
				sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
				sbQuery.append(")");	
			
			}
		
		//SUM (숫자타입만)		
		}else if("SUM".equals(dsMap.get("AGG"))){
			sbQuery.append(SQL.SUM + "(");	
				sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			sbQuery.append(")");
		
		//AVG (숫자타입만)		
		}else if("AVG".equals(dsMap.get("AGG"))){
			sbQuery.append(SQL.AVG + "(");	
				sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			sbQuery.append(")");
		
		//주기	
		}else if("PER".equals(dsMap.get("AGG"))){
			if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
				if(SQL.VERTICA.equals(QueryVO.gvDbType)){
					sbQuery.append(SQL.CAST + "(");
					sbQuery.append(SQL.SEPERATE);
						sbQuery.append("SUBSTR(");
							sbQuery.append(SQL.MIN + "(");
								sbQuery.append(SQL.TO_CHAR + "( ABS (DATEDIFF(day,"+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",R_DT.BASE_DT)),'FM00999')");
								sbQuery.append(" || '|' || ");
								sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'"+SQL.YYYY_MM_DD+"')");
								sbQuery.append(" || '|' || ");
								
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
										sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
										sbQuery.append(",");
										sbQuery.append(SQL.INSTR + "(");
											sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
											sbQuery.append(",':') + 1");
									sbQuery.append(")");	//substr end
*/									
								}else{
									sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
									
								}
								
							sbQuery.append("),18");
						sbQuery.append(") AS " + castOfItemType);
						sbQuery.append(")");
				}else{
					sbQuery.append(SQL.CAST + "(");
					{
						sbQuery.append(SQL.SUBSTR + "(");
						{
							sbQuery.append(SQL.MIN + "(");
							{
								sbQuery.append(SQL.LPAD + "(");
									sbQuery.append(SQL.ABS + "(");
										sbQuery.append(SQL.DAYS + "("+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+")" + "-" + SQL.DAYS + "(R_DT.BASE_DT)");
									sbQuery.append(")");
								sbQuery.append(",5,'0')");			//LPAD END
								
								sbQuery.append(" || '|' || ");
								sbQuery.append(SQL.TO_CHAR + "(" + dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+",'"+SQL.YYYY_MM_DD+"')");
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
										sbQuery.append(SQL.TO_NCHAR + "(" +dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")");
										
									}else{
										sbQuery.append(SQL.TO_CHAR + "(" +dsMap.get("TABLE")+"."+dsMap.get("COLUMN") + ")");
										
									}
								}
							}
							sbQuery.append(")");
						}
						sbQuery.append(",18)");
						
					}
					sbQuery.append(SQL.AS + castOfItemType);
					sbQuery.append(")");
				}
				
			}else{
				sbQuery.append(SQL.MIN + "(");	
				sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			}
			
		}else if("ALL".equals(dsMap.get("AGG"))){
			sbQuery.append("(");	
			sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			sbQuery.append(")");	
			
		}else{
			if(!StringUtils.isEmpty(dsMap.get("BASE_DT_COLUMN"))){
				sbQuery.append(SQL.CAST + "(");
					sbQuery.append(SQL.SUBSTR + "(");
					sbQuery.append(dsMap.get("AGG") + "(");	
						sbQuery.append(SQL.TO_CHAR + "( "+dsMap.get("TABLE")+"."+dsMap.get("BASE_DT_COLUMN")+", 'YYYY-MM-DD' )");
						sbQuery.append(" || '|' || ");
						
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
								sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
								sbQuery.append(",");
								sbQuery.append(SQL.INSTR + "(");
									sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
									sbQuery.append(",':') + 1");
							sbQuery.append(")");	//substr end
*/							
						}else{
							sbQuery.append(dsMap.get("TABLE")+"."+dsMap.get("COLUMN"));
							
						}
						sbQuery.append(")"); //min end
						sbQuery.append(",12)");
					sbQuery.append(SQL.AS + castOfItemType);
				sbQuery.append(")");
				
			}else{
				sbQuery.append(dsMap.get("AGG") + "(");	
					sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
				sbQuery.append(")");	
			}
		}
		
		sbQuery.append(SQL.AS + prefix);
		sbQuery.append(SQL.UNDERSCORE + dsMap.get("TABLE"));
		sbQuery.append(SQL.UNDERSCORE + dsMap.get("COLUMN"));
		sbQuery.append(SQL.UNDERSCORE + String.valueOf(dsMap.get("ORDER")));
		
		return sbQuery.toString();
	}
	
	
	
	/**
	 * 코호트연구항목 Column
	 * @param prefix
	 * @param dsMap
	 * @return
	 */
	@SuppressWarnings({"rawtypes","unused"})
	public static String getColumnsForRCohortBaseDate(String prefix, Map<String,String> dsMap){
		StringBuffer sbQuery = new StringBuffer();
		
		String castOfItemType 	= "";
		String columnOfItemType = "";
		
		columnOfItemType = dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN");
		
		if("NUM".equals(dsMap.get("ITEM_TYPE"))){
			castOfItemType = SQL.NUMERIC;
			
		}else if("DAT".equals(dsMap.get("ITEM_TYPE"))){
			//2018-09-11 추가
			if(SQL.DATE.equals(dsMap.get("DATA_TYPE"))){
				castOfItemType = SQL.DATE;
			}else {
				castOfItemType = SQL.TIMESTAMP;
			}
		}else{
			castOfItemType = SQL.VARCHAR;
		}
		
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + ",");
		
		if( StringUtils.isNull(dsMap.get("AGG")) || 
			StringUtils.isEmpty(dsMap.get("AGG")) || "PER".equals(dsMap.get("AGG"))){
			sbQuery.append(SQL.SEPERATE + SQL.TAB2);
			sbQuery.append(SQL.MAX + "(" + columnOfItemType + ")");
			
		}else if("FIRST".equals(dsMap.get("AGG"))){
			sbQuery.append(SQL.MIN + "(");	
			sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
			sbQuery.append(")");	
			
			
			
		}else if("LAST".equals(dsMap.get("AGG")) || "PAST".equals(dsMap.get("AGG")) || "T".equals(dsMap.get("AGG")) || "P".equals(dsMap.get("AGG")) || "A".equals(dsMap.get("AGG"))){
			sbQuery.append(SQL.MAX + "(");	
			sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
			sbQuery.append(")");	
			
			
		}else if("ALL".equals(dsMap.get("AGG"))){
			sbQuery.append("(");	
			sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
			sbQuery.append(")");	
			
			
		}else{
			sbQuery.append(SQL.MAX + "(");	
			sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
			sbQuery.append(")");
			
		}
		
		sbQuery.append(SQL.AS + prefix);
		sbQuery.append(SQL.UNDERSCORE + dsMap.get("TABLE"));
		sbQuery.append(SQL.UNDERSCORE + dsMap.get("BASE_DT_COLUMN"));
		sbQuery.append(SQL.UNDERSCORE + "DT");
		sbQuery.append(SQL.UNDERSCORE + String.valueOf(dsMap.get("ORDER")));
		
		return sbQuery.toString();
	}

}
