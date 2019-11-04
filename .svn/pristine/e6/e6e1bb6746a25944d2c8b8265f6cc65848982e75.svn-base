package com.softcen.bigcen.med.common.except;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.main.service.ILogAccessService;
import com.softcen.bigcen.med.utils.StringUtils;

@Controller
public class ExceptionController extends BigcenMedAbstractController{
	@Autowired
	private ILogAccessService logAccessService;
	
	
	@RequestMapping(value = "/error/error404")
	public String error404(Locale locale, HttpServletRequest request, HttpServletResponse response, HttpSession session) {
		return "/error/error404.tiles";

	}
	
	
	@RequestMapping(value = "/error/error415")
	public String error415(Locale locale, HttpServletRequest request, HttpServletResponse response, HttpSession session, Model model) {
		Exception exception = (Exception)request.getAttribute("javax.servlet.error.exception");
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		PrintStream pinrtStream = new PrintStream(out);
		
		model.addAttribute("msg", request.getAttribute("javax.servlet.error.exception"));
		
		exception.printStackTrace(pinrtStream);
		
		String strTraceMsg = out.toString();
		
		model.addAttribute("trace", strTraceMsg);
		
		
	//	Error log	
		Map<Object,Object> errorLogMap = new HashMap<Object,Object>();
		
		errorLogMap.put("TYPE", "E");
		errorLogMap.put("REQUEST_URL", request.getRequestURI());
		errorLogMap.put("PER_CODE", request.getSession().getAttribute("PER_CODE"));
		errorLogMap.put("ACCESS_IP", StringUtils.nvl(request.getRemoteAddr(), ""));
		errorLogMap.put("MESSAGE", strTraceMsg);
		
		logAccessService.insertLogAccess(errorLogMap);
		
		return "/error/error415.tiles";

	}
	
	@RequestMapping(value = "/error/error500")
	public String error500(Locale locale, HttpServletRequest request, HttpServletResponse response, HttpSession session, Model model) {
		Exception exception = (Exception)request.getAttribute("javax.servlet.error.exception");
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		PrintStream pinrtStream = new PrintStream(out);
		
		model.addAttribute("status_code", request.getAttribute("javax.servlet.error.status_code"));
		model.addAttribute("exception_type", request.getAttribute("javax.servlet.error.exception_type"));
		model.addAttribute("message", request.getAttribute("javax.servlet.error.message"));
		model.addAttribute("request_uri", request.getAttribute("javax.servlet.error.request_uri"));
		model.addAttribute("servlet_name", request.getAttribute("javax.servlet.error.servlet_name"));
		model.addAttribute("msg", request.getAttribute("javax.servlet.error.exception"));
		
		exception.printStackTrace(pinrtStream);
		
		String strTraceMsg = out.toString();
		
		model.addAttribute("trace", strTraceMsg);
		
		
	//	Error log	
		Map<Object,Object> errorLogMap = new HashMap<Object,Object>();
		
		errorLogMap.put("TYPE", "E");
		errorLogMap.put("REQUEST_URL", request.getAttribute("javax.servlet.error.request_uri"));
		errorLogMap.put("PER_CODE", request.getSession().getAttribute("PER_CODE"));
		errorLogMap.put("ACCESS_IP", StringUtils.nvl(request.getRemoteAddr(), ""));
		errorLogMap.put("MESSAGE", strTraceMsg);
		
		logAccessService.insertLogAccess(errorLogMap);
		
		
	//	Ajax처리	
		if("true".equals(request.getHeader("isAjax"))){
			try{
				PrintWriter out2 = response.getWriter();
				out2.println(strTraceMsg.replaceAll("<br />", "\n"));
				return "";
				
			}catch(IOException ie){
				return "";
			}
			
		}else{
			return "/error/error500.tiles";
		}

	}
	
	
}
