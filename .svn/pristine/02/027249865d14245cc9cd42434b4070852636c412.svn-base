package com.softcen.bigcen.med.common.intercept;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.log4j.MDC;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.softcen.bigcen.med.main.service.ILogAccessService;
import com.softcen.bigcen.med.utils.StringUtils;

public class LoginInterceptor extends HandlerInterceptorAdapter implements HttpSessionListener{
	private static final Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);
	
	@Autowired
	private ILogAccessService logAccessService;
	
	/**
	 * 모든 요청전에 실행
	 */
	@Override
	public boolean preHandle(HttpServletRequest request
							,HttpServletResponse response
							,Object handler) throws Exception{
		logger.debug("[--- preHandle START");
		logger.debug("[--- PER_CODE : " + request.getSession().getAttribute("PER_CODE"));
		logger.debug("[--- CONTEXT : " + request.getRequestURI());
		logger.debug("[--- getContextPath : " + request.getContextPath());
		
		Map<Object, Object> paramLogAccessMap = new HashMap<Object, Object>();
		
		String redirectUrl = "";
		String requestUrl = "";
		String isAjax = "";
		
		isAjax = request.getHeader("isAjax");
		requestUrl = request.getRequestURI();
		
	//	세션값이 NULL이면 return false...	
		if("true".equals(isAjax)){
			if(StringUtils.isNull(request.getHeader("PER_CODE"))){
				response.setHeader("REQUIRED_AUTH", "-1");
				return true;
			}
			
		}
		
		
		
		
		if( StringUtils.isNull(request.getSession().getAttribute("PER_CODE"))){
			if("true".equals(isAjax)){
				response.setHeader("REQUIRED_AUTH", "-1");
				return true;
				
			}else{
				logger.debug(">>> PER_CODE IS NULL");
				redirectUrl = request.getContextPath();
				redirectUrl += "/";
				redirectUrl += "login/loginForm";
				response.sendRedirect(redirectUrl);
				return false;	
			}
			
			
		}
		
		if(StringUtils.isNull(isAjax)){
			List menuList = (ArrayList)request.getSession().getAttribute("MNUINX");
			
			for(int i=0; i < menuList.size(); i++){
				Map<String,Object> dsMap = (HashMap)menuList.get(i);
				
				if(requestUrl.indexOf(String.valueOf(dsMap.get("MENU_URL"))) >= 0){
					Integer chkVal = (Integer)dsMap.get("CHKVAL");
					
					if(chkVal == 0){
						String referer = request.getHeader("referer");
						
						if(referer.indexOf("loginRequest") >= 0){
							referer = request.getContextPath() + "/dashboard/main";
						}

						response.sendRedirect(referer);
						return false;
					}
				}
			}
		}
		
		
		if(!StringUtils.isNull(request.getSession().getAttribute("PER_CODE"))){
			paramLogAccessMap.put("TYPE", "P");
			paramLogAccessMap.put("REQUEST_URL", request.getRequestURI());
			paramLogAccessMap.put("PER_CODE", request.getSession().getAttribute("PER_CODE"));
			paramLogAccessMap.put("ACCESS_IP", StringUtils.nvl(request.getRemoteAddr(), ""));
			
			logAccessService.insertLogAccess(paramLogAccessMap);
		}
		
		String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("Proxy-Client-IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("WL-Proxy-Client-IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("HTTP_CLIENT_IP"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
        } 
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
            ip = request.getRemoteAddr(); 
        }
		
		MDC.put("ClientIP", ip);
		
		return true;
		
	}
	
	/**
	 * 모든 요청이 완료된 후 실행
	 */
	@Override
	public void postHandle( HttpServletRequest request,
							HttpServletResponse response,
							Object handler,
							ModelAndView modelAndView) throws Exception {
		String strSeq = "";
		String strUpperSeq = "";
		String strClass = "";
		
		strClass = request.getRequestURI();
		
		int indexPos = strClass.indexOf("/",2);
		
		strClass = strClass.substring(indexPos+1, strClass.length());
		strClass = strClass.replaceAll("/", "_");
		
		strSeq = StringUtils.nvl(request.getParameter("SEQ"), "");
		strUpperSeq = StringUtils.nvl(request.getParameter("UPPER_SEQ"), "");
		
		request.setAttribute("SEQ", strSeq);
		request.setAttribute("UPPER_SEQ", strUpperSeq);
		request.setAttribute("MENU_CLASS", strClass);
	}
	
	
	public void sessionCreated(HttpSessionEvent hse) {
		logger.debug("sessionCreated");
	}

	private String endPage(){
		logger.debug("ksks>>> endPage");
		return "login/loginForm";
	}
	
	public void sessionDestroyed(HttpSessionEvent hse) {
		logger.debug("sessionDestroyed");
		endPage();
	}

}
