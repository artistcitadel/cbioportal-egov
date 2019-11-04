package com.softcen.bigcen.med.research.basicAnalysis.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.collect.Lists;
import com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions;
import com.softcen.bigcen.med.analysisFunctions.RenjinException;
import com.softcen.bigcen.med.research.basicAnalysis.dao.BasicAnalysisDAO;
/**
 * 단면연구 > 연구항목 > 기초분석 Service
 * @author RedEye
 *
 */
@Service(value="basicAnalysisService")
public class BasicAnalysisServiceImpl  implements IBasicAnalysisService {

	@Autowired
	private BasicAnalysisDAO basicAnalysisDAO; 

	public AnalysisFunctions AnalysisFunctions = new AnalysisFunctions();
	/**
	 * 독립표본 T검정 - (집단통계량)
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object indeSampleTTestGrid1(Map<Object, Object> paramMap) {	
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		List<Map<Object, Object>> list = basicAnalysisDAO.selectIndeSampleTTestDataGrid1(paramMap);
		// 기초분석을 위한 데이터 불러오기
		List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2NotNull(paramMap);
		
		try {
			//mid
			List mid_val = AnalysisFunctions.mid(list_sub);
			System.out.println(mid_val);
			
			//SD0
			List sd0_val = AnalysisFunctions.sd0(list_sub);
			System.out.println(sd0_val);
			
			for(int i=0; i < list.size(); i++){
				Map<Object,Object> dsMap = (Map<Object, Object>) list.get(i);

				//mid 추가
				for(int j=0; j < mid_val.size(); j++){
					Map<Object,Object> dsMap_mid = (Map<Object, Object>) mid_val.get(j);
					System.out.println(dsMap_mid.toString());
					if(dsMap.get("COL1").equals(dsMap_mid.get("B"))){
						//double dsMap_mid_val = Math.round((double) dsMap_mid.get("A") * 10000) / (double) 10000;
						double dsMap_mid_val = Math.round( ((Long) dsMap_mid.get("A")).longValue() * 10000 ) / (double) 10000;
						list.get(i).put("COL4", dsMap_mid_val);
					}
				}
				
				//SD0 추가
				for(int j=0; j < sd0_val.size(); j++){
					Map<Object,Object> dsMap_sd0 = (Map<Object, Object>) sd0_val.get(j);
					System.out.println(dsMap_sd0.toString());
					if(dsMap.get("COL1").equals(dsMap_sd0.get("B"))){
						double dsMap_sd0_val = Math.round(( (Double) dsMap_sd0.get("A")) * 100000) / (double) 100000;
						list.get(i).put("COL5", dsMap_sd0_val);
					}
				}
			}
			
			returnMap.put("gridData", list);
			
		}catch(RenjinException e) {
			returnMap.put("ERR_CD", "200");
			returnMap.put("ERR_TEXT", "독립표본 T검정 > 집단통계량");
			returnMap.put("ERR_MSG", e.getMessage());
		}catch(Exception e) {
			returnMap.put("ERR_CD", "100");
			returnMap.put("ERR_TEXT", "독립표본 T검정 > 집단통계량");
			returnMap.put("ERR_MSG", e.getMessage());
		}
		return  returnMap;
	}
	
	/*@Override
	public Object indeSampleTTestGrid1(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		returnMap.put("gridData", basicAnalysisDAO.selectIndeSampleTTestDataGrid1(paramMap));
				
		return  returnMap;
	}*/
	
	/**
	 * 독립표본 T검정 - (독립표본검정)
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object indeSampleTTestGrid2(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();

		// CODE 카운트 체크
		int cnt = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap);
		
		if(cnt == 2){
			// 기초분석을 위한 데이터 불러오기
			List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2(paramMap);
			
			try {
				Map<Object,Object> result1 = new HashMap<Object,Object>();
				Map<Object,Object> result2 = new HashMap<Object,Object>();
				Map<Object,Object> result3 = new HashMap<Object,Object>();
				List<Map<Object, Object>> list = Lists.newArrayList();
				
				//tt_stat_2
				double tt_stat_2_val = Math.round(AnalysisFunctions.tt_stat_2(list_sub) * 1000) / (double) 1000;
				result1.put("VAL", tt_stat_2_val);
				result1.put("SV", "COL1");
				list.add(result1);
				
				// tt_df_2
				double tt_df_2_val = Math.round(AnalysisFunctions.tt_df_2(list_sub) * 1000) / (double) 1000;
				System.out.println(tt_df_2_val);
				result2.put("VAL", tt_df_2_val);
				result2.put("SV", "COL2");
				list.add(result2);
				
				//tt_pv_21
				double tt_pv_21_val = Math.round(AnalysisFunctions.tt_pv_21(list_sub) * 1000) / (double) 1000;
				if(tt_pv_21_val == 0){
					result3.put("VAL", "< 0.001");
				}else{
					result3.put("VAL", tt_pv_21_val);
				}
				System.out.println(tt_pv_21_val);
				result3.put("SV", "COL3");
				list.add(result3);
				
				// 데이터 재분류
				returnMap.put("gridData", BasicAnalysisUtil.transformToList(list));
				
			}catch(RenjinException e) {
				returnMap.put("ERR_CD", "200");
				returnMap.put("ERR_TEXT", "독립표본 T검정 > 독립표본검정");
				returnMap.put("ERR_MSG", e.getMessage());
			}catch(Exception e) {
				returnMap.put("ERR_CD", "100");
				returnMap.put("ERR_TEXT", "독립표본 T검정 > 독립표본검정");
				returnMap.put("ERR_MSG", e.getMessage());
			}
			
		}else{
			returnMap.put("gridData_msg", cnt);
		}
				
		return returnMap;
	}
	/*@Override
	public Object indeSampleTTestGrid2(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		// CODE 카운트 체크
		int cnt = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap);
		if(cnt == 2){
			List<Map<Object, Object>> list = basicAnalysisDAO.selectIndeSampleTTestDataGrid2(paramMap);
			// 데이터 재분류
			returnMap.put("gridData", BasicAnalysisUtil.transformToList(list));
		}else{
			returnMap.put("gridData_msg", cnt);
		}
				
		return returnMap;
	}*/

