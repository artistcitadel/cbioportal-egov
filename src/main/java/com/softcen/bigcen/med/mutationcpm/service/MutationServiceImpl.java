package com.softcen.bigcen.med.mutationcpm.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.softcen.bigcen.med.mutationcpm.dao.MutationDAO;

@Service(value="mutationService")
public class MutationServiceImpl implements MutationService {
	@Autowired
	private MutationDAO mutationDAO;
	
	public List<Map<String,Object>> getMutationList(Map<String,Object> params) throws Exception{
		return mutationDAO.selectMutationList(params);
		
		
	}
	
	
	/**
	 * 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> getOncoPrintList(Map<String,Object> params) throws Exception{
		return mutationDAO.selectOncoPrintList(params);
		
	}
	
	/**
	 * 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> getOncoPrintPatList(Map<String,Object> params) throws Exception{
		return mutationDAO.selectOncoPrintPatList(params);
		
	}
	
	/**
	 * 
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public List<Map<String,Object>> getOncoPrintCancerList(Map<String,Object> params) throws Exception{
		return mutationDAO.selectOncoPrintCancerList(params);
		
	}
	
	
	public List<Map<String,Object>> getClinicalTrackList(Map<String,Object> params) throws Exception{
		return mutationDAO.selectClinicalTrackList(params);
	}

}
