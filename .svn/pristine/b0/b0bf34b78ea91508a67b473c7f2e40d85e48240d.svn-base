package com.softcen.bigcen.med.research.basicAnalysis.service;

import java.util.Map;

/**
 * 단면연구 > 연구항목 > 기초분석 interface 
 * @author RedEye
 *
 */
public interface IBasicAnalysisService {
	/**
	 * 독립표본 T검정 - 통계분석
	 * @param paramMap
	 * @return
	 */
	Object indeSampleTTestGrid1(Map<Object,Object> paramMap);
	/**
	 * 독립표본 T검정 - (독립표본검정)
	 * @param paramMap
	 * @return
	 */
	Object indeSampleTTestGrid2(Map<Object,Object> paramMap);
	
	/**
	 * 대응표본 T검정 - (대응표본통계)
	 * @param paramMap
	 * @return
	 */
	Object actionSampleTTestGrid1(Map<Object,Object> paramMap);
	/**
	 * 대응표본 T검정 - (대응표본검정)
	 * @param paramMap
	 * @return
	 */
	Object actionSampleTTestGrid2(Map<Object,Object> paramMap);
	
	/**
	 * 일원분산분석 - 분산분석 : 요인그룹통계 
	 * @param paramMap
	 * @return
	 */
	Object oneWayAnalysisGrid1(Map<Object,Object> paramMap);
	/**
	 * 일원분산분석 - 분산분석 : 분산분석
	 * 					사후분석(Tukey): 다중비교, 동일집단군
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	Object oneWayAnalysisGrid2(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 비모수 독립 2 - 표본검정 : 그룹통계
	 * @param paramMap
	 * @return
	 */
	Object indeSample2Grid1(Map<Object,Object> paramMap);
	/**
	 * 비모수 독립 2 - 표본검정 : 검정통계량
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	Object indeSample2Grid2(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 비모수 독립 K - 표본검정 : 그룹통계
	 * @param paramMap
	 * @return
	 */
	Object indeSampleKGrid1(Map<Object,Object> paramMap);
	/**
	 * 비모수 독립 K - 표본검정 : 검정통계량
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	Object indeSampleKGrid2(Map<Object,Object> paramMap) throws Exception;
	
	/**
	 * 교차분석표 - T검정 : 그룹통계
	 * @param paramMap
	 * @return
	 */
	Object crossAnalysisTableGrid1(Map<Object,Object> paramMap);
	/**
	 * 교차분석표 - T검정 :  X2 검정
	 * @param paramMap
	 * @return
	 */
	Object crossAnalysisTableGrid2(Map<Object,Object> paramMap);
	
	/**
	 * 이변량상관계수 - 표본통계  
	 * @param paramMap
	 * @return
	 */
	Object careCalculationGrid1(Map<Object,Object> paramMap);
	/**
	 * 이변량상관계수 -  Pearson  
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	Object careCalculationGrid2(Map<Object,Object> paramMap) throws Exception;
	/**
	 * 이변량상관계수 - Spearman  
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	Object careCalculationGrid3(Map<Object,Object> paramMap) throws Exception;
	
}