	/**
	 * 대응표본 T검정 - (대응표본통계량)
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object actionSampleTTestGrid1(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		List<Map<Object, Object>> list001 = basicAnalysisDAO.selectActionSampleTTestDataGrid1(paramMap);
		
		try {
			// 데이터 재분류
			Map<String, Object> map001 = BasicAnalysisUtil.transformToMap(list001);
			// COL1 값 설정
			String name001 = (String) paramMap.get("VARIABLE_001_NAME");
			if(name001.indexOf("_") > -1){
				name001 = name001.substring(name001.indexOf("_")+1);
				name001 = (name001.indexOf("_") > -1) ? name001.substring(0, name001.indexOf("_")) : name001;
			}
			map001.put("COL1", name001);
			
			// 기초분석을 위한 데이터 불러오기
			List<Map<Object, Object>> list_sub001 = basicAnalysisDAO.selectAnalysisDataFirst(paramMap);
			
			//mid
			List mid_val1 = AnalysisFunctions.mid(list_sub001);
			System.out.println(mid_val1);
			Map<Object,Object> dsMap_mid1 = (Map<Object, Object>) mid_val1.get(0);
			String mid_val_str1 = dsMap_mid1.get(paramMap.get("VARIABLE_001")).toString();
			map001.put("COL4", mid_val_str1);
			
			//sd0
			List sd0_val1 = AnalysisFunctions.sd0(list_sub001);
			System.out.println(sd0_val1);
			Map<Object,Object> dsMap_sd01 = (Map<Object, Object>) sd0_val1.get(0);
			double sd0_val_dub1 = Math.round((Double) dsMap_sd01.get(paramMap.get("VARIABLE_001")) * 1000) / (double) 1000;
			map001.put("COL5", sd0_val_dub1);
					
			resultList.add(map001);
			
			// Parameter 데이터 재 매핑
			Map<Object,Object> paramMap2 = new HashMap<Object,Object>();
			paramMap2.put("TABLE_ID", paramMap.get("TABLE_ID"));
			paramMap2.put("VARIABLE_001", paramMap.get("VARIABLE_002"));
			List<Map<Object, Object>> list002 = basicAnalysisDAO.selectActionSampleTTestDataGrid1(paramMap2);
			// 데이터 재분류
			Map<String, Object> map002 = BasicAnalysisUtil.transformToMap(list002);
			// COL1 값 설정
			String name002 = (String) paramMap.get("VARIABLE_002_NAME");
			if(name002.indexOf("_") > -1){
				name002 = name002.substring(name002.indexOf("_")+1);
				name002 = (name002.indexOf("_") > -1) ? name002.substring(0, name002.indexOf("_")) : name002;
			}
			map002.put("COL1", name002);
			
			// 기초분석을 위한 데이터 불러오기
			List<Map<Object, Object>> list_sub002 = basicAnalysisDAO.selectAnalysisDataFirst(paramMap2);
			
			//mid
			List mid_val2 = AnalysisFunctions.mid(list_sub002);
			System.out.println(mid_val2);
			Map<Object,Object> dsMap2 = (Map<Object, Object>) mid_val2.get(0);
			String mid_val_str2 = dsMap2.get(paramMap2.get("VARIABLE_001")).toString();
			map002.put("COL4", mid_val_str2);
			
			//sd0
			List sd0_val2 = AnalysisFunctions.sd0(list_sub002);
			System.out.println(sd0_val2);
			Map<Object,Object> dsMap_sd02 = (Map<Object, Object>) sd0_val2.get(0);
			double sd0_val_dub2 = Math.round((Double) dsMap_sd02.get(paramMap2.get("VARIABLE_001")) * 1000) / (double) 1000;
			map002.put("COL5", sd0_val_dub2);
			
			resultList.add(map002);
			
			returnMap.put("gridData", resultList);
			
		}catch(RenjinException e) {
			returnMap.put("ERR_CD", "200");
			returnMap.put("ERR_TEXT", "대응표본 T검정 > 대응표본통계량");
			returnMap.put("ERR_MSG", e.getMessage());
		}catch(Exception e) {
			returnMap.put("ERR_CD", "100");
			returnMap.put("ERR_TEXT", "대응표본 T검정 > 대응표본통계량");
			returnMap.put("ERR_MSG", e.getMessage());
		}
		
		return returnMap;
	}
	/*@Override
	public Object actionSampleTTestGrid1(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		List<Map<Object, Object>> list001 = basicAnalysisDAO.selectActionSampleTTestDataGrid1(paramMap);
		// 데이터 재분류
		Map<String, Object> map001 = BasicAnalysisUtil.transformToMap(list001);
		// COL1 값 설정
		String name001 = (String) paramMap.get("VARIABLE_001_NAME");
		if(name001.indexOf("_") > -1){
			name001 = name001.substring(name001.indexOf("_")+1);
			name001 = (name001.indexOf("_") > -1) ? name001.substring(0, name001.indexOf("_")) : name001;
		}
		map001.put("COL1", name001);
		resultList.add(map001);
		
		// Parameter 데이터 재 매핑
		Map<Object,Object> paramMap2 = new HashMap<Object,Object>();
		paramMap2.put("TABLE_ID", paramMap.get("TABLE_ID"));
		paramMap2.put("VARIABLE_001", paramMap.get("VARIABLE_002"));
		List<Map<Object, Object>> list002 = basicAnalysisDAO.selectActionSampleTTestDataGrid1(paramMap2);
		// 데이터 재분류
		Map<String, Object> map002 = BasicAnalysisUtil.transformToMap(list002);
		// COL1 값 설정
		String name002 = (String) paramMap.get("VARIABLE_002_NAME");
		if(name002.indexOf("_") > -1){
			name002 = name002.substring(name002.indexOf("_")+1);
			name002 = (name002.indexOf("_") > -1) ? name002.substring(0, name002.indexOf("_")) : name002;
		}
		map002.put("COL1", name002);
		resultList.add(map002);
		
		returnMap.put("gridData", resultList);
		
		return returnMap;
	}*/
	/**
	 * 대응표본 T검정 - (대응표본검정)
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object actionSampleTTestGrid2(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		
		// 기초분석을 위한 데이터 불러오기
		List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2(paramMap);
		Map<Object,Object> result1 = new HashMap<Object,Object>();
		Map<Object,Object> result2 = new HashMap<Object,Object>();
		Map<Object,Object> result3 = new HashMap<Object,Object>();
		List<Map<Object, Object>> list = Lists.newArrayList();
		
		try {
			
			//tt_stat_p
			double tt_stat_p_val = Math.round(AnalysisFunctions.tt_stat_p(list_sub) * 1000) / (double) 1000;
			System.out.println(tt_stat_p_val);
			//paramMap.put("tt_stat_p_val", tt_stat_p_val);
			result1.put("VAL", tt_stat_p_val);
			result1.put("SV", "COL1");
			list.add(result1);
			
			// tt_df_p
			double tt_df_p_val = Math.round(AnalysisFunctions.tt_df_p(list_sub) * 1000) / (double) 1000;
			System.out.println(tt_df_p_val);
			//paramMap.put("tt_df_p_val", tt_df_p_val);
			result2.put("VAL", tt_df_p_val);
			result2.put("SV", "COL2");
			list.add(result2);
			
			//tt_pv_p
			double tt_pv_p_val = Math.round(AnalysisFunctions.tt_pv_p(list_sub) * 1000) / (double) 1000;
			if(tt_pv_p_val == 0){
				result3.put("VAL", "< 0.001");
			}else{
				result3.put("VAL", tt_pv_p_val);
			}
			System.out.println(tt_pv_p_val);
			//paramMap.put("tt_pv_p_val", tt_pv_p_val);
			result3.put("SV", "COL3");
			list.add(result3);
			
			//List<Map<Object, Object>> list = basicAnalysisDAO.selectActionSampleTTestDataGrid2(paramMap);
			
			// 데이터 재분류
			returnMap.put("gridData", BasicAnalysisUtil.transformToList(list));
			
		}catch(RenjinException e) {
			returnMap.put("ERR_CD", "200");
			returnMap.put("ERR_TEXT", " 대응표본 T검정 >  대응표본검정");
			returnMap.put("ERR_MSG", e.getMessage());
		}catch(Exception e) {
			returnMap.put("ERR_CD", "100");
			returnMap.put("ERR_TEXT", " 대응표본 T검정 >  대응표본검정");
			returnMap.put("ERR_MSG", e.getMessage());
		}
		
		return returnMap;
	}
	/*@Override
	public Object actionSampleTTestGrid2(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		List<Map<Object, Object>> list = basicAnalysisDAO.selectActionSampleTTestDataGrid2(paramMap);
		// 데이터 재분류
		returnMap.put("gridData", BasicAnalysisUtil.transformToList(list));
		
		return returnMap;
	}*/

