package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.List;

public class SQL {
	public static final String SEPERATE 	= "\n";
	public static final String TAB1 		= "\t";
	public static final String TAB2 		= "\t\t";
	public static final String TAB3 		= "\t\t\t";
	
	public static final String SELECT 		= " SELECT ";
	public static final String DELETE 		= " DELETE ";
	public static final String INSERT_INTO 	= " INSERT INTO ";
	public static final String VALUES 		= " VALUES ";
	public static final String DISTINCT		= " DISTINCT ";
	public static final String AS 			= " AS ";
	public static final String CONCAT 		= " || ";
	public static final String FROM 		= " FROM ";
	public static final String WHERE 		= " WHERE ";
	public static final String JOIN 		= " JOIN ";
	public static final String LEFT_OUTER_JOIN 		= " LEFT OUTER JOIN ";
	public static final String GROUP_BY 	= " GROUP BY ";
	public static final String ORDER_BY 	= " ORDER BY ";
	public static final String UNION 		= " UNION ";
	public static final String UNION_ALL 	= " UNION ALL ";
	public static final String ON 			= " ON ";
	public static final String BLANK 			= " ";
	public static final String IS_NULL 		= " IS NULL ";
	public static final String IS_NOT_NULL 		= " IS NOT NULL ";

	public static final String DUAL 		= " DUAL ";
	public static final String SYSIBM_SYSDUMMY1 		= " SYSIBM.SYSDUMMY1 ";
	
	public static final String NULL 		= " NULL ";
	public static final String BETWEEN 		= " BETWEEN ";
	public static final String EQUAL 		= " = ";
	public static final String NOT_EQUAL 	= " <> ";
	public static final String GREAT 		= " > ";
	public static final String LESS 		= " < ";
	public static final String GREATER_THAN_OR_EQUAL	= " >= ";
	public static final String LESS_THAN_OR_EQUAL		= " <= ";
	
	public static final String AND 			= " AND ";
	public static final String OR 			= " OR ";
	public static final String LIKE 		= " LIKE ";
	public static final String NOT_LIKE 	= " NOT LIKE ";
	public static final String ILIKE 		= " ILIKE ";
	public static final String NOT_ILIKE 	= " NOT ILIKE ";
	public static final String REGEXP_LIKE 	= " REGEXP_LIKE ";
	public static final String REGEXP_NOT_LIKE 	= " REGEXP_NOT_LIKE ";
	public static final String IN 			= " IN ";
	public static final String NOT_IN 		= " NOT IN ";
	public static final String CREATE 		= " CREATE ";
	public static final String DROP 		= " DROP ";
	public static final String TABLE 		= " TABLE ";
	public static final String LEAST 		= " LEAST ";
	public static final String GREATEST 	= " GREATEST ";
	public static final String WITH 		= " WITH ";
	public static final String ABS 			= " ABS ";
	public static final String SUBSTR 		= " SUBSTR ";
	public static final String SUBSTRING 	= " SUBSTRING ";
	public static final String MIN 			= " MIN ";
	public static final String MAX 			= " MAX ";
	public static final String SUM 			= " SUM ";
	public static final String AVG 			= " AVG ";
	public static final String CAST 		= " CAST ";
	public static final String CASE_WHEN 	= " CASE WHEN ";
	public static final String THEN 		= " THEN ";
	public static final String ELSE 		= " ELSE ";
	public static final String END 			= " END ";
	public static final String NVL 			= " NVL ";
	public static final String UPPER 		= " UPPER ";
	public static final String EXISTS 		= " EXISTS ";
	public static final String NOT_EXISTS 	= " NOT EXISTS ";
	public static final String COALESCE 	= " COALESCE ";
	public static final String INSTR 		= " INSTR ";
	
	public static final String CLOB 	= " CLOB ";
	public static final String DATE 	= " DATE ";
	public static final String NUMERIC 	= " NUMERIC ";
	
	
	
	//date format
	public static final String YYYY_MM_DD 	= "YYYY-MM-DD";
	public static final String YYYY_MM_DD_HH24_MI_SS 	= "YYYY-MM-DD HH24:MI:SS";
	
	//Vertica
	public static final String VERTICA = "VERTICA";
	public static final String TO_CHAR = " TO_CHAR ";
	public static final String TO_DATE = " TO_DATE ";
	public static final String DATEDIFF = " DATEDIFF ";
	public static final String DAY = "DAY";
	public static final String VARCHAR = " VARCHAR ";
	
	
	//DB2BLU
	public static final String DB2BLU 		= "DB2BLU";
	public static final String VARCHAR_FORMAT = " VARCHAR_FORMAT ";
	public static final String LPAD = " LPAD ";
	public static final String RPAD = " RPAD ";
	public static final String YEAR = " YEAR ";
	public static final String DAYS = " DAYS ";
	public static final String TO_NCHAR = " TO_NCHAR ";
	public static final String LONG_VARCHAR = " LONG VARCHAR ";
	
	
	//ITEM_TYPE
	public static final String NUM = "NUM";
	public static final String DAT = "DAT";
	public static final String TEX = "TEX";
	public static final String COD = "COD";
	public static final String TIMESTAMP = "TIMESTAMP";
	
	public static final String INSTCD 		= " INSTCD ";
	public static final String UNDERSCORE 	= "_";
	
	
	public static final String CASE_WHEN_VALUE 	= "CASE_WHEN_THEN_VALUE";
	

}
