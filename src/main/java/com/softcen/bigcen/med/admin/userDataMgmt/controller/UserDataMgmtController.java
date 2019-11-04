package com.softcen.bigcen.med.admin.userDataMgmt.controller;

import java.util.HashMap;
import java.util.Map;

import javax.management.RuntimeErrorException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.admin.board.service.IBoardMgmtService;
import com.softcen.bigcen.med.admin.userDataMgmt.service.IUserDataMgmtService;

@Controller
@RequestMapping(value="/admin/userDataMgmt")
public class UserDataMgmtController extends BigcenMedAbstractController{
	
	private static final Logger logger = LoggerFactory.getLogger(UserDataMgmtController.class);
	
	@Autowired
	private IUserDataMgmtService userDataMgmtService;
	
	
	@RequestMapping(value="/userDataMgmtMain")
	public String userDataMgmt(){
		return "/admin/userDataMgmt.tiles";
	}
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getUserDataList")
	public Object getUserDataList(@RequestBody Map<String,Object> paramMap){
		
		resultMap = new HashMap<Object,Object>();
		try{
			resultMap = (HashMap)userDataMgmtService.selectUserDataList(paramMap);
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/removeUserDataList")
	public Object removeUserDataList(@RequestBody Map<String,Object> paramMap){
		
		resultMap = new HashMap<Object,Object>();
		try{
			Thread.sleep(300);
			
			userDataMgmtService.deleteUserData(paramMap);
			
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getUserDataTableSize")
	public synchronized Object getUserDataTableSize(@RequestBody Map<String,Object> paramMap){
		
		resultMap = new HashMap<Object,Object>();
		try{
			resultMap.put("TABLE_SIZE", userDataMgmtService.selectUserDataTableSize(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	

}