	/**
	 * 일원분산분석 - 분산분석 : 기술통계
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object oneWayAnalysisGrid1(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		List<Map<Object, Object>> list = basicAnalysisDAO.selectOneWayAnalysisDataGrid1(paramMap);
		
		// 기초분석을 위한 데이터 불러오기
		List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2NotNull(paramMap);
		try {
			//mid
			List mid_val = AnalysisFunctions.mid(list_sub);
			System.out.println(mid_val);
			
			//SD0
			List sd0_val = AnalysisFunctions.sd0(list_sub);
			System.out.println(sd0_val);
			
			//IQR
			List iqr_val = AnalysisFunctions.iqr(list_sub);
			System.out.println(iqr_val);
			
			for(int i=0; i < list.size(); i++){
				Map<Object,Object> dsMap = (Map<Object, Object>) list.get(i);

				//mid 추가
				for(int j=0; j < mid_val.size(); j++){
					Map<Object,Object> dsMap_mid = (Map<Object, Object>) mid_val.get(j);
					System.out.println(dsMap_mid.toString());
					if(dsMap.get("COL1").equals(dsMap_mid.get("B"))){
						double dsMap_mid_val = Math.round((Double) dsMap_mid.get("A") * 10000) / (double) 10000;
						list.get(i).put("COL4", dsMap_mid_val);
					}
				}
				
				//SD0 추가
				for(int j=0; j < sd0_val.size(); j++){
					Map<Object,Object> dsMap_sd0 = (Map<Object, Object>) sd0_val.get(j);
					System.out.println(dsMap_sd0.toString());
					if(dsMap.get("COL1").equals(dsMap_sd0.get("B"))){
						double dsMap_sd0_val = Math.round((Double) dsMap_sd0.get("A") * 100000) / (double) 100000;
						list.get(i).put("COL5", dsMap_sd0_val);
					}
				}
				
				//IQR 추가
				for(int j=0; j < iqr_val.size(); j++){
					Map<Object,Object> dsMap_iqr = (Map<Object, Object>) iqr_val.get(j);
					System.out.println(dsMap_iqr.toString());
					if(dsMap.get("COL1").equals(dsMap_iqr.get("B"))){
						double dsMap_iqr_val = Math.round((Double) dsMap_iqr.get("A") * 100000) / (double) 100000;
						list.get(i).put("COL6", dsMap_iqr_val);
					}
				}
			}
			
			returnMap.put("gridData", list);
			
		}catch(RenjinException e) {
			returnMap.put("ERR_CD", "200");
			returnMap.put("ERR_TEXT", " 일원분산분석 > 분산분석");
			returnMap.put("ERR_MSG", e.getMessage());
		}catch(Exception e) {
			returnMap.put("ERR_CD", "100");
			returnMap.put("ERR_TEXT", " 일원분산분석 > 분산분석");
			returnMap.put("ERR_MSG", e.getMessage());
		}
		
				
		return  returnMap;
	}
	
//	@Override
//	public Object oneWayAnalysisGrid1(Map<Object, Object> paramMap) {
//		Map<Object,Object> returnMap = new HashMap<Object,Object>();
//		returnMap.put("gridData", basicAnalysisDAO.selectOneWayAnalysisDataGrid1(paramMap));
//				
//		return returnMap;
//	}
	/**
	 * 일원분산분석 - 분산분석 : 분산분석
	 * 					사후분석(Tukey): 다중비교, 동일집단군
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	@Override
	public Object oneWayAnalysisGrid2(Map<Object, Object> paramMap) throws Exception {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		
		// CODE 카운트 체크
		int cnt = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap);
		if(cnt >= 2){
			try {
				// ANOVA 기초분석을 위한 데이터 불러오기
				List<Map<Object, Object>> listAnalysisFunction = basicAnalysisDAO.selectAnalysisData2(paramMap);
				List<Map<Object, Object>> resultListAnova = Lists.newArrayList();
				List<Map<Object, Object>> resultListTukey = Lists.newArrayList();
				List<Map<Object, Object>> resultListTukey_g = Lists.newArrayList();

				//anova
				List anova_val = AnalysisFunctions.anova(listAnalysisFunction);		
				//tukey
				List tukey_val = AnalysisFunctions.tukey(listAnalysisFunction);
				//tukey_g
				List tukey_g_val = AnalysisFunctions.tukey_g(listAnalysisFunction);
				
				
				//anova 시작
				// COL1 구분값 추가
				((Map<Object, Object>) anova_val.get(0)).put("COL1", "집단 간");
				((Map<Object, Object>) anova_val.get(1)).put("COL1", "집단 내");
				
				for(int i=0; i<anova_val.size(); i++) {
					Map<Object, Object> resultMap = new HashMap<Object, Object>();
					Map<String, Object> anova_tmp = new HashMap<String, Object>();
					anova_tmp = (HashMap) anova_val.get(i);
					System.out.println("anova" + anova_tmp);
					//key : val 값 추출
					for(Object key : anova_tmp.keySet()) {
						
						//Key에 Val 넣기
						if(key == "COL1") {
							resultMap.put("COL1", anova_tmp.get(key));
						}else if(key == "Sum Sq") {
							resultMap.put("COL2", anova_tmp.get(key));
						}else if(key == "Df") {
							resultMap.put("COL3", anova_tmp.get(key));
						}else if(key == "Mean Sq") {
							resultMap.put("COL4", anova_tmp.get(key));
						}else if(key == "F value") {
							resultMap.put("COL5", anova_tmp.get(key));
						}else if(key == "p_value") {
							resultMap.put("COL6", anova_tmp.get(key));
						}
					}
					resultListAnova.add(resultMap);
				}	
				returnMap.put("gridData001", resultListAnova);
				
				// 다중비교
				// 구분값 추가
				for(int i=0; i<tukey_val.size(); i++) {
					Map<Object, Object> resultMap = new HashMap<Object, Object>();
					Map<String, Object> tukey_tmp = new HashMap<String, Object>();
					tukey_tmp = (HashMap) tukey_val.get(i);
					System.out.println("tukey" + tukey_tmp);
					//key : val 값 추출
					for(Object key : tukey_tmp.keySet()) {
						
						//Key에 Val 넣기
						if(key == "i-j") {
							resultMap.put("COL1", tukey_tmp.get(key));
						}else if(key == "Diff") {
							//자리수 계산
							int n = 5;
							double n2 = Math.pow(10.0, n);
							resultMap.put("COL2",  Math.round((Double) tukey_tmp.get(key) * n2 ) / n2 );
						}else if(key == "p_value") {
							//자리수 계산
							int n = 3;
							double n2 = Math.pow(10.0, n);
							resultMap.put("COL3", Math.round((Double) tukey_tmp.get(key) * n2 ) / n2 );
						}else if(key == "LCL") {
							//자리수 계산
							int n = 4;
							double n2 = Math.pow(10.0, n);
							resultMap.put("COL4", Math.round((Double) tukey_tmp.get(key) * n2 ) / n2 );
						}else if(key == "UCL") {
							//자리수 계산
							int n = 4;
							double n2 = Math.pow(10.0, n);
							resultMap.put("COL5", Math.round((Double) tukey_tmp.get(key) * n2 ) / n2 );
						}
					}
					resultListTukey.add(resultMap);
				}	
							
				returnMap.put("gridData002", resultListTukey);
				
				// 동일집단군
				// 구분값 추가
				for(int i=0; i<tukey_g_val.size(); i++) {
					Map<Object, Object> resultMap = new HashMap<Object, Object>();
					Map<String, Object> tukey_g_tmp = new HashMap<String, Object>();
					tukey_g_tmp = (HashMap) tukey_g_val.get(i);
					System.out.println("tukey_g_tmp" + tukey_g_tmp);
					//key : val 값 추출
					for(Object key : tukey_g_tmp.keySet()) {
						
						//Key에 Val 넣기
						if(key == "Code") {
							resultMap.put("COL1", tukey_g_tmp.get(key));
						}else if(key == "Means") {
							//자리수 계산
							int n = 4;
							double n2 = Math.pow(10.0, n);
							resultMap.put("COL2",  Math.round((Double) tukey_g_tmp.get(key) * n2 ) / n2 );
						}else if(key == "Groups") {
							resultMap.put("COL3", tukey_g_tmp.get(key));
						}
					}
					resultListTukey_g.add(resultMap);
				}	
							
				returnMap.put("gridData003", resultListTukey_g);
			}catch(RenjinException e) {
				returnMap.put("ERR_CD", "200");
				returnMap.put("ERR_TEXT", " 일원분산분석 > 사후분석");
				returnMap.put("ERR_MSG", e.getMessage());
			}catch(Exception e) {
				returnMap.put("ERR_CD", "100");
				returnMap.put("ERR_TEXT", " 일원분산분석 > 사후분석");
				returnMap.put("ERR_MSG", e.getMessage());
			}
		}else{
			returnMap.put("gridData_msg", cnt);
		}

		return  returnMap;
	}
		
//	@Override
//	public Object oneWayAnalysisGrid2(Map<Object, Object> paramMap) {
//		Map<Object,Object> returnMap = new HashMap<Object,Object>();
//		// CODE 카운트 체크
//		int cnt = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap);
//		if(cnt >= 2){
//			// 분산분석
//			List<Map<Object, Object>> resultList = basicAnalysisDAO.selectOneWayAnalysisDataGrid2(paramMap);
//			// 구분값 추가
//			resultList.get(0).put("COL1", "집단 간");
//			resultList.get(1).put("COL1", "집단 내");
//			
//			returnMap.put("gridData001", resultList);
//			// 다중비교
//			returnMap.put("gridData002", basicAnalysisDAO.selectOneWayAnalysisDataGrid3(paramMap));
//			// 동일집단군
//			returnMap.put("gridData003", basicAnalysisDAO.selectOneWayAnalysisDataGrid4(paramMap));
//		}else{
//			returnMap.put("gridData_msg", cnt);
//		}
//		
//		
//		return returnMap;
//	}

	/**
	 * 비모수 독립 2 - 비모수검정 : 집단통계량
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object indeSample2Grid1(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		List<Map<Object, Object>> list = basicAnalysisDAO.selectIndeSample2DataGrid1(paramMap);
		
		// 기초분석을 위한 데이터 불러오기
		List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2NotNull(paramMap);
		
		try {
			//mid
			List mid_val = AnalysisFunctions.mid(list_sub);
			System.out.println(mid_val);
			
			//SD0
			List sd0_val = AnalysisFunctions.sd0(list_sub);
			System.out.println(sd0_val);
			
			//IQR
			List iqr_val = AnalysisFunctions.iqr(list_sub);
			System.out.println(iqr_val);
			
			for(int i=0; i < list.size(); i++){
				Map<Object,Object> dsMap = (Map<Object, Object>) list.get(i);

				//mid 추가
				for(int j=0; j < mid_val.size(); j++){
					Map<Object,Object> dsMap_mid = (Map<Object, Object>) mid_val.get(j);
					System.out.println(dsMap_mid.toString());
					if(dsMap.get("COL1").equals(dsMap_mid.get("B"))){
						//double dsMap_mid_val = Math.round((double) dsMap_mid.get("A") * 10000) / (double) 10000;
						double dsMap_mid_val = Math.round((Double) dsMap_mid.get("A") * 10000) / (double) 10000;
						list.get(i).put("COL4", dsMap_mid_val);
					}
				}
				
				//SD0 추가
				for(int j=0; j < sd0_val.size(); j++){
					Map<Object,Object> dsMap_sd0 = (Map<Object, Object>) sd0_val.get(j);
					System.out.println(dsMap_sd0.toString());
					if(dsMap.get("COL1").equals(dsMap_sd0.get("B"))){
						double dsMap_sd0_val = Math.round((Double) dsMap_sd0.get("A") * 100000) / (double) 100000;
						list.get(i).put("COL5", dsMap_sd0_val);
					}
				}
				
				//IQR 추가
				for(int j=0; j < iqr_val.size(); j++){
					Map<Object,Object> dsMap_iqr = (Map<Object, Object>) iqr_val.get(j);
					System.out.println(dsMap_iqr.toString());
					if(dsMap.get("COL1").equals(dsMap_iqr.get("B"))){
						double dsMap_iqr_val = Math.round((Double) dsMap_iqr.get("A") * 100000) / (double) 100000;
						list.get(i).put("COL6", dsMap_iqr_val);
					}
				}
			}
			
			returnMap.put("gridData", list);
			
		}catch(RenjinException e) {
			returnMap.put("ERR_CD", "200");
			returnMap.put("ERR_TEXT", " 비모수 독립 2 - 집단통계량");
			returnMap.put("ERR_MSG", e.getMessage());
		}catch(Exception e) {
			returnMap.put("ERR_CD", "100");
			returnMap.put("ERR_TEXT", " 비모수 독립 2 - 집단통계량");
			returnMap.put("ERR_MSG", e.getMessage());
		}

		return  returnMap;
	}
//	@Override
//	public Object indeSample2Grid1(Map<Object, Object> paramMap) {
//		Map<Object,Object> returnMap = new HashMap<Object,Object>();
//		returnMap.put("gridData", basicAnalysisDAO.selectIndeSample2DataGrid1(paramMap));
//		
//		return returnMap;
//	}
	

	/**
	 * @throws Exception 
	 * 비모수 독립 2 - 비모수검정 :  검정통계량
	 * @param paramMap
	 * @return
	 * @throws
	 */
	@Override
	public Object indeSample2Grid2(Map<Object, Object> paramMap) throws Exception {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		
		// CODE 카운트 체크
		int cnt = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap);
		if(cnt == 2){
			
			// 기초분석을 위한 데이터 불러오기
			List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2(paramMap);
			Map<Object,Object> result1 = new HashMap<Object,Object>();
			Map<Object,Object> result2 = new HashMap<Object,Object>();
			List<Map<Object, Object>> list = Lists.newArrayList();
			
			try {
				//ut_stat
				double ut_stat_val = Math.round(AnalysisFunctions.ut_stat(list_sub) * 1000) / (double) 1000;
				System.out.println(ut_stat_val);
				//paramMap.put("tt_stat_p_val", tt_stat_p_val);
				result1.put("VAL", ut_stat_val);
				result1.put("SV", "COL1");
				list.add(result1);
				
				//ut_pv
				double ut_pv_val = Math.round(AnalysisFunctions.ut_pv(list_sub) * 1000) / (double) 1000;
				if(ut_pv_val == 0){
					result2.put("VAL", "< 0.001");
				}else{
					result2.put("VAL", ut_pv_val);
				}
				System.out.println(ut_pv_val);
				result2.put("SV", "COL2");
				list.add(result2);
				
				// 데이터 재분류
				returnMap.put("gridData", BasicAnalysisUtil.transformToList(list));
				
			}catch(RenjinException e) {
				returnMap.put("ERR_CD", "200");
				returnMap.put("ERR_TEXT", " 비모수 독립 2 - 검정통계량");
				returnMap.put("ERR_MSG", e.getMessage());
			}catch(Exception e) {
				returnMap.put("ERR_CD", "100");
				returnMap.put("ERR_TEXT", " 비모수 독립 2 - 검정통계량");
				returnMap.put("ERR_MSG", e.getMessage());
			}
		}else{
			returnMap.put("gridData_msg", cnt);
		}
		
		
		return returnMap;
	}
	
