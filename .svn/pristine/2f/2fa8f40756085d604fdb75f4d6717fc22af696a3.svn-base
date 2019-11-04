package com.softcen.bigcen.med.research.psnldta.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.common.sys.service.ISysService;
import com.softcen.bigcen.med.research.psnldta.dao.PersonalDataDAO;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

/**
 * 개인자료 업로드 비즈니스 로직 구현체
 * @author user
 *
 */


@Service("personalDataService")
public class PersonalDataServiceImpl extends BigcenMedAbstractServiceImpl implements IPersonalDataService{
	@Autowired
	private PersonalDataDAO personalDataDAO;
	
	
	@Autowired
	private ISysService sysService;
	
	/**
	 * 개인자료 저장
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes","cast","unchecked","unused"})
	public Object savePersonalData(Map<Object,Object> paramMap) throws Exception{
	//	1.환자대체번호
		String patSbstNoNm 	= String.valueOf(paramMap.get("PAT_ID_TYPE"));
		
		List dsColumnList 		= new ArrayList();
		List dsColumnTypeList 	= new ArrayList();
		List dsPsnlDataList 	= new ArrayList();	//(ArrayList)paramMap.get("dsPsnlDataList");
		
		
		dsColumnList 			= (ArrayList)paramMap.get("dsColumnList");
		dsPsnlDataList			= (ArrayList)paramMap.get("dsPsnlDataList");
		
	//	1.TABLE생성
		StringBuffer sbQuery = new StringBuffer();
		
		String strColumns = "";
		
		for(int i=0; i < dsColumnList.size(); i++){
			Map<String,String> dsMap = (HashMap)dsColumnList.get(i);
			
			if(StringUtils.isEmpty(strColumns)){
				strColumns = dsMap.get("COLUMN");
				strColumns += " " + dsMap.get("DATA_TYPE");
			}else{
				strColumns += ",";
				strColumns += SQL.SEPERATE;
				strColumns += dsMap.get("COLUMN");
				strColumns += " " + dsMap.get("DATA_TYPE");
				
				
			}
					
			logger.debug(strColumns);
			
		}
		
		strColumns += ",";
		strColumns += "\n";
		strColumns += "CRT_DT";
		strColumns += " timestamp";
		
		String strTimeStamp = "";
		String strSchema = "";
		String strTable = "";
		
		
		strTimeStamp = StringUtils.getTimeStamp();
		
		strSchema = PropertiesUtils.getTargetString("PSNL_DATA_SCHEMA");
		
		strTable += "TMPV_";
		strTable += String.valueOf(paramMap.get("PER_CODE"));
		strTable += "_";
		strTable += strTimeStamp;
		
		sbQuery.append(SQL.CREATE + SQL.TABLE);
		sbQuery.append(strSchema + "." + strTable);
		sbQuery.append("(");
		sbQuery.append("\n");
		sbQuery.append(strColumns);
		sbQuery.append("\n");
		sbQuery.append(")");
		
		
		
		Map<Object, Object> createTableMap = new HashMap();
		createTableMap.put("CREATE_SQL", sbQuery.toString());
		
		personalDataDAO.createPsnlDataTable(createTableMap);
		
		logger.info("1.개인자료조건 테이블 생성 완료");
		
		int insertCount = 0;
		
		List<String> noExistPatIdList = new ArrayList();
		
		
//		2.TABLE INSERT
		for(int i=0; i < dsPsnlDataList.size(); i++){
			Map<String,String> dsMap = (HashMap)dsPsnlDataList.get(i);
			
			String strPatSbstNo = "";
			
		//	환자대체번호 idx
			if("PAT_NAID".equals(patSbstNoNm) || "PAT_ID".equals(patSbstNoNm)){
				Map<Object,Object> dsParamMap = new HashMap();
				
				dsParamMap.put("GV_PAT_SBST_NO", GV_PAT_SBST_NO);
				dsParamMap.put("SEARCH_KEY", patSbstNoNm);
				dsParamMap.put("SEARCH_VAL", dsMap.get("PAT_SBST_NO"));
				dsParamMap.put("SCHEMA_TABLE_SECU", PropertiesUtils.getTargetString("TABLE_SECU_SBST_NO"));	// 환자대체번호 convert 
				
				List list = (ArrayList)personalDataDAO.selectConvertSbstNo(dsParamMap);
				
				if(!StringUtils.isNull(list) && list.size() > 0){
					strPatSbstNo = String.valueOf(((HashMap)list.get(0)).get(PropertiesUtils.getTargetString("PAT_SBST_NO")));
				}else{
					noExistPatIdList.add(String.valueOf(dsMap.get("PAT_SBST_NO")));
				}
				
			}
			//190910 김지훈
			else if("PAT_LAB_NO".equals(patSbstNoNm)) {
				Map<Object,Object> dsParamMap = new HashMap();
				dsParamMap.put("GV_PAT_SBST_NO", GV_PAT_SBST_NO);
				dsParamMap.put("SEARCH_KEY", patSbstNoNm);
				dsParamMap.put("SEARCH_VAL", dsMap.get("PAT_SBST_NO"));
				dsParamMap.put("SCHEMA_TABLE_SECU", "CRDW_SECU.PT_LABTEST_NO");
				
				List list = (ArrayList)personalDataDAO.selectLabNoConvertSbstNo(dsParamMap);

				if(!StringUtils.isNull(list) && list.size() > 0){
					strPatSbstNo = String.valueOf(((HashMap)list.get(0)).get(PropertiesUtils.getTargetString("PAT_SBST_NO")));
					insertCount++;
					
				}else{
					noExistPatIdList.add(String.valueOf(dsMap.get("PAT_SBST_NO")));
				}
			}
			else{
				strPatSbstNo = dsMap.get("PAT_SBST_NO");
			}
			
			
		//	환자번호가 있는 데이터만 저장한다.	
			if(!StringUtils.isEmpty(strPatSbstNo)){
				StringBuffer sbQueryInsert = new StringBuffer();
				String columns = "";
				String values = "";
				
				for(int j=0; j < dsColumnList.size(); j++){
					Map<String,String> dsColsMap = (HashMap)dsColumnList.get(j);
					
					
					if(GV_PAT_SBST_NO.equals(dsColsMap.get("COLUMN"))){
						columns = dsColsMap.get("COLUMN");
						values = "LPAD('" + strPatSbstNo + "',"+PropertiesUtils.getString("PAT_SBST_NO_SIZE")+",'0')";
						
					}else if("MGMT_CODE".equals(dsColsMap.get("COLUMN"))){
						columns += SQL.SEPERATE;
						columns += ",";
						columns += dsColsMap.get("COLUMN");
						
						values += SQL.SEPERATE;
						values += ",";
						values += dsMap.get("MGMT_CODE_COLUMN");
					}else{
						columns += SQL.SEPERATE;
						columns += ",";
						columns += dsColsMap.get("COLUMN");
						
						values += SQL.SEPERATE;
						values += ",";
						values += "TO_DATE('" + dsMap.get("BASE_DT_COLUMN") + "','YYYY-MM-DD')";
					}
				}
				
				columns += ",";
				columns += "CRT_DT";
				
				values += ",";
				values += "NOW()";
				
				sbQueryInsert.append(SQL.INSERT_INTO + (strSchema + "." + strTable));
				sbQueryInsert.append(SQL.SEPERATE + "(");
				sbQueryInsert.append(SQL.SEPERATE + SQL.TAB1 + columns);
				sbQueryInsert.append(SQL.SEPERATE + ")");
				sbQueryInsert.append(SQL.VALUES);
				sbQueryInsert.append(SQL.SEPERATE + "(");
				sbQueryInsert.append(SQL.SEPERATE + SQL.TAB1 + values);
				sbQueryInsert.append(SQL.SEPERATE + ")");
					
				Map<Object, Object> insertTableMap = new HashMap();
				insertTableMap.put("INSERT_SQL", sbQueryInsert.toString());
				
				
				logger.debug(insertTableMap.toString());
				//logger.info("1.개인자료조건 테이블 생성 완료");
					
				int ret = (Integer)personalDataDAO.insertPsnlDataTable(insertTableMap);
				
				insertCount += ret;
				
			}
		}
		
		logger.info("2.개인자료 Insert 완료");
		
		
		/**
		 * CC_ITEM_MGMT에 개인자료 업로드 조회를 위하여
		 * 환자번호, 기준일자 컬럼을 연구항목으로 등록한다.
		 */
		for(int i=0; i < dsColumnList.size(); i++){
			Map<Object,Object> dsMap = (HashMap)dsColumnList.get(i);
			
			String timeStamp = "";
			timeStamp = strTimeStamp.substring(5, 14);
			
			dsMap.put("SCHEMA", PropertiesUtils.getTargetString("PSNL_DATA_SCHEMA"));
			dsMap.put("TABLE", strTable);
			dsMap.put("ITEM_CATE_DETL_SEQ", timeStamp);
			
			personalDataDAO.insertPsnlDataItemMgmt(dsMap);
			
		}	
		logger.info("3.연구항목 등록 완료");
		
