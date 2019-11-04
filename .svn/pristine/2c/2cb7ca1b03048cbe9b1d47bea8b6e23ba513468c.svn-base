package com.softcen.bigcen.med.rept.service;

import java.util.List;
import java.util.Map;

public interface IReptService {
	/**
	 * reportLeft.jsp에 보여질 항목 리스트를 불러오기 위한 쿼리문
	 * @see com.softcen.bigcen.med.rept.service.IReptService#selectReportMenuList(java.util.Map)
	 */
	public List<Object> selectReportMenuList(Map<Object, Object> paramMap);
	
	/**
	 * reportLeft.jsp에 보여질 항목 리스트를 불러오기 위한 쿼리문
	 * @see com.softcen.bigcen.med.rept.service.IReptService#selectReportMenuList(java.util.Map)
	 */
	public List<Object> selectRGReportMenuList(Map<Object, Object> paramMap);
	
	
	/**
	 * reportLeft.jsp에 보여질 세부 항목 리스트를 불러오기 위한 쿼리문
	 * @see com.softcen.bigcen.med.rept.service.IReptService#selectReportSubMenuList(java.util.Map)
	 */
	public List<Object> selectReportSubMenuList(Map<Object, Object> paramMap);
	
	/**
	 * 해당 항목의 seq에 맞는 tableau url을 얻기 위한 url, user id, target id 불러오는 쿼리문
	 * @param paramMap : 세부 항목의 시퀀스 값
	 * @return
	 */
	public List<Object> selectTableauInfo(Map<Object, Object> paramMap);
	
}
