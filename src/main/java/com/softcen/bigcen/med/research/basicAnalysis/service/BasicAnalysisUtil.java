package com.softcen.bigcen.med.research.basicAnalysis.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class BasicAnalysisUtil {

	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List unionColumn(List list1, List list2) {
		List resultList = new ArrayList();
		Iterator it1 = list1.iterator();
		Iterator it2 = list2.iterator();

		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> tempMap1 = new HashMap();
		Map<String, Object> tempMap2 = new HashMap();
		
		while (it1.hasNext()) {
			resultMap = new HashMap<String, Object>();
			
			tempMap1 = (HashMap) it1.next();
			resultMap.putAll(tempMap1);			
			
			if(it2.hasNext()){
				tempMap2 = (HashMap) it2.next();
				resultMap.putAll(tempMap2);
			}
			
			resultList.add(resultMap);
		}

		return resultList;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List union(List list1, List list2) {
		List result = new ArrayList(list1);
		for(int i=0; i<list2.size(); i++){
			if(!result.contains(list2.get(i)))
				result.add(list2.get(i));
		}
        return result;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List transformToList(List paramList) {
		List resultList = new ArrayList();
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		for (int i = 0; i < paramList.size(); i++) {
			Map map = (HashMap<String, Object>) paramList.get(i);
			String sv = String.valueOf(map.get("SV")).trim();

			resultMap.put(sv, map.get("VAL"));
		}
		resultList.add(resultMap);

		return resultList;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List transformToList(Map<Object, Object> dataMap) {
		List resultList = new ArrayList();
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
//		String col2Array[] = {"빈도", "<행> 중 %", "<열> 중 %"};
		for (int i = 3; i <= dataMap.size(); i++) {
			String colVal1 = String.valueOf(dataMap.get("COL1")).trim();
			String colVal2 = String.valueOf(dataMap.get("COL2")).trim();
			String col2Array[] = {colVal1 + " 빈도", colVal1 + " <행> 중 %", colVal1 + " <열> 중 %"};
			resultMap.put("COL1", colVal1);
			resultMap.put("COL2", col2Array[i-3]);
			resultMap.put("COL_3_" + colVal2, dataMap.get("COL_"+i));
			
			resultList.add(resultMap);			
			resultMap = new HashMap<String, Object>();
		}
		
		return resultList;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map<String, Object> transformToMap(List paramList) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		for (int i = 0; i < paramList.size(); i++) {
			Map map = (HashMap<String, Object>) paramList.get(i);
			String sv = String.valueOf(map.get("SV")).trim();
			
			resultMap.put(sv, map.get("VAL"));
		}
		
		return resultMap;
	}
}
