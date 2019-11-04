package com.softcen.bigcen.med.admin.user.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.admin.user.service.IUserService;
import com.softcen.bigcen.med.utils.PropertiesUtils;

@Controller
@RequestMapping(value="/admin/user")
public class UserController extends BigcenMedAbstractController{
	
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private IUserService userService;
		
	@RequestMapping(value="/main")
	public String main(){
		logger.debug("[--- START USER MAIN");
		return "/admin/user.tiles";
	}
	
	
	@ResponseBody
	@RequestMapping(value="/userList")
	public Object selectUserList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START userList");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap = (HashMap)userService.selectPerinxList(paramMap);
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/changePassword")
	public Object changePassword(@RequestBody Map<Object,Object> paramMap, HttpServletRequest request){
		logger.debug("[--- START changePassword");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
		//	암호조합방식에 따른 분기	(경북대)
			if("PWD".equals(PropertiesUtils.getTargetString("PWD.ENCRYPT_STRING"))){
				if(!"Y".equals(paramMap.get("ADMIN_YN"))){
					paramMap.put("HOSPITAL_CODE", request.getSession().getAttribute("HOSPITAL_CODE"));	
				}
				
				
			}
			userService.updatePerinx(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/initPassword")
	public Object initPassword(@RequestBody Map<Object,Object> paramMap, HttpServletRequest request){
		logger.debug("[--- START changePassword");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
		//	암호조합방식에 따른 분기	(경북대)
			if("PWD".equals(PropertiesUtils.getTargetString("PWD.ENCRYPT_STRING"))){
				if(!"Y".equals(paramMap.get("ADMIN_YN"))){
					paramMap.put("HOSPITAL_CODE", request.getSession().getAttribute("HOSPITAL_CODE"));	
				}
				
				
			}
			userService.initPassword(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	

}
