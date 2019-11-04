package com.softcen.bigcen.med.admin.commonCode.service;

import java.util.Map;

/**
 * 관리자 > 공통코드 관리 를 담당하는 Interface 
 * @author RedEye
 *
 */
public interface ICommonCodeMgmtService {
	/**
	 * 그룹코드 목록 조회
	 * @param paramMap
	 * @return
	 */
	public Object selectGroupCodeList(Map<Object, Object> paramMap);
	/**
	 * 코드관리에서 사용 할 그룹코드 조회
	 * @param paramMap
	 * @return
	 */
	public Object codeGroupCodeList(Map<Object, Object> paramMap);
	/**
	 * 그룹코드 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertGroupCode(Map<Object,Object> paramMap);

	/**
	 * 그룹코드 수정
	 * @param paramMap
	 * @return
	 */
	public Object updateGroupCode(Map<Object,Object> paramMap);
	
	/**
	 * 그룹코드 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteGroupCode(Map<Object,Object> paramMap);
	
	/**
	 * 코드 목록 조회
	 * @param paramMap
	 * @return
	 */
	public Object selectCodeList(Map<Object, Object> paramMap);
	
	/**
	 * 코드 순서 조회
	 * @param paramMap
	 * @return
	 */
	public Object codeOrderList(Map<Object, Object> paramMap);
	
	/**
	 * 코드 등록
	 * @param paramMap
	 * @return
	 */
	public Object insertCode(Map<Object,Object> paramMap);

	/**
	 * 코드 수정
	 * @param paramMap
	 * @return
	 */
	public Object updateCode(Map<Object,Object> paramMap);

	/**
	 * 코드 삭제
	 * @param paramMap
	 * @return
	 */
	public Object deleteCode(Map<Object,Object> paramMap);
}
