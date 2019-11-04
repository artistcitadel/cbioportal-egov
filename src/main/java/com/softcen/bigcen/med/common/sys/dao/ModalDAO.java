package com.softcen.bigcen.med.common.sys.dao;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;
import com.softcen.bigcen.med.admin.log.dao.LogMgmtDAO;
import com.softcen.bigcen.med.utils.PropertiesUtils;

@Repository("modalDAO")
public class ModalDAO extends BigcenMedAbstractMapperDAO{
	
	private static final Logger logger = LoggerFactory.getLogger(LogMgmtDAO.class);
	
	public List<Map<Object, Object>> selectDiseaseCodeW(Map<String, String> paramMap) throws Exception{
		
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		String mapper = "common_modal.selectDiseaseCodeW";
		String INSTCD_YN = (String) paramMap.get("INSTCD_YN");
		
		if(INSTCD_YN.equals("Y")){
			mapper = mapper + "InstCd";
		}
		
		return sqlSessionVerticaA.selectList(mapper, paramMap);
		
	}
	
	public List<Map<Object, Object>> selectDiseaseParentCodeListW(Map<String, String> paramMap) throws Exception{
		
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		String mapper = "common_modal.selectDiseaseParentCodeListW";
		String INSTCD_YN = (String) paramMap.get("INSTCD_YN");
		
		if(INSTCD_YN.equals("Y")){
			mapper = mapper + "InstCd";
		}
		
		return sqlSessionVerticaA.selectList(mapper, paramMap);
		
	}
	
	public Object selectDiseaseCodeTreeW(Map<Object,Object> paramMap) throws Exception{
		return sqlSession.selectList("common_modal.selectDiseaseCodeTreeW", paramMap);
	}
	
	public Object selectSearchSelectItemContDetlWList(Map<Object,Object> paramMap) throws SQLException{
		String mapper = "common_modal.selectSearchSelectItemContDetlWList";
		String INSTCD_YN = (String) paramMap.get("INSTCD_YN");
		
		if(INSTCD_YN.equals("Y")){
			mapper = mapper + "InstCd";
		}
		
		return sqlSession.selectList(mapper, paramMap);
	}
	
	public Object insertDiseaseCodeForTreeW(Map<Object, Object> paramMap) {
		String mapper = "common_modal.insertDiseaseCodeForTreeW";
		String INSTCD_YN = (String) paramMap.get("INSTCD_YN");
		
		if(INSTCD_YN.equals("Y")){
			mapper = mapper + "InstCd";
		}
		
		return sqlSession.insert(mapper, paramMap);
	}
	
	public int selectLovMaxSeq(Map<Object, Object> paramMap) {
		return sqlSession.selectOne("common_modal.selectLovMaxSeq", paramMap);
	}
	
	public Object deleteDiseaseCodeForTreeW(Map<Object, Object> paramMap) {
		int ret = sqlSession.delete("common_modal.deleteDiseaseCodeForTreeW", paramMap);
		
		return ret;
	}
	
	public Object insertDiseaseShareCodeForTreeW(Map<Object, Object> paramMap) {
		String mapper = "common_modal.insertDiseaseShareCodeForTreeW";
		String INSTCD_YN = (String) paramMap.get("INSTCD_YN");
		
		if(INSTCD_YN.equals("Y")){
			mapper = mapper + "InstCd";
		}
		
		return sqlSession.insert(mapper, paramMap);
	}
	
	public List<Map<Object, Object>> selectSelectBoxP(Map<String, String> paramMap) throws Exception{
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		//paramMap.put("SCHEMA", "ODS");
		//logger.debug(">>>" + paramMap.toString());
		return sqlSessionVerticaA.selectList("common_modal.selectSelectBoxP", paramMap);
	}
	
	public List<Map<Object, Object>> selectCodeListP(Map<String, String> paramMap) throws Exception{
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		String idKey = (String) paramMap.get("id");
		
		String mapper = "common_modal.selectCodeListP"+idKey;
		String INSTCD_YN = (String) paramMap.get("INSTCD_YN");
		
		if(INSTCD_YN.equals("Y")){
			mapper = mapper + "InstCd";
		}
		
		return sqlSessionVerticaA.selectList(mapper, paramMap);
	}
	
	public List<Map<Object, Object>> selectDiseaseParentCodeListP(Map<String, String> paramMap) throws Exception{
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		
		String mapper = "common_modal.selectDiseaseParentCodeListP";
		String INSTCD_YN = (String) paramMap.get("INSTCD_YN");
		
		if(INSTCD_YN.equals("Y")){
			mapper = mapper + "InstCd";
		}
		
		return sqlSessionVerticaA.selectList(mapper, paramMap);
		
	}
	
	public List<Map<Object, Object>> selectCommonCodeList(Map<String, String> paramMap) throws Exception{
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		return sqlSessionVerticaA.selectList("common_modal.selectCommonCodeList", paramMap);
	}
	
	public List<Map<Object, Object>> selectUpperCommonCodeList(Map<String, String> paramMap){
		String idKey = (String) paramMap.get("ID");
		return sqlSession.selectList("common_modal.selectUpperCommonCodeList"+idKey, paramMap);
	}
	
	public List<Map<Object, Object>> selectCommonCodeList_3HT_MR_EDIT(Map<String, String> paramMap) throws Exception{
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		String mapper = "common_modal.selectCommonCodeList_3HT_MR_EDIT";
		String INSTCD_YN = (String) paramMap.get("INSTCD_YN");
		
		if(INSTCD_YN.equals("Y")){
			mapper = mapper + "InstCd";
		}
		
		return sqlSessionVerticaA.selectList(mapper, paramMap);
	}
	
	public List<Map<Object, Object>> selectCommonCodeList_3HT_MR_LIST(Map<String, String> paramMap) throws Exception{
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		String mapper = "common_modal.selectCommonCodeList_3HT_MR_LIST";
		String INSTCD_YN = (String) paramMap.get("INSTCD_YN");
		
		if(INSTCD_YN.equals("Y")){
			mapper = mapper + "InstCd";
		}
		
		return sqlSessionVerticaA.selectList(mapper, paramMap);
	}
	
	public List<Map<Object, Object>> selectCommonCodeList_3HT_MR_CHECK(Map<String, String> paramMap) throws Exception{
		paramMap.put("SCHEMA", PropertiesUtils.getTargetString("SCHEMA"));
		//logger.debug(">>>" + paramMap.toString());
		return sqlSessionVerticaA.selectList("common_modal.selectCommonCodeList_3HT_MR_CHECK", paramMap);
	}
	
	public List<Map<Object, Object>> selectKeyWordCodeList(Map<String, String> paramMap){
		//logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("common_modal.selectKeyWordCodeList", paramMap);
	}
	
	public List<Map<Object, Object>> selectKeyWordCodeDetlList(Map<String, String> paramMap){
		//logger.debug(">>>" + paramMap.toString());
		return sqlSession.selectList("common_modal.selectKeyWordCodeDetlList", paramMap);
	}

}
