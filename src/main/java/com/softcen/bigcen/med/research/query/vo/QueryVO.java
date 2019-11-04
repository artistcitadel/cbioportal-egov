package com.softcen.bigcen.med.research.query.vo;

/**
 * 연구조회에서 사용하는 전역변수 정보
 * @author user
 *
 */

public class QueryVO {
	public static final String LOG_SYMBOL = "[--- BIG-CEN MED2 LOG ---] : ";
	
	public static String gvDbType = "";				//DB유형
	public static String gvSchema = "";				//스키마
	public static String gvPatSbstNo = "";			//환자대체번호
	public static String gvPatId = "";				//환자번호
	public static String gvTablePtPatMst = "";		//환자마스터테이블
	public static String gvBirthYmd = "";			//생년월일컬럼
	public static String gvBaseDtTimestampYn = "";	//타임스탬프적용여부
	public static String gvSearchYn = "";
	
	public static String gvDeathYnColumn = "";		//사망여부컬럼
	public static String gvTreatQualYnColumn = "";	//수신자격여부컬럼
	public static String gvNoVisitColumn = "";		//미내원컬럼
	public static String gvDoCodeColumn = "";		//처방코드컬럼
	
	public static String gvDeathYnBaseDtColumn = "";		//사망여부 기준일자 컬럼 
	public static String gvTreatQualYnBaseDtColumn = "";	//수신자격여부 기준일자 컬럼
	public static String gvNoVisitBaseDtColumn = "";		//미내원컬럼
	public static String gvDoCodeBaseDtColumn = "";			//처방코드컬럼
	
	public static String gvMethCd = "";				//연구방법
	public static String gvTabCd = "";				//연구방법-그리드(조회조건,연구항목,조회조건,생존분석...)
	public static String gvHeaderWithItemNmYn = "";	//연구항목헤더 항목명 출력여부
	
	
	public static final int DATA_TYPE_LENGTH = 3000;
	public static final int CAST_SIZE = 32000;
	
	
}
