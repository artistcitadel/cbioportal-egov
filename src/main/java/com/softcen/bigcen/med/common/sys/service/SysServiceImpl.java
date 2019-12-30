package com.softcen.bigcen.med.common.sys.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.common.sys.dao.SysDAO;
import com.softcen.bigcen.med.utils.StringUtils;

@Service("sysService")
public class SysServiceImpl extends BigcenMedAbstractServiceImpl implements ISysService{
	@Autowired
	private SysDAO sysDAO;
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemCont(Map<Object,Object> paramMap) throws SQLException{
		return sysDAO.selectItemCont(paramMap);
	}
	
	public Object selectItemContData(Map<Object,Object> paramMap) throws Exception{
		return sysDAO.selectItemContData(paramMap);
		
	}
	
	public Object selectDataColumnList(Map<Object,Object> paramMap) throws Exception{
		return sysDAO.selectDataColumnList(paramMap);
		
	}
	
	
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public Object selectDataResultList(Map<Object,Object> paramMap) throws Exception{
		Map resultMap = new HashMap();
		
		/*List list = (ArrayList)crossSectionalStudyDAO.selectDataResulPeriodtList(paramMap);*/
		List list = (ArrayList)sysDAO.selectDataResulPeriodtList(paramMap);
		
		Map rsMap2 = new HashMap();
		List dataList = new ArrayList();
		
		for(int i=0; i < list.size(); i++){
			Map rsMap = (HashMap)list.get(i);
			
			paramMap.put("PERIOD_CD", rsMap.get("PERIOD_CD"));
			
			/*List dsList = (ArrayList)crossSectionalStudyDAO.selectDataResultList(paramMap);*/
			List dsList = (ArrayList)sysDAO.selectDataResultList(paramMap);
			
			rsMap2 = new HashMap();
			rsMap2.put("dsPeriodNm", rsMap.get("PERIOD_CD"));
			rsMap2.put("dsList", dsList);
			rsMap2.put("dsCount", dsList.size());
			
			dataList.add(rsMap2);
			
		}
		
		resultMap.put("dsDataResultPeriodList", list);
		resultMap.put("dsDataResultList", dataList);
		
		
		return resultMap;
		
	}
	
	
	
	
	
	/**
	 * 
	 */
	public Object selectItemCateTree(Map<Object,Object> paramMap) throws Exception{
		List<Object> lvl1List = new ArrayList<Object>();
		List<Object> treeList = new ArrayList<Object>();
		
		lvl1List = (ArrayList)sysDAO.selectItemCateList(paramMap);

		for (Object obj1 : lvl1List) {
			Map<Object,Object> map1 = (Map<Object,Object>)obj1;
			
			paramMap.put("SEARCH_ITEM_CATE_SEQ", map1.get("value"));
			
			map1.put("items", this.getItemCateDetlList(paramMap));
			
			treeList.add(map1);
			
		}
		
		return treeList;
		
	}
	
	/**
	 * 중뷴류
	 * @param paramMap
	 * @return
	 */
	private Object getItemCateDetlList(Map<Object,Object> paramMap) {
		List<Object> lvl2List = new ArrayList<Object>();
		List<Object> resultList = new ArrayList<Object>();
		
		try{
			paramMap.put("SEARCH_GMEC_YN", "Y");
			
			lvl2List = (ArrayList)sysDAO.selectItemCateDetlList(paramMap);
			
			for(int i=0; i < lvl2List.size(); i++){
				Map<Object,Object> mapRow = (HashMap<Object,Object>)lvl2List.get(i);
				Map<Object,Object> treeMap = new HashMap<Object,Object>();
				treeMap.put("label", "Loading...");
				treeMap.put("id", "");
				treeMap.put("expanded", "");
				treeMap.put("icon", "");
				treeMap.put("value", "");
				
				List list = new ArrayList();
				list.add(treeMap);
				
				mapRow.put("items", list);
				
				resultList.add(mapRow);
			}
			
			
		}catch(SQLException se){
			throw new RuntimeException(se);
		}
		
		
		return resultList;
		
	}
	
	/**
	 * 연구항목 트리 조회
	 */
	public Object selectItemMgmtTreeList(Map<Object,Object> paramMap) throws SQLException{
		return sysDAO.selectItemMgmtTreeList(paramMap);
		
	}
	
