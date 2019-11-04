package com.softcen.bigcen.med.admin.auth.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.admin.auth.dao.AuthDAO;

@Service(value="authService")
public class AuthServiceImpl implements IAuthService{
	
	private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);
	
	@Autowired
	private AuthDAO authDAO;
	
	
	public List selectAutinxList(Map<Object,Object> paramMap){
		return authDAO.selectAutinxList(paramMap);
	}
	
	public List selectPerAuthList(Map<Object,Object> paramMap){
		return authDAO.selectPerAuthList(paramMap);
		
	}
	
	public Object insertAuthinx(Map<Object,Object> paramMap){
		return authDAO.insertAuthinx(paramMap);
	}
	
	public Object updateAuthinx(Map<Object,Object> paramMap){
		return authDAO.updateAuthinx(paramMap);
	}
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	public Object deleteAuthinx(Map<Object,Object> paramMap) throws Exception{
		int ret = 0;
		
		try{
//			1.사용자별 권한삭제
			authDAO.deletePerAuth(paramMap);
			
		//	2.권한삭제
			authDAO.deleteAuthinx(paramMap);
			
			
		}catch(Exception e){
			throw new RuntimeException();
		}
		
		return ret;
		
		
	}
	
	public Object insertPerAuth(Map<Object,Object> paramMap){
		return authDAO.insertPerAuth(paramMap);
	}
	
	public Object deletePerAuth(Map<Object,Object> paramMap){
		return authDAO.deletePerAuth(paramMap);
		
		
	}

	
	public List selectMenuAuthList(Map<Object,Object> paramMap){
		return authDAO.selectMenuAuthList(paramMap);
		
	}
	
	public Object saveMenuAuth(Map<Object,Object> paramMap) throws Exception{
		List<Map> menuAuthList = (ArrayList)paramMap.get("MENU_AUTH_LIST");
		
		logger.debug(">>>" + menuAuthList.size());
		
		authDAO.deleteMenuAuth(paramMap);
		
		for(Map dsMap : menuAuthList){
			authDAO.insertMenuAuth(dsMap);
		}
		
		return 0;
		
	}
	
	public List selectReportMenuAuthList(Map<Object,Object> paramMap){
		return authDAO.selectReportMenuAuthList(paramMap);
		
	}
}
