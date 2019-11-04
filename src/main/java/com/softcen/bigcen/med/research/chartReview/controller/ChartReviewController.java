package com.softcen.bigcen.med.research.chartReview.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.research.chartReview.service.IChartReviewService;
import com.softcen.bigcen.med.research.crssec.service.ICrossSectionalStudyService;

@Controller
@RequestMapping("/research/chartReview")
public class ChartReviewController extends BigcenMedAbstractController{
	
	@Autowired
	private IChartReviewService chartReviewService;
	
	@Autowired
	private ICrossSectionalStudyService crossSectionalStudyService;
	
	@RequestMapping(value="/chartReviewMain")
	public String chartReviewMain(){
		return "/research/chartReview/chartReviewMain.tiles";
	}
	
	/**
	 * 개인조건 + 데이터
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getMySaveList")
	public Object getApproveMySaveList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectMySaveList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsMySaveList", chartReviewService.selectMySaveList(paramMap));
			//resultMap = (HashMap)chartReviewService.selectMySaveList(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 데이터 가져오기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getItemContDetlList")
	public Object getItemContDetlList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectItemContDetlList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			List metaDataList  = new ArrayList();
			List dataResultPeriodList  = new ArrayList();
			List dataResultList  = new ArrayList();
			//컬럼정보
		//	metaDataList = (ArrayList)approveService.selectDataColumnList(paramMap);
			
			metaDataList = (ArrayList)crossSectionalStudyService.selectDataColumnList(paramMap);
			
			//주기정보
			//dataResultPeriodList = (ArrayList)approveService.selectDataResultPeriodList(paramMap);
			
			//데이터
			//dataResultList = (ArrayList)approveService.selectDataResultList(paramMap);
			
			//Map dataMap = (HashMap)crossSectionalStudyService.selectDataResultList(paramMap);
			Map dataMap = new HashMap();
			
			dataMap = (HashMap)crossSectionalStudyService.selectDataResultList(paramMap);
			
			dataResultPeriodList = (ArrayList)dataMap.get("dsDataResultPeriodList");
			dataResultList = (ArrayList)dataMap.get("dsDataResultList");
			
			resultMap.put("dsMetaDataList", metaDataList);
			resultMap.put("dsDataResultPeriodList", dataResultPeriodList);
			resultMap.put("dsDataResultList", dataResultList);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 승인/거부
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/setDataDel")
	public Object updateDataDel(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START updateDataDel");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			chartReviewService.updateDataDel(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	@RequestMapping(value="/chartReviewDownloadPopup")
	public String chartReviewDownloadPop(){
		return "/popup/chartReviewDownloadPopup.tiles";
	}
	
	/**
	 * 입력항목 추가
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/setColumnAdd")
	public Object alterColumnAdd(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START alterColumnAdd");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			chartReviewService.alterColumnAdd(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	
	/**
	 * 입력항목 삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/setColumnDel")
	public Object alterColumnDel(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START alterColumnAdd");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			chartReviewService.alterColumnDel(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	
	/**
	 * 입력항목 필드값 추가
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/setDataVal")
	public Object updateDataVal(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START updateDataVal");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			chartReviewService.updateDataVal(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 환자 아이디 가져오기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getPatId")
	public Object selectPatId(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START selectPatId");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsPatId", chartReviewService.selectPatId(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}

}