//	@Override
//	public Object indeSample2Grid2(Map<Object, Object> paramMap) {
//		Map<Object,Object> returnMap = new HashMap<Object,Object>();
//		// CODE 카운트 체크
//		int cnt = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap);
//		if(cnt == 2){
//			List<Map<Object, Object>> list = basicAnalysisDAO.selectIndeSample2DataGrid2(paramMap);
//			// 데이터 재분류
//			returnMap.put("gridData", BasicAnalysisUtil.transformToList(list));
//		}else{
//			returnMap.put("gridData_msg", cnt);
//		}
//		
//		return returnMap;
//	}

	/**
	 * 비모수 독립 K - 비모수검정 : 집단통계량
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object indeSampleKGrid1(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		List<Map<Object, Object>> list = basicAnalysisDAO.selectIndeSampleKDataGrid1(paramMap);
		
		// 기초분석을 위한 데이터 불러오기
		List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2NotNull(paramMap);
		
		try {
			//mid
			List mid_val = AnalysisFunctions.mid(list_sub);
			System.out.println(mid_val);
			
			//SD0
			List sd0_val = AnalysisFunctions.sd0(list_sub);
			System.out.println(sd0_val);
			
			//IQR
			List iqr_val = AnalysisFunctions.iqr(list_sub);
			System.out.println(iqr_val);
			
			for(int i=0; i < list.size(); i++){
				Map<Object,Object> dsMap = (Map<Object, Object>) list.get(i);

				//mid 추가
				for(int j=0; j < mid_val.size(); j++){
					Map<Object,Object> dsMap_mid = (Map<Object, Object>) mid_val.get(j);
					System.out.println(dsMap_mid.toString());
					if(dsMap.get("COL1").equals(dsMap_mid.get("B"))){
						double dsMap_mid_val = Math.round((Double) dsMap_mid.get("A") * 10000) / (double) 10000;
						list.get(i).put("COL4", dsMap_mid_val);
					}
				}
				
				//SD0 추가
				for(int j=0; j < sd0_val.size(); j++){
					Map<Object,Object> dsMap_sd0 = (Map<Object, Object>) sd0_val.get(j);
					System.out.println(dsMap_sd0.toString());
					if(dsMap.get("COL1").equals(dsMap_sd0.get("B"))){
						double dsMap_sd0_val = Math.round((Double) dsMap_sd0.get("A") * 100000) / (double) 100000;
						list.get(i).put("COL5", dsMap_sd0_val);
					}
				}
				
				//IQR 추가
				for(int j=0; j < iqr_val.size(); j++){
					Map<Object,Object> dsMap_iqr = (Map<Object, Object>) iqr_val.get(j);
					System.out.println(dsMap_iqr.toString());
					if(dsMap.get("COL1").equals(dsMap_iqr.get("B"))){
						double dsMap_iqr_val = Math.round((Double) dsMap_iqr.get("A") * 100000) / (double) 100000;
						list.get(i).put("COL6", dsMap_iqr_val);
					}
				}
			}
			
			returnMap.put("gridData", list);
			
		}catch(RenjinException e) {
			returnMap.put("ERR_CD", "200");
			returnMap.put("ERR_TEXT", " 비모수 독립 2 - 집단통계량");
			returnMap.put("ERR_MSG", e.getMessage());
		}catch(Exception e) {
			returnMap.put("ERR_CD", "100");
			returnMap.put("ERR_TEXT", " 비모수 독립 2 - 집단통계량");
			returnMap.put("ERR_MSG", e.getMessage());
		}

		return  returnMap;
	}
	
//	@Override
//	public Object indeSampleKGrid1(Map<Object, Object> paramMap) {
//		Map<Object,Object> returnMap = new HashMap<Object,Object>();
//		returnMap.put("gridData", basicAnalysisDAO.selectIndeSampleKDataGrid1(paramMap));
//		
//		return returnMap;
//	}
	/**
	 * 비모수 독립 K - 비모수검정 : 검정통계량
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	@Override
	public Object indeSampleKGrid2(Map<Object, Object> paramMap) throws Exception {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		
		// CODE 카운트 체크
		int cnt = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap);
		if(cnt == 2) {

			// 기초분석을 위한 데이터 불러오기
			List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2(paramMap);
			Map<Object,Object> result1 = new HashMap<Object,Object>();
			Map<Object,Object> result2 = new HashMap<Object,Object>();
			Map<Object,Object> result3 = new HashMap<Object,Object>();
			List<Map<Object, Object>> list = Lists.newArrayList();
			
			try {
				//kt_stat1
				double kt_stat1_val = Math.round(AnalysisFunctions.kt_stat1(list_sub) * 1000) / (double) 1000;
				System.out.println(kt_stat1_val);
				result1.put("VAL", kt_stat1_val);
				result1.put("SV", "COL1");
				list.add(result1);
				
				//kt_df
				double kt_df_val = Math.round(AnalysisFunctions.kt_df(list_sub) * 1000) / (double) 1000;
				System.out.println(kt_df_val);
				result2.put("VAL", kt_df_val);
				result2.put("SV", "COL2");
				list.add(result2);
				
				//kt_pv
				double kt_pv_val = Math.round(AnalysisFunctions.kt_pv(list_sub) * 1000) / (double) 1000;
				if(kt_pv_val == 0){
					result3.put("VAL", "< 0.001");
				}else{
					result3.put("VAL", kt_pv_val);
				}
				System.out.println(kt_pv_val);
				result3.put("SV", "COL3");
				list.add(result3);
				
				// 데이터 재분류
				returnMap.put("gridData", BasicAnalysisUtil.transformToList(list));
				
			}catch(RenjinException e) {
				returnMap.put("ERR_CD", "200");
				returnMap.put("ERR_TEXT", " 비모수 독립 K > 검정통계량");
				returnMap.put("ERR_MSG", e.getMessage());
			}catch(Exception e) {
				returnMap.put("ERR_CD", "100");
				returnMap.put("ERR_TEXT", " 비모수 독립 K > 검정통계량");
				returnMap.put("ERR_MSG", e.getMessage());
			}

		}else{
			returnMap.put("gridData_msg", cnt);
		}
		
		
		return returnMap;
	}
	
	/**
	 * 비모수 독립 K - 비모수검정 : 검정통계량
	 * @param paramMap
	 * @return
	 */
