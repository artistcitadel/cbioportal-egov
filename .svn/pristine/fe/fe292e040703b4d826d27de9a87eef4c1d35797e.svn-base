package com.softcen.bigcen.med.research.sharingconditions.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.research.sharingconditions.dao.SharingConditionsDAO;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * 조건공유 비즈니스 인터페이스 구현 클래스
 * @author user
 *
 */

@Service("iSharingConditionsService")
public class SharingConditionsServiceImpl extends BigcenMedAbstractServiceImpl implements ISharingConditionsService{
	@Autowired
	private SharingConditionsDAO sharingConditionsDAO;
	
	/**
	 * 조회조건명 중복체크 서비스
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@Override
	public Object chkDuplCondNmList(Map<String,Object> paramMap) throws Exception{
		return sharingConditionsDAO.chkDuplCondNmList(paramMap);
		
	}
	
	/**
	 * 연구항목 조건 저장,수정,삭제 처리
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@Override
	@SuppressWarnings({"cast","unused","rawtypes","unchecked"})
	public Object saveQueryConditions(Map<String,Object> paramMap) throws Exception{
		Map<String,Object> cloneMap	= paramMap;		//parameter 복제
		
		String mode 	= "";			//저장모드
		String shareCd 	= "";			//공유코드
		
		List dsItemContDetlList = new ArrayList();
				
		mode 	= String.valueOf(cloneMap.get("MODE"));
		shareCd = String.valueOf(cloneMap.get("SHARE_CD"));
		
		logger.debug("[-- saveQueryConditions START ");
		logger.debug("[-- MODE : " + mode);
		logger.debug("[-- SHARE : " + shareCd);
				
		//새이름으로 저장	
		if("C".equals(mode)){
			sharingConditionsDAO.insertItemCont(cloneMap);
			
			dsItemContDetlList = (ArrayList)cloneMap.get("dsItemContDetlList");
			
			for(int i=0; dsItemContDetlList != null && i < dsItemContDetlList.size(); i++){
				Map<String,Object> dsItemContDetl = (HashMap<String,Object>)dsItemContDetlList.get(i);
				
				dsItemContDetl.put("CONT_SEQ", cloneMap.get("SEQ"));
				
				sharingConditionsDAO.insertItemContDetl(dsItemContDetl);
				
			}
			
		//저장(기존 조건에 저장)		
		}else if("U".equals(mode)){
			sharingConditionsDAO.updateItemCont(cloneMap);
			
			dsItemContDetlList = (ArrayList)cloneMap.get("dsItemContDetlList");
			
			Map deleteMap = new HashMap();
			deleteMap.put("CONT_SEQ", cloneMap.get("SEQ"));
			
			sharingConditionsDAO.deleteItemContDetl(deleteMap);
			
			for(int i=0; dsItemContDetlList != null && i < dsItemContDetlList.size(); i++){
				Map<Object,Object> dsItemContDetl = (HashMap<Object,Object>)dsItemContDetlList.get(i);
				dsItemContDetl.put("CONT_SEQ", cloneMap.get("SEQ"));
				
				sharingConditionsDAO.updateItemContDetl(dsItemContDetl);
			}
			
		//삭제	
		}else if("D".equals(mode)){
			List<HashMap<String,String>> itemContDetlList = (ArrayList)cloneMap.get("dsItemContList");
			
		//	데이터삭제
			for(int i=0; i < itemContDetlList.size(); i++){
				Map<String,String> dsMap = itemContDetlList.get(i);
				
				if("Y".equals(dsMap.get("DATA_DEL_YN")) && !StringUtils.isNull(dsMap.get("DATA_SEQ"))){
					Map<Object,Object> dsParamMap = new HashMap();
					dsParamMap.put("SEARCH_ITEM_CONT_SEQ", dsMap.get("SEQ"));
					dsParamMap.put("SEARCH_DATA_ID", dsMap.get("DATA_SEQ"));
					
					Map dataMap = (HashMap)sharingConditionsDAO.selectItemContData(dsParamMap);
					Map tableExistMap = (HashMap)sharingConditionsDAO.selectDataResultTableCount(dataMap);
					
					if(Integer.valueOf(tableExistMap.get("CNT").toString()) > 0){
						StringBuffer sbQuery = new StringBuffer();
						
						sbQuery.append("DROP TABLE ");
						sbQuery.append(dataMap.get("TABLE_ID").toString());
						
						Map paramMap3 = new HashMap();
						paramMap3.put("QUERY", sbQuery.toString());
						
						sharingConditionsDAO.dropTableDataResult(paramMap3);
						
						
					}
					
					Map paramMap4 = new HashMap();
					Map paramMap5 = new HashMap();
					
					paramMap4.put("DATA_SEQ", dsMap.get("DATA_SEQ"));
					paramMap5.put("SEQ", dsMap.get("DATA_SEQ"));
					
					sharingConditionsDAO.deleteItemContDataDetl(paramMap4);
					sharingConditionsDAO.deleteItemContData(paramMap5);
				}
			}
			
		//	조건삭제	
			for(int i=0; i < itemContDetlList.size(); i++){
				Map<String,String> dsMap = itemContDetlList.get(i);
					
				if("N".equals(dsMap.get("DATA_DEL_YN"))){
					Map deleteMap = new HashMap();
					
					deleteMap = new HashMap();
					deleteMap.put("CONT_SEQ", dsMap.get("SEQ"));
					sharingConditionsDAO.deleteItemContDetl(deleteMap);
					
					deleteMap = new HashMap();
					deleteMap.put("SEQ", dsMap.get("SEQ"));
					sharingConditionsDAO.deleteItemCont(deleteMap);
					
				}
			}
		}
		
		return cloneMap.get("SEQ");
		
	}
	
	
	/**
	 * 조회조건 공유 처리
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@Transactional
	@SuppressWarnings({"cast","unchecked","unused","rawtypes"})
	public Object saveQueryConditionsSharing(Map<String,Object> paramMap) throws Exception{
		String strShareCd = "";
		Map cloneMap = paramMap;
		
		strShareCd = String.valueOf(paramMap.get("SHARE_CD"));
		
		try{
			if("A".equals(strShareCd) || "D".equals(strShareCd)){
				//1.연구조회조건 mst 저장
				sharingConditionsDAO.insertItemContShared(paramMap);
				cloneMap.put("SEQ", paramMap.get("SEQ"));
				
				sharingConditionsDAO.insertItemContDetlShared(paramMap);
				
			}else{
				List<Map<String,Object>> sharedUserList = (ArrayList)paramMap.get("SHARED_USER_LIST");
				
				for(int i=0; sharedUserList != null && i < sharedUserList.size(); i++){
					Map<String,Object> dsMap = (HashMap)sharedUserList.get(i);
					//paramMap.put("PER_CODE", dsMap.get("value"));
					paramMap.put("INSTCD", dsMap.get("INSTCD"));
					paramMap.put("PER_CODE", dsMap.get("PER_CODE"));	
					
					sharingConditionsDAO.insertItemContShared(paramMap);
					sharingConditionsDAO.insertItemContDetlShared(paramMap);
					
					
					logger.debug(QueryVO.LOG_SYMBOL + paramMap.toString());
					
				}
			}
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return cloneMap.get("SEQ");
		
	}
	
	
}
