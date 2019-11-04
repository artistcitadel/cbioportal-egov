package com.softcen.bigcen.med.research.casctrl.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.research.query.sql.builder.CasCtrlStudy;
import com.softcen.bigcen.med.research.query.vo.QueryVO;
import com.softcen.bigcen.med.utils.StringUtils;


@Service("casCtrlServiceImpl")
public class CasCtrlServiceImpl extends BigcenMedAbstractServiceImpl implements ICasCtrlService{
	@Autowired
	private CasCtrlStudy casCtrlStudy;
	
	/**
	 * 
	 */
	@SuppressWarnings({"rawtypes", "cast", "unused", "unchecked"})
	public Object searchPatientSearchList(Map<Object,Object> paramMap) throws Exception{
		Map<Object,Object> outputMap = new HashMap<Object,Object>();
		
		List<Object> outputList = new ArrayList<Object>();
		StringBuffer sbQuery = new StringBuffer();
		
		String strQueryCaseGroup = "";
		String strQueryControlGroup = "";
		String strQueryControlGroup2X = "";
		String strQueryUnionAll = "";
		String strQueryUnionAll2X = "";
		
		String strCcContCd = "";
		
		casCtrlStudy.setModelMap(paramMap);
		casCtrlStudy.init();
		
		sbQuery.append(casCtrlStudy.getQueryForWithMain(new HashMap<String,String>()));
		sbQuery.append(",");
		sbQuery.append(casCtrlStudy.getQueryForWithRdt());
		
		strQueryCaseGroup = casCtrlStudy.getQueryForWithCaseControl("CA");
		strQueryControlGroup = casCtrlStudy.getQueryForWithCaseControl("CO");
			
		if(!StringUtils.isEmpty(strQueryCaseGroup)){
			sbQuery.append(",");
			sbQuery.append(strQueryCaseGroup);
			
		}
			
		if(!StringUtils.isEmpty(strQueryControlGroup)){
			sbQuery.append(",");
			sbQuery.append(strQueryControlGroup);
			
		//	2배수일때
			if(!"1".equals(paramMap.get("CC_CONT_CD"))){
				strQueryControlGroup2X = casCtrlStudy.getQueryForWithCaseControl("CO2");
				
				if(!StringUtils.isEmpty(strQueryControlGroup2X)){
					sbQuery.append(",");
					sbQuery.append(strQueryControlGroup2X);
				}
			}
			
		}
		
		if(!StringUtils.isEmpty(strQueryCaseGroup) && !StringUtils.isEmpty(strQueryControlGroup)){
			strQueryUnionAll = casCtrlStudy.getQueryForWithCaseControlUnionAll();
			sbQuery.append(",");
			sbQuery.append(strQueryUnionAll);
			

		//	2배수일때
			if(!"1".equals(paramMap.get("CC_CONT_CD"))){
				strQueryUnionAll2X = casCtrlStudy.getQueryForWithCaseControlUnionAll2X();
				
				sbQuery.append(",");
				sbQuery.append(strQueryUnionAll2X);
				
			}
		}
		
		if(StringUtils.isEmpty(strQueryUnionAll)){
			sbQuery.append(casCtrlStudy.getQueryForMain(1));
			
		}else{
			if(!"1".equals(paramMap.get("CC_CONT_CD"))){
				sbQuery.append(casCtrlStudy.getQueryForMainCaseControl(1,true));
			}else{
				sbQuery.append(casCtrlStudy.getQueryForMainCaseControl(1,false));	
			}
		}
		
		outputMap = casCtrlStudy.getResultList(sbQuery.toString(), 1, paramMap);
		outputMap.put("dsMetaDataList", casCtrlStudy.getDataFields());

		if(	"AM".equals(String.valueOf(casCtrlStudy.modelMap.get("CC_MAT_CD"))) || 
			"ASM".equals(String.valueOf(casCtrlStudy.modelMap.get("CC_MAT_CD")))){
			outputMap.put("dsCount",this.getAgeMatchList(outputMap).size());
			outputMap.put("dsList",this.getAgeMatchList(outputMap));
						
		}
		
		outputList.add(outputMap);
		
		casCtrlStudy.updateItemMgmtSearchCnt(paramMap);
		
		return outputList;
	}
	
	
	
