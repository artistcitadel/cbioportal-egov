package com.softcen.bigcen.med.admin.report.service;

import java.sql.SQLException;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.softcen.bigcen.med.admin.report.dao.ReportDAO;

@Transactional(readOnly=true)
@Service("reportService")
public class ReportServiceImpl implements IReportService{
	@Inject ReportDAO reportDAO;
	
	@Transactional(readOnly=true)
	public Object selectReportCateList(Map<Object,Object> paramMap) throws SQLException{
		return reportDAO.selectReportCateList(paramMap);
	}
	
	@Transactional(readOnly=false)
	public Object saveReportCate(Map<Object,Object> paramMap) throws SQLException{
		return reportDAO.saveReportCate(paramMap);
		
	}
	
	@Transactional(readOnly=false)
	public Object saveReportPage(Map<Object,Object> paramMap) throws SQLException{
		return reportDAO.saveReportPage(paramMap);
		
	}
	
	
	public Object selectReportPageList(Map<Object,Object> paramMap) throws SQLException{
		return reportDAO.selectReportPageList(paramMap);
		
	}
	
	

	/**
	 * 정형보고서 분류정보 삭제
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object deleteReportCate(Map<Object,Object> paramMap) throws SQLException{
		int ret = 0;
		
		ret = (Integer)reportDAO.deleteReportPageCateByCateCode(paramMap);
		
		if(ret < 0){
			throw new RuntimeException("보고서 페이지 삭제 오류");
			
		}
		
		ret = (Integer)reportDAO.deleteReportCate(paramMap);
		
		return ret;
		
		
	}
	
	/**
	 * 정형보고서 페이지 삭제
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object deleteReportPage(Map<Object,Object> paramMap) throws SQLException{
		return reportDAO.deleteReportPage(paramMap);
		
	}
	

	
	

}