	/**
	 * 조건공유 TREE LIST
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	public Object selectItemContTreeList(Map<Object,Object> paramMap) throws SQLException{
		return sysDAO.selectItemContTreeList(paramMap);
		
	}
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws SQLException
	 */
	@SuppressWarnings({"cast","rawtypes","unused","unchecked"})
	public Object selectItemMgmtList(Map<Object,Object> paramMap) throws Exception{
		String strLevel = "";
		String strMethCd = "";
		
		List<Map<String,String>> itemList;	// = new ArrayList<Map<String,String>>();
		
		strLevel 	= String.valueOf(paramMap.get("LEVEL"));
		strMethCd 	= String.valueOf(paramMap.get("METH_CD"));
		itemList 	= new ArrayList<Map<String,String>>();
		
		if(strLevel.equals("1")){
			itemList = (ArrayList)sysDAO.selectItemMgmtList(paramMap);
			
		}else{
			List tmpList1 = (ArrayList)sysDAO.selectItemMgmtList(paramMap);
			List tmpList2 = new ArrayList();
			
			System.out.println(tmpList1.toString());
			
			for(int i=0; i < tmpList1.size(); i++){
				Map<String,String> dsMap = (HashMap)tmpList1.get(i);
				
				if(!StringUtils.isEmpty(dsMap.get("UPPER_COLUMN"))){
					//dsMap.put("GR_LV", "000");
					
				}
				tmpList2.add(dsMap);
				
				if(!StringUtils.isEmpty(dsMap.get("UPPER_COLUMN")) && !"선택".equals(dsMap.get("UPPER_COLUMN"))){
					int upInc = 0;
				
					boolean isUpper = true;
					
					Map paramMap2 = new HashMap();
					
					paramMap2.put("SEARCH_TABLE", dsMap.get("UPPER_TABLE"));
					paramMap2.put("SEARCH_COLUMN", dsMap.get("UPPER_COLUMN"));
					
					while(isUpper)
					{
						Map<String,String> resultMap2 = new HashMap();
						
						tmpList1 = (ArrayList)sysDAO.selectItemMgmtList(paramMap2);
						
						resultMap2 = (HashMap)tmpList1.get(0);
						
						//resultMap2.put("GR_LV", "000");
						
						tmpList2.add(resultMap2);
						
						if(upInc > 3 || StringUtils.isEmpty(resultMap2.get("UPPER_COLUMN"))){
							isUpper = false;
							
						}
						
						paramMap2.put("SEARCH_TABLE", resultMap2.get("UPPER_TABLE"));
						paramMap2.put("SEARCH_COLUMN", resultMap2.get("UPPER_COLUMN"));
						
						upInc++;
						
					}
				}
			}
			
		//	역순정렬
			if("01".equals(strMethCd)){
				if(!StringUtils.isNull(tmpList2) && tmpList2.size() > 0){
					Map<String, String> dsCheckMap = (HashMap)tmpList2.get(0);
					
					if(tmpList2.size() > 1 && !"COHORT".equals(dsCheckMap.get("TABLE"))){
						for(int i = tmpList2.size() - 1; i >= 0; i--){
							Map<String, String> dsMap = (HashMap)tmpList2.get(i);
							
							if(i == (tmpList2.size() - 1)){
								dsMap.put("GR_LV_START", "S");
							}
							
							if(i == 0){
								dsMap.put("GR_LV_END", "E");
							}
							
							itemList.add(dsMap);
						}
							
					}else{
						itemList = tmpList2;
					}
				}
				
		//	연구항목 예외		
			}else{
				if(!StringUtils.isNull(tmpList2) && tmpList2.size() > 0){
					Map<String, String> dsCheckMap = (HashMap)tmpList2.get(0);
					
					if(tmpList2.size() > 1 && !"COHORT".equals(dsCheckMap.get("TABLE"))){
						String popupProgramId = "";
						
						popupProgramId = dsCheckMap.get("POPUP_PROGRAM_ID");
						
					//	기록내용일 경우 순서변경	
						if("P_COMMON_CODE_3HT".equals(popupProgramId) || "P_COMMON_CODE_3HT_MR".equals(popupProgramId)){
							Map<String, String> dsMap = (HashMap)tmpList2.get(0);
							dsMap.put("GR_LV_START", "S");
							
							itemList.add((HashMap)tmpList2.get(0));
							
							for(int i = tmpList2.size()-1; i > 0; i--){
								dsMap = (HashMap)tmpList2.get(i);
								
								if(i == 1){
									dsMap.put("GR_LV_END", "E");
								}
								itemList.add(dsMap);
							}
							
						}else{
							for(int i = tmpList2.size() - 1; i >= 0; i--){
								Map<String, String> dsMap = (HashMap)tmpList2.get(i);
								
								if(i == (tmpList2.size() - 1)){
									dsMap.put("GR_LV_START", "S");
								}
								
								if(i == 0){
									dsMap.put("GR_LV_END", "E");
								}
								
								itemList.add(dsMap);
							}
						}
						
					}else{
						itemList = tmpList2;
					}
				}
			}
		}
		
		return itemList;
		
	}
	
	
	public Object deleteItemMgmt(Map<Object,Object> paramMap) throws Exception{
		return sysDAO.deleteItemMgmt(paramMap);
	}
	
	/**
	 * 연구항목 조건공유 상세목록 조회
	 */
	public Object getItemContDetlList(@RequestBody Map<Object,Object> paramMap) throws Exception{
		return sysDAO.selectItemContDetlList(paramMap);
		
	}
	
	
	
	public List selectCommonCodeList(Map<Object,Object> paramMap) throws SQLException{
		return sysDAO.selectCommonCodeList(paramMap);
		
	}
	
	
	public Object selectExistSchemaTableList(Map<Object,Object> paramMap) throws Exception{
		return sysDAO.selectExistSchemaTableList(paramMap);
		
		
	}
	
	
	/**
	 * 
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object getCommonCodeList(@RequestBody Map<Object,Object> paramMap) throws Exception{
		return sysDAO.selectCommonCodeList(paramMap);
	}
	
	/**
	 * 연구항목 조회수 증가
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object updateItemMgmtSearchCnt(Map<Object,Object> paramMap) throws Exception{
		return sysDAO.updateItemMgmtSearchCnt(paramMap);
	}
	
	public Object getItemContList(Map<String,Object> paramMap) throws Exception{
		return sysDAO.selectItemContList(paramMap);
	}
	
}
