package com.softcen.bigcen.med.search.vo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SearchVO {
	private String host = "";	//http://192.168.101.207:9200/
	private int port = 9200;
	private String index = "";
	private String type = "";
	
	private String query = "";
	private String sortSpec = "";
	private String fromDt = "";
	private String toDt = "";
	private String exactMatchYn = "";
	
	private Long pageNo;
	private Long pageSize;
	private Long startNum;
	private long aggSize;
	
	private List<String> patSbstNoList;
	private List<Map<Object,Object>> fieldsList;
	private List<String> aggInstNmList;
	private List<String> aggDeptNmList;
	private List<String> aggFormNmList;
	private List<Map<String,Object>> searchWordsList;
	private List<String> synonymList;
	
	
	private String fldsContents = "";
	

	/**
	 * 생성자
	 */
	public SearchVO(){
		this.patSbstNoList = new ArrayList<String>();
		this.aggInstNmList = new ArrayList<String>();
		this.aggDeptNmList = new ArrayList<String>();
		this.aggFormNmList = new ArrayList<String>();
		this.synonymList = new ArrayList<String>();
		this.searchWordsList  = new ArrayList<Map<String,Object>>();
		this.fieldsList = new ArrayList<Map<Object,Object>>();
		
		
	}
	
	public String getQuery() {
		return query;
	}
	
	public void setQuery(String query) {
		this.query = query;
	}
	
	public String getSortSpec() {
		return sortSpec;
	}

	public void setSortSpec(String sortSpec) {
		this.sortSpec = sortSpec;
	}
	
	public String getFromDt() {
		return fromDt;
	}

	public void setFromDt(String fromDt) {
		this.fromDt = fromDt;
	}

	public String getToDt() {
		return toDt;
	}

	public void setToDt(String toDt) {
		this.toDt = toDt;
	}
	
	public String getExactMatchYn() {
		return exactMatchYn;
	}

	public void setExactMatchYn(String exactMatchYn) {
		this.exactMatchYn = exactMatchYn;
	}
	
	public List<String> getPatSbstNoList() {
		return patSbstNoList;
	}
	
	public void setPatSbstNoList(List<String> patSbstNoList) {
		this.patSbstNoList = patSbstNoList;
	}
	
	public void setPatSbstNoList(Map<Object,Object> paramMap) {
		List<Map> list = (ArrayList<Map>)paramMap.get("SEARCH_PAT_SBST_NO_LIST");
		
		for(int i=0; i < list.size(); i++){
			Map<String,String> dsMap = (HashMap)list.get(i);
			this.patSbstNoList.add(dsMap.get(FieldsVO.PATNO));
			
		}
	}
	
	public Long getPageNo() {
		return pageNo;
	}
	
	public void setPageNo(Long pageNo) {
		this.pageNo = pageNo;
	}
	
	public Long getPageSize() {
		return pageSize;
	}
	
	public void setPageSize(Long pageSize) {
		this.pageSize = pageSize;
	}
	
	public Long getStartNum() {
		return startNum;
	}

	public void setStartNum(Long startNum) {
		this.startNum = startNum;
	}


	public List<Map<Object,Object>> getFieldsList() {
		return fieldsList;
	}


	public void setFieldsList(Map<Object,Object> paramMap) {
		this.fieldsList = (ArrayList)paramMap.get("SEARCH_COLUMN_LIST");
		
		
		
		
	}
	
	public List<String> getAggDeptNmList() {
		return aggDeptNmList;
	}


	public void setAggDeptNmList(Map<Object,Object> paramMap) {
		this.aggDeptNmList = (ArrayList)paramMap.get("AGG_REG_DEPT_NM_LIST");
	}


	public List<String> getAggInstNmList() {
		return aggInstNmList;
	}


	public void setAggInstNmList(Map<Object,Object> paramMap) {
		this.aggInstNmList = (ArrayList)paramMap.get("AGG_INSTCD_NM_LIST");
	}


	public List<String> getAggFormNmList() {
		return aggFormNmList;
	}

	
	public void setAggFormNmList(Map<Object,Object> paramMap) {
		this.aggFormNmList = (ArrayList)paramMap.get("AGG_FORM_NM_LIST");
	}
	
	public List<Map<String,Object>> getSearchWordsList() {
		return searchWordsList;
	}

	public void setSearchWordsList(Map<Object,Object> paramMap) {
		this.searchWordsList = (ArrayList)paramMap.get("SEARCH_WORDS_LIST");
	}
	
	public List<String> getSynonymList() {
		return synonymList;
	}

	public void setSynonymList(Map<Object,Object> paramMap) {
		this.synonymList =  (ArrayList)paramMap.get("SEARCH_SYNONYM_LIST");
	}

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public long getAggSize() {
		return aggSize;
	}

	public void setAggSize(long aggSize) {
		this.aggSize = aggSize;
	}
	
	
}
