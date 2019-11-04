package com.softcen.bigcen.med.research.crssec.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.admin.researchItem.service.IResearchItemService;
import com.softcen.bigcen.med.research.crssec.dao.CrossSectionalStudyDAO;
import com.softcen.bigcen.med.research.query.sql.builder.CrssecStudy;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;


@Service("crossSectionalStudyService")
public class CrossSectionalStudyServiceImpl extends BigcenMedAbstractServiceImpl implements ICrossSectionalStudyService{
	@Autowired
	private CrossSectionalStudyDAO crossSectionalStudyDAO;
	
	@Autowired
	private IResearchItemService researchItemService;
	
	@Autowired
	private CrssecStudy csStudy;
	
	
	/**
	 * 단면연구 환자선택 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes", "cast","unchecked"})
	public Object searchPatientSearchList(Map<Object,Object> paramMap) throws SQLException,Exception{
		Map outputMap = new HashMap();
		List<Object> outputList = new ArrayList<Object>();
		StringBuffer sbQuery = new StringBuffer();
		
		List<Map<String,String>> periodList = (ArrayList)paramMap.get("dsPeriodList");
		
		csStudy.setModelMap(paramMap);
		csStudy.init();
		
		if(periodList.size() == 0){
			sbQuery.append(csStudy.getQueryForWithMain(new HashMap<String,String>()));
			sbQuery.append(",");
			sbQuery.append(csStudy.getQueryForWithRdt());
			sbQuery.append(csStudy.getQueryForMain(1));
			
			outputMap = csStudy.getResultList(sbQuery.toString(), 1, paramMap);
			outputMap.put("dsMetaDataList", csStudy.getDataFields());
			
			outputList.add(outputMap);
			
		}else{
			for(int i=0; i < periodList.size(); i++){
				sbQuery = new StringBuffer();
				
				Map<String,String> periodMap = (HashMap<String,String>)periodList.get(i);

				sbQuery.append(csStudy.getQueryForWithMain(periodMap));
				sbQuery.append(",");
				sbQuery.append(csStudy.getQueryForWithRdt());
				sbQuery.append(csStudy.getQueryForMain(i+1));
				
				outputMap = csStudy.getResultList(sbQuery.toString(), (i+1), paramMap);
				outputMap.put("dsMetaDataList", csStudy.getDataFields());
				
				outputList.add(outputMap);
				
				csStudy.removeDataFields();
			}
		}
		
		
		csStudy.updateItemMgmtSearchCnt(paramMap);
		
		return outputList;
	}
	
	/**
	 * 단면연구항목대상 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","unchecked","rawtypes"})
	public Object searchStudyItemTargetList(Map<Object,Object> paramMap) throws Exception{
		Map outputMap = new HashMap();
		List<Object> outputList = new ArrayList<Object>();
		StringBuffer sbQuery = new StringBuffer();
		
		List<Map<String,String>> periodList = (ArrayList)paramMap.get("dsPeriodList");
		
		csStudy.setModelMap(paramMap);
		csStudy.init();
		
		if(periodList.size() == 0){
			sbQuery.append(csStudy.getQueryForWithMain(new HashMap<String,String>()));
			sbQuery.append(",");
			sbQuery.append(csStudy.getQueryForWithRdt());
			sbQuery.append(",");
			sbQuery.append(csStudy.getQueryForWithR());
			sbQuery.append(csStudy.getQueryForMain(1));
			
			outputMap = csStudy.getResultList(sbQuery.toString(), 1, paramMap);
			outputMap.put("dsMetaDataList", csStudy.getDataFields());
			
			outputList.add(outputMap);
			
			
		}else{
			for(int i=0; i < periodList.size(); i++){
				sbQuery = new StringBuffer();
				
				Map<String,String> periodMap = (HashMap<String,String>)periodList.get(i);
				sbQuery.append(csStudy.getQueryForWithMain(periodMap));
				sbQuery.append(",");
				sbQuery.append(csStudy.getQueryForWithRdt());
				sbQuery.append(",");
				sbQuery.append(csStudy.getQueryForWithR());		//연구항목
				sbQuery.append(csStudy.getQueryForMain(i+1));
				
				
				csStudy.queryResultTableList = new ArrayList();
				
				outputMap = csStudy.getResultList(sbQuery.toString(), (i+1), paramMap);
				outputMap.put("dsMetaDataList", csStudy.getDataFields());
				
				outputList.add(outputMap);
				csStudy.removeDataFields();
			}
		}
		
		csStudy.updateItemMgmtSearchCnt(paramMap);
		
		return outputList;
		
	}
	
	
	
	
	public Object selectDataColumnList(Map<Object,Object> paramMap) throws Exception{
		return crossSectionalStudyDAO.selectDataColumnList(paramMap);
		
	}
	public Object selectRegexSearchDataList(Map<Object,Object> paramMap) throws Exception{
		return crossSectionalStudyDAO.selectRegexSearchDataList(paramMap);
	}
	
	
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public Object selectDataResultList(Map<Object,Object> paramMap) throws Exception{
		Map resultMap = new HashMap();
		
		List list = (ArrayList)crossSectionalStudyDAO.selectDataResulPeriodtList(paramMap);
		
		Map rsMap2 = new HashMap();
		List dataList = new ArrayList();
		
		for(int i=0; i < list.size(); i++){
			Map rsMap = (HashMap)list.get(i);
			
			paramMap.put("PERIOD_CD", rsMap.get("PERIOD_CD"));
			
			List dsList = (ArrayList)crossSectionalStudyDAO.selectDataResultList(paramMap);
			
			rsMap2 = new HashMap();
			rsMap2.put("dsPeriodNm", rsMap.get("PERIOD_CD"));
			rsMap2.put("dsList", dsList);
			rsMap2.put("dsCount", dsList.size());
			
			dataList.add(rsMap2);
			
		}
		
		resultMap.put("dsDataResultPeriodList", list);
		resultMap.put("dsDataResultList", dataList);
		
		
		return resultMap;
		
	}
	
	
	/*
	public Object selectItemMgmtList(Map<Object,Object> paramMap) throws SQLException{
		return researchItemService.selectItemMgmtList(paramMap);
	}
	*/
	
}
