package com.softcen.bigcen.med.admin.user.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.admin.user.dao.UserDAO;
import com.softcen.bigcen.med.utils.BigcenSecurityUtils;
import com.softcen.bigcen.med.utils.PropertiesUtils;

@Service(value="userService")
public class UserServiceImpl extends BigcenMedAbstractServiceImpl implements IUserService{
	@Autowired
	private UserDAO userDAO;
	
	/**
	 * 
	 */
	public Object selectPerinxList(Map<Object, Object> paramMap){
		int nTotalCnt = 0;
		
		nTotalCnt = (Integer)userDAO.selectPerinxCount(paramMap);
		
		if(paramMap.get("draw") == null){
			paramMap.put("start", Integer.valueOf(1));
			paramMap.put("length", nTotalCnt);
			resultMap.put("data", userDAO.selectPerinxList(paramMap));
			
		}else{
			resultMap.put("draw", paramMap.get("draw"));
			resultMap.put("recordsTotal", nTotalCnt);
			resultMap.put("recordsFiltered", nTotalCnt);
			resultMap.put("data", userDAO.selectPerinxList(paramMap));
		}
		
		
		
		return resultMap;
	}
	
	
	/**
	 * 사용자정보 수정
	 */
	public Object updatePerinx(Map<Object, Object> paramMap){
		try{
			String id = "";
			String password = "";
			String encryptPassword = "";
			
			id =  paramMap.get("PER_CODE").toString();
			password = paramMap.get("PER_PASS").toString();
			

		//	암호조합방식에 따른 분기	
			if("PWD".equals(PropertiesUtils.getTargetString("PWD.ENCRYPT_STRING"))){
				encryptPassword = BigcenSecurityUtils.encryptPassword(password);
				
			}else{
				encryptPassword = BigcenSecurityUtils.encryptPassword(password, id);
				
			}
			paramMap.put("PER_PASS", encryptPassword);
			
			userDAO.updatePerinx(paramMap);
			
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}
		return 0;
	}
	
	
	
	/**
	 * 사용자정보 수정
	 */
	public Object initPassword(Map<Object, Object> paramMap){
		try{
			String strPrefix = "@knuh";
			List perinxList = new ArrayList();

			//사용자 정보 조회
			perinxList = userDAO.selectPerinxAllList(paramMap);
			
			for(int i=0; i < perinxList.size(); i++){
				Map<String,String> dsMap = (HashMap)perinxList.get(i);
				
				String password = strPrefix + dsMap.get("PER_CODE");
				String encryptPassword = password;
				
				encryptPassword = BigcenSecurityUtils.encryptPassword(encryptPassword);
				
				Map<Object,Object> paramMap2 = new HashMap();
				paramMap2.put("PER_CODE", dsMap.get("PER_CODE"));
				paramMap2.put("PER_PASS", encryptPassword);
				paramMap2.put("UDT_ID", paramMap.get("UDT_ID"));
				
				userDAO.updatePerinx(paramMap2);
				
			}
			
		}catch(Exception ex){
			throw new RuntimeException(ex);
		}
		return 0;
	}
	

}
