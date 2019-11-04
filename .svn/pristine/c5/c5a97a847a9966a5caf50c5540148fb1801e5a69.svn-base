package com.softcen.bigcen.med.research.psnldta.controller;

import java.io.File;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
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
import com.softcen.bigcen.med.research.psnldta.service.IPersonalDataService;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * 개인자료업로드 컨트롤러
 * @author user
 *
 */

@Controller
@RequestMapping(value="/psnldta")
public class PersonalDataController extends BigcenMedAbstractController{
	
	@Autowired
	private IPersonalDataService personalDataService;
	
	/**
	 * 개인자료 엑셀파일 업로드 처리 
	 * 엑셀 파일을 저장소에 임시로 저장하고 각 셀의 데이터를 가공하여 
	 * 클라이언트에게 json list로 반환한다.
	 * @param req
	 * @param res
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/uploadExcelFile")
	@SuppressWarnings("all")
	public Object uploadExcelFile(HttpServletRequest req, HttpServletResponse res){
		
		try{
			logger.debug("[--- uploadExcelFile START --");
			
			String repository = StringUtils.nvl(PropertiesUtils.getTargetString("ATTACH_FILE_PATH"),"");
			MultipartRequest mr = new MultipartRequest( req, repository, 1024*1024*5, "utf-8", new DefaultFileRenamePolicy());
			
			Enumeration enumer = mr.getFileNames();
			
			List xlsList = new ArrayList();
			Map xlsData = new HashMap();
			
			File s_file = null;
			
			while(enumer.hasMoreElements()){
				String file = (String)enumer.nextElement();
				UUID uuid = UUID.randomUUID();
				
				s_file = mr.getFile(file);
				
				if(!StringUtils.isNull(s_file)){
					String o_name = mr.getOriginalFileName(file);								//실제파일명
					
					FileInputStream fis = new FileInputStream(s_file);
					
					String fileExt = o_name.substring(o_name.indexOf(".")+1, o_name.length());
					
					Workbook wb = null;
					
				//	Excel 97	
					if("xls".equals(fileExt)){
						wb = new HSSFWorkbook(fis);
						
				//	Excel 2007 (xlsx)		
					}else{
						wb = new XSSFWorkbook(fis);
						
					}
					
					logger.debug(">>>" + wb.getNumberOfSheets());
					
					int sheetCnt = 0;
					
					List xlsRowList = new ArrayList();
					
					for(Sheet sheet : wb){
						
						xlsRowList = new ArrayList();
						xlsData = new HashMap();
						int cellCnt = 0;
						
						logger.debug(">>>" + sheet.getPhysicalNumberOfRows());
						
						for (Row row : sheet) {
							Map rowMap = new HashMap();
							String str = "";
							for (Cell cell : row) {
								switch (cell.getCellType()) {
									case Cell.CELL_TYPE_NUMERIC:
										if (DateUtil.isCellDateFormatted(cell)) {
											 SimpleDateFormat objSimpleDateFormat = new SimpleDateFormat("yyyy-MM-dd",Locale.KOREAN);
											 str = objSimpleDateFormat.format(cell.getDateCellValue());
											 
											 if(!StringUtils.isNull(str) && !StringUtils.isEmpty(str)){
												 rowMap.put(cell.getColumnIndex(), str);	
											 } 
												
										 } else {
											 double num = cell.getNumericCellValue();
											 
											 if(!StringUtils.isNull(num)){
												 rowMap.put(cell.getColumnIndex(), num);
											 } 
										 }
										
										break;
										
									default:
										cell.setCellType(Cell.CELL_TYPE_STRING);
										if(!StringUtils.isNull(cell.getStringCellValue()) && !StringUtils.isEmpty(cell.getStringCellValue())){
											rowMap.put(cell.getColumnIndex(), cell.getStringCellValue());
										 }
										
										break;
								}
							}
							
							if(rowMap.size() > 0){
								cellCnt = row.getLastCellNum();
								xlsRowList.add(rowMap);	
							}
							
						}
						
						xlsData.put("SHEET_VALUE"		,sheetCnt);
						xlsData.put("SHEET_TEXT"		,sheet.getSheetName());
						xlsData.put("SHEET_DATA"		,xlsRowList);
						xlsData.put("SHEET_CELL_CNT"	,cellCnt);
						
						sheetCnt++;
						
						xlsList.add(xlsData);
					}
				}
				
			//	업로드 후 엑셀파일 삭제
				if(s_file != null){
					s_file.delete();
					
				}
				
			}
			
			logger.debug(xlsList.toString());
			
			resultMap.put("dsXlsList", xlsList);
			resultMap.put("ERR_CD", "0");
			
		}catch(DataAccessException dae){
			logger.error(dae.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", dae.getMessage());
			
			
		}catch(Exception e){
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
		}
		
		return resultMap;
	}
	
	/**
	 * 개인자료 DB 테이블 저장
	 * 엑셀에서 추출된 데이터를 사용자 테이블에 저장한다. 
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/savePersonalDataPreview")
	public Object savePersonalDataPreview(@RequestBody Map<Object,Object> paramMap){
		resultMap = new HashMap();
		
		try{
			logger.debug(paramMap.toString());
			
			Map<String,Object> insMap = (HashMap)personalDataService.savePersonalDataPreview(paramMap);
			resultMap.put("TOT_CNT", insMap.get("TOT_CNT"));
			resultMap.put("UPD_CNT", insMap.get("INS_CNT"));
			resultMap.put("NOT_CNT", ((ArrayList)insMap.get("NO_EXIST_PAT_LIST")).size());
			resultMap.put("dsNoExistPatList", insMap.get("NO_EXIST_PAT_LIST"));
			
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(DataAccessException dae){
			logger.error(dae.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap; 
	}
	
	/**
	 * 개인자료 DB 테이블 저장
	 * 엑셀에서 추출된 데이터를 사용자 테이블에 저장한다. 
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/savePersonalData")
	public Object savePersonalData(@RequestBody Map<Object,Object> paramMap){
		resultMap = new HashMap();
		
		try{
			Map<String,Object> insMap = (HashMap)personalDataService.savePersonalData(paramMap);
			resultMap.put("TOT_CNT", insMap.get("TOT_CNT"));
			resultMap.put("UPD_CNT", insMap.get("INS_CNT"));
			resultMap.put("NOT_CNT", ((ArrayList)insMap.get("NO_EXIST_PAT_LIST")).size());
			resultMap.put("dsNoExistPatList", insMap.get("NO_EXIST_PAT_LIST"));
			resultMap.put("ERR_CD", "0");
			
		}catch(DataAccessException dae){
			logger.error(dae.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap; 
	}
	
	/**
	 * 개인자료 삭제
	 * 기등록된 개인자료 삭제 처리요청
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/deletePersonalData")
	public Object deletePersonalData(@RequestBody Map<Object,Object> paramMap){
		resultMap = new HashMap();
		
		try{
			personalDataService.deletePersonalData(paramMap);
			resultMap.put("ERR_CD", "0");
			
		}catch(DataAccessException dae){
			logger.error(dae.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap; 
	}
	
	
	/**
	 * 개인자료명 중복체크 요청
	 * @param paramMap
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/getItemMgmtPsnlDataNmDuplicateCheck")
	public Object getItemMgmtPsnlDataNmDuplicateCheck(@RequestBody Map<Object,Object> paramMap){
		resultMap = new HashMap();
		
		try{
			resultMap.put("dsCheckList",personalDataService.selectItemMgmtPsnlDataNmDuplicateCheck(paramMap));
			resultMap.put("ERR_CD", "0");
			
		}catch(DataAccessException dae){
			logger.error(dae.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", dae.getMessage());
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
			
		}
		
		return resultMap; 
	}
	
}