		Map<String,Object> resultMap = new HashMap();
		resultMap.put("TOT_CNT", dsPsnlDataList.size());
		resultMap.put("INS_CNT", insertCount);
		resultMap.put("NO_EXIST_PAT_LIST", noExistPatIdList);
		
		
		return resultMap;
	}
	
	/**
	 * 개인자료 저장미리보기
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object savePersonalDataPreview(Map<Object,Object> paramMap) throws Exception{
		
//		1.환자대체번호
		String patSbstNoNm 	= String.valueOf(paramMap.get("PAT_ID_TYPE"));
		
		List dsColumnList 		= new ArrayList();
		List dsColumnTypeList 	= new ArrayList();
		List dsPsnlDataList 	= new ArrayList();	//(ArrayList)paramMap.get("dsPsnlDataList");
		
		
		dsColumnList 			= (ArrayList)paramMap.get("dsColumnList");
		dsPsnlDataList			= (ArrayList)paramMap.get("dsPsnlDataList");
		
	//	1.TABLE생성
		StringBuffer sbQuery = new StringBuffer();
		
		int insertCount = 0;
		
		List<String> noExistPatIdList = new ArrayList();
		
		
		//2.TABLE INSERT
		for(int i=0; i < dsPsnlDataList.size(); i++){
			Map<String,String> dsMap = (HashMap)dsPsnlDataList.get(i);
			
			String strPatSbstNo = "";
			
		//	환자대체번호 idx
			if("PAT_NAID".equals(patSbstNoNm) || "PAT_ID".equals(patSbstNoNm)){
				Map<Object,Object> dsParamMap = new HashMap();
				
				dsParamMap.put("GV_PAT_SBST_NO", GV_PAT_SBST_NO);
				dsParamMap.put("SEARCH_KEY", patSbstNoNm);
				dsParamMap.put("SEARCH_VAL", dsMap.get("PAT_SBST_NO"));
				dsParamMap.put("SCHEMA_TABLE_SECU", PropertiesUtils.getTargetString("TABLE_SECU_SBST_NO"));	// 환자대체번호 convert 
				
				List list = (ArrayList)personalDataDAO.selectConvertSbstNo(dsParamMap);
				
				if(!StringUtils.isNull(list) && list.size() > 0){
					strPatSbstNo = String.valueOf(((HashMap)list.get(0)).get(PropertiesUtils.getTargetString("PAT_SBST_NO")));
					insertCount++;
					
				}else{
					noExistPatIdList.add(String.valueOf(dsMap.get("PAT_SBST_NO")));
				}
				
			}
			//190910 김지훈
			else if("PAT_LAB_NO".equals(patSbstNoNm)) {
				Map<Object,Object> dsParamMap = new HashMap();
				dsParamMap.put("GV_PAT_SBST_NO", GV_PAT_SBST_NO);
				dsParamMap.put("SEARCH_KEY", patSbstNoNm);
				dsParamMap.put("SEARCH_VAL", dsMap.get("PAT_SBST_NO"));
				dsParamMap.put("SCHEMA_TABLE_SECU", "CRDW_SECU.PT_LABTEST_NO");
				
				List list = (ArrayList)personalDataDAO.selectLabNoConvertSbstNo(dsParamMap);

				if(!StringUtils.isNull(list) && list.size() > 0){
					strPatSbstNo = String.valueOf(((HashMap)list.get(0)).get(PropertiesUtils.getTargetString("PAT_SBST_NO")));
					insertCount++;
					
				}else{
					noExistPatIdList.add(String.valueOf(dsMap.get("PAT_SBST_NO")));
				}
			}
			else{
				strPatSbstNo = dsMap.get("PAT_SBST_NO");
			}
		}
		
		resultMap = new HashMap();
		resultMap.put("TOT_CNT", dsPsnlDataList.size());
		resultMap.put("INS_CNT", insertCount);
		resultMap.put("NO_EXIST_PAT_LIST", noExistPatIdList);
		
		return resultMap; 
	}
	
	/**
	 * 개인자료 삭제
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object deletePersonalData(Map<Object,Object> paramMap) throws Exception{
		List itemList = new ArrayList();
		
		
	//	1.ITEM_MGMT_LIST 조회
		logger.info("1.CC_ITEM_MGMT SELECT ");
		itemList = (ArrayList)sysService.selectItemMgmtList(paramMap);
		
		
	//	1.1.itemList가 null이 아니고 0보다 크면	
		if(itemList != null && itemList.size() > 0){
			Map<Object,Object> dsMap = (HashMap)itemList.get(0);
			String schema = PropertiesUtils.getTargetString("PSNL_DATA_SCHEMA");
			
		//	2.개인자료 테이블 조회
			List tableList = (ArrayList)sysService.selectExistSchemaTableList(dsMap);
			
			if(tableList.size() > 0 && tableList != null){
//				2.1.drop table	
				StringBuffer sbQuery = new StringBuffer();
				sbQuery.append(SQL.SEPERATE);
				sbQuery.append(SQL.DROP + SQL.TABLE);
				sbQuery.append(SQL.SEPERATE);
			//	sbQuery.append(schema + "." + dsMap.get("TABLE").toString());
				sbQuery.append(dsMap.get("SCHEMA").toString() + "." + dsMap.get("TABLE").toString());
				paramMap.put("QUERY", sbQuery);
				
				personalDataDAO.dropPsnlDataTable(paramMap);
				logger.info("2.DROP TABLE COMPLETE ");
			}
			
		//	3.item mgmt 항목삭제(개인자료만삭제)
			if("999".equals(String.valueOf(dsMap.get("ITEM_CATE_SEQ")))){
				sysService.deleteItemMgmt(dsMap);
				logger.info("3.ITEM_MGMT DELETE COMPLETE ");
			}
		}
		
		
		
		return 0;
	}
	
	/**
	 * 개인자료 이름 중복 체크
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectItemMgmtPsnlDataNmDuplicateCheck(Map<Object,Object> paramMap) throws Exception{
		return personalDataDAO.selectItemMgmtPsnlDataNmDuplicateCheck(paramMap);
		
	}
	
}
