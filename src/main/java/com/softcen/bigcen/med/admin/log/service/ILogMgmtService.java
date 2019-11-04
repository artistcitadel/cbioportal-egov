package com.softcen.bigcen.med.admin.log.service;

import java.util.List;
import java.util.Map;

public interface ILogMgmtService {
	
	/**
	 * 로그 정보 목록
	 * @param paramMap
	 * @return
	 */
	public Object selectWebLogList(Map<Object, Object> paramMap);
	
	public Object selectEtlLogList(Map<Object, Object> paramMap) throws Exception;

}
