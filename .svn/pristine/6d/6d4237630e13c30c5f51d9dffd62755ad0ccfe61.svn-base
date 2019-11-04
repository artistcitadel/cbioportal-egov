package com.softcen.bigcen.med.research.cohort.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.research.query.sql.builder.CohortStudy;
import com.softcen.bigcen.med.research.query.sql.helper.SQLUtils;
import com.softcen.bigcen.med.utils.StringUtils;

@Service("cohortService")
public class CohortServiceImpl extends BigcenMedAbstractServiceImpl implements ICohortService
{
	@Autowired
	private CohortStudy cohortStudy;
	
	/**
	 * 환자선택조회
	 */
	@SuppressWarnings("all")
	public Object searchPatientSearchList(Map<Object,Object> paramMap) throws Exception{
		Map outputMap = new HashMap();
		List<Object> outputList = new ArrayList<Object>();
		StringBuffer sbQuery = new StringBuffer();
		
		cohortStudy.setModelMap(paramMap);
		cohortStudy.init();
		
		sbQuery.append(cohortStudy.getQueryForWithMain(new HashMap()));
		sbQuery.append(",");
		sbQuery.append(cohortStudy.getQueryForWithRdt());
		sbQuery.append(cohortStudy.getQueryForMain(1));
		
		outputMap = cohortStudy.getResultList(sbQuery.toString(), 1, paramMap);
		outputMap.put("dsMetaDataList", cohortStudy.getDataFields());
		outputList.add(outputMap);
		
		cohortStudy.updateItemMgmtSearchCnt(paramMap);
		
		return outputList;
	}
	
	/**
	 * 코호트연구-연구항목조회
	 */
	@SuppressWarnings("all")
	public Object searchStudyItemTargetList(Map<Object,Object> paramMap) throws Exception{
		Map outputMap = new HashMap();
		List<Object> outputList = new ArrayList<Object>();
		StringBuffer sbQuery = new StringBuffer();
		
		cohortStudy.setModelMap(paramMap);
		cohortStudy.init();
		
		List dsItemList = (ArrayList)cohortStudy.modelMap.get("dsStudyItem");
		List dsAggNotAllItemList = SQLUtils.getStudyItemChort(dsItemList);				//연구항목이 ALL이 아닌것
		List dsAggAllItemList 	 = SQLUtils.getStudyItemChortAggAll(dsItemList);		//연구항목이 ALL
		
		logger.debug("ALL 제외 : " + dsAggNotAllItemList.size());
		logger.debug("ALL  : " + dsAggAllItemList.size());
		
		//연구항목 Aggregation != ALL	
		if(dsAggNotAllItemList.size() > 0){
			sbQuery.append(cohortStudy.getQueryForWithMain(new HashMap()));
			sbQuery.append(",");
			sbQuery.append(cohortStudy.getQueryForWithRdt());
			sbQuery.append(",");
			sbQuery.append(cohortStudy.getQueryForWithR());	//연구항목
			
		//	생존분석조회여부
			if("Y".equals(cohortStudy.modelMap.get("SURVIVE_FLAG_YN"))){
				String strEventQuery = "";
				String strCensoredDataQuery = "";
				
				strEventQuery = cohortStudy.getQueryForWithEvent();
				strCensoredDataQuery = cohortStudy.getQueryForWithCensoredData();
				
				if(!StringUtils.isEmpty(strEventQuery)){
					sbQuery.append(",");
					sbQuery.append(strEventQuery);			//생존분석 - 사건정의
				}
				
				if(!StringUtils.isEmpty(strCensoredDataQuery)){
					sbQuery.append(",");
					sbQuery.append(strCensoredDataQuery);	//생존분석 - 중도절단
				}
				
			}		
			sbQuery.append(cohortStudy.getQueryForMain(1));

			outputMap = cohortStudy.getResultList(sbQuery.toString(), 1, paramMap);
			outputMap.put("dsMetaDataList", cohortStudy.getDataFields());
			outputList.add(outputMap);
			
		
		}
		
		//연구항목 Aggregation == ALL	
		for(int i=0; i < dsAggAllItemList.size() ; i++){
			Map<String,String> dsMap = (HashMap)dsAggAllItemList.get(i);
			
			sbQuery = new StringBuffer();
			cohortStudy.removeDataFields();
			sbQuery.append(cohortStudy.getQueryForWithMain(new HashMap()));
			sbQuery.append(",");
			sbQuery.append(cohortStudy.getQueryForWithRdt());
			//sbQuery.append(",");	
			sbQuery.append(cohortStudy.getQueryForWithRAll(dsMap));		//연구항목
			

		//	생존분석조회여부
			if("Y".equals(cohortStudy.modelMap.get("SURVIVE_FLAG_YN"))){
				String strEventQuery = "";
				String strCensoredDataQuery = "";
				
				strEventQuery = cohortStudy.getQueryForWithEvent();
				strCensoredDataQuery = cohortStudy.getQueryForWithCensoredData();
				
				if(!StringUtils.isEmpty(strEventQuery)){
					sbQuery.append(",");
					sbQuery.append(strEventQuery);			//생존분석 - 사건정의
				}
				
				if(!StringUtils.isEmpty(strCensoredDataQuery)){
					sbQuery.append(",");
					sbQuery.append(strCensoredDataQuery);	//생존분석 - 중도절단
				}
				
			}	
			
			int nTabPeriodCd = 1;
			
			if(dsAggNotAllItemList.size() <= 0){
				nTabPeriodCd = i+1;
				
			}else{
				nTabPeriodCd = i+2;
				
			}
			
			sbQuery.append(cohortStudy.getQueryForMain(nTabPeriodCd));
			outputMap = cohortStudy.getResultList(sbQuery.toString(), nTabPeriodCd, paramMap);
			
			outputMap.put("dsMetaDataList", cohortStudy.getDataFields());
			outputList.add(outputMap);
		}
		
		cohortStudy.updateItemMgmtSearchCnt(paramMap);
			
		return outputList;
		
	}
}
