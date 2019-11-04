package com.softcen.bigcen.med.main.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.main.dao.LoginDAO;
import com.softcen.bigcen.med.utils.BigcenSecurityUtils;


@Service(value="liginService")
public class LoginServiceImpl implements ILoginService{
	
	@Autowired
	private LoginDAO loginDAO;
	
	public Object selectPerinx(Map<Object, Object> paramMap){
		Map<Object, Object> resultMap = (Map<Object, Object>)loginDAO.selectPerinx(paramMap);
		return resultMap;
	}
	
	public Object changePerPass(Map<Object, Object> paramMap){
		//Map<Object, Object> resultMap = (Map<Object, Object>)loginDAO.changePerPass(paramMap);
		return loginDAO.changePerPass(paramMap);
	}

	
	@Override
	public void updateUserPassword(Map paramMap) throws Exception {
		// TODO Auto-generated method stub
		String str = ((String)paramMap.get("str")).trim();
		//String strDecrypted = UUHScrty.decrypt(str);
		String strDecrypted = BigcenSecurityUtils.decrypt(str);

		String strPerCode = BigcenSecurityUtils.getUserId(strDecrypted);
		String strPerPass = BigcenSecurityUtils.getPassword(strDecrypted);
		
		paramMap.clear();
		paramMap.put("perCode", strPerCode);
		paramMap.put("perPass", strPerPass);
		
		loginDAO.updateUserPassword(paramMap);
	}
	
	
	/**
	 * 경북대 - 최초 로그인 FLAG 값 업데이트
	 */
	@Override
	public Object firstFlagUpdate(Map<Object, Object> paramMap) {
		return loginDAO.firstFlagUpdate(paramMap);
	}
}
