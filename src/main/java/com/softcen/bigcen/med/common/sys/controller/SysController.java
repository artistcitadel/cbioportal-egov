package com.softcen.bigcen.med.common.sys.controller;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;
import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.admin.researchItem.service.IResearchItemService;
import com.softcen.bigcen.med.common.sys.service.ISysService;
import com.softcen.bigcen.med.research.crssec.service.ICrossSectionalStudyService;
import com.softcen.bigcen.med.utils.DateUtils;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

@Controller
@RequestMapping(value="/common/sys")
public class SysController extends BigcenMedAbstractController{
	
	@Autowired
	private ISysService sysService;
	
	
	@Autowired
	private IResearchItemService researchItemService;
	
	@Autowired
	private ICrossSectionalStudyService crossSectionalStudyService;
	
	
	/**
	 * 서버시간 구하기
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getServerDate")
	public Object getServerDate(@RequestBody Map<Object,Object> paramMap){
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap.put("dsServerDate", DateUtils.formatDate(DateUtils.getToday(), "-"));
			resultMap.put("ERR_CD", "0");
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			
		}
		
		return resultMap;
	}
	
	
	/**
	 * 연구항목 대분류,중분류 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getItemCateTree")
	public Object getItemCateTree(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsCategoryList", sysService.selectItemCateTree(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException dae){
			resultMap.put("ERR_CD", "900");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	/**
	 * 연구항목 트리 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getItemMgmtTreeList")
	public Object getItemMgmtTreeList(@RequestBody Map<Object,Object> paramMap){
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsItemMgmtList", sysService.selectItemMgmtTreeList(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
			
		}catch(DataAccessException dae){
			resultMap.put("ERR_CD", "900");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	/**
	 * 연구항목 목록조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getItemMgmtList")
	public Object getItemMgmtList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			
			resultMap.put("periodCount", paramMap.get("SEARCH_PERIOD_COUNT"));
			resultMap.put("dsItemMgmtList", sysService.selectItemMgmtList(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException dae){
			resultMap.put("ERR_CD", "900");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			throw new RuntimeException(e);
			
		}
		
		
		return resultMap;
	}
	
	/**
	 * 연구항목내용 상세목록조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getItemContDetlList")
	public Object getItemContDetlList(@RequestBody Map<Object,Object> paramMap){
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			Map<String,String> itemContMap 		= new HashMap<String,String>();       /* 조건공유 */
			List<Object> itemContDetlList 		= new ArrayList<Object>();            /* 조건공유상세 */
			List<Object> dataResultPeriodList 	= new ArrayList<Object>();            /* 주기목록 */
			List<Object> dataResultList 		= new ArrayList<Object>();            /* 결과목록 */
			List<Object> metaDataList  			= new ArrayList<Object>();            /* 메타목록 */
			
			itemContMap = (HashMap<String,String>)sysService.selectItemCont(paramMap);
			itemContDetlList = (ArrayList)sysService.getItemContDetlList(paramMap);
			
			
		//	데이터가 있으면 (PARENT_ID == E)	
			if("E".equals(paramMap.get("PARENT_ID"))){
				//Map itemDataMap = (HashMap)crossSectionalStudyService.selectItemContData(paramMap);
				//metaDataList = (ArrayList)crossSectionalStudyService.selectDataColumnList(paramMap);
				
				Map<Object,Object> itemDataMap = (HashMap)sysService.selectItemContData(paramMap);
				metaDataList = (ArrayList)sysService.selectDataColumnList(paramMap);
				
				if(itemDataMap.containsKey("TABLE_ID")){
					Map dataMap = new HashMap();
					
					//dataMap = (HashMap)crossSectionalStudyService.selectDataResultList(itemDataMap);
					dataMap = (HashMap)sysService.selectDataResultList(itemDataMap);
					
					dataResultPeriodList = (ArrayList)dataMap.get("dsDataResultPeriodList");
					dataResultList = (ArrayList)dataMap.get("dsDataResultList");
				}
				
				resultMap.put("dsItemData", itemDataMap);
			}
			
			
			resultMap.put("dsItemCont", itemContMap);
			resultMap.put("dsItemContDetlList", itemContDetlList);
			resultMap.put("dsDataResultPeriodList", dataResultPeriodList);
			resultMap.put("dsDataResultList", dataResultList);
			resultMap.put("dsMetaDataList", metaDataList);
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException dae){
			resultMap.put("ERR_CD", "900");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	/**
	 * 연구 조건공유 트리목록 조회
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getItemContTreeList")
	public Object getItemContTreeList(@RequestBody Map<Object,Object> paramMap){
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsItemContTreeList", sysService.selectItemContTreeList(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(DataAccessException dae){
			resultMap.put("ERR_CD", "900");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	
	
	
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getItemMgmtDatatableList")
	public Object getItemMgmtDatatableList(@RequestBody Map<Object,Object> paramMap){
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			logger.debug(">>> getItemMgmtDatatableList : " + paramMap.toString());
			
			resultMap.put("dsItemMgmtList", researchItemService.selectItemMgmtList(paramMap));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
			logger.debug(">>> getItemMgmtDatatableList : " + paramMap.toString());
			
		}catch(DataAccessException dae){
			resultMap.put("ERR_CD", "900");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getCommonCodeList")
	public Object getCommonCodeList(@RequestBody Map<Object,Object> paramMap){
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsCommonCodeList", sysService.getCommonCodeList(paramMap));
			resultMap.put("commonCodeGrpId", paramMap.get("SEARCH_COMM_GRP_ID"));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException dae){
			resultMap.put("ERR_CD", "900");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			throw new RuntimeException(e);
			
		}
		
		return resultMap;
	}
	
	
	
	
	
	

}
