package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.softcen.bigcen.med.common.sys.service.ISysService;
import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * SELECT 구문 SQLHelper
 * @author user
 *
 */
public class SQLSelectClause {
	private static final Logger logger = Logger.getLogger(SQLSelectClause.class);
	private SQLWhereClause sqlWhereClause;
	
	@Autowired 
	private ISysService sysService; 
	
	/**
	 * 조회조건 집합의 컬럼값을 리턴한다.
	 * @param groupAlias
	 * @param dsMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast"})
	public String getColumnsForC(String groupAlias, Map<String,String> dsMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		String castOfItemType = "";
		
		sqlWhereClause = new SQLWhereClause();
		
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
			castOfItemType = SQL.VARCHAR; 
			
		}
		
		sbQuery.append(SQL.SEPERATE + ",");
		
		if("Y".equals(dsMap.get("BASE_DT_YN"))){
			if(!"DAT".equals(dsMap.get("ITEM_TYPE"))){
				String strBaseDtColumn 	= "";
				String strColumn 		= "";
				String strCaseWhen		= "";
				
				strColumn 		= dsMap.get("TABLE") + "." + dsMap.get("COLUMN");
				strBaseDtColumn = dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN");;
			//	strCaseWhen 	= sqlWhereClause.getWhereQuery(dsMap);
				strCaseWhen 	= sqlWhereClause.getWhereQueryForAggregateValue(dsMap);
				
				//CAST START
				sbQuery.append(SQL.SEPERATE + SQL.CAST + "(");		
				{
					//SUBSTRING START
					sbQuery.append(SQL.SEPERATE + SQL.SUBSTRING + "(");
					{
						//MIN START
						sbQuery.append(SQL.SEPERATE + SQL.MIN + "(");
						{
							sbQuery.append(SQL.SEPERATE + SQL.TO_CHAR + "(" + strBaseDtColumn + ",'"+SQL.YYYY_MM_DD+"')");
							sbQuery.append(SQL.SEPERATE + " || '|' || ");
							
							//CASE WHEN START
							sbQuery.append(SQL.SEPERATE + SQL.CASE_WHEN + strCaseWhen);
							
							//DB2이면서 ITEM_TYPE = TEX이면
							if(SQL.DB2BLU.equals(QueryVO.gvDbType) && SQL.TEX.equals(dsMap.get("ITEM_TYPE"))){
								sbQuery.append(SQL.SEPERATE + SQL.THEN + SQL.TO_NCHAR + "(" + strColumn + ")");
								
							}else{
								//2017-12-14 경북대수정
								if("V_MR_FORM_REC".equals(dsMap.get("TABLE")) && "RECCNTS".equals(dsMap.get("COLUMN"))){
									//2018-07-12 경북대 로직 수정
									sbQuery.append(SQL.SEPERATE + SQL.THEN);
									sbQuery.append(SQL.CASE_WHEN + " (");
										sbQuery.append("(");
											sbQuery.append("(V_MR_FORM_REC.DEGNITEMKIND = ANY (ARRAY['CMB', 'CHK', 'RDO', 'SSL', 'MSL', 'BOL', 'STX', 'GSU']))");
											sbQuery.append(SQL.AND);
											sbQuery.append("(V_MR_FORM_REC.RECTERMCD IS NOT NULL)");
										sbQuery.append(")");
									sbQuery.append(")");
									sbQuery.append(SQL.SEPERATE + SQL.THEN);
									sbQuery.append(SQL.SUBSTR + "(");
										sbQuery.append(strColumn);
										sbQuery.append(",");
										sbQuery.append(SQL.INSTR + "(");
											sbQuery.append(strColumn);
										sbQuery.append(",':') + 1");
									sbQuery.append(")");	//substr end
									sbQuery.append(SQL.ELSE);
									sbQuery.append(" " + strColumn);
									sbQuery.append(SQL.END);
									
									/*sbQuery.append(SQL.SEPERATE + SQL.THEN);
									sbQuery.append(SQL.SUBSTR + "(");
										sbQuery.append(strColumn);
										sbQuery.append(",");
										sbQuery.append(SQL.INSTR + "(");
											sbQuery.append(strColumn);
											sbQuery.append(",':') + 1");
									sbQuery.append(")");	//substr end
*/									
								}else{
									sbQuery.append(SQL.SEPERATE + SQL.THEN + strColumn);
									
								}
								
							}
							
							sbQuery.append(SQL.SEPERATE + SQL.ELSE + SQL.NULL);
							sbQuery.append(SQL.SEPERATE + SQL.END);
						}
						sbQuery.append(SQL.SEPERATE + ")");
						
					}
					sbQuery.append(SQL.SEPERATE + ",12) AS " + castOfItemType);
					
				}
				sbQuery.append(SQL.SEPERATE + ")");
				
				sbQuery.append(SQL.AS + groupAlias);				
				sbQuery.append(SQL.UNDERSCORE + dsMap.get("TABLE"));
				sbQuery.append(SQL.UNDERSCORE + dsMap.get("COLUMN"));
				sbQuery.append(SQL.UNDERSCORE + String.valueOf(dsMap.get("ORDER")));
				
			}
			
		}else{
			if("DAT".equals(dsMap.get("ITEM_TYPE"))){
				sbQuery.append(SQL.SEPERATE + SQL.MIN + "(");
				sbQuery.append(SQL.SEPERATE + SQL.CASE_WHEN);
					sbQuery.append(SQL.SEPERATE);
					sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN") + SQL.BETWEEN);
					sbQuery.append("'" + dsMap.get("INPUT_VAL1") + "'");
					sbQuery.append(SQL.AND);
					sbQuery.append("'" + dsMap.get("INPUT_VAL2") + "'");
					sbQuery.append(SQL.THEN);
					
					if(SQL.DB2BLU.equals(QueryVO.gvDbType)){
						sbQuery.append(SQL.VARCHAR_FORMAT + "(");
						sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
						sbQuery.append(",'" + SQL.YYYY_MM_DD + "')");
						
					}else{
						sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
					}
					
					sbQuery.append(SQL.ELSE);
					sbQuery.append("'9999-12-31'");
				sbQuery.append(SQL.SEPERATE + SQL.END);
				
				sbQuery.append(")");
				
				sbQuery.append(SQL.AS + groupAlias);				
				sbQuery.append(SQL.UNDERSCORE + dsMap.get("TABLE") + "_" + dsMap.get("COLUMN"));
				sbQuery.append(SQL.UNDERSCORE + String.valueOf(dsMap.get("ORDER")));
				
			}else{
				sbQuery.append(SQL.SEPERATE + SQL.MIN + "(");
				
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
					
					/*sbQuery.append(SQL.SEPERATE);
					sbQuery.append(SQL.SUBSTR + "(");
						sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
						sbQuery.append(",");
						sbQuery.append(SQL.INSTR + "(");
							sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
							sbQuery.append(",':') + 1");
					sbQuery.append(")");	//substr end
*/					
				}else{
					sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
					
				}
				
				//sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
				sbQuery.append(")");

				sbQuery.append(SQL.AS + groupAlias);				
				sbQuery.append(SQL.UNDERSCORE + dsMap.get("TABLE"));
				sbQuery.append(SQL.UNDERSCORE + dsMap.get("COLUMN"));
				sbQuery.append(SQL.UNDERSCORE + String.valueOf(dsMap.get("ORDER")));
				
			}
			
		}
		
		return sbQuery.toString();
	}
	
	/**
	 * 연구항목(조회조건:C) 컬럼의 기준일자를 반환한다.
	 * @param dsMap
	 * @return
	 */
	public static String getColumnsForCBaseDate(String groupAlias, Map<String,String> dsMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.SEPERATE + SQL.TAB2 + ",");
		
		sbQuery.append(SQL.MIN + "(");
			sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
		sbQuery.append(")");
		
		sbQuery.append(SQL.AS + groupAlias);				
		sbQuery.append(SQL.UNDERSCORE + dsMap.get("TABLE"));
		sbQuery.append(SQL.UNDERSCORE + dsMap.get("COLUMN"));
		sbQuery.append(SQL.UNDERSCORE + "DT");
		sbQuery.append(SQL.UNDERSCORE + String.valueOf(dsMap.get("ORDER")));
		
		return sbQuery.toString();
		
	}
	

	public static String getColumnPeriodAliasMain(Map<String,String> periodMap, List<String> periodColumnList) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		if(periodColumnList.size() == 0){
			return sbQuery.toString();
		}
		
		
	//	반복주기 일자컬럼 추가
		String periodColumns = "";
    	String tmpParentheses = "";
    	
		for(int i = periodColumnList.size()-1; i >= 0; i--){
			String periodColumns1 = (String)periodColumnList.get(i);
			String periodColumns2 = "";
			
    		if(i > 0){
    			periodColumns2 = (String)periodColumnList.get(i-1);
    		}
    		
    		if(StringUtils.isEmpty(periodColumns)){
    			if(periodColumnList.size() == 1){
    				periodColumns = periodColumns1;
    				break;
    			}else{
    				//periodColumns = "IFNULL(";
    				periodColumns = SQL.NVL + "(";    				
	    			periodColumns += periodColumns1;
    			}
				
			}else{
				if(i == 0){
					periodColumns += periodColumns2 + "," + periodColumns1;
					
				}else{
					periodColumns = SQL.NVL + "(";    				
	    			periodColumns += periodColumns1;
					//periodColumns += "," + "IFNULL(" + periodColumns1;	
				}
			}
    		
    		if(i > 0){
    			tmpParentheses += ")";
    		}
		}
		
		periodColumns += tmpParentheses;
		
		sbQuery.append(SQL.SEPERATE);
		sbQuery.append(SQL.MIN + "(");
		sbQuery.append(periodColumns);
		sbQuery.append(")");
		sbQuery.append(SQL.AS);
		sbQuery.append(SQLSelectClause.getColumnPeriodAlias(periodMap, "", "_", "", true));
		
		return sbQuery.toString();
	}
	
	public static String getColumnPeriodAlias(Map<String,String> dsMap, String groupAlias, String delimiter, String extra, boolean orderYn) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		if(!StringUtils.isEmpty(groupAlias)){
			sbQuery.append(groupAlias);
			sbQuery.append(delimiter);
		}
		
		sbQuery.append(dsMap.get("TABLE") + delimiter + dsMap.get("COLUMN"));
		
		if(!StringUtils.isEmpty(extra)){
			sbQuery.append(delimiter);
			sbQuery.append(extra);
		}
		
		if(orderYn){
			sbQuery.append(delimiter);
			sbQuery.append(String.valueOf(dsMap.get("ORDER")));
		}
		
		return sbQuery.toString();
	}
	
	/**
	 * 연구항목 컬럼을 반환한다.
	 * @param dsMap
	 * @return
	 */
	public static String getColumns(String prefix, Map<String,String> dsMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.SEPERATE);
		sbQuery.append(SQL.TAB2);
		sbQuery.append(",");
		
		if("OR".equals(dsMap.get("AND_OR")) || StringUtils.isNull(dsMap.get("AND_OR"))){
			//미내원
			if("ORDDD".equals(dsMap.get("COLUMN"))){
				sbQuery.append(SQL.MAX + "(");
			}else{
				sbQuery.append(SQL.MIN + "(");
			}
			
		}else{
			sbQuery.append(SQL.MAX + "(");
			
		}
		
	//	사업장, 팝업여부가 Y이면 사업장코드를 같이 반환	
		if("Y".equals(dsMap.get("INSTCD_YN")) && "Y".equals(dsMap.get("POPUP_YN"))){
			sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			sbQuery.append(" || '-(' ||  ");
			sbQuery.append(dsMap.get("TABLE") + ".INSTCD");
			sbQuery.append(" || ')' ");
			
		}else{
			sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("COLUMN"));
			
		}
		
		sbQuery.append(") AS ");
		sbQuery.append(prefix + "_");
		sbQuery.append(dsMap.get("TABLE") + "_");
		sbQuery.append(dsMap.get("COLUMN") + "_");
		sbQuery.append(String.valueOf(dsMap.get("ORDER")));
		
		return sbQuery.toString();
		
	}
	
	/**
	 * 연구항목 컬럼을 반환한다.
	 * @param dsMap
	 * @return
	 */
	public static String getColumnsForBaseDate(String prefix, Map<String,String> dsMap) throws Exception{
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.SEPERATE);
		sbQuery.append(SQL.TAB2);
		sbQuery.append(",");
		
		if("OR".equals(dsMap.get("AND_OR")) || StringUtils.isNull(dsMap.get("AND_OR"))){
			sbQuery.append("MIN(");
			
		}else{
			sbQuery.append("MAX(");
			
		}
		
		sbQuery.append(dsMap.get("TABLE") + "." + dsMap.get("BASE_DT_COLUMN"));
		
		sbQuery.append(") AS ");
		
		
	//	AS &_DT_	
		sbQuery.append(prefix);
		sbQuery.append("_");
		sbQuery.append(dsMap.get("TABLE"));
		sbQuery.append("_");
		sbQuery.append(dsMap.get("BASE_DT_COLUMN"));
		sbQuery.append("_DT_");
		sbQuery.append(String.valueOf(dsMap.get("ORDER")));
		
		//sbQuery.append("_" + (SQL.COLUMN_CNT - 1));	
		
		return sbQuery.toString();
		
	}
	
	
	/**
	 * 연구항목 컬럼값을 리턴한다. 
	 * 단면연구,사례대조 연구항목 컬럼값
	 * @param prefix : 컬럼 Alias
	 * @param dsMap : 연구항목
	 * @return
	 * @throws Exception
	 */
	public String getColumnsForR(String prefix, Map<String,String> dsMap) throws Exception{
		return SQLSelectClauseR.getColumnsForR(prefix, dsMap);
	}
	
	
	
	/**
	 * 연구항목 기준일자 컬럼
	 * 단면연구,사례대조 연구항목 기준일자 컬럼값
	 * @param prefix
	 * @param dsMap
	 * @return
	 * @throws Exception
	 */
	public String getColumnsForRBaseDate(String prefix, Map<String,String> dsMap) throws Exception{
		return SQLSelectClauseR.getColumnsForRBaseDate(prefix, dsMap);
		
		
	}
	
	/**
	 * 연구항목 컬럼값을 리턴한다.
	 * 코호트 연구항목 컬럼값
	 * @param prefix
	 * @param dsMap
	 * @return
	 */
	public String getColumnsForRCohort(String prefix, Map<String,String> dsMap){
		return SQLSelectClauseRCohort.getColumnsForRCohort(prefix, dsMap);
	}
	
	
	/**
	 * 코호트연구항목 Column
	 * @param prefix
	 * @param dsMap
	 * @return
	 */
	public String getColumnsForRCohortBaseDate(String prefix, Map<String,String> dsMap){
		return SQLSelectClauseRCohort.getColumnsForRCohortBaseDate(prefix, dsMap);
	}
	
	
	/**
	 * 코호트연구항목 Column
	 * @param prefix
	 * @param dsMap
	 * @return
	 */
	public static String getColumnsForRCohortVirtual(String prefix, Map<String,String> dsMap){
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.SEPERATE);
		sbQuery.append(SQL.TAB2);
		sbQuery.append(",");
		
		if("NUM".equals(dsMap.get("ITEM_TYPE"))){
			sbQuery.append(SQL.CAST + "(" + SQL.NULL + SQL.AS + " INT) ");	
		}else if("DAT".equals(dsMap.get("ITEM_TYPE"))){
			//2018-09-11 추가
			if("date".equals(dsMap.get("DATA_TYPE"))) {
				sbQuery.append(SQL.CAST + "(" + SQL.NULL + SQL.AS + " DATE) ");
			}else {
				sbQuery.append(SQL.CAST + "(" + SQL.NULL + SQL.AS + " TIMESTAMP) ");
			}
				
		}else{
			sbQuery.append(SQL.NULL + SQL.AS);
		}
		sbQuery.append(prefix);
		sbQuery.append("_");
		sbQuery.append(dsMap.get("TABLE"));
		sbQuery.append("_");
		sbQuery.append(dsMap.get("COLUMN"));
		sbQuery.append("_");
		sbQuery.append(String.valueOf(dsMap.get("ORDER")));
		
		return sbQuery.toString();
	}
	
	
	
	
	
	/**
	 * 코호트연구항목 Column
	 * @param prefix
	 * @param dsMap
	 * @return
	 */
	@SuppressWarnings({"rawtypes","unused"})
	public static String getColumnsForRCohortAggBaseDateVirtual(String prefix, Map<String,String> dsMap){
		StringBuffer sbQuery = new StringBuffer();
		
		sbQuery.append(SQL.SEPERATE);
		sbQuery.append(SQL.TAB2);
		sbQuery.append(",");
		sbQuery.append(SQL.CAST + "(" + SQL.NULL + SQL.AS + " DATE)");	
		
		sbQuery.append(SQL.AS);
		sbQuery.append(prefix);
		sbQuery.append("_");
		sbQuery.append(dsMap.get("TABLE"));
		sbQuery.append("_");
		sbQuery.append(dsMap.get("BASE_DT_COLUMN"));
		sbQuery.append("_DT_");
		sbQuery.append(String.valueOf(dsMap.get("ORDER")));
		
		return sbQuery.toString();
	}
	
	
	/**
	 * 
	 * @param methCd : 연구구분
	 * @param tabCd : 연구항목구분
	 * @param prefix
	 * @param dsMap
	 * @param isBaseDtYn
	 * @return
	 */
	@SuppressWarnings({"unused","cast",})
	public static Map<String,String> getDataFieldMap(String methCd, String tabCd, String prefix, Map<String,String> dsMap, boolean isBaseDtYn){
		Map<String,String> resultMap = new HashMap<String,String>();
				
		String itemSeq = "";
		String table = "";
		String column = "";
		String tableComment = "";
		String columnComment = "";
		String order = "";
		String itemType = "";
		String dataType = "";
		
		String dataFieldId = "";
		String dataFieldNm = "";
		
		itemSeq 		= String.valueOf(dsMap.get("ITEM_SEQ"));
		table 			= dsMap.get("TABLE");
		column 			= dsMap.get("COLUMN");
		tableComment 	= dsMap.get("TABLE_COMMENT");
		columnComment 	= dsMap.get("COLUMN_COMMENT");
		order 			= String.valueOf(dsMap.get("ORDER"));
		
	//	기준일자여부	
		if(isBaseDtYn){
			itemType = "DAT";
			dataType = dsMap.get("BASE_DT_DATA_TYPE");
			
			dataFieldId = prefix + "_" + dsMap.get("TABLE") + "_" + dsMap.get("BASE_DT_COLUMN") + "_DT_" + order;
						
			if("R".equals(tabCd)){
				if("Y".equals(QueryVO.gvHeaderWithItemNmYn)){
					dataFieldNm = dsMap.get("COLUMN_COMMENT");
					dataFieldNm += SQL.UNDERSCORE;
					dataFieldNm += dsMap.get("ITEM_TEXT");
					dataFieldNm += SQL.UNDERSCORE;
					dataFieldNm += "기준일자";
					
					
				}else{
					dataFieldNm += dsMap.get("ITEM_TEXT");
					dataFieldNm += SQL.UNDERSCORE;
					dataFieldNm += "기준일자";
				}
				
				
			}else{
				dataFieldNm = dsMap.get("TABLE_COMMENT");
				dataFieldNm += SQL.UNDERSCORE;
				dataFieldNm += dsMap.get("COLUMN_COMMENT");
				dataFieldNm += SQL.UNDERSCORE;
				dataFieldNm += order;				
			}
			
		}else{
			itemType = dsMap.get("ITEM_TYPE");
			dataType = dsMap.get("DATA_TYPE");
			
			dataFieldId = prefix + "_" + dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_" + order;
			
			if("R".equals(tabCd)){
				if("Y".equals(QueryVO.gvHeaderWithItemNmYn)){
					dataFieldNm = dsMap.get("COLUMN_COMMENT");
					dataFieldNm += SQL.UNDERSCORE;
					dataFieldNm += dsMap.get("ITEM_TEXT");
										
				}else{
					dataFieldNm += dsMap.get("ITEM_TEXT");
					
				}
				
			}else{
				dataFieldNm = dsMap.get("TABLE_COMMENT");
				dataFieldNm += SQL.UNDERSCORE;
				dataFieldNm += dsMap.get("COLUMN_COMMENT");
				dataFieldNm += SQL.UNDERSCORE;
				dataFieldNm += order;
				
				
			}
		}
		
		resultMap.put("METH_CD"					,methCd);
		resultMap.put("TAB_CD"					,tabCd);
		resultMap.put("ITEM_TYPE"				,itemType);
		resultMap.put("DATA_TYPE"				,dataType);
		resultMap.put("ITEM_SEQ"				,String.valueOf(dsMap.get("ITEM_SEQ")));
		resultMap.put("DISP_COLUMN"				,dataFieldId);
		resultMap.put("DISP_COLUMN_COMMENT"		,dataFieldNm);
		resultMap.put("HIDDEN_YN"	    		,"N");
		
		return resultMap;
		
	}
	
	
	
	/**
	 * 코호트연구항목 주기
	 * @param methCd
	 * @param tabCd
	 * @param prefix
	 * @param dsMap
	 * @param isBaseDtYn
	 * @param j
	 * @return
	 */
	public static Map<String,String> getDataFieldPeriodMap(String methCd, String tabCd, String prefix, Map<String,String> dsMap, boolean isBaseDtYn, int j){
		Map<String,String> resultMap = new HashMap<String,String>();
		
		
		String itemSeq = "";
		String table = "";
		String column = "";
		String tableComment = "";
		String columnComment = "";
		String order = "";
		String itemType = "";
		String dataType = "";
		
		String dataFieldId = "";
		String dataFieldNm = "";
		
		itemSeq 		= String.valueOf(dsMap.get("ITEM_SEQ"));
		table 			= dsMap.get("TABLE");
		column 			= dsMap.get("COLUMN");
		tableComment 	= dsMap.get("TABLE_COMMENT");
		columnComment 	= dsMap.get("COLUMN_COMMENT");
		order 			= String.valueOf(dsMap.get("ORDER"));
		
	//	기준일자여부	
		if(isBaseDtYn){
			itemType = "DAT";
			dataType = "date";
			
			dataFieldId = prefix + "_" + dsMap.get("TABLE") + "_" + dsMap.get("BASE_DT_COLUMN") + "_DT_" + order;
			dataFieldNm = dsMap.get("COLUMN_COMMENT") + "_" + dsMap.get("ITEM_TEXT") + "_기준일자_주기" + j;
			
		}else{
			itemType = dsMap.get("ITEM_TYPE");
			dataType = dsMap.get("DATA_TYPE");
			
			dataFieldId = prefix + "_" + dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_" + order;
			dataFieldNm = dsMap.get("COLUMN_COMMENT") + "_" + dsMap.get("ITEM_TEXT") + "_주기" + j;
		}
		
		
		resultMap.put("METH_CD"					,methCd);
		resultMap.put("TAB_CD"					,tabCd);
		resultMap.put("ITEM_TYPE"				,itemType);
		resultMap.put("DATA_TYPE"				,dataType);
		resultMap.put("ITEM_SEQ"				,String.valueOf(dsMap.get("ITEM_SEQ")));
		resultMap.put("DISP_COLUMN"				,dataFieldId);
		resultMap.put("DISP_COLUMN_COMMENT"		,dataFieldNm);
		resultMap.put("HIDDEN_YN"	    		,"N");
		
		return resultMap;
		
	}
	
	
	
	
	/**
	 * 코호트연구에서 Aggregation을 전체로 했을경우 컬럼을 Hidden하기 위한 메소드
	 * @param prefix
	 * @param dsMap
	 * @param isBaseDtYn
	 * @return
	 */
	public static Map<String,String> getDataFieldVirtualMap(String prefix, Map<String,String> dsMap, boolean isBaseDtYn){
		Map<String,String> resultMap = new HashMap<String,String>();
		
		if( isBaseDtYn){
			resultMap.put("ITEM_TYPE"			    ,"DAT");
			resultMap.put("DATA_TYPE"			    ,"date");
			resultMap.put("ITEM_SEQ"			    ,String.valueOf(dsMap.get("ITEM_SEQ")));
			resultMap.put("DISP_COLUMN"			    ,prefix + "_" + dsMap.get("TABLE") + "_" + dsMap.get("BASE_DT_COLUMN") + "_DT_" + String.valueOf(dsMap.get("ORDER")));
			
			
			if("Y".equals(QueryVO.gvHeaderWithItemNmYn)){
				resultMap.put("DISP_COLUMN_COMMENT"	    ,dsMap.get("TABLE_COMMENT") + "_" + dsMap.get("COLUMN_COMMENT") + "_기준일자_" + String.valueOf(dsMap.get("ORDER")));	
			}else{
				resultMap.put("DISP_COLUMN_COMMENT"	    ,dsMap.get("ITEM_TEXT") + "_기준일자");
			}
			
			resultMap.put("HIDDEN_YN"	    		,"Y");
			
		}else{
			resultMap.put("ITEM_TYPE"				,dsMap.get("ITEM_TYPE"));
			resultMap.put("DATA_TYPE"				,dsMap.get("DATA_TYPE"));
			resultMap.put("ITEM_SEQ"				,String.valueOf(dsMap.get("ITEM_SEQ")));
			resultMap.put("DISP_COLUMN"				,prefix + "_" + dsMap.get("TABLE") + "_" + dsMap.get("COLUMN") + "_" + String.valueOf(dsMap.get("ORDER")));
			
			if("Y".equals(QueryVO.gvHeaderWithItemNmYn)){
				resultMap.put("DISP_COLUMN_COMMENT"		,dsMap.get("COLUMN_COMMENT") + "_" + dsMap.get("ITEM_TEXT") + "_" + String.valueOf(dsMap.get("ORDER")));	
			}else{
				resultMap.put("DISP_COLUMN_COMMENT"		,dsMap.get("ITEM_TEXT"));
			}
			
			resultMap.put("HIDDEN_YN"	    		,"Y");
			
		}
		
		return resultMap;
		
	}
	

}
