package com.softcen.bigcen.med.admin.join.service;

import java.util.Map;

/**
 * 관리자 > JOIN 관리 를 담당하는 interface 
 * @author RedEye
 *
 */
public interface IJoinMgmtService {
	/**
	 * 연구항목  관리 항목 조회
	 * @param paramMap
	 * @return
	 */
	public Object selectMgmtItemList(Map<Object, Object> paramMap);
	
	/**
	 * 연구항목 조인 관리 항목 조회
	 * @param paramMap
	 * @return
	 */
	public Object selectJoinItemList(Map<Object, Object> paramMap);
	
	/**
	 * 연구항목 조인 관리 목록 조회
	 * @param paramMap
	 * @return
	 */
	public Object selectJoinList(Map<Object, Object> paramMap);
	
	/**
	 * 연구항목 조인 관리 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertJoin(Map<Object, Object> paramMap);
	
	/**
	 * 연구항목 조인 관리 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteJoin(Map<Object, Object> paramMap);
	
}
