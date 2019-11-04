package com.softcen.bigcen.med.research.visualize.service;

import java.util.Map;

public interface IVisualizeService {
	public Map<String, Object> selectReportId() throws Exception;
	
	/**
	 * get olap id, olap url
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> selectOlapMgmt(Map<String, Object> reportMap) throws Exception;
	
	/**
	 * 시각화 전, tableau가 바라 볼 table 생성
	 * @param paramMap : olap id, table id, column list 가 map 타입으로 저장된 매개변수
	 * @throws Exception
	 */
	public void createTableForVisualize(Map<String, Object> paramMap) throws Exception;
	
	/**
	 * OLAP_ID 생성
	 * @return
	 */
	public Map<String, Object> getOlapId();
	
}
