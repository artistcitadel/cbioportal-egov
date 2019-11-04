package com.softcen.bigcen.med.research.dataDownload.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
/*import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
*/import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.research.crssec.service.ICrossSectionalStudyService;
import com.softcen.bigcen.med.research.dataDownload.service.IDataDownloadService;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

@Controller
@RequestMapping("/research/dataDownload")
public class DataDownloadController extends BigcenMedAbstractController{
	
	@Autowired
	private IDataDownloadService dataDownloadService;
	
	@Autowired
	private ICrossSectionalStudyService crossSectionalStudyService;
	
	
	@Autowired
	@Resource(name = "sqlSessionFactory_verticaA") 
	private SqlSessionFactory sqlSessionFactory; 
	
	
	
	@RequestMapping(value="/dataDownloadMain")
	public String chartReviewMain(){
		return "/research/dataDownload/dataDownloadMain.tiles";
	}
	
	/**
	 * 승인목록
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getMyApplyList")
	public Object selectMyApplyList(@RequestBody Map<Object,Object> paramMap){
		logger.debug("[--- selectMyApplyList START ");
		
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("dsMySaveList", dataDownloadService.selectMyApplyList(paramMap));
			//resultMap = (HashMap)dataDownloadService.selectMyApplyList(paramMap);
			
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
	
	/*@Autowired 
	private SqlSessionFactory sqlSessionFactory;

	*/
	/**
	 * 데이터 다운로드
	 * @param paramMap
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value="/dataDownload")
	public void dataDownload(HttpServletRequest req, HttpServletResponse res) throws Exception {
		res.setCharacterEncoding("utf-8");
		
		String siteCode = PropertiesUtils.getString("SITE_CODE");
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
//		String siteCode = PropertiesUtils.getString("SITE_CODE");
		try{
			Map paramMap = new HashMap();		
			paramMap.put("TABLE_ID", req.getParameter("TABLE_ID"));
			paramMap.put("PERIOD_CD", req.getParameter("PERIOD_CD"));
			paramMap.put("DATA_SEQ", req.getParameter("DATA_SEQ"));
			
			SXSSFWorkbook wb = new SXSSFWorkbook(100);
			Sheet sheet = wb.createSheet("Data");
						
			//header row세팅
			List listColumn = (ArrayList)dataDownloadService.dataDownloadColumn(paramMap);
			Row rowColumn = sheet.createRow(0);
			Integer myColumnNum = 0;
			
			for(int i=0; i < listColumn.size(); i++){
	  	      	Map<String,String> dsMapColumn = (HashMap)listColumn.get(i);
	  	      	
	  	      	//화면에 보이는 그대로 다운로드되는것으로 요청이와 수정 20190322
	  	      	//DEL_YN, CHART_YN, CHART_DT 값 숨김
	  	      	/*if("DEL_YN".equals(dsMapColumn.get("COLUMN_ID"))){
	  	      		myColumnNum++;
	  	      	}else if("CHART_YN".equals(dsMapColumn.get("COLUMN_ID"))){
	  	      		myColumnNum++;
	  	      	}else if("CHART_DT".equals(dsMapColumn.get("COLUMN_ID"))){
	  	      		myColumnNum++;
	  	      	}else{*/
	  	      		
	  	      		//hidden 값이 Y인 컬럼 숨기기  2018.07.23 최종호
		  	      	String hiddenYN = dsMapColumn.get("HIDDEN_YN");
		  	        String[] hiddenYNSplit = hiddenYN.split(",");
		  	        String PERIOD_CD = req.getParameter("PERIOD_CD");
		  	        int PERIOD_CD_int = Integer.parseInt(PERIOD_CD)-1;
		  	        String myHiddenVal = "N";
		  	        if(hiddenYNSplit.length == Integer.parseInt(PERIOD_CD)){
		  	        	myHiddenVal = hiddenYNSplit[PERIOD_CD_int];;
		  	        }
	  	      		
