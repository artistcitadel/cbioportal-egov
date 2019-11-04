package com.softcen.bigcen.med.admin.synonymDic.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.admin.synonymDic.controller.SynonymController;
import com.softcen.bigcen.med.admin.synonymDic.dao.SynonymDAO;

@Service(value="iSynonimService")
public class SynonymServiceImpl implements ISynonymService {
	private static final Logger logger = LoggerFactory.getLogger(SynonymServiceImpl.class);
	
	@Autowired
	private SynonymDAO synonimDAO;
	
	
	public List selectSynonymCategoryList(Map<Object,Object> paramMap) throws Exception{
		return synonimDAO.selectSynonymCategoryList(paramMap);
		
	}
	
	public List selectSynonymList(Map<Object,Object> paramMap) throws Exception{
		return synonimDAO.selectSynonymList(paramMap);
		
	}
	
	public List selectSynonymTermListByRepTerm(Map<Object,Object> paramMap) throws Exception{
		return synonimDAO.selectSynonymTermListByRepTerm(paramMap);
		
	}
	
	public Object deleteSynonymTerm(Map<Object,Object> paramMap) throws Exception{
		List dsSynonymTermDelList = (ArrayList)paramMap.get("dsSynonymTermDelList");
		
		for(int i=0; i < dsSynonymTermDelList.size(); i++){
			Map<Object,Object> synonymTermMap = (HashMap)dsSynonymTermDelList.get(i);
			synonimDAO.deleteSynonymTerm(synonymTermMap);
			
		}
		
		return 0;
		
	}
	
	/**
	 * 
	 */
	public Object insertSynonym(Map<Object,Object> paramMap) throws Exception{
		int repSeq = -1;
		
		Map<Object, Object> dsSynonymMap = (HashMap)paramMap.get("dsSynonym");
		Map<Object, Object> dsSynonymItemMap = (HashMap)paramMap.get("dsSynonymItemMap");
		List dsSynonymTermList = (ArrayList)paramMap.get("dsSynonymTermList");
		
				
	//	1.SYNONYM 대표어 등록
		synonimDAO.insertSynonym(dsSynonymMap);
		
	//	2.SYNONYM 동의어 등록
		for(int i=0; i < dsSynonymTermList.size(); i++){
			Map<Object,Object> synonymTermMap = (HashMap)dsSynonymTermList.get(i);
			
			synonymTermMap.put("REP_SEQ", dsSynonymMap.get("SEQ").toString());
			
			synonimDAO.insertSynonym(synonymTermMap);
		}
		
	//	3.SYNONYM ITEM Mapping 등록
		dsSynonymItemMap.put("TERM_REP_SEQ", dsSynonymMap.get("SEQ").toString());
		
		synonimDAO.insertSynonymItemMap(dsSynonymItemMap);
		
		return 0;
	}
	
	
	public Object upsertSynonym(Map<Object,Object> paramMap) throws Exception{
		
		int repSeq = -1;
		
		Map<Object, Object> dsSynonymMap = (HashMap)paramMap.get("dsSynonym");
		Map<Object, Object> dsSynonymItemMap = (HashMap)paramMap.get("dsSynonymItemMap");
		List dsSynonymTermList = (ArrayList)paramMap.get("dsSynonymTermList");
		
//		1.SYNONYM 대표어 등록
		//synonimDAO.insertSynonym(dsSynonymMap);	
		
	//	2.SYNONYM 동의어 등록
		for(int i=0; i < dsSynonymTermList.size(); i++){
			Map<Object,Object> synonymTermMap = (HashMap)dsSynonymTermList.get(i);
			synonimDAO.upsertSynonym(synonymTermMap);
			
		}
		
//		3.SYNONYM ITEM Mapping 등록
		//dsSynonymItemMap.put("TERM_REP_SEQ", dsSynonymMap.get("SEQ").toString());
		
		synonimDAO.insertSynonymItemMap(dsSynonymItemMap);	
		
		return 0;
		
	}
	

}