	/**
	 * 연구항목조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes", "cast", "unused", "unchecked"})
	public Object searchStudyItemTargetList(Map<Object,Object> paramMap) throws Exception{
		Map outputMap = new HashMap();
		List<Object> outputList = new ArrayList<Object>();
		StringBuffer sbQuery = new StringBuffer();
		
		String strQueryCaseGroup = "";
		String strQueryControlGroup = "";
		String strQueryControlGroup2X = "";
		String strStudyItemQuery = "";
		String strQueryUnionAll = "";
		String strQueryUnionAll2X = "";
		
		casCtrlStudy.setModelMap(paramMap);
		casCtrlStudy.init();
		
		sbQuery.append(casCtrlStudy.getQueryForWithMain(new HashMap<String,String>()));
		sbQuery.append(",");
		sbQuery.append(casCtrlStudy.getQueryForWithRdt());
		
		strQueryCaseGroup = casCtrlStudy.getQueryForWithCaseControl("CA");
		strQueryControlGroup = casCtrlStudy.getQueryForWithCaseControl("CO");
			
		if(!StringUtils.isEmpty(strQueryCaseGroup)){
			sbQuery.append(",");
			sbQuery.append(strQueryCaseGroup);
			
		}
			
		if(!StringUtils.isEmpty(strQueryControlGroup)){
			sbQuery.append(",");
			sbQuery.append(strQueryControlGroup);
			

		//	2배수일때
			if(!"1".equals(paramMap.get("CC_CONT_CD"))){
				strQueryControlGroup2X = casCtrlStudy.getQueryForWithCaseControl("CO2");
				
				if(!StringUtils.isEmpty(strQueryControlGroup2X)){
					sbQuery.append(",");
					sbQuery.append(strQueryControlGroup2X);
				}
			}
			
		}
		
		if(!StringUtils.isEmpty(strQueryCaseGroup) && !StringUtils.isEmpty(strQueryControlGroup)){
			strQueryUnionAll = casCtrlStudy.getQueryForWithCaseControlUnionAll();
			sbQuery.append(",");
			sbQuery.append(strQueryUnionAll);
			

		//	2배수일때
			if(!"1".equals(paramMap.get("CC_CONT_CD"))){
				strQueryUnionAll2X = casCtrlStudy.getQueryForWithCaseControlUnionAll2X();
				
				sbQuery.append(",");
				sbQuery.append(strQueryUnionAll2X);
				
			}

		}
		
		sbQuery.append(",");
		strStudyItemQuery = casCtrlStudy.getQueryForWithR();
		
		if(!StringUtils.isEmpty(strStudyItemQuery)){
			sbQuery.append(strStudyItemQuery);
			
		}
		
		if(StringUtils.isEmpty(strQueryUnionAll)){
			sbQuery.append(casCtrlStudy.getQueryForMain(1));
			
		}else{
		//	2배수이상일떄	
			if(!"1".equals(paramMap.get("CC_CONT_CD"))){
				sbQuery.append(casCtrlStudy.getQueryForMainCaseControl(1,true));
				
			}else{
				sbQuery.append(casCtrlStudy.getQueryForMainCaseControl(1,false));
				
			}
			
		}
		
		outputMap = casCtrlStudy.getResultList(sbQuery.toString(), 1, paramMap);
		outputMap.put("dsMetaDataList", casCtrlStudy.getDataFields());
		
		if(	"AM".equals(String.valueOf(casCtrlStudy.modelMap.get("CC_MAT_CD"))) || 
			"ASM".equals(String.valueOf(casCtrlStudy.modelMap.get("CC_MAT_CD")))){
			
			outputMap.put("dsCount",this.getAgeMatchList(outputMap).size());
			outputMap.put("dsList",this.getAgeMatchList(outputMap));
			
		}
		
		outputList.add(outputMap);
		
		casCtrlStudy.updateItemMgmtSearchCnt(paramMap);
		
		return outputList;
	}
	
	
	@SuppressWarnings({"rawtypes", "cast", "unused", "unchecked"})
	private List getAgeMatchList(Map<Object,Object> outputMap) throws Exception{
		
		List<Map> caseControlGrpList = (ArrayList<Map>)outputMap.get("dsList");
		List<Map> caseGrpList = new LinkedList<Map>();
		List<Map> controlGrpList = new LinkedList<Map>();
		
		caseGrpList = this.getCaseControlGroupList(caseControlGrpList, "CASE");
		controlGrpList = this.getCaseControlGroupList(caseControlGrpList, "CONTROL");
		
		logger.debug("전체 : " + caseControlGrpList.size());
		logger.debug("사례군 : " + caseGrpList.size());
		logger.debug("대조군 : " + controlGrpList.size());
				
	//	대조군에서 사례군 나이 범위에 있는 환자번호  	
		List<String> patSbstNoList = new ArrayList();
		
		Iterator iter = controlGrpList.iterator();
		
		while(iter.hasNext()){
			Map<String,Object> controlGrpMap = (HashMap)iter.next();
			
			long ageStd, ageRange, agePlus, ageMinus = 0;
			
			ageStd	 = Long.valueOf(String.valueOf(controlGrpMap.get("AGE")));
			ageRange = Integer.valueOf((StringUtils.nvl(String.valueOf(casCtrlStudy.modelMap.get("CC_AGE_NUM")), "0")));
			
			agePlus  = ageStd + ageRange;	//나이범위 Plus
			ageMinus = ageStd - ageRange;	//나이범위 Minus
						
			boolean ret = this.isAgeMatch(caseGrpList, agePlus, ageMinus);
			
			if(!ret){
				patSbstNoList.add(String.valueOf(controlGrpMap.get(QueryVO.gvPatSbstNo)));
			}
		}
		
		
	//	최종 Output list저장
	//	대조군 나이범위에 해당되는 환자만 목록 설정	
		List outputAgeMatchList = new ArrayList();
				
		Iterator iter2 = caseControlGrpList.iterator();
		
		while(iter2.hasNext()){
			Map<String,String> dsMap = (HashMap)iter2.next();
			
			boolean ret = this.isPatSbstNo(patSbstNoList, dsMap.get(QueryVO.gvPatSbstNo));
			
			if(!ret){
				outputAgeMatchList.add(dsMap);
			}
		}
		
		
		
		
		return outputAgeMatchList;
		
	}
	
	
	/**
	 * 사례대조 결과목록에서 Case Group과 Control Group 목록 반환
	 * @param dsList
	 * @param gbnCaCo (CASE : 사례군, CONTROL : 대조군)
	 * @return
	 */
	@SuppressWarnings({"rawtypes", "cast", "unused", "unchecked"})
	private List<Map> getCaseControlGroupList(List dsList, String gbnCaCo){
		List<Map> resultList = new ArrayList<Map>();

		for(int i=0; i < dsList.size(); i++){
			Map<String,String> dsMap = (HashMap)dsList.get(i);

			if(gbnCaCo.equals(dsMap.get("CA_CO"))){
				resultList.add(dsMap);
			}
			
		}
		return resultList;
	}
	
