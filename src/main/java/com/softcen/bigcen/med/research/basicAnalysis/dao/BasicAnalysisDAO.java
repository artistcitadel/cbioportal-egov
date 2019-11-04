package com.softcen.bigcen.med.research.basicAnalysis.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository("basicAnalysisDAO")
public class BasicAnalysisDAO extends BigcenMedAbstractMapperDAO{

	/**
	 * CODE 카운트 체크
	 * @param paramMap
	 * @return
	 */
	public Object selectGroupVariableCount(Map<Object, Object> paramMap){
		return sqlSessionVerticaA.selectOne("basicAnalysis.selectGroupVariableCount", paramMap);
	}
	/**
	 * 독립표본 T검정 - 집단통계분량
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectIndeSampleTTestDataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectIndeSampleTTestDataGrid1", paramMap);
	}
	/**
	 * 독립표본 T검정 - 독립표본검정
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectIndeSampleTTestDataGrid2(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectIndeSampleTTestDataGrid2", paramMap);
	}
	/**
	 * 대응표본 T검정 - 대응표본통계량
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectActionSampleTTestDataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectActionSampleTTestDataGrid1", paramMap);
	}
	/**
	 * 대응표본 T검정 - 대응표본검정
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectActionSampleTTestDataGrid2(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectActionSampleTTestDataGrid2", paramMap);
	}
	/**
	 * 일원분산분석 > 분산분석 > 기술통계 
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectOneWayAnalysisDataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectOneWayAnalysisDataGrid1", paramMap);
	}
	/**
	 * 일원분산분석 > 분산분석 > 분산분석
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectOneWayAnalysisDataGrid2(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectOneWayAnalysisDataGrid2", paramMap);
	}
	/**
	 * 일원분산분석 > 사후분석(Tukey) > 다중비교
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectOneWayAnalysisDataGrid3(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectOneWayAnalysisDataGrid3", paramMap);
	}
	/**
	 * 일원분산분석 > 사후분석(Tukey) > 동일집단군
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectOneWayAnalysisDataGrid4(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectOneWayAnalysisDataGrid4", paramMap);
	}
	/**
	 * 비모수 독립 2 > 비모수검정 > 집단통계량
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectIndeSample2DataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectIndeSample2DataGrid1", paramMap);
	}
	/**
	 * 비모수 독립 2 > 비모수검정 > 검정통계량
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectIndeSample2DataGrid2(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectIndeSample2DataGrid2", paramMap);
	}
	/**
	 * 비모수 독립 K > 비모수검정 > 집단통계량
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectIndeSampleKDataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectIndeSampleKDataGrid1", paramMap);
	}
	/**
	 * 비모수 독립 K > 비모수검정 > 검정통계량
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectIndeSampleKDataGrid2(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectIndeSampleKDataGrid2", paramMap);
	}
	/**
	 * 교차분석표 > 교차표
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectCrossAnalysisTableDataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectCrossAnalysisTableDataGrid1", paramMap);
	}
	/**
	 * 교차분석표 > 교차표(열 리스트)
	 * @param paramMap
	 * @return
	 */
	public List<String> selectCol1ListOfCrossAnalysisTableDataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectCol1ListOfCrossAnalysisTableDataGrid1", paramMap);
	}
	/**
	 * 교차분석표 > 교차표(jqxGrid Datafields)
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectDatafieldsOfCrossAnalysisTableDataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectDatafieldsOfCrossAnalysisTableDataGrid1", paramMap);
	}
	/**
	 * 교차분석표 > 교차표(jqxGrid Columns)
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectColumnsOfCrossAnalysisTableDataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectColumnsOfCrossAnalysisTableDataGrid1", paramMap);
	}
	/**
	 * 교차분석표 > 교차표(jqxGrid Columngroups)
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectColumngroupsOfCrossAnalysisTableDataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectColumngroupsOfCrossAnalysisTableDataGrid1", paramMap);
	}
	/**
	 * 교차분석표 > 카이제곱검증 > Pearson X2
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectCrossAnalysisTableDataGrid2_1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectCrossAnalysisTableDataGrid2_1", paramMap);
	}
	/**
	 * 교차분석표 > 카이제곱검증 > 연속성보정 
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectCrossAnalysisTableDataGrid2_2(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectCrossAnalysisTableDataGrid2_2", paramMap);
	}
	/**
	 * 교차분석표 > 카이제곱검증 >  Fisher의 정확검증
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectCrossAnalysisTableDataGrid2_3(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectCrossAnalysisTableDataGrid2_3", paramMap);
	}
	/**
	 * 상관분석> 통계량
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectCareCalculationDataGrid1(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectCareCalculationDataGrid1", paramMap);
	}
	/**
	 * 상관분석> Pearson 상관계수
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectCareCalculationDataGrid2(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectCareCalculationDataGrid2", paramMap);
	}
	/**
	 * 상관분석> Spearman 순위상관계수
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectCareCalculationDataGrid3(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectCareCalculationDataGrid3", paramMap);
	}
	/**
	 * 분석에 필요한 데이터 검색 (first column)
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectAnalysisDataFirst(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectAnalysisDataFirst", paramMap);
	}
	/**
	 * 분석에 필요한 데이터 검색 (second column)
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectAnalysisDataSecond(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectAnalysisDataSecond", paramMap);
	}
	/**
	 * 분석에 필요한 데이터 검색 (2 column)
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectAnalysisData2(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectAnalysisData2", paramMap);
	}
	
	/**
	 * 분석에 필요한 데이터 검색 (2 column) where not null
	 * @param paramMap
	 * @return
	 */
	public List<Map<Object, Object>> selectAnalysisData2NotNull(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("basicAnalysis.selectAnalysisData2NotNull", paramMap);
	}

}
