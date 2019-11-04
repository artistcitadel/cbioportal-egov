package com.softcen.bigcen.med.search.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.softcen.bigcen.med.search.vo.FieldsVO;
import com.softcen.bigcen.med.search.vo.SearchVO;
import com.softcen.bigcen.med.utils.PropertiesUtils;
import com.softcen.bigcen.med.utils.StringUtils;

import kr.co.softcen.bigcensa.elasticsearch.client.Rest;
import kr.co.softcen.bigcensa.elasticsearch.client.request.Bool;
import kr.co.softcen.bigcensa.elasticsearch.client.request.Highlight;
import kr.co.softcen.bigcensa.elasticsearch.client.request.HighlightField;
import kr.co.softcen.bigcensa.elasticsearch.client.request.Match;
import kr.co.softcen.bigcensa.elasticsearch.client.request.MatchField;
import kr.co.softcen.bigcensa.elasticsearch.client.request.Query;
import kr.co.softcen.bigcensa.elasticsearch.client.request.Range;
import kr.co.softcen.bigcensa.elasticsearch.client.request.RangeField;
import kr.co.softcen.bigcensa.elasticsearch.client.request.SortOrder;
import kr.co.softcen.bigcensa.elasticsearch.client.request.Term;
import kr.co.softcen.bigcensa.elasticsearch.client.request.TermField;
import kr.co.softcen.bigcensa.elasticsearch.client.request.Terms;
import kr.co.softcen.bigcensa.elasticsearch.client.response.Hit;
import kr.co.softcen.bigcensa.elasticsearch.client.response.Hits;
import kr.co.softcen.bigcensa.elasticsearch.client.response.SearchResponse;


public class SearchRequest extends Rest{
	private static final Logger logger = LoggerFactory.getLogger(SearchRequest.class);

	private static Rest rest;
	
	private Highlight highlight;
	
	public SearchRequest(){}
	
	public SearchRequest(String host, int port, String index, String type){}
	
	/**
	 * Connection
	 */
	public void open(SearchVO searchVO){
		try{
			rest = new Rest(searchVO.getHost(), searchVO.getPort());
		}catch(Exception e){
			logger.error(e.getMessage());
		}
		
	}
	
	/**
	 * Close
	 */
	public void close(){
		try{
			rest.closeRestClient();
			
		}catch(Exception e){
			logger.error(e.getMessage());
		}
	}
	

