package com.softcen.bigcen.med.admin.join.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.admin.join.dao.JoinMgmtDAO;

/**
 * 관리자 > JOIN 관리 를 담당하는 Service 
 * @author RedEye
 *
 */
@Service(value="joinMgmtService")
public class JoinMgmtServiceImpl extends BigcenMedAbstractServiceImpl implements IJoinMgmtService {
	@Autowired
	private JoinMgmtDAO joinMgmtDAO;
	
	/**
	 * 연구항목 관리 항목 조회
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object selectMgmtItemList(Map<Object, Object> paramMap) {
		// UI Select 구분 값
		resultMap.put("TARGET_ITEM", paramMap.get("TARGET_ITEM"));
		resultMap.put("data", joinMgmtDAO.selectMgmtItemList(paramMap));
		return resultMap;
	}

	/**
	 * 연구항목 조회 관리 항목 조회
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object selectJoinItemList(Map<Object, Object> paramMap) {
		// UI Select 구분 값
		resultMap.put("TARGET_ITEM", paramMap.get("TARGET_ITEM"));
		resultMap.put("data", joinMgmtDAO.selectJoinItemList(paramMap));
		return resultMap;
	}
	
	/**
	 * 연구항목 조인 관리 목록 조회
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object selectJoinList(Map<Object, Object> paramMap) {
		int nTotalCnt = 0;
		
		nTotalCnt = (Integer)joinMgmtDAO.selectJoinCount(paramMap);
		
		if(paramMap.get("draw") == null){
			paramMap.put("start", Integer.valueOf(1));
			paramMap.put("length", nTotalCnt);
			resultMap.put("data", joinMgmtDAO.selectJoinList(paramMap));
			
		}else{
			resultMap.put("draw", paramMap.get("draw"));
			resultMap.put("recordsTotal", nTotalCnt);
			resultMap.put("recordsFiltered", nTotalCnt);
			resultMap.put("data", joinMgmtDAO.selectJoinList(paramMap));
		}
		
		return resultMap;
	}

	/**
	 * 연구항목 조인 관리 목록 등록
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object insertJoin(Map<Object, Object> paramMap) {
		int insertCnt = 0;
		// 중복체크
		int cnt = (Integer) joinMgmtDAO.insertJoinCheck(paramMap);
		// 등록
		if(cnt == 0){
			insertCnt = (Integer) joinMgmtDAO.insertJoin(paramMap);
		}
		return insertCnt;
	}

	/**
	 * 연구항목 조인 관리 목록 삭제
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object deleteJoin(Map<Object, Object> paramMap) {
		return joinMgmtDAO.deleteJoin(paramMap);
	}

}
