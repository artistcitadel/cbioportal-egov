package com.softcen.bigcen.med.admin.report.service;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

public interface IReportService {
	@Transactional(readOnly=false)
	public Object saveReportCate(Map<Object,Object> paramMap) throws SQLException;
	
	@Transactional(readOnly=true)
	public Object selectReportCateList(@RequestBody Map<Object,Object> paramMap) throws SQLException;
	
	@Transactional(readOnly=false)
	public Object saveReportPage(Map<Object,Object> paramMap) throws SQLException;
	
	
	public Object selectReportPageList(Map<Object,Object> paramMap) throws SQLException;
	
	
	/**
	 * 정형보고서 분류정보 삭제
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object deleteReportCate(Map<Object,Object> paramMap) throws SQLException;
	
	/**
	 * 정형보고서 페이지 삭제
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object deleteReportPage(Map<Object,Object> paramMap) throws SQLException;

}
