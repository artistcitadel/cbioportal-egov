package com.softcen.bigcen.med.research.query.sql.helper;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.softcen.bigcen.med.utils.StringUtils;

public class SQLUtils {
	/**
	 * 그룹목록 
	 * @param itemList
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked","unused"})
	public static List<String> getGroupList(List itemList){
		List<String> groupList = new ArrayList<String>();
		
		List tempList = new ArrayList();
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (HashMap)itemList.get(i);
			
			if("COHORT".equals(dsMap.get("TABLE"))){
				continue;
			}
			
			tempList.add(dsMap.get("GR_LV"));
			
			
		}
		
	//	그룹순서 Sorting	
		HashSet set1 = new HashSet(tempList);
		TreeSet set2 = new TreeSet();
		set2.addAll(set1);
		
		groupList = new ArrayList(set2);
		
		return groupList;
		
	}
	
	
	/**
	 * AndOr를 포함한 그룹목록 
	 * @param itemList
	 * @return
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked","unused"})
	public static List<Map> getGroupListWithAndOr(List itemList){
		List<Map> groupList = new ArrayList<Map>();
		
		List<String> tmpList = new ArrayList();
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (HashMap)itemList.get(i);
			
			if("COHORT".equals(dsMap.get("TABLE"))){
				continue;
			}
			
		//	tempList에 그룹이 있는지 확인하고 없으면 add	
			if(!tmpList.contains(dsMap.get("GR_LV"))){
				tmpList.add(dsMap.get("GR_LV"));
				groupList.add(dsMap);
			}
		}
		
		return groupList;
		
	}
	
	
	/**
	 * 그룹내 테이블 목록
	 * @param itemList
	 * @param groupKey
	 * @return
	 */
	@SuppressWarnings("all")
	public static List<Map> getGroupTableList(List itemList, String groupKey){
		List<Map> tableList = new LinkedList<Map>();
		
		Set<Map> tableSet = new LinkedHashSet<Map>();
		
		for(int i=0; i < itemList.size(); i++){
			Map dsMap = (HashMap)itemList.get(i);
			
			if("COHORT".equals(dsMap.get("TABLE"))){
				continue;
			}
			
			Map dsTableMap = new HashMap();
			dsTableMap.put("GR_LV", 	dsMap.get("GR_LV"));
			dsTableMap.put("SCHEMA", 	dsMap.get("SCHEMA"));
			dsTableMap.put("TABLE", 	dsMap.get("TABLE"));
			
			tableSet.add(dsTableMap);
		}
		
		
		for (Map<String,String> dsMap : tableSet) {
			if(groupKey.equals(dsMap.get("GR_LV"))){
				tableList.add(dsMap);	
			}
		}
		
		return tableList;
		
	}
	
	
	/**
	 * 그룹내연구항목 목록
	 * @param itemList
	 * @param groupKey
	 * @return
	 */
	@SuppressWarnings("all")
	public static List<Map> getGroupItemList(List itemList, String groupKey){
		List<Map> grpItemList = new ArrayList<Map>();
		
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (HashMap)itemList.get(i);
			
			if("COHORT".equals(dsMap.get("TABLE"))){
				continue;
			}
			
			if(groupKey.equals(dsMap.get("GR_LV"))){
				grpItemList.add(dsMap);
			}
		}
		
