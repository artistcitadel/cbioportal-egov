package com.softcen.bigcen.med.admin.commonCode.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.admin.commonCode.dao.CommonCodeMgmtDAO;

/**
 * 관리자 > 공통코드 관리 를 담당하는 Service 
 * @author RedEye
 *
 */
@Service(value="commonCodeMgmtService")
public class CommonCodeMgmtServiceImpl extends BigcenMedAbstractServiceImpl implements ICommonCodeMgmtService {
	@Autowired
	private CommonCodeMgmtDAO codeMgmtDAO;
	
	/**
	 * 그룹코드 목록 조회
	 */
	@Override
	public Object selectGroupCodeList(Map<Object, Object> paramMap) {
		int nTotalCnt = 0;
		
		nTotalCnt = (Integer)codeMgmtDAO.selectGroupCodeCount(paramMap);
		
		paramMap.put("start", Integer.valueOf(0));
		paramMap.put("length", nTotalCnt);
		resultMap.put("data", codeMgmtDAO.selectGroupCodeList(paramMap));
		
		/*if(paramMap.get("draw") == null){
			
			
		}else{
			resultMap.put("draw", paramMap.get("draw"));
			resultMap.put("recordsTotal", nTotalCnt);
			resultMap.put("recordsFiltered", nTotalCnt);
			resultMap.put("data", codeMgmtDAO.selectGroupCodeList(paramMap));
		}*/
		
		return resultMap;
	}
	/**
	 * 코드관리에서 사용 할 그룹코드 조회
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object codeGroupCodeList(Map<Object, Object> paramMap) {
		resultMap.put("data", codeMgmtDAO.codeGroupCodeList(paramMap));
		return resultMap;
	}

	/**
	 * 그룹코드 등록
	 */
	@Override
	public Object insertGroupCode(Map<Object, Object> paramMap) {
		return codeMgmtDAO.insertGroupCode(paramMap);
	}
	
	/**
	 * 그룹코드 수정
	 */
	@Override
	public Object updateGroupCode(Map<Object, Object> paramMap) {
		return codeMgmtDAO.updateGroupCode(paramMap);
	}

	/**
	 * 그룹코드 삭제
	 */
	@Override
	public Object deleteGroupCode(Map<Object, Object> paramMap) {
		// 그룹코드 삭제 시 관련된 코드 리스트 삭제
		codeMgmtDAO.deleteCodeList(paramMap);
		// 그룹코드 삭제 
		return codeMgmtDAO.deleteGroupCode(paramMap);
	}

	/**
	 * 코드 목록 조회
	 */
	@Override
	public Object selectCodeList(Map<Object, Object> paramMap) {
		int nTotalCnt = 0;
		
		nTotalCnt = (Integer)codeMgmtDAO.selectCodeCount(paramMap);
		
		if(paramMap.get("draw") == null){
			paramMap.put("start", Integer.valueOf(1));
			paramMap.put("length", nTotalCnt);
			resultMap.put("data", codeMgmtDAO.selectCodeList(paramMap));
			
		}else{
			resultMap.put("draw", paramMap.get("draw"));
			resultMap.put("recordsTotal", nTotalCnt);
			resultMap.put("recordsFiltered", nTotalCnt);
			resultMap.put("data", codeMgmtDAO.selectCodeList(paramMap));
		}
		
		return resultMap;
	}

	/**
	 * 코드 순서 조회
	 */
	@Override
	public Object codeOrderList(Map<Object, Object> paramMap) {
		List<Map<Object, Object>> list = codeMgmtDAO.codeOrderList(paramMap);
		if(list.size() <= 0){
			resultMap.put("maxSort", "1");
		}else{
			Object max =  list.get(list.size()-1).get("SORT");
			max = Integer.valueOf(String.valueOf(max)) + 1;
			resultMap.put("maxSort", max);
		}
		
		return resultMap;
	}
	
	/**
	 * 코드 등록
	 */
	@Override
	public Object insertCode(Map<Object, Object> paramMap) {
		return codeMgmtDAO.insertCode(paramMap);
	}

	/**
	 * 코드 수정
	 */
	@Override
	public Object updateCode(Map<Object, Object> paramMap) {
		// 바뀔 SORT 번호
		codeMgmtDAO.updateChangeCode(paramMap);
		// 자기 SORT 번호
		return codeMgmtDAO.updateCode(paramMap);
	}

	/**
	 * 코드 삭제
	 */
	@Override
	public Object deleteCode(Map<Object, Object> paramMap) {
		return codeMgmtDAO.deleteCode(paramMap);
	}

}
