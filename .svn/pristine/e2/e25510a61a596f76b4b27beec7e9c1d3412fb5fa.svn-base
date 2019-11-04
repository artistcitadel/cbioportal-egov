package com.softcen.bigcen.med.research.visualize.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.softcen.bigcen.cmm.dao.BigcenMedAbstractMapperDAO;

@Repository("VisualizePopupDAO")
public class VisualizePopupDAO extends BigcenMedAbstractMapperDAO {
	private static final Logger logger = LoggerFactory.getLogger(VisualizePopupDAO.class);
	
	public void deleteVisualGraph(Map<String, Object> paramMap) throws Exception{
		sqlSession.delete("visualpopup.deleteVisualGraph", paramMap);
	}
	public void deleteVisualGraphDetl(Map<String, Object> paramMap) throws Exception{
		sqlSession.delete("visualpopup.deleteVisualGraphDetl", paramMap);
	}
		
	public void insertVisualGraph(Map<String, Object> paramMap) throws Exception{
		sqlSession.insert("visualpopup.insertVisualGraph", paramMap);
	}
	
	public void insertVisualGraphDetl(Map<String, Object> paramMap) throws Exception{
		sqlSession.insert("visualpopup.insertVisualGraphDetl", paramMap);
	}
	
	public Object selectViusalGraphDetlList(Map<String, Object> paramMap) throws Exception{
		return sqlSession.selectList("visualpopup.selViusalGraphDetlList",paramMap);
	}
	
	public Object selectVisualGraph(Map<String, Object> paramMap) throws Exception{
		return sqlSession.selectList("visualpopup.selViusalGraph",paramMap);
	}
	
	public Object selectVisualGraphList(Map<String, Object> paramMap) throws Exception{
		return sqlSession.selectList("visualpopup.selViusalGraphList",paramMap);
	}
	
	public Object selectVisualColumnsList(Map<String, Object> paramMap) throws Exception{
		return sqlSession.selectList("visualpopup.selViusalColumnsList",paramMap);
	}
	
	public Object selectVisualTableId(Map<String, Object> paramMap) throws Exception{
		return sqlSession.selectOne("visualpopup.selViusalTableID",paramMap);
	}
	
	public Object selectViusalColumnCnt(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectOne("visualpopup.selViusalColumnCnt",paramMap);
	}
	
	public Object selectViusalColumnAxisCnt(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectOne("visualpopup.selViusalColumnAxisCnt",paramMap);
	}
	
	public Object selectVisualTableData(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selViusalTableData",paramMap);
	}
	
	public Object selectVisualSummaryData(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selViusalSummaryData",paramMap);
	}
	
	public Object selectVisualFrequency(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selViusalFrequency",paramMap);
	}
	
	public Object selectVisualNumFrequency(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selViusalNumFrequency",paramMap);
	}	

	public Object selectVisualBarGraph1(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selViusalBarGraph1",paramMap);
	}
	
	public Object selectVisualBarGraph2(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selViusalBarGraph2",paramMap);
	}
	
	public Object selectVisualBoxGraph1(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selVisualBoxGraph1",paramMap);
	}
	
	public Object selectVisualBoxGraph2(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selVisualBoxGraph2",paramMap);
	}
	
	public Object selectVisualStackBarGraph(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selVisualStackBarGraph",paramMap);
	}
	
	public Object selectVisualBarSpotGraph(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selVisualBarSpotGraph",paramMap);
	}
	
	public Object selectVisualScatterGraph(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selVisualScatterGraph",paramMap);
	}
	
	public Object selViusalGroupData(Map<String, Object> paramMap) throws Exception{
		List tmpA = new ArrayList();
		List resultArr = new ArrayList();

		tmpA = (ArrayList)sqlSessionVerticaA.selectList("visualpopup.selViusalGroupData",paramMap);
		
		for(int i=0; i<tmpA.size(); i++) {
			Map tmpB = new HashMap();
			tmpB = (HashMap)tmpA.get(i);
			
			resultArr.add(tmpB.get("XDATA"));
		}

//		System.out.println(resultArr);
		return resultArr;
	}
	
	public Object selectVisualLineGraph(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selVisualLineGraph",paramMap);
	}
	
	public Object selVisualHeatYear(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selVisualHeatYear",paramMap);
	}
	public Object selVisualHeatMonth(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selVisualHeatMonth",paramMap);
	}
	public Object selectVisualHeatMap(Map<String, Object> paramMap) throws Exception{
		return sqlSessionVerticaA.selectList("visualpopup.selVisualHeatMap",paramMap);
	}
}