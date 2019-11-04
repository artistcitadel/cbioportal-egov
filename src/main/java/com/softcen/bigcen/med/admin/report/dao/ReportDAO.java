package com.softcen.bigcen.med.admin.report.dao;

import java.sql.SQLException;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;


@Repository("reportDAO")
public class ReportDAO extends BigcenMedAbstractMapperDAO{
	
	public Object saveReportCate(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.insert("report.saveReportCate", paramMap);
		
	}
	
	public Object selectReportCateList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("report.selectReportCateList", paramMap);
		
	}
	
	
	public Object saveReportPage(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.insert("report.saveReportPage", paramMap);
		
	}
	
	public Object selectReportPageList(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.selectList("report.selectReportPageList", paramMap);
		
	}
	
	
	public Object deleteReportCate(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.delete("report.deleteReportCate", paramMap);
		
	}
	
	public Object deleteReportPageCateByCateCode(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.delete("report.deleteReportPageByCateCode", paramMap);
		
	}
	
	
	public Object deleteReportPage(Map<Object,Object> paramMap) throws SQLException{
		return sqlSession.delete("report.deleteReportPage", paramMap);
		
	}
	

}
