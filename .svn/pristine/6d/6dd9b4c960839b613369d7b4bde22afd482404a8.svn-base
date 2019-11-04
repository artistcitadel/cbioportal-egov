package com.softcen.bigcen.med.research.query.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.common.except.BizRuntimeException;
import com.softcen.bigcen.med.research.crssec.service.ICrossSectionalStudyService;
import com.softcen.bigcen.med.research.query.service.IQueryService;
import com.softcen.bigcen.med.utils.PropertiesUtils;

@Controller
@RequestMapping("/research/query")
public class QueryController extends BigcenMedAbstractController{
	@Autowired
	private IQueryService queryService;
	
	@Autowired
	private ICrossSectionalStudyService crossSectionalStudyService;
	
	
	/**
	 * 조회결과 
	 * @param paramMap
	 * @return
	 
	@ResponseBody
	@RequestMapping(value="/getResultTable")
	public Object getResultTable(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			Map dataMap = new HashMap();
			dataMap = (HashMap)crossSectionalStudyService.selectDataResultList(paramMap);
			
			List dataResultPeriodList = (ArrayList)dataMap.get("dsDataResultPeriodList");
			List dataResultList = (ArrayList)dataMap.get("dsDataResultList");
			
			resultMap.put("dsDataResultPeriodList", dataResultPeriodList);
			resultMap.put("dsDataResultList", dataResultList);
			
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
		}
		return resultMap;
		
	}
	*/
	
	/**
	 * 결과목록 제외, 취소 Update요청
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/updateResultTable")
	public Object updateResultTable(@RequestBody Map<String,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			queryService.updateResultTable(paramMap);
			resultMap.put("TABLE_ID", paramMap.get("TABLE_ID"));
			resultMap.put("PERIOD_CD", paramMap.get("PERIOD_CD"));
			resultMap.put("PAT_SBST_NO", paramMap.get(PropertiesUtils.getTargetString("PAT_SBST_NO")));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
		}
		
		return resultMap;
		
	}

}