		return grpItemList;
		
	}
	
	
	
	
	
	
	/**
	 * 연구항목 그룹목록 
	 * @param itemList
	 * @return
	 */
	public static List<Map> getGroupStudyList(List itemList){
		List<Map> groupList = new ArrayList<Map>();
		
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (HashMap)itemList.get(i);
			
			if("STUDY_ITEM".equals(dsMap.get("ITEM_TYPE_GUBUN"))){
				groupList.add(dsMap);
				
			}
		}
		
		return groupList;
		
	}
	
	/**
	 * 연구항목 그룹별 테이블 목록 
	 * @param itemList
	 * @param groupKey
	 * @return
	 */
	@SuppressWarnings("all")
	public static List<Map> getGroupStudyTableList(List itemList, String groupKey){
		List tmpList = new ArrayList();
		List uniqueTableList = new LinkedList();
		
		for(int i=0; i < itemList.size(); i++){
			Map itemMap = (HashMap)itemList.get(i);
			
			tmpList.add(itemMap.get("SCHEMA") + "." + itemMap.get("TABLE"));
			
		}
		uniqueTableList = new LinkedList(new HashSet<Object>(tmpList));
		
		return uniqueTableList;
		
	}
	
	@SuppressWarnings("all")
	public static int getStudyItemCount(List itemList,String agg){
		int cnt = 0;
		
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (Map<String,String>)itemList.get(i);
			
			if("ALL".equals(agg)){
				if("STUDY_ITEM".equals(dsMap.get("ITEM_TYPE_GUBUN")) && "ALL".equals(dsMap.get("AGG"))){
					cnt++;
				}	
			}else{
				if("STUDY_ITEM".equals(dsMap.get("ITEM_TYPE_GUBUN")) && !"ALL".equals(dsMap.get("AGG"))){
					cnt++;
				}
			}
		}
		
		return cnt;
		
	}
	
	@SuppressWarnings("all")
	public static List<Map<String,String>> getStudyItemChort(List itemList){
		List dsList = new ArrayList();
		
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (Map<String,String>)itemList.get(i);
			
			if("STUDY_ITEM".equals(dsMap.get("ITEM_TYPE_GUBUN")) && !"ALL".equals(dsMap.get("AGG"))){
				dsList.add(dsMap);
			}
		}
		
		return dsList;
		
	}
	
	
	@SuppressWarnings("all")
	public static List<Map<String,String>> getStudyItemChortAggAll(List itemList){
		List dsList = new ArrayList();
		
		for(int i=0; i < itemList.size(); i++){
			Map<String,String> dsMap = (Map<String,String>)itemList.get(i);
			
			if("STUDY_ITEM".equals(dsMap.get("ITEM_TYPE_GUBUN")) && "ALL".equals(dsMap.get("AGG"))){
				dsList.add(dsMap);
			}
		}
		
		return dsList;
		
	}
	
	/**
	 * 
	 * @param groupItemList
	 * @return
	 */
	public static String getGroupAndOr(List groupItemList){
		String retVal = "";
		
		if(groupItemList != null){
			Map<String,String> dsMap = (HashMap)groupItemList.get(0);
			retVal = dsMap.get("AND_OR");
			
		}
		
		return retVal;
	}
	
	
	public static String getTabNm(String tabCd){
		String retVal = "";
		
		if("C".equals(tabCd)){
			retVal = ""; 
			
		}else if("P".equals(tabCd)){
			retVal = "주기";
			
		}else if("R".equals(tabCd)){
			retVal = "연구항목";
			
		}else if("RE".equals(tabCd)){
			retVal = "사건정의";
			
		}else if("RQ".equals(tabCd)){
			retVal = "중도절단";
			
		}else if("CA".equals(tabCd) || "CO".equals(tabCd)){
			retVal = "사례대조";
			
		}else{
			retVal = "";
		}
		
		return retVal;
	}
	
	
	/**
	 * 생존분석 컬럼 정보를 반환한다.
	 * @param commonList
	 * @param gbnCommonCdColumn
	 * @param commCdDesc
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","rawtypes","unchecked"})
	public static String getCensoredColumn(List commonList, String gbnCommonCdColumn, String commCdDesc) throws Exception{
		String censoredColumn = "";
		
		for(int i=0; i < commonList.size(); i++){
			Map<String,String> dsMap = (HashMap)commonList.get(i);
			
			if(commCdDesc.equals(dsMap.get("COMM_CD_DESC"))){
				censoredColumn = dsMap.get(gbnCommonCdColumn);
				break;
			}
		}
		
		return censoredColumn;
	}
	
	
	

}