	/**
	 * 색인 전체 카운트
	 * @param paramMap
	 * @param searchVO
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"all"})
	public Long getIndexCount(Map<Object,Object> paramMap, SearchVO searchVO) throws Exception{
		return rest.countMatchAll(searchVO.getIndex(), searchVO.getType());
		
	}
	
	/**
	 * 검색 카운트
	 * @param paramMap
	 * @param searchVO
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"all"})
	public Long getSearchCount(Map<Object,Object> paramMap, SearchVO searchVO) throws Exception{
		List<Query> queryList = new ArrayList<Query>();
		List<Query> mustList = new ArrayList<Query>();
		List<Query> shouldList = new ArrayList<Query>();
		List<Query> mustNotList = new ArrayList<Query>();
		List<Query> synonymList = new ArrayList<Query>();
		List<Query> instNmList = new ArrayList<Query>();
		List<Query> deptNmList = new ArrayList<Query>();
		List<Query> formNmList = new ArrayList<Query>();
		
		Terms terms = new Terms();
		
		terms = new Terms(FieldsVO.PATNO, searchVO.getPatSbstNoList());
		
		if("Y".equals(searchVO.getExactMatchYn())){
			mustList.add(new Term(FieldsVO.FRM_CONTS, new TermField(searchVO.getQuery())));
			
		}else{
			if(searchVO.getSynonymList().size() > 0){
				shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));	
			}else{
				mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));
			}
			
		}
		
	//	검색어 설정
		for(int i=0; i < searchVO.getSearchWordsList().size(); i++){
			Map<String,String> dsMap = (HashMap)searchVO.getSearchWordsList().get(i);
			
			if("AND".equals(dsMap.get("AND_OR_NOT"))){
				mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
				
			}else if("OR".equals(dsMap.get("AND_OR_NOT"))){
				shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
				
			}else if("NOT".equals(dsMap.get("AND_OR_NOT"))){
				mustNotList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
			}
		}
		
	//	동의어 설정
		for(int i=0; i < searchVO.getSynonymList().size(); i++){
			shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getSynonymList().get(i))));
		}
		
	//	Aggreagation List 설정	
		for(int i=0; i < searchVO.getAggInstNmList().size(); i++){
			instNmList.add(new Term(FieldsVO.INSTNM, new TermField(searchVO.getAggInstNmList().get(i))));
		}
		
		for(int i=0; i < searchVO.getAggDeptNmList().size(); i++){
			deptNmList.add(new Term(FieldsVO.FRM_DEPT_NM, new TermField(searchVO.getAggDeptNmList().get(i))));
		}
		
		for(int i=0; i < searchVO.getAggFormNmList().size(); i++){
			formNmList.add(new Term(FieldsVO.FRM_NM, new TermField(searchVO.getAggFormNmList().get(i))));
		}
		
		queryList.add(new Bool(mustList, null, null));
		queryList.add(new Bool(null, shouldList, null));
		queryList.add(new Bool(null, null, mustNotList));
		queryList.add(new Bool(null, instNmList, null));
		queryList.add(new Bool(null, deptNmList, null));
		queryList.add(new Bool(null, formNmList, null));
		
		if(!StringUtils.isEmpty(searchVO.getFromDt()) && !StringUtils.isEmpty(searchVO.getToDt())){
			queryList.add(new Range(FieldsVO.REC_DATE	,new RangeField(searchVO.getFromDt(),searchVO.getToDt(),"yyyy-MM-dd")));	
		}
		
		
		return rest.countForm(searchVO.getIndex(), searchVO.getType(), terms, queryList);
		
	}
	
	/**
	 * 기록지 Aggreation
	 * @param paramMap
	 * @param fields
	 * @param pageSize
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes","cast","unused"})
	public Map aggregateFields(Map<Object,Object> paramMap, SearchVO searchVO) throws Exception{
		List<Map<Object,Object>> searchColumnList;
		List<Query> queryList = new ArrayList<Query>();
		List<Query> mustList = new ArrayList<Query>();
		List<Query> shouldList = new ArrayList<Query>();
		List<Query> mustNotList = new ArrayList<Query>();
		List<Query> synonymList = new ArrayList<Query>();
		List<Map<String, SortOrder>> sortList = new ArrayList<Map<String, SortOrder>>();
		Map<String, Terms> aggsMap;
		Terms terms = new Terms();
		
		terms = new Terms(FieldsVO.PATNO, searchVO.getPatSbstNoList());
		
		if("Y".equals(searchVO.getExactMatchYn())){
			mustList.add(new Term(FieldsVO.FRM_CONTS, new TermField(searchVO.getQuery())));
			
		}else{
			if(searchVO.getSynonymList().size() > 0){
				shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));	
			}else{
				mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));
			}
			
			//mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));
			
		}
		
	//	검색어 설정
		for(int i=0; i < searchVO.getSearchWordsList().size(); i++){
			Map<String,String> dsMap = (HashMap)searchVO.getSearchWordsList().get(i);
			
			if("AND".equals(dsMap.get("AND_OR_NOT"))){
				mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
				
			}else if("OR".equals(dsMap.get("AND_OR_NOT"))){
				shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
				
			}else if("NOT".equals(dsMap.get("AND_OR_NOT"))){
				mustNotList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
			}
		}
		

	//	동의어 설정
		for(int i=0; i < searchVO.getSynonymList().size(); i++){
			shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getSynonymList().get(i))));
		}
		
		queryList.add(new Bool(mustList, null, null));
		queryList.add(new Bool(null, shouldList, null));
		queryList.add(new Bool(null, null, mustNotList));
		
		if(!StringUtils.isEmpty(searchVO.getFromDt()) && !StringUtils.isEmpty(searchVO.getToDt())){
			queryList.add(new Range(FieldsVO.REC_DATE	,new RangeField(searchVO.getFromDt(),searchVO.getToDt(),"yyyy-MM-dd")));	
		}
		
		
		searchColumnList = searchVO.getFieldsList();
		
		aggsMap = new HashMap<String, Terms>();
		
		for(int i=0; i < searchColumnList.size(); i++){
			Map<String,String> dsMap = (HashMap)searchColumnList.get(i);
			
			if("AGG".equals(dsMap.get("COMM_CD_EXT3"))){
				aggsMap.put(dsMap.get("VALUE"), new Terms(dsMap.get("COMM_CD_DESC")));
			}
		}
		
		SearchResponse sr = rest.searchForm(searchVO.getIndex(),searchVO.getType(), terms, queryList
											,highlight
											,sortList
											,searchVO.getPageNo()
											,searchVO.getPageSize()
											,aggsMap);
		
		Map jsonMap = new ObjectMapper().readValue(sr.getAggregations().toString(), Map.class);
		
		return jsonMap;
		
	}
	
	
	/**
	 * 기록지 검색
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes","cast","unchecked","unused"})
	public List getSearchResult(Map<Object,Object> paramMap, SearchVO searchVO) throws Exception{
		Highlight highlight = new Highlight();
		
		List resultList = new ArrayList();
		List<Map<Object,Object>> searchColumnList;
		List<Query> queryList = new ArrayList<Query>();
		List<Query> mustList = new ArrayList<Query>();
		List<Query> shouldList = new ArrayList<Query>();
		List<Query> mustNotList = new ArrayList<Query>();
		List<Query> synonymList = new ArrayList<Query>();
		List<Query> instNmList = new ArrayList<Query>();
		List<Query> deptNmList = new ArrayList<Query>();
		List<Query> formNmList = new ArrayList<Query>();
		
		List<Map<String, SortOrder>> sortList = new ArrayList<Map<String, SortOrder>>();
		
		Map<String, Terms> aggsMap;
		
		Terms terms = new Terms();
		
		terms = new Terms(FieldsVO.PATNO, searchVO.getPatSbstNoList());
		
		if("Y".equals(searchVO.getExactMatchYn())){
			mustList.add(new Term(FieldsVO.FRM_CONTS, new TermField(searchVO.getQuery())));
			
		}else{
			if(searchVO.getSynonymList().size() > 0){
				shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));
				
			}else{
				mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));
				
			}
			
			//mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));
			
		}
		
	//	검색어 설정
		for(int i=0; i < searchVO.getSearchWordsList().size(); i++){
			Map<String,String> dsMap = (HashMap)searchVO.getSearchWordsList().get(i);
			
			if("AND".equals(dsMap.get("AND_OR_NOT"))){
				mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
				
			}else if("OR".equals(dsMap.get("AND_OR_NOT"))){
				shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
				
			}else if("NOT".equals(dsMap.get("AND_OR_NOT"))){
				mustNotList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
			}
		}
		

	//	동의어 설정
		for(int i=0; i < searchVO.getSynonymList().size(); i++){
			shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getSynonymList().get(i))));
		}
		
		for(int i=0; i < searchVO.getAggInstNmList().size(); i++){
			instNmList.add(new Term(FieldsVO.INSTNM, new TermField(searchVO.getAggInstNmList().get(i))));
		}
		
		for(int i=0; i < searchVO.getAggDeptNmList().size(); i++){
			deptNmList.add(new Term(FieldsVO.FRM_DEPT_NM, new TermField(searchVO.getAggDeptNmList().get(i))));
		}
		
		for(int i=0; i < searchVO.getAggFormNmList().size(); i++){
			formNmList.add(new Term(FieldsVO.FRM_NM, new TermField(searchVO.getAggFormNmList().get(i))));
		}
		
		queryList.add(new Bool(mustList, null, null));
		queryList.add(new Bool(null, shouldList, null));
		queryList.add(new Bool(null, null, mustNotList));
		queryList.add(new Bool(null, instNmList, null));
		queryList.add(new Bool(null, deptNmList, null));
		queryList.add(new Bool(null, formNmList, null));
		
		if(!StringUtils.isEmpty(searchVO.getFromDt()) && !StringUtils.isEmpty(searchVO.getToDt())){
			queryList.add(new Range(FieldsVO.REC_DATE	,new RangeField(searchVO.getFromDt(),searchVO.getToDt(),"yyyy-MM-dd")));
		}
		
		searchColumnList = searchVO.getFieldsList();
		
		aggsMap = new HashMap<String, Terms>();
		
		HighlightField highlightField = new HighlightField();
		List<String> preTags = new ArrayList();
		List<String> postTags = new ArrayList();
		
		preTags.add(FieldsVO.PRE_TAGS);
		postTags.add(FieldsVO.POST_TAGS);
		highlightField.setPreTags(preTags);
		highlightField.setPostTags(postTags);
		highlightField.setFragmentSize((long)1);
		highlightField.setNumberOfFragments((long)1);
		highlight.add(FieldsVO.FRM_CONTS, highlightField);
		
		if("_score".equals(searchVO.getSortSpec())){
			sortList.add(new HashMap<String, SortOrder>(){{put("_score", SortOrder.DESC);}});
			
		}else if(FieldsVO.REC_DATE.equals(searchVO.getSortSpec())){
			sortList.add(new HashMap<String, SortOrder>(){{put(FieldsVO.REC_DATE, SortOrder.DESC);}});
			
		}else{
			sortList.add(new HashMap<String, SortOrder>(){{put("_score", SortOrder.DESC);}});
			sortList.add(new HashMap<String, SortOrder>(){{put(FieldsVO.REC_DATE, SortOrder.DESC);}});
		}
		
		
		SearchResponse response = rest.searchForm( 	 searchVO.getIndex()
													,searchVO.getType()
													,terms
													,queryList
													,highlight,sortList
													,searchVO.getStartNum()
													,searchVO.getPageSize()
													,aggsMap);
		
		Hits hits = response.getHits();
		List list = hits.getHits();
		
		Map<String,Object> resultMap = new HashMap();
		
		for(int i=0; i < list.size(); i++){
			Hit hit = (Hit)list.get(i);
			Map<String,Object> rowMap = new HashMap();
			Map<String,Object> highlightMap = new HashMap();
			resultMap = new HashMap();
						
			rowMap 	= new ObjectMapper().readValue(hit.getSource().toString(), Map.class);
			highlightMap = new ObjectMapper().readValue(hit.getHighlight().toString(), Map.class);
			
			resultMap.put("SCORE", rowMap.get("_score"));
			resultMap.put("INSTNM", rowMap.get(FieldsVO.INSTNM));
			resultMap.put(PropertiesUtils.getTargetString("PAT_SBST_NO"), rowMap.get(PropertiesUtils.getTargetString("PAT_SBST_NO")));
			resultMap.put("FRM_NM", rowMap.get(FieldsVO.FRM_NM));
			resultMap.put("REC_DATE", rowMap.get(FieldsVO.REC_DATE));
			resultMap.put("FRM_DISP_USER_INFO", rowMap.get(FieldsVO.FRM_DISP_USER_INFO));
			resultMap.put("FRM_CONTS", rowMap.get(FieldsVO.FRM_CONTS));
			resultMap.put("HIGHLIGHT", highlightMap.get(FieldsVO.FRM_CONTS));
			
			resultList.add(resultMap);
		}
				
		return resultList;
		
	}
	
	
	
	/**
	 * 기록지 검색
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes","cast","unchecked","unused"})
	public Object getSearchPatSbstNoList(Map<Object,Object> paramMap, SearchVO searchVO) throws Exception{
		List<Map<Object,Object>> searchColumnList;
		List<Query> queryList = new ArrayList<Query>();
		List<Query> mustList = new ArrayList<Query>();
		List<Query> shouldList = new ArrayList<Query>();
		List<Query> mustNotList = new ArrayList<Query>();
		List<Query> synonymList = new ArrayList<Query>();
		List<Map<String, SortOrder>> sortList = new ArrayList<Map<String, SortOrder>>();
		List<Query> instNmList = new ArrayList<Query>();
		List<Query> deptNmList = new ArrayList<Query>();
		List<Query> formNmList = new ArrayList<Query>();
		
		Map<String, Terms> aggsMap;
		Terms terms = new Terms();
		
		terms = new Terms(FieldsVO.PATNO, searchVO.getPatSbstNoList());
		
		if("Y".equals(searchVO.getExactMatchYn())){
			mustList.add(new Term(FieldsVO.FRM_CONTS, new TermField(searchVO.getQuery())));
			
		}else{
			if(searchVO.getSynonymList().size() > 0){
				shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));	
			}else{
				mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));
			}
			
			//mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));
			
		}
		
	//	검색어 설정
		for(int i=0; i < searchVO.getSearchWordsList().size(); i++){
			Map<String,String> dsMap = (HashMap)searchVO.getSearchWordsList().get(i);
			
			if("AND".equals(dsMap.get("AND_OR_NOT"))){
				mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
				
			}else if("OR".equals(dsMap.get("AND_OR_NOT"))){
				shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
				
			}else if("NOT".equals(dsMap.get("AND_OR_NOT"))){
				mustNotList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(dsMap.get("INPUT_VAL"))));
			}
		}
		

	//	동의어 설정
		for(int i=0; i < searchVO.getSynonymList().size(); i++){
			shouldList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getSynonymList().get(i))));
		}
		
		for(int i=0; i < searchVO.getAggInstNmList().size(); i++){
			instNmList.add(new Term(FieldsVO.INSTNM, new TermField(searchVO.getAggInstNmList().get(i))));
		}
		
		for(int i=0; i < searchVO.getAggDeptNmList().size(); i++){
			deptNmList.add(new Term(FieldsVO.FRM_DEPT_NM, new TermField(searchVO.getAggDeptNmList().get(i))));
		}
		
		for(int i=0; i < searchVO.getAggFormNmList().size(); i++){
			formNmList.add(new Term(FieldsVO.FRM_NM, new TermField(searchVO.getAggFormNmList().get(i))));
		}
		
		queryList.add(new Bool(mustList, null, null));
		queryList.add(new Bool(null, shouldList, null));
		queryList.add(new Bool(null, null, mustNotList));
		queryList.add(new Bool(null, instNmList, null));
		queryList.add(new Bool(null, deptNmList, null));
		queryList.add(new Bool(null, formNmList, null));
		queryList.add(new Range(FieldsVO.REC_DATE	,new RangeField(searchVO.getFromDt(),searchVO.getToDt(),"yyyy-MM-dd")));
		
		searchColumnList = searchVO.getFieldsList();
		
		aggsMap = new HashMap<String, Terms>();
		
		aggsMap.put("PATNO", new Terms(FieldsVO.PATNO,searchVO.getAggSize()));
		
		SearchResponse sr = rest.searchForm(searchVO.getIndex()
											,searchVO.getType()
											,terms
											,queryList
											,highlight
											,sortList
											,searchVO.getPageNo()
											,searchVO.getPageSize()
											,aggsMap);
		
		Map jsonMap = new ObjectMapper().readValue(sr.getAggregations().toString(), Map.class);
		
		return jsonMap;
		
	}
	
	
	/**
	 * 기록지 검색
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"rawtypes","cast","unchecked","unused"})
	public List getSearchResultByPatSbstNo(Map<Object,Object> paramMap, SearchVO searchVO) throws Exception{
		Highlight highlight = new Highlight();
		
		List resultList = new ArrayList();
		List<Map<Object,Object>> searchColumnList;
		List<Query> queryList = new ArrayList<Query>();
		List<Query> mustList = new ArrayList<Query>();
		List<Map<String, SortOrder>> sortList = new ArrayList<Map<String, SortOrder>>();
		
		Map<String, Terms> aggsMap;
		
		Terms terms = new Terms();
		
		terms = new Terms(FieldsVO.PATNO, searchVO.getPatSbstNoList());
		mustList.add(new Match(FieldsVO.FRM_CONTS, new MatchField(searchVO.getQuery())));
		
		queryList.add(new Bool(mustList, null, null));
		
		sortList.add(new HashMap<String, SortOrder>(){{put(FieldsVO.REC_DATE, SortOrder.DESC);}});

		aggsMap = new HashMap<String, Terms>();
		
		HighlightField highlightField = new HighlightField();
		List<String> preTags = new ArrayList();
		List<String> postTags = new ArrayList();
		
		preTags.add(FieldsVO.PRE_TAGS);
		postTags.add(FieldsVO.POST_TAGS);
		highlightField.setPreTags(preTags);
		highlightField.setPostTags(postTags);
		highlightField.setFragmentSize(1L);
		highlightField.setNumberOfFragments(1L);
		highlight.add(FieldsVO.FRM_CONTS, highlightField);
		
		SearchResponse response = rest.searchForm( searchVO.getIndex(), searchVO.getType(), terms, queryList, highlight,sortList,0, searchVO.getPageSize(),aggsMap);
											
		Hits hits = response.getHits();
		List list = hits.getHits();
		
		Map<String,Object> resultMap = new HashMap();
		
		for(int i=0; i < list.size(); i++){
			Hit hit = (Hit)list.get(i);
			Map<String,Object> rowMap = new HashMap();
			Map<String,Object> highlightMap = new HashMap();
			resultMap = new HashMap();
						
			rowMap 	= new ObjectMapper().readValue(hit.getSource().toString(), Map.class);
			highlightMap = new ObjectMapper().readValue(hit.getHighlight().toString(), Map.class);
			
			resultMap.put("SCORE", rowMap.get("_score"));
			resultMap.put("INSTNM", rowMap.get(FieldsVO.INSTNM));
			resultMap.put(PropertiesUtils.getTargetString("PAT_SBST_NO"), rowMap.get(PropertiesUtils.getTargetString("PAT_SBST_NO")));
			resultMap.put("FRM_NM", rowMap.get(FieldsVO.FRM_NM));
			resultMap.put("REC_DATE", rowMap.get(FieldsVO.REC_DATE));
			resultMap.put("FRM_DISP_USER_INFO", rowMap.get(FieldsVO.FRM_DISP_USER_INFO));
			resultMap.put("FRM_CONTS", rowMap.get(FieldsVO.FRM_CONTS));
			resultMap.put("HIGHLIGHT", highlightMap.get(FieldsVO.FRM_CONTS));
			
			resultList.add(resultMap);
		}
				
		return resultList;
		
	}
	
	
	public List typeahead(Map<Object,Object> paramMap, SearchVO searchVO) throws Exception{
		String field = "COMPLETION";
		
		return rest.autoComplete("cdw-auto", "cdw-auto", searchVO.getQuery(), field);
		
	}
}
