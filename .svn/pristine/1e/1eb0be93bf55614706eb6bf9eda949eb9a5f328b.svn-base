package com.softcen.bigcen.med.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

public class ListUtil {
	
	public ListUtil() {
	}

	/**
	 * Returns a new list containing all elements that are contained in both given lists.
	 * @param list1 the first list
	 * @param list2 the second list
	 * @return the union of those two lists
	 * @throws NullPointerException if either list is null
	 */
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

			resultMap.put((String) map.get("SV"), map.get("VAL"));
		}
		resultList.add(resultMap);

		return resultList;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List transformToList(Map<String, Object> dataMap) {
		List resultList = new ArrayList();
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
//		String col2Array[] = {"빈도", "<행> 중 %", "<열> 중 %"};
		for (int i = 3; i <= dataMap.size(); i++) {
			String col2Array[] = {dataMap.get("COL1") + " 빈도", dataMap.get("COL1") + " <행> 중 %", dataMap.get("COL1") + " <열> 중 %"};
			resultMap.put("col1", dataMap.get("COL1"));
			resultMap.put("col2", col2Array[i-3]);
			resultMap.put("col_3_" + dataMap.get("COL2"), dataMap.get("COL_"+i));
			
			resultList.add(resultMap);			
			resultMap = new HashMap<String, Object>();
		}
		
		return resultList;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map transformToMap(List paramList) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		for (int i = 0; i < paramList.size(); i++) {
			Map map = (HashMap<String, Object>) paramList.get(i);
			
			resultMap.put((String) map.get("SV"), map.get("VAL"));
		}
		
		return resultMap;
	}
}