//	@Override
//	public Object indeSampleKGrid2(Map<Object, Object> paramMap) {
//		Map<Object,Object> returnMap = new HashMap<Object,Object>();
//		// CODE 카운트 체크
//		int cnt = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap);
//		if(cnt >= 2){
//			List<Map<Object, Object>> list = basicAnalysisDAO.selectIndeSampleKDataGrid2(paramMap);
//			// 데이터 재분류
//			returnMap.put("gridData", BasicAnalysisUtil.transformToList(list));
//		}else{
//			returnMap.put("gridData_msg", cnt);
//		}
//		
//		return returnMap;
//	}

	/**
	 * 교차분석표 - X2 검정 : 교차표
	 * @param paramMap
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Object crossAnalysisTableGrid1(Map<Object, Object> paramMap){
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		// Data List
		List<Map<Object, Object>> gridDataList = basicAnalysisDAO.selectCrossAnalysisTableDataGrid1(paramMap);
		List<String> col1List = basicAnalysisDAO.selectCol1ListOfCrossAnalysisTableDataGrid1(paramMap);
		
		List resultList = new ArrayList();
		List tempResultList = new ArrayList();
		List temptFinalList = new ArrayList();
		
		for(String col1 : col1List){
			// Data 리스트 값 재 설정
			for(Map<Object, Object> map : gridDataList){
				if(col1.equals(map.get("COL1"))){
					List tempList = BasicAnalysisUtil.transformToList(map);
					tempResultList = BasicAnalysisUtil.unionColumn(tempList, tempResultList);
				}
			}
			if(tempResultList != null){
				temptFinalList.add(tempResultList);
				tempResultList = new ArrayList();
			}
		}
		for(Object finalList : temptFinalList){
			resultList = BasicAnalysisUtil.union(resultList, (List)finalList);
		}
		System.out.println("## "+resultList.toString());
		returnMap.put("gridData", resultList);
		
		// VARIABLE_002_NAME 값 설정
		String name = (String) paramMap.get("VARIABLE_002_NAME");
		if(name.indexOf("_") > -1){
			name = name.substring(name.indexOf("_")+1);
			name = (name.indexOf("_") > -1) ? name.substring(0, name.indexOf("_")) : name;
		}
		paramMap.put("VARIABLE_002_NAME", name);
		// jqxGrid dataField 
		returnMap.put("gridData_dataFields", basicAnalysisDAO.selectDatafieldsOfCrossAnalysisTableDataGrid1(paramMap));
		// jqxGrid columns
		returnMap.put("gridData_columns", basicAnalysisDAO.selectColumnsOfCrossAnalysisTableDataGrid1(paramMap));
		
		return returnMap;
	}

	/**
	 * 교차분석표 - X2 검정 : 카이제곱검정
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object crossAnalysisTableGrid2(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		// 열: CODE 카운트 체크
		int cnt1 = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap);
		// Parameter 데이터 재 매핑
		Map<Object,Object> paramMap2 = new HashMap<Object,Object>();
		paramMap2.put("TABLE_ID", paramMap.get("TABLE_ID"));
		paramMap2.put("VARIABLE_002", paramMap.get("VARIABLE_001"));
		// 행: CODE 카운트 체크
		int cnt2 = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap2);
		
		if(cnt1 >= 2 && cnt2 >= 2){		
			// Pearson X2
			try {
				List<Map<Object, Object>> resultList2_1 = basicAnalysisDAO.selectCrossAnalysisTableDataGrid2_1(paramMap);
				
				// 기초분석을 위한 데이터 불러오기
				List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2(paramMap);
				Map<Object,Object> result1 = new HashMap<Object,Object>();
				Map<Object,Object> result2 = new HashMap<Object,Object>();
				Map<Object,Object> result3 = new HashMap<Object,Object>();
				
				//ct_stat
				double ct_stat_val = Math.round(AnalysisFunctions.ct_stat(list_sub) * 1000) / (double) 1000;
				System.out.println(ct_stat_val);
				result1.put("VAL", ct_stat_val);
				result1.put("SV", "COL2");
				resultList2_1.add(result1);
				
				//ct_df
				double ct_df_val = Math.round(AnalysisFunctions.ct_df(list_sub) * 1000) / (double) 1000;
				System.out.println(ct_df_val);
				result2.put("VAL", ct_df_val);
				result2.put("SV", "COL3");
				resultList2_1.add(result2);
				
				//ct_pv
				double ct_pv_val = Math.round(AnalysisFunctions.ct_pv(list_sub) * 1000) / (double) 1000;
				if(ct_pv_val == 0){
					result3.put("VAL", "< 0.001");
				}else{
					result3.put("VAL", ct_pv_val);
				}
				System.out.println(ct_pv_val);
				result3.put("SV", "COL4");
				resultList2_1.add(result3);

				Map<String, Object> resultMap2_1 = BasicAnalysisUtil.transformToMap(resultList2_1);
				resultList.add(resultMap2_1);
				
			}catch(RenjinException e) {
				returnMap.put("ERR_CD", "200");
				returnMap.put("ERR_TEXT", "교차분석표 > X2 검정 : 카이제곱검정 - Pearson X2");
				returnMap.put("ERR_MSG", e.getMessage());
			}catch (Exception e) {
				returnMap.put("gridData001_msg", "FAILED");
				
			}
			// 연속성보정
			try{
				List<Map<Object, Object>> resultList2_2 = basicAnalysisDAO.selectCrossAnalysisTableDataGrid2_2(paramMap);
				
				// 기초분석을 위한 데이터 불러오기
				List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2(paramMap);
				Map<Object,Object> result1 = new HashMap<Object,Object>();
				Map<Object,Object> result2 = new HashMap<Object,Object>();
				Map<Object,Object> result3 = new HashMap<Object,Object>();
				
				//ct_stat_c
				double ct_stat_c_val = Math.round(AnalysisFunctions.ct_stat_c(list_sub) * 1000) / (double) 1000;
				System.out.println(ct_stat_c_val);
				result1.put("VAL", ct_stat_c_val);
				result1.put("SV", "COL2");
				resultList2_2.add(result1);
				
				//ct_df_c
				double ct_df_c_val = Math.round(AnalysisFunctions.ct_df_c(list_sub) * 1000) / (double) 1000;
				System.out.println(ct_df_c_val);
				result2.put("VAL", ct_df_c_val);
				result2.put("SV", "COL3");
				resultList2_2.add(result2);
				
				//ct_pv_c
				double ct_pv_c_val = Math.round(AnalysisFunctions.ct_pv_c(list_sub) * 1000) / (double) 1000;
				if(ct_pv_c_val == 0){
					result3.put("VAL", "< 0.001");
				}else{
					result3.put("VAL", ct_pv_c_val);
				}
				System.out.println(ct_pv_c_val);
				result3.put("SV", "COL4");
				resultList2_2.add(result3);
				
				Map<String, Object> resultMap2_2 = BasicAnalysisUtil.transformToMap(resultList2_2);
				resultList.add(resultMap2_2);
			}catch(RenjinException e) {
				returnMap.put("ERR_CD", "200");
				returnMap.put("ERR_TEXT", "교차분석표 > X2 검정 : 카이제곱검정 - 값, df, 점근 P-Value");
				returnMap.put("ERR_MSG", e.getMessage());
			}catch (Exception e) {
				returnMap.put("gridData002_msg", "FAILED");
			}
			// Fisher의 정확검증
			try{
				List<Map<Object, Object>> resultList2_3 = basicAnalysisDAO.selectCrossAnalysisTableDataGrid2_3(paramMap);
				
				// 기초분석을 위한 데이터 불러오기
				List<Map<Object, Object>> list_sub = basicAnalysisDAO.selectAnalysisData2(paramMap);
				Map<Object,Object> result1 = new HashMap<Object,Object>();
				
				//ft_pv
				double ft_pv_val = Math.round(AnalysisFunctions.ft_pv(list_sub) * 1000) / (double) 1000;
				if(ft_pv_val == 0){
					result1.put("VAL", "< 0.001");
				}else{
					result1.put("VAL", ft_pv_val);
				}
				System.out.println(ft_pv_val);
				result1.put("SV", "COL5");
				resultList2_3.add(result1);
				
				Map<String, Object> resultMap2_3 = BasicAnalysisUtil.transformToMap(resultList2_3);
				resultList.add(resultMap2_3);
			}catch(RenjinException e) {
				returnMap.put("ERR_CD", "200");
				returnMap.put("ERR_TEXT", "교차분석표 > X2 검정 : 카이제곱검정 - 정확한 P-Value");
				returnMap.put("ERR_MSG", e.getMessage());
			}catch (Exception e) {
				returnMap.put("gridData003_msg", "FAILED");
			}
			returnMap.put("gridData", resultList);
			
		}else{
			int res = (cnt1 > cnt2) ? cnt2 : cnt1;
			returnMap.put("gridData_msg", res);
		}
		
		return returnMap;
	}
	
//	@Override
//	public Object crossAnalysisTableGrid2(Map<Object, Object> paramMap) {
//		Map<Object,Object> returnMap = new HashMap<Object,Object>();
//		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
//		// 열: CODE 카운트 체크
//		int cnt1 = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap);
//		// Parameter 데이터 재 매핑
//		Map<Object,Object> paramMap2 = new HashMap<Object,Object>();
//		paramMap2.put("TABLE_ID", paramMap.get("TABLE_ID"));
//		paramMap2.put("VARIABLE_002", paramMap.get("VARIABLE_001"));
//		// 행: CODE 카운트 체크
//		int cnt2 = (Integer) basicAnalysisDAO.selectGroupVariableCount(paramMap2);
//		
//		if(cnt1 >= 2 && cnt2 >= 2){
//			// Pearson X2
//			try {
//				List<Map<Object, Object>> resultList2_1 = basicAnalysisDAO.selectCrossAnalysisTableDataGrid2_1(paramMap);
//				Map<String, Object> resultMap2_1 = BasicAnalysisUtil.transformToMap(resultList2_1);
//				resultList.add(resultMap2_1);
//			} catch (Exception e) {
//				returnMap.put("gridData001_msg", "FAILED");
//			}
//			// 연속성보정
//			try{
//				List<Map<Object, Object>> resultList2_2 = basicAnalysisDAO.selectCrossAnalysisTableDataGrid2_2(paramMap);
//				Map<String, Object> resultMap2_2 = BasicAnalysisUtil.transformToMap(resultList2_2);
//				resultList.add(resultMap2_2);
//			} catch (Exception e) {
//				returnMap.put("gridData002_msg", "FAILED");
//			}
//			// Fisher의 정확검증
//			try{
//				List<Map<Object, Object>> resultList2_3 = basicAnalysisDAO.selectCrossAnalysisTableDataGrid2_3(paramMap);
//				Map<String, Object> resultMap2_3 = BasicAnalysisUtil.transformToMap(resultList2_3);
//				resultList.add(resultMap2_3);
//			} catch (Exception e) {
//				returnMap.put("gridData003_msg", "FAILED");
//			}
//			returnMap.put("gridData", resultList);
//		}else{
//			int res = (cnt1 > cnt2) ? cnt2 : cnt1;
//			returnMap.put("gridData_msg", res);
//		}
//		
//		return returnMap;
//	}

	/**
	 * 상관분석 - 통계량 
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object careCalculationGrid1(Map<Object, Object> paramMap) {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		List<Map<Object, Object>> list001 = basicAnalysisDAO.selectCareCalculationDataGrid1(paramMap);
		// 데이터 재분류
		Map<String, Object> map001 = BasicAnalysisUtil.transformToMap(list001);
		// COL1 값 설정
		String name001 = (String) paramMap.get("VARIABLE_001_NAME");
		if(name001.indexOf("_") > -1){
			name001 = name001.substring(name001.indexOf("_")+1);
			name001 = (name001.indexOf("_") > -1) ? name001.substring(0, name001.indexOf("_")) : name001;
		}
		map001.put("COL1", name001);
		
		// 기초분석을 위한 데이터 불러오기
		List<Map<Object, Object>> list_sub001 = basicAnalysisDAO.selectAnalysisDataFirst(paramMap);
		
		try {
			//mid
			List mid_val1 = AnalysisFunctions.mid(list_sub001);
			System.out.println(mid_val1);
			Map<Object,Object> dsMap_mid1 = (Map<Object, Object>) mid_val1.get(0);
			String mid_val_str1 = dsMap_mid1.get(paramMap.get("VARIABLE_001")).toString();
			map001.put("COL4", mid_val_str1);
			
			//sd0
			List sd0_val1 = AnalysisFunctions.sd0(list_sub001);
			System.out.println(sd0_val1);
			Map<Object,Object> dsMap_sd01 = (Map<Object, Object>) sd0_val1.get(0);
			double sd0_val_dub1 = Math.round((Double) dsMap_sd01.get(paramMap.get("VARIABLE_001")) * 1000) / (double) 1000;
			map001.put("COL5", sd0_val_dub1);
			
			//iqr
			List iqr_val1 = AnalysisFunctions.iqr(list_sub001);
			System.out.println(iqr_val1);
			Map<Object,Object> dsMap_iqr01 = (Map<Object, Object>) iqr_val1.get(0);
			double iqr_val_dub1 = Math.round((Double) dsMap_iqr01.get(paramMap.get("VARIABLE_001")) * 1000) / (double) 1000;
			map001.put("COL6", iqr_val_dub1);
					
			resultList.add(map001);
			
			// Parameter 데이터 재 매핑
			Map<Object,Object> paramMap2 = new HashMap<Object,Object>();
			paramMap2.put("TABLE_ID", paramMap.get("TABLE_ID"));
			paramMap2.put("VARIABLE_001", paramMap.get("VARIABLE_002"));
			List<Map<Object, Object>> list002 = basicAnalysisDAO.selectCareCalculationDataGrid1(paramMap2);
			// 데이터 재분류
			Map<String, Object> map002 = BasicAnalysisUtil.transformToMap(list002);
			// COL1 값 설정
			String name002 = (String) paramMap.get("VARIABLE_002_NAME");
			if(name002.indexOf("_") > -1){
				name002 = name002.substring(name002.indexOf("_")+1);
				name002 = (name002.indexOf("_") > -1) ? name002.substring(0, name002.indexOf("_")) : name002;
			}
			map002.put("COL1", name002);
			
			// 기초분석을 위한 데이터 불러오기
			List<Map<Object, Object>> list_sub002 = basicAnalysisDAO.selectAnalysisDataFirst(paramMap2);
			
			//mid
			List mid_val2 = AnalysisFunctions.mid(list_sub002);
			System.out.println(mid_val2);
			Map<Object,Object> dsMap2 = (Map<Object, Object>) mid_val2.get(0);
			String mid_val_str2 = dsMap2.get(paramMap2.get("VARIABLE_001")).toString();
			map002.put("COL4", mid_val_str2);
			
			//sd0
			List sd0_val2 = AnalysisFunctions.sd0(list_sub002);
			System.out.println(sd0_val2);
			Map<Object,Object> dsMap_sd02 = (Map<Object, Object>) sd0_val2.get(0);
			double sd0_val_dub2 = Math.round((Double) dsMap_sd02.get(paramMap2.get("VARIABLE_001")) * 1000) / (double) 1000;
			map002.put("COL5", sd0_val_dub2);
			
			//iqr
			List iqr_val2 = AnalysisFunctions.iqr(list_sub002);
			System.out.println(iqr_val2);
			Map<Object,Object> dsMap_iqr02 = (Map<Object, Object>) iqr_val2.get(0);
			double iqr_val_dub2 = Math.round((Double) dsMap_iqr02.get(paramMap2.get("VARIABLE_001")) * 1000) / (double) 1000;
			map002.put("COL6", iqr_val_dub2);
			
			resultList.add(map002);
			
			returnMap.put("gridData", resultList);
			
		}catch(RenjinException e) {
			returnMap.put("ERR_CD", "200");
			returnMap.put("ERR_TEXT", " 상관분석 - 통계량 ");
			returnMap.put("ERR_MSG", e.getMessage());
		}catch(Exception e) {
			returnMap.put("ERR_CD", "100");
			returnMap.put("ERR_TEXT", " 상관분석 - 통계량 ");
			returnMap.put("ERR_MSG", e.getMessage());
		}
		
		return returnMap;
	}
//	@Override
//	public Object careCalculationGrid1(Map<Object, Object> paramMap) {
//		Map<Object,Object> returnMap = new HashMap<Object,Object>();
//		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
//		List<Map<Object, Object>> list001 = basicAnalysisDAO.selectCareCalculationDataGrid1(paramMap);
//		// 데이터 재분류
//		Map<String, Object> map001 = BasicAnalysisUtil.transformToMap(list001);
//		// COL1 값 설정
//		String name001 = (String) paramMap.get("VARIABLE_001_NAME");
//		if(name001.indexOf("_") > -1){
//			name001 = name001.substring(name001.indexOf("_")+1);
//			name001 = (name001.indexOf("_") > -1) ? name001.substring(0, name001.indexOf("_")) : name001;
//		}
//		map001.put("COL1", name001);
//		resultList.add(map001);
//		
//		// Parameter 데이터 재 매핑
//		Map<Object,Object> paramMap2 = new HashMap<Object,Object>();
//		paramMap2.put("TABLE_ID", paramMap.get("TABLE_ID"));
//		paramMap2.put("VARIABLE_001", paramMap.get("VARIABLE_002"));
//		paramMap2.put("VARIABLE_002", paramMap.get("VARIABLE_001"));
//		List<Map<Object, Object>> list002 = basicAnalysisDAO.selectCareCalculationDataGrid1(paramMap2);
//		// 데이터 재분류
//		Map<String, Object> map002 = BasicAnalysisUtil.transformToMap(list002);
//		// COL1 값 설정
//		String name002 = (String) paramMap.get("VARIABLE_002_NAME");
//		if(name002.indexOf("_") > -1){
//			name002 = name002.substring(name002.indexOf("_")+1);
//			name002 = (name002.indexOf("_") > -1) ? name002.substring(0, name002.indexOf("_")) : name002;
//		}
//		map002.put("COL1", name002);
//		resultList.add(map002);
//		
//		returnMap.put("gridData", resultList);
//		
//		return returnMap;
//	}
	/**
	 * 상관분석 - Pearson  상관계수
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	@Override
	public Object careCalculationGrid2(Map<Object, Object> paramMap) throws Exception {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();

		// 기초분석을 위한 데이터 불러오기
		List<Map<Object, Object>> pearsonList = basicAnalysisDAO.selectAnalysisData2(paramMap);
		Map<Object,Object> result1 = new HashMap<Object,Object>();
		Map<Object,Object> result2 = new HashMap<Object,Object>();
		List<Map<Object, Object>> list = Lists.newArrayList();
		
		try {
			//ct_p_esti
			double ct_p_esti_val = Math.round(AnalysisFunctions.ct_p_esti(pearsonList) * 1000) / (double) 1000;
			System.out.println(ct_p_esti_val);
			result1.put("VAL", ct_p_esti_val);
			result1.put("SV", "COL1");
			list.add(result1);
			
			//ct_p_esti_pv0
			double ct_p_esti_pv0_val = Math.round(AnalysisFunctions.ct_p_esti_pv0(pearsonList) * 1000) / (double) 1000;
			if(ct_p_esti_pv0_val == 0){
				result2.put("VAL", "< 0.001");
			}else{
				result2.put("VAL", ct_p_esti_pv0_val);
			}
			System.out.println(ct_p_esti_pv0_val);
			result2.put("SV", "COL2");
			list.add(result2);
			
			// 데이터 재분류
			returnMap.put("gridData", BasicAnalysisUtil.transformToList(list));
			
		}catch(RenjinException e) {
			returnMap.put("ERR_CD", "200");
			returnMap.put("ERR_TEXT", " 상관분석 - Pearson 상관계수");
			returnMap.put("ERR_MSG", e.getMessage());
		}catch(Exception e) {
			returnMap.put("ERR_CD", "100");
			returnMap.put("ERR_TEXT", " 상관분석 - Pearson 상관계수");
			returnMap.put("ERR_MSG", e.getMessage());
		}
		
		return returnMap;
	}
//	@Override
//	public Object careCalculationGrid2(Map<Object, Object> paramMap) {
//		Map<Object,Object> returnMap = new HashMap<Object,Object>();
//		List<Map<Object, Object>> pearsonList = basicAnalysisDAO.selectCareCalculationDataGrid2(paramMap);
//		// 데이터 재분류
//		returnMap.put("gridData", BasicAnalysisUtil.transformToList(pearsonList));
//
//		return returnMap;
//	}
	/**
	 * 상관분석 - Spearman 순위상관계수  
	 * @param paramMap
	 * @return
	 */
	@Override
	public Object careCalculationGrid3(Map<Object, Object> paramMap) throws Exception {
		Map<Object,Object> returnMap = new HashMap<Object,Object>();

		// 기초분석을 위한 데이터 불러오기
		List<Map<Object, Object>> spearmanList = basicAnalysisDAO.selectAnalysisData2(paramMap);
		Map<Object,Object> result1 = new HashMap<Object,Object>();
		Map<Object,Object> result2 = new HashMap<Object,Object>();
		List<Map<Object, Object>> list = Lists.newArrayList();
		
		try {
			//ct_s_esti
			double ct_s_esti_val = Math.round(AnalysisFunctions.ct_s_esti(spearmanList) * 1000) / (double) 1000;
			System.out.println(ct_s_esti_val);
			result1.put("VAL", ct_s_esti_val);
			result1.put("SV", "COL1");
			list.add(result1);
			
			//ct_s_esti_pv
			double ct_s_esti_pv_val = Math.round(AnalysisFunctions.ct_s_esti_pv(spearmanList) * 1000) / (double) 1000;
			if(ct_s_esti_pv_val == 0){
				result2.put("VAL", "< 0.001");
			}else{
				result2.put("VAL", ct_s_esti_pv_val);
			}
			System.out.println(ct_s_esti_pv_val);
			result2.put("SV", "COL2");
			list.add(result2);
			
			// 데이터 재분류
			returnMap.put("gridData", BasicAnalysisUtil.transformToList(list));

		}catch(RenjinException e) {
			returnMap.put("ERR_CD", "200");
			returnMap.put("ERR_TEXT", " 상관분석 - Spearman 순위상관계수");
			returnMap.put("ERR_MSG", e.getMessage());
		}catch(Exception e) {
			returnMap.put("ERR_CD", "100");
			returnMap.put("ERR_TEXT", " 상관분석 - Spearman 순위상관계수");
			returnMap.put("ERR_MSG", e.getMessage());
		}
		return returnMap;
	}
//	@Override
//	public Object careCalculationGrid3(Map<Object, Object> paramMap) {
//		Map<Object,Object> returnMap = new HashMap<Object,Object>();
//		List<Map<Object, Object>> spearmanList = basicAnalysisDAO.selectCareCalculationDataGrid3(paramMap);
//		// 데이터 재분류
//		returnMap.put("gridData", BasicAnalysisUtil.transformToList(spearmanList));
//
//		return returnMap;
//	}


}
