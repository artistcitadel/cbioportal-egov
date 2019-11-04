package com.softcen.bigcen.med.research.approve.controller;

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
import com.softcen.bigcen.med.research.approve.service.IApproveService;
import com.softcen.bigcen.med.research.crssec.service.ICrossSectionalStudyService;

@Controller
@RequestMapping("/research/approve")
public class ApproveController extends BigcenMedAbstractController{
	
	@Autowired
	private IApproveService approveService;
	
	@Autowired
	private ICrossSectionalStudyService crossSectionalStudyService;
	
	@RequestMapping(value="/approveMain")
	public String approveMain(){
		return "/research/approve/approveMain.tiles";
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
			resultMap.put("dsMySaveList", approveService.selectMySaveList(paramMap));
			//resultMap = (HashMap)approveService.selectMySaveList(paramMap);
			
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
	 * 승인요청 저장
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/setPurposeData")
	public Object insertPurposeData(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START insertPurposeData");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			approveService.insertPurposeData(paramMap);
			resultMap.put("ERR_CD", 	"0");
			resultMap.put("ERR_MSG", 	"OK");
			resultMap.put("SEQ",		paramMap.get("SEQ"));
			resultMap.put("CONT_SEQ", 	paramMap.get("CONT_SEQ"));
			resultMap.put("PURPOSE_CD", paramMap.get("PURPOSE_CD"));
			resultMap.put("DATA_NM", 	paramMap.get("DATA_NM"));
			resultMap.put("CONDT_NM", 	paramMap.get("CONDT_NM"));
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 승인요청/조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getRequestList")
	public Object getApproveRequestList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectRequestList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsRequestList", approveService.selectRequestList(paramMap));
			//resultMap = (HashMap)approveService.selectRequestList(paramMap);
			
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
	
	@ResponseBody
	@RequestMapping(value="/getRegexSearchList")
	public Object getRegexSearchList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectItemContDetlList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			List dataResultList  = new ArrayList();

			Map dataMap = new HashMap();
			
			//dataMap = (HashMap)crossSectionalStudyService.selectRegexSearchDataList(paramMap);
			
			dataResultList = (ArrayList)crossSectionalStudyService.selectRegexSearchDataList(paramMap);
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
	 * 테이블 있는지 체크
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/checkTable")
	public Object checkTable(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- checkTable START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsCheckTable", approveService.checkTable(paramMap));
			//resultMap = (HashMap)approveService.selectRequestList(paramMap);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-2");
			resultMap.put("ERR_MSG", e.getMessage());
			//throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 데이터 삭제
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/delApproveData")
	public Object delApproveData(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- START delApproveData");
		logger.debug(paramMap.toString());
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			approveService.delApproveData(paramMap);
			resultMap.put("ERR_CD", 	"0");
			resultMap.put("ERR_MSG", 	"OK");
			/*resultMap.put("SEQ",		paramMap.get("SEQ"));
			resultMap.put("CONT_SEQ", 	paramMap.get("CONT_SEQ"));
			resultMap.put("PURPOSE_CD", paramMap.get("PURPOSE_CD"));
			resultMap.put("DATA_NM", 	paramMap.get("DATA_NM"));
			resultMap.put("CONDT_NM", 	paramMap.get("CONDT_NM"));*/
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}

}
