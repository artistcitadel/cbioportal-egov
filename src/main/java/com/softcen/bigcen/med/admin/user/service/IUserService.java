package com.softcen.bigcen.med.admin.user.service;

import java.util.List;
import java.util.Map;

public interface IUserService {
	/**
	 * 사용자 정보 목록
	 * @param paramMap
	 * @return
	 */
	public Object selectPerinxList(Map<Object, Object> paramMap);
	
	/**
	 * 비밀번호 변경
	 * @param paramMap
	 * @return
	 */
	public Object updatePerinx(Map<Object, Object> paramMap);
	
	
	/**
	 * 비번 초기화(일괄)
	 * @param paramMap
	 * @return
	 */
	public Object initPassword(Map<Object, Object> paramMap);
	
	

}