		  	        if("Y".equals(myHiddenVal)){
		  	        	myColumnNum++;
		  	        }else{
		  	        	Cell cell = null;
			  	      	cell = rowColumn.createCell(i-myColumnNum);
			  	      	cell.setCellValue(dsMapColumn.get("COLUMN_COMMENT"));
		  	        }
	  	      	/*}*/
			}
			
			//내용 row 세팅
			/*List list = sqlSession.selectList("dataDownload.dataDownload", map);*/
			List list = (ArrayList)dataDownloadService.dataDownload(paramMap);
			
			for(int i=0; i < list.size(); i++){
				Map<String,String> dsMap = (HashMap)list.get(i);
				Row row = sheet.createRow(i+1);
				
				Iterator iter = dsMap.keySet().iterator();
				
				int colIdx = 0;
				
				//row에 하나씩 세팅
				for(int j=0; j < listColumn.size(); j++){
					Map<String,String> dsMapColumn = (HashMap)listColumn.get(j);
					Object key = dsMapColumn.get("COLUMN_ID");
					
					//화면에 보이는 그대로 다운로드되는것으로 요청이와 수정 20190322 
					/*if("DEL_YN".equals(dsMapColumn.get("COLUMN_ID"))){
		  	      	}else if("CHART_YN".equals(dsMapColumn.get("COLUMN_ID"))){
		  	      	}else if("CHART_DT".equals(dsMapColumn.get("COLUMN_ID"))){
		  	      	}else*/ 
		  	      	if("CRT_DT".equals(dsMapColumn.get("COLUMN_ID"))){
			  	      	Cell cell = null;
	                    cell = row.createCell(colIdx);
		  	      		cell.setCellValue(String.valueOf(dsMap.get(key)).substring(0, 10));
		  	      		colIdx++;
		  	      	}else{
		  	      		
		  	      		//hidden 값이 Y인 컬럼 숨기기  2018.07.23 최종호
			  	      	String hiddenYN = dsMapColumn.get("HIDDEN_YN");
			  	        String[] hiddenYNSplit = hiddenYN.split(",");
			  	        String PERIOD_CD = req.getParameter("PERIOD_CD");
			  	        int PERIOD_CD_int = Integer.parseInt(PERIOD_CD)-1;
			  	        String myHiddenVal = "N";
			  	        if(hiddenYNSplit.length == Integer.parseInt(PERIOD_CD)){
			  	        	myHiddenVal = hiddenYNSplit[PERIOD_CD_int];;
			  	        }
	  	      		
			  	        if("Y".equals(myHiddenVal)){
			  	        }else{
			  	        	Cell cell = null;
		                    cell = row.createCell(colIdx);
		                    
		                    //2017-11-09 null isempty 
		                    if(StringUtils.isEmpty(String.valueOf(dsMap.get(key))) || StringUtils.isNull(dsMap.get(key))){
		                       cell.setCellValue("");   
		                    }else{
		                    	
		                    	if("timestamp".equals(dsMapColumn.get("DATA_TYPE"))){
		 	                       cell.setCellValue(String.valueOf(dsMap.get(key)).substring(0, 10));
		                    	}else{

		                    		if("PTSBSTNO".equals(dsMapColumn.get("COLUMN_ID")) && "KUH".equals(siteCode)) {
		                    			cell.setCellValue("^~~"+String.valueOf(dsMap.get(key)));
		                    		}
		                    		else {
		                    			cell.setCellValue(String.valueOf(dsMap.get(key)));
		                    		}
		 	                       
		                    	}
		                    }
		                    
		                    colIdx++;
							/*Cell cell = null;
				  	      	cell = row.createCell(colIdx);
				  	      	cell.setCellValue(String.valueOf(dsMap.get(key)));
				  	      	
							colIdx++;*/
			  	        }
		  	      	}
				}
				
				/*while(iter.hasNext()){
					Object key = iter.next();
					
					Cell cell = null;
		  	      	cell = row.createCell(colIdx);
		  	      	cell.setCellValue(String.valueOf(dsMap.get(key)));
		  	      	
					colIdx++;
				}*/
			}
			//파일명 설정
			Date dt = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss"); 
			String excelName = "dataDownload_"+sdf.format(dt).toString()+"_"+req.getParameter("PERIOD_CD");

			//엑셀 만들기
			res.setContentType("Application/Msexcel"); 
			res.setHeader("Set-Cookie", "fileDownload=true; path=/"); 
			res.setHeader("Content-Disposition", String.format("attachment; filename=\""+ excelName +".xlsx\"")); 
			wb.write(res.getOutputStream()); 
			
		}catch(Exception e){
			
		}
		
		
		
		
		
		
		
	}

}
