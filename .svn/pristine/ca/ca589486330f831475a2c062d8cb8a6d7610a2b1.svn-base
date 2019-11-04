package com.softcen.bigcen.med.admin.report.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.admin.report.service.IReportService;
import com.softcen.bigcen.med.utils.PropertiesUtils;

@Controller
@RequestMapping(value="/admin/report")
public class ReportController extends BigcenMedAbstractController{
	@Autowired
	private IReportService reportService;
	
	
	@RequestMapping(value="/reportMain")
	public String reportMgmtMain(){
		logger.debug("[--- reportMgmtMain START ");
		return "/admin/reportMgmt.tiles";
	}
	
	@ResponseBody
	@RequestMapping(value="/selectReportCateList")
	public Object selectReportCateList(@RequestBody Map<Object,Object> paramMap, HttpServletRequest request, HttpServletResponse response, Model model){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug(">>>>" + paramMap.toString());
			
			request.getSession().setAttribute("SITE_CODE",PropertiesUtils.getString("SITE_CODE"));
			String SITE_CODE = PropertiesUtils.getString("SITE_CODE");
			model.addAttribute("SITE_CODE", PropertiesUtils.getString("SITE_CODE")); 
			
			resultMap.put("dsReportCateList",reportService.selectReportCateList(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException se){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", se.getMessage());
			throw new RuntimeException(se);
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/saveReportCate")
	public Object saveReportCate(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug(">>>>" + paramMap.toString());
			
			reportService.saveReportCate(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException se){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", se.getMessage());
			throw new RuntimeException(se);
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/selectReportPageList")
	public Object selectReportPageList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug(">>>>" + paramMap.toString());
			
			resultMap.put("dsReportPageList",reportService.selectReportPageList(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException se){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", se.getMessage());
			throw new RuntimeException(se);
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/saveReportPage")
	public Object saveReportPage(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[---- saveReportPage START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			reportService.saveReportPage(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException se){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", se.getMessage());
			throw new RuntimeException(se);
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/deleteReportCate")
	public Object deleteReportCate(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[---- deleteReportCate START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			reportService.deleteReportCate(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException se){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", se.getMessage());
			throw new RuntimeException(se);
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/deleteReportPage")
	public Object deleteReportPage(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[---- deleteReportPage START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			reportService.deleteReportPage(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException se){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", se.getMessage());
			throw new RuntimeException(se);
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}

}
