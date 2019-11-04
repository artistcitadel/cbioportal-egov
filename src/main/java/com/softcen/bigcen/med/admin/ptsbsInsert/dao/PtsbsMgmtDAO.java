package com.softcen.bigcen.med.admin.ptsbsInsert.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository(value="ptsbsMgmtDAO")
public class PtsbsMgmtDAO extends BigcenMedAbstractMapperDAO{
	
	/**
	 * 환자번호 매핑
	 * @param paramMap
	 * @return
	 */
	public Map selectPtsbsMapping(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectOne("ptsbsMgmt.selptsbsMgmt", paramMap);
		
	}
	
	public Object selectCheckPtsbsMap(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectOne("ptsbsMgmt.selCheckPtsbsMap", paramMap);
		
	}
	
	public Object selectCheckPtsbsMapAll(Map<Object,Object> paramMap){
		return sqlSessionVerticaA.selectList("ptsbsMgmt.selCheckPtsbsMapAll", paramMap);
		
	}
	
	public void insertCheckPtsbsMap(Map<Object, Object> paramMap) {
		sqlSessionVerticaA.insert("ptsbsMgmt.insertptsbsMap", paramMap);
	
	}
	
	public void updateCheckPtsbsMap(Map<Object, Object> paramMap) {
		sqlSessionVerticaA.update("ptsbsMgmt.updateptsbsMap", paramMap);

	}

}
