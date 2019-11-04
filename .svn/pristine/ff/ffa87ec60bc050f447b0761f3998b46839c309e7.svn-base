package com.softcen.bigcen.med.research.chartReview.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.research.chartReview.dao.ChartReviewDAO;

@Service("chartReviewService")
public class ChartReviewServiceImpl extends BigcenMedAbstractServiceImpl implements IChartReviewService{
	@Autowired
	private ChartReviewDAO chartReviewDAO;
	
	@Override
	public Object selectMySaveList(Map<Object, Object> paramMap){
		/*int nTotalCnt = 0;		
		
		nTotalCnt = (Integer)chartReviewDAO.selectMySaveCount(paramMap);
		
		resultMap.put("draw", paramMap.get("draw"));
		resultMap.put("recordsTotal", nTotalCnt);
		resultMap.put("recordsFiltered", nTotalCnt);
		resultMap.put("data", chartReviewDAO.selectMySaveList(paramMap));*/
		
		return chartReviewDAO.selectMySaveList(paramMap);
	}
	
	@Override
	public Object updateDataDel(Map<Object, Object> paramMap) {
		paramMap.put("GV_PAT_SBST_NO", GV_PAT_SBST_NO);
		return chartReviewDAO.updateDataDel(paramMap);
	}
	
	@Override
	public Object alterColumnAdd(Map<Object, Object> paramMap){
		int nTotalCnt = 0;	
		
	//	20170912 경북대 자동입력추가
		String uuid = String.valueOf(java.util.UUID.randomUUID());
		uuid = uuid.replaceAll("-","");
		
		paramMap.put("ColumnDB", "C_" + uuid);
		chartReviewDAO.alterColumnAdd(paramMap);
		
		nTotalCnt = (Integer)chartReviewDAO.insertDataColumn(paramMap);
		
		return resultMap;
	}
	
	@Override
	public Object alterColumnDel(Map<Object, Object> paramMap){
		int nTotalCnt = 0;	
		List list = (List)paramMap.get("columnId");
		
		for(int i=0; i < list.size(); i++){
			Map dsMap = new HashMap();
			
			dsMap.put("TABLE_ID", paramMap.get("TABLE_ID"));
			dsMap.put("columnId", list.get(i));
			
			chartReviewDAO.alterColumnDel(dsMap);
		}
		
		nTotalCnt = (Integer)chartReviewDAO.deleteDataColumn(paramMap);
		
		return resultMap;
	}
	
	@Override
	public Object updateDataVal(Map<Object, Object> paramMap) {
		paramMap.put("GV_PAT_SBST_NO", GV_PAT_SBST_NO);
		return chartReviewDAO.updateDataVal(paramMap);
	}
	
	
	@Override
	public Object selectPatId(Map<Object, Object> paramMap) {
		return chartReviewDAO.selectPatId(paramMap);
	}
	
}