	/**
	 * Age Match가 안된 환자목록 여부
	 * @param dsList
	 * @param strPatSbstNo
	 * @return
	 */
	@SuppressWarnings({"rawtypes", "cast", "unused", "unchecked"})
	private boolean isPatSbstNo(List dsList, String strPatSbstNo){
		boolean ret = false;
		
		for(int i= 0; i < dsList.size(); i++){
			String obj  = (String)dsList.get(i);
			
			if(obj.equals(strPatSbstNo)){
				ret = true;
				break;
			}
		}
		
		return ret;
		
	}
	
	/**
	 * Age Range Match 여부
	 * @param dsList
	 * @param agePlus
	 * @param ageMinus
	 * @return
	 */
	@SuppressWarnings({"rawtypes", "cast", "unused", "unchecked"})
	private boolean isAgeMatch(List dsList, long agePlus, long ageMinus){
		boolean ret = false;
		
		for(int i= 0; i < dsList.size(); i++){
			Map<String,String> dsMap = (HashMap)dsList.get(i);
			long caseAge = 0;
			
			caseAge = Long.valueOf(String.valueOf(dsMap.get("AGE")));

			if(caseAge >= ageMinus && caseAge <= agePlus){
				ret = true;
				break;
			}
		}
		
		return ret;
	}

}
