package com.softcen.bigcen.med.research.visualize.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.research.visualize.dao.VisualizeDAO;

@Service(value="visualizeService")
public class VisualizeServiceImpl extends BigcenMedAbstractServiceImpl implements IVisualizeService {
	@Autowired(required = false)
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private VisualizeDAO visualizeDAO;

	@Override
	public Map<String, Object> selectReportId() throws Exception {
		return visualizeDAO.selectReportId();
	}

	@Override
	public Map<String, Object> selectOlapMgmt(Map<String, Object> reportMap) throws Exception {
		return visualizeDAO.selectOlapMgmt(reportMap);
	}

	@SuppressWarnings("rawtypes")
	@Override
	public void createTableForVisualize(Map<String, Object> paramMap) throws Exception {
		List existTableList = visualizeDAO.selectExistTableList(paramMap);
		if (existTableList.size() != 0) {
			visualizeDAO.dropTableForVisualize(paramMap);
			System.out.println("drop the table");
		}

		visualizeDAO.createTableForVisualize(paramMap);
	}

	/**
	 * OLAP_ID 생성
	 * @return
	 */
	@Override
	public Map<String, Object> getOlapId() {
		Map<String, Object> reportMap = new HashMap<String, Object>();
		// 사용중인(했던) OLAP_ID 리스트 조회
		List<Map<String, Object>> idList = visualizeDAO.selectUseIdList();
		List<Map<String, Object>> olapInfoList = visualizeDAO.selectOlapInfoList();
		if(idList != null && idList.size() > 0){
			if(idList.size() == olapInfoList.size()){
				// 개수가 동일하다면 메시지 출력을 위해 아무 동작도 하지 않는다
				// 오래전에 사용했던 OLAP_ID 조회 (메세지 출력을 위해 주석 처리)
//				 reportMap = visualizeDAO.selectReportId();
//				System.out.println("오래전에 사용했던 OLAP_ID 조회 >> "+reportMap.toString());
			}else{
				// 중복제거
				for (int i = 0; i < olapInfoList.size(); i++) {
					for (int j = 0; j < idList.size(); j++) {
		                if (olapInfoList.get(i).get("OLAP_ID").equals((idList.get(j).get("OLAP_ID")))) {
		                	olapInfoList.remove(i);
		                }
					}
	            }
				// 사용하지 않는 OLAP_ID 조회
				reportMap = olapInfoList.get(0);
				System.out.println("사용하지 않는 OLAP_ID 조회 >> "+reportMap.toString());
			}
		}else{
			// OLAP 정보테이블에서 첫번째 OLAP_ID 설정
			reportMap = olapInfoList.get(0);
			System.out.println("OLAP_ID 생성 >> " + reportMap.toString());
		}
		
		return reportMap;
	}
	
	
}
