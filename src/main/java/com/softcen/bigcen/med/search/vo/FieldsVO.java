package com.softcen.bigcen.med.search.vo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class FieldsVO {
	public static String PATNO              = "";
	public static String INSTNM             = "";
	public static String FRM_DEPT_NM        = "";
	public static String FRM_REC_DEPT_NM    = "";
	public static String FRM_REC_USER_NM    = "";
	public static String FRM_DISP_USER_INFO = "";
	public static String REC_DATE           = "";
	public static String FRM_CD             = "";
	public static String FRM_NM             = "";
	public static String FRM_CONTS          = "";
	public static String PRE_TAGS           = "";
	public static String POST_TAGS          = "";
	
	public FieldsVO(){}
	
	/**
	 * 검색필드 설정
	 * @param searchVO
	 */
	public static void assignFields(SearchVO searchVO){
		List<Map<Object,Object>> fieldsList = new ArrayList();
		
		fieldsList = searchVO.getFieldsList();
		
		for (Map<Object,Object> map : fieldsList) {
			String key = String.valueOf(map.get("VALUE"));
			String fields = String.valueOf(map.get("COMM_CD_DESC"));
			
			if("PATNO".equals(key)){
				FieldsVO.PATNO = fields;
				
			}else if("INSTNM".equals(key)){
				FieldsVO.INSTNM = fields;
				
			}else if("FRM_DEPT_NM".equals(key)){
				FieldsVO.FRM_DEPT_NM = fields;
				
			}else if("FRM_REC_DEPT_NM".equals(key)){
				FieldsVO.FRM_REC_DEPT_NM = fields;
				
			}else if("FRM_REC_USER_NM".equals(key)){
				FieldsVO.FRM_REC_USER_NM = fields;
				
			}else if("FRM_DISP_USER_INFO".equals(key)){
				FieldsVO.FRM_DISP_USER_INFO = fields;
				
			}else if("REC_DATE".equals(key)){
				FieldsVO.REC_DATE = fields;
				
			}else if("FRM_CD".equals(key)){
				FieldsVO.FRM_CD = fields;
				
			}else if("FRM_NM".equals(key)){
				FieldsVO.FRM_NM = fields;
				
			}else if("FRM_CONTS".equals(key)){
				FieldsVO.FRM_CONTS = fields;
				
			}else if("PRE_TAGS".equals(key)){
				FieldsVO.PRE_TAGS = fields;
				
			}else if("POST_TAGS".equals(key)){
				FieldsVO.POST_TAGS = fields;
				
			}
		}
	}
	
}
