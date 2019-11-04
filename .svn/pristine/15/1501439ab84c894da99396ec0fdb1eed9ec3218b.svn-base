package com.softcen.bigcen.med.research.basicAnalysis.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.med.research.basicAnalysis.service.IBasicAnalysisService;
import com.softcen.bigcen.med.research.query.service.IQueryService;



/**
 * 단면연구 > 연구항목 > 기초분석 Controller 
 * @author RedEye
 *
 */
@Controller
@RequestMapping(value="/basicAnalysis")
public class BasicAnalysisController {
	
	private static final Logger logger = LoggerFactory.getLogger(BasicAnalysisController.class);
	
	@Autowired
	private IQueryService queryService;
	
	@Autowired
	private IBasicAnalysisService basicAnalysisService;
	
	@RequestMapping(value="/main")
	public String basicAnalysisMain(@RequestParam String contSeq, @RequestParam String dataSeq, Model model){
		logger.debug("[--- START basicAnalysisMain");
		logger.info(">>> CONT_SEQ : " + contSeq);
		logger.info(">>> DATA_SEQ : " + dataSeq);
		
		model.addAttribute("CONT_SEQ", contSeq);
		model.addAttribute("DATA_SEQ", dataSeq);
		return "/basicAnalysis/basicAnalysisMain.tiles";
	}
	
	/**
	 * [공통]분석 대상 테이블 정보 얻기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/analysisTableInfo")
	public Object analysisTableInfo(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START analysisTableInfo");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			// 테이블 정보
			// "dsItemContData" : 테이블 ID 정보
			// "dsItemContDataDetl" : 테이블 컬럼 정보
			resultMap = (HashMap)queryService.getOlapInfo(paramMap);
			
			Map<Object, Object> map = (Map<Object, Object>) ((List<Object>)resultMap.get("dsItemContData")).get(0);
			System.out.println("TABLE_ID >> " + map.get("TABLE_ID"));
			logger.debug("indeSampleTTest >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 독립표본 T검정 - 집단통계량
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/indeSampleTTestGrid1")
	public Object indeSampleTTestGrid1(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START indeSampleTTestGrid1");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.indeSampleTTestGrid1(paramMap);
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 독립표본 T검정 - 독립표본검정
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/indeSampleTTestGrid2")
	public Object indeSampleTTestGrid2(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START indeSampleTTestGrid2");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.indeSampleTTestGrid2(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 대응표본 T검정 - 대응표본통계량
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/actionSampleTTestGrid1")
	public Object actionSampleTTestGrid1(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START actionSampleTTestGrid1");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.actionSampleTTestGrid1(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 대응표본 T검정 - 대응표본검정
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/actionSampleTTestGrid2")
	public Object actionSampleTTestGrid2(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START actionSampleTTestGrid2");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.actionSampleTTestGrid2(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 일원분산분석 - 분산분석 : 기술통계
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/oneWayAnalysisGrid1")
	public Object oneWayAnalysisGrid1(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START oneWayAnalysisGrid1");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.oneWayAnalysisGrid1(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 일원분산분석 - 분산분석 : 분산분석
	 * 					사후분석(Tukey): 다중비교, 동일집단군
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/oneWayAnalysisGrid2")
	public Object oneWayAnalysisGrid2(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START oneWayAnalysisGrid2");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.oneWayAnalysisGrid2(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 비모수 독립 2 - 비모수검정 : 집단통계량
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/indeSample2Grid1")
	public Object indeSample2Grid1(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START indeSample2Grid1");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.indeSample2Grid1(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 비모수 독립 2 - 비모수검정 :  검정통계량
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/indeSample2Grid2")
	public Object indeSample2Grid2(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START indeSample2Grid2");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.indeSample2Grid2(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 비모수 독립 K - 비모수검정 : 집단통계량
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/indeSampleKGrid1")
	public Object indeSampleKGrid1(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START indeSampleKGrid1");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.indeSampleKGrid1(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 비모수 독립 K - 비모수검정 : 검정통계량
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/indeSampleKGrid2")
	public Object indeSampleKGrid2(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START indeSampleKGrid2");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.indeSampleKGrid2(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 교차분석표 - X2 검정 : 교차표
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/crossAnalysisTableGrid1")
	public Object crossAnalysisTableGrid1(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START crossAnalysisTableGrid1");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.putAll((HashMap)basicAnalysisService.crossAnalysisTableGrid1(paramMap));
			
			logger.debug("gridData >>>>>" + resultMap.toString());
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	/**
	 * 교차분석표 - X2 검정 : 카이제곱검정 
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/crossAnalysisTableGrid2")
	public Object crossAnalysisTableGrid2(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START crossAnalysisTableGrid2");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.putAll((HashMap)basicAnalysisService.crossAnalysisTableGrid2(paramMap));
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 상관분석 - 통계량
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/careCalculationGrid1")
	public Object careCalculationGrid1(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START careCalculationGrid1");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.careCalculationGrid1(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	/**
	 * 상관분석 -  Pearson 상관계수
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/careCalculationGrid2")
	public Object careCalculationGrid2(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START careCalculationGrid2");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.careCalculationGrid2(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	/**
	 * 상관분석 - Spearman  순위상관계수
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/careCalculationGrid3")
	public Object careCalculationGrid3(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START careCalculationGrid3");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap = (HashMap)basicAnalysisService.careCalculationGrid3(paramMap);
			
			logger.debug("gridData >>>>>" + resultMap.toString());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
}
