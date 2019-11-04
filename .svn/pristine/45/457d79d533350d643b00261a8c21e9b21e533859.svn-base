package com.softcen.bigcen.med.search.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.common.sys.service.ISysService;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.search.dao.SearchDAO;
import com.softcen.bigcen.med.search.vo.FieldsVO;
import com.softcen.bigcen.med.search.vo.SearchVO;
import com.softcen.bigcen.med.utils.PaginationUtils;
import com.softcen.bigcen.med.utils.PropertiesUtils;


@Service(value="searchService")
public class SearchServiceImpl extends BigcenMedAbstractServiceImpl implements ISearchService{
	
	@Autowired
	private SearchDAO searchDAO;
	
	@Autowired
	private ISysService sysService; 
	
	
	private SearchVO searchVO;
	
	
	/**
	 * 환자목록 조회
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectPatSbstNoList(Map<Object,Object> paramMap) throws Exception{
		Map<Object,Object> paramMap2 = new HashMap();
		
		StringBuffer sbQuery = new StringBuffer();
		sbQuery.append(SQL.SEPERATE + SQL.SELECT);
		sbQuery.append(SQL.SEPERATE + PropertiesUtils.getTargetString("PAT_SBST_NO"));
		sbQuery.append(SQL.SEPERATE + SQL.FROM);
		sbQuery.append(SQL.SEPERATE + paramMap.get("SEARCH_TABLE_ID"));
		sbQuery.append(SQL.SEPERATE + SQL.GROUP_BY);
		sbQuery.append(SQL.SEPERATE + PropertiesUtils.getTargetString("PAT_SBST_NO"));
		
		paramMap2.put("SEARCH_PAT_SBST_NO_LIST", sbQuery.toString());
		
		return searchDAO.selectPatSbstNoList(paramMap2);
	}
	
	
	/**
	 * 동의어 목록
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	public Object selectSynonymList(Map<Object,Object> paramMap) throws Exception{
		return searchDAO.selectSynonymList(paramMap);
	}
	
	
	
	/**
	 * 서식지검색
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"cast","unchecked","unused","rawtypes"})
	public Map<Object,Object> searchRequest(Map<Object,Object> paramMap) throws Exception{
		Map<Object,Object> resultMap = new HashMap();
		
		List list = new ArrayList();
		List patientList = new ArrayList();
		List<String> extractPatSbstNoUniqueList = new ArrayList();
		
		Long searchCount = 0L;
		Long indexCount = 0L;
		Long from = 0L;
		Long size = 10L;
		
		logger.debug("[--- SEARCH START ---]");
		
		try{
			patientList = (ArrayList)paramMap.get("SEARCH_PAT_SBST_NO_LIST");
			
			searchVO = new SearchVO();
			searchVO.setHost(PropertiesUtils.getString("SEARCH_HOST"));
			searchVO.setPort(Integer.valueOf(PropertiesUtils.getString("SEARCH_PORT")));
			searchVO.setIndex(PropertiesUtils.getString("SEARCH_INDEX"));
			searchVO.setType(PropertiesUtils.getString("SEARCH_TYPE"));
			
			searchVO.setQuery(String.valueOf(paramMap.get("SEARCH_VAL")));
			searchVO.setSortSpec(String.valueOf(paramMap.get("SEARCH_SORT_SPEC")));
			searchVO.setFromDt(String.valueOf(paramMap.get("SEARCH_FROM_DT")));
			searchVO.setToDt(String.valueOf(paramMap.get("SEARCH_TO_DT")));
			searchVO.setExactMatchYn(String.valueOf(paramMap.get("SEARCH_EXACT_MATCH_YN")));
			
			searchVO.setFieldsList(paramMap);
			
			FieldsVO.assignFields(searchVO);
			
			searchVO.setPatSbstNoList(paramMap);
			searchVO.setAggInstNmList(paramMap);
			searchVO.setAggDeptNmList(paramMap);
			searchVO.setAggFormNmList(paramMap);
			searchVO.setSearchWordsList(paramMap);
			searchVO.setSynonymList(paramMap);
			
			
			
			
			
			SearchRequest searchRequest = new SearchRequest();
			searchRequest.open(searchVO);
			
		//	색인건수
			indexCount = searchRequest.getIndexCount(paramMap, searchVO);
			
		//	검색카운트	
			searchCount = searchRequest.getSearchCount(paramMap,searchVO);
			
		//	페이지 설정	
			searchVO.setPageNo(Long.valueOf(paramMap.get("PAGE_NO").toString()));
			searchVO.setPageSize(Long.valueOf(paramMap.get("PAGE_SIZE").toString()));
			
			PaginationUtils pagination = new PaginationUtils();
			pagination.setPageIndex(searchVO.getPageNo().intValue());
			pagination.setPageSize(searchVO.getPageSize().intValue());
			pagination.setPageBlockSize(10);
			pagination.setTotalCount(Integer.valueOf(String.valueOf(searchCount)));
			pagination.caluratePage();
			
			long startNum = 0;
			if(searchVO.getPageNo() == 1){
				startNum = 0;
			}else{
				startNum = (searchVO.getPageNo() - 1) * searchVO.getPageSize();
				
			}
			searchVO.setStartNum(startNum);
			
		//	Aggreagate 검색	
			Map aggregateMap = searchRequest.aggregateFields(paramMap,searchVO);
			
		//	검색
			List resultList = searchRequest.getSearchResult(paramMap,searchVO);
			
		//	추출환자를 구하기 위한 검색
			if(searchCount == 0){
				searchVO.setAggSize(1);
			}else{
				searchVO.setAggSize((long)searchCount);
			}
			
			Map map = (HashMap)searchRequest.getSearchPatSbstNoList(paramMap,searchVO);
			logger.debug(map.toString());
			
			Iterator iter = map.keySet().iterator();
			
			while(iter.hasNext()){
				String key = (String)iter.next();
				
				Map map2 = (HashMap)map.get(key);
				
				logger.debug(key + map2.toString());
				
				List list2 = (ArrayList)map2.get("buckets");
				
				for(int i=0; i < list2.size(); i++){
					Map map3 = (HashMap)list2.get(i);
					extractPatSbstNoUniqueList.add(String.valueOf(map3.get("key")));
					
				}
				
			}
			logger.debug(extractPatSbstNoUniqueList.toString());
			
			resultMap.put("INDEX_COUNT", indexCount);
			resultMap.put("SEARCH_COUNT", searchCount);
			
			if(searchCount == 0){
				resultMap.put("EXTRACT_PAT_COUNT", 0);
			}else{
				resultMap.put("EXTRACT_PAT_COUNT", extractPatSbstNoUniqueList.size());	
			}
			
			resultMap.put("EXTRACT_PAT_LIST", extractPatSbstNoUniqueList);
			resultMap.put("AGGREGATE_MAP", aggregateMap);
			resultMap.put("RESULT_LIST", resultList);
			
			resultMap.put("PAGE_RENDER_HTML",pagination.renderHtmlOutForBootstrap());
			resultMap.put("PAGE_NO", Integer.valueOf(paramMap.get("PAGE_NO").toString()));
			resultMap.put("PAGE_SIZE", Integer.valueOf(paramMap.get("PAGE_SIZE").toString()));
			resultMap.put("START_NUM", pagination.getStartNum() - searchCount);
			resultMap.put("TOTAL_PAGE",pagination.getTotalPage());
			
			searchRequest.close();
			
			logger.debug("[--- SEARCH END ---]");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
		}
		
		return resultMap;
	}
	
	/**
	 * 환자별 서식지 검색
	 * @param paramMap
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({"unchecked"})
	public Map<Object,Object> searchRequestByPatSbstNo(Map<Object,Object> paramMap) throws Exception{
		Map<Object,Object> resultMap = new HashMap();
		
		List patientList = new ArrayList();
		
		Long searchCount = 0L;
		
		logger.debug("[--- SEARCH START ---]");
		
		try{
			patientList = (ArrayList)paramMap.get("SEARCH_PAT_SBST_NO_LIST");
			
			searchVO = new SearchVO();
			searchVO.setHost(PropertiesUtils.getString("SEARCH_HOST"));
			searchVO.setPort(Integer.valueOf(PropertiesUtils.getString("SEARCH_PORT")));
			searchVO.setIndex(PropertiesUtils.getString("SEARCH_INDEX"));
			searchVO.setType(PropertiesUtils.getString("SEARCH_TYPE"));
			searchVO.setQuery(String.valueOf(paramMap.get("SEARCH_VAL")));
			searchVO.setPatSbstNoList(patientList);
			
			Map pMap = new HashMap();
			pMap.put("SEARCH_COMM_GRP_ID", "CDW_FORM_SEARCH_CD");
			
			paramMap.put("SEARCH_COLUMN_LIST", sysService.getCommonCodeList(pMap));
			
			searchVO.setFieldsList(paramMap);

			FieldsVO.assignFields(searchVO);
			
			logger.debug(">> 검색키워드 : " + paramMap.get("SEARCH_VAL"));
			logger.debug(">> 환자대체번호 : " + patientList.toString());
			
			SearchRequest searchRequest = new SearchRequest();
			searchRequest.open(searchVO);
			
			searchCount = searchRequest.getSearchCount(paramMap,searchVO);
			
			logger.debug(">>>" + searchCount);
			
			searchVO.setPageNo((long)1);
			searchVO.setPageSize(Long.valueOf(searchCount));
			searchVO.setAggSize(searchCount);
			
			List<Map<String,Object>> resultList = (ArrayList<Map<String,Object>>)searchRequest.getSearchResultByPatSbstNo(paramMap,searchVO);
			
			logger.debug(">>>" + resultList.size());
			
			resultMap.put("SEARCH_COUNT", searchCount);
			resultMap.put("RESULT_LIST", resultList);
			
			searchRequest.close();
			
			logger.debug("[--- SEARCH END ---]");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
		}
		
		
		return resultMap;
	}
	
	
	
	
	public List<String> typeahead(Map<Object,Object> paramMap) throws Exception{
		List<String> resultList = new ArrayList();
		
		Long searchCount = 0L;
		Long indexCount = 0L;
		Long from = 0L;
		Long size = 10L;
		
		logger.debug("[--- TYPEAHEAD START ---]");
		
		try{
			searchVO = new SearchVO();
			searchVO.setHost(PropertiesUtils.getString("SEARCH_HOST"));
			searchVO.setPort(Integer.valueOf(PropertiesUtils.getString("SEARCH_PORT")));
			searchVO.setIndex(PropertiesUtils.getString("SEARCH_AUTO_INDEX"));
			searchVO.setType(PropertiesUtils.getString("SEARCH_AUTO_TYPE"));
			
			searchVO.setQuery(String.valueOf(paramMap.get("SEARCH_VAL")));
			searchVO.setSortSpec("_score");
									
			SearchRequest searchRequest = new SearchRequest();
			searchRequest.open(searchVO);
			
			resultList = searchRequest.typeahead(paramMap, searchVO);
			
			System.out.println(resultList.toString());
			
			searchRequest.close();
			
		}catch(Exception e){
			logger.error(e.getMessage());
			throw new RuntimeException(e);
		}
		
		logger.debug("[--- TYPEAHEAD END ---]");
		
		return resultList;
	}
	
	
	
	

}










