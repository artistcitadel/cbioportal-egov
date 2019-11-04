package com.softcen.bigcen.med.research.dataDownload.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface IDataDownloadService {
	
	public Object selectMyApplyList(Map<Object, Object> paramMap) throws SQLException;
	
	public Object dataDownload(Map<Object, Object> paramMap) throws SQLException;
	
	public Object dataDownloadColumn(Map<Object, Object> paramMap) throws SQLException;
}
