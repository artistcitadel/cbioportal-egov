package com.softcen.bigcen.med.research.visualize.controller;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.softcen.bigcen.med.common.sys.service.ISysService;
import com.softcen.bigcen.med.research.query.service.IQueryService;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.research.visualize.service.IVisualizePopupService;
import com.softcen.bigcen.med.research.visualize.service.IVisualizeService;
import com.softcen.bigcen.med.tableau.TableauServlet;
import com.softcen.bigcen.med.utils.PropertiesUtils;

/**
 * 시각화 PopupController
 * @author user
 *
 */
@Controller
@RequestMapping(value="/visualizepopup")
public class VisualizePopupController {

	private static final Logger logger = LoggerFactory.getLogger(VisualizePopupController.class);
	
	@Autowired
	private ISysService sysService;
	
	@Autowired
	private IVisualizePopupService visualizePopupService;
	
	//개발용
	@RequestMapping(value="/main2")
	public String visualizePopupDevControl(@RequestParam String contSeq, @RequestParam String dataSeq, Model model) throws Exception{
		logger.info(">>> CONT_SEQ : " + contSeq);
		logger.info(">>> DATA_SEQ : " + dataSeq);
		model.addAttribute("contSeq", contSeq);
		model.addAttribute("dataSeq", dataSeq);
		model.addAttribute("CONT_SEQ", contSeq);
		model.addAttribute("DATA_SEQ", dataSeq);
		String tableauUrl = "";

		model.addAttribute("tableauUrl", tableauUrl);
		Map<String, Object> param = new HashMap();
		Map<String, Object> resultMap = new HashMap();
		param.put("DATA_SEQ", dataSeq);
		
		resultMap.put("selColumnsList", visualizePopupService.selectVisualColumnsList(param));
		
		model.addAttribute("columnsList",resultMap);
		System.out.println(resultMap);

		return "/popup/visualPopupDev.tiles";
	}
	
	
	//그래프 저장
	@RequestMapping(value="/deleteVisualGraph")
	@ResponseBody
	public Object deleteVisualGraph(@RequestBody Map<String,Object> paramMap, Model model) throws Exception{
		logger.info(">>> deleteVisualGraph");
	
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{

			visualizePopupService.deleteVisualGraph(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}	
		return resultMap;
	}
	
	
	
	
	
	@RequestMapping(value="/main")
	public String visualizePopupControl(@RequestParam String contSeq, @RequestParam String dataSeq, Model model) throws Exception{
		logger.info(">>> CONT_SEQ : " + contSeq);
		logger.info(">>> DATA_SEQ : " + dataSeq);
		model.addAttribute("contSeq", contSeq);
		model.addAttribute("dataSeq", dataSeq);
		
		Map<String, Object> param = new HashMap();
		Map<String, Object> resultMap = new HashMap();
		param.put("DATA_SEQ", dataSeq);
		
		resultMap.put("selColumnsList", visualizePopupService.selectVisualColumnsList(param));
		
		model.addAttribute("columnsList",resultMap);
		System.out.println(resultMap);

		return "/popup/visualPopup.tiles";
	}
	
	
	//그래프 저장
	@RequestMapping(value="/insertVisualGraph")
	@ResponseBody
	public Object insertVisualGraph(@RequestBody Map<String,Object> paramMap, Model model) throws Exception{
		logger.info(">>> insertVisualGraph");
	
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{

			visualizePopupService.insertVisualGraph(paramMap);
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		
		
		return resultMap;
	}
	
	//그래프 저장 항목 리스트
	@RequestMapping(value="/selViusalGraphDetlList")
	@ResponseBody
	public Object getViusalGraphDetlList(@RequestBody Map<String,Object> paramMap, Model model) throws Exception{
		logger.info(">>> getViusalGraphDetlList");
	
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selectVisualGraph", visualizePopupService.selectVisualGraph(paramMap));
			resultMap.put("selViusalGraphDetlList", visualizePopupService.selectViusalGraphDetlList(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		
		
		return resultMap;
	}
	
	//그래프 저장 리스트
	@RequestMapping(value="/selGraph")
	@ResponseBody
	public Object getvisualizeGraph(@RequestBody Map<String,Object> paramMap, Model model) throws Exception{
		logger.info(">>> getvisualizeGraph");
	
		Map<Object,Object> resultMap = new HashMap<Object,Object>();
		
		try{
			resultMap.put("selGraph", visualizePopupService.selectVisualGraph(paramMap));
			resultMap.put("ERR_CD", "0");
			resultMap.put("ERR_MSG", "OK");
			
		}catch(Exception e){
			logger.error(e.getMessage());
			resultMap.put("ERR_CD", "-1");
			resultMap.put("ERR_MSG", e.getMessage());
			throw new RuntimeException(e);
		}
		
		
		
		return resultMap;
	}
	
	
	//그래프 저장 리스트
		@RequestMapping(value="/selGraphlist")
		@ResponseBody
		public Object getvisualizeGraphlist(@RequestBody Map<String,Object> paramMap, Model model) throws Exception{
			logger.info(">>> getvisualizeGraphlist");
		
			Map<Object,Object> resultMap = new HashMap<Object,Object>();
			
			try{
				resultMap.put("selGraphlist", visualizePopupService.selectVisualGraphList(paramMap));
				resultMap.put("ERR_CD", "0");
				resultMap.put("ERR_MSG", "OK");
				
			}catch(Exception e){
				logger.error(e.getMessage());
				resultMap.put("ERR_CD", "-1");
				resultMap.put("ERR_MSG", e.getMessage());
				throw new RuntimeException(e);
			}
			
			
			
			return resultMap;
		}
	
	
	//컬럼리스트
	@RequestMapping(value="/selcolumnslist")
	@ResponseBody
	public Object visualizeColumnsList(@RequestBody Map<String,Object> paramMap, Model model) throws Exception{
		logger.info(">>> visualizeColumnsList");
	
		Map<String, Object> param = new HashMap();
		Map<String, Object> resultMap = new HashMap();
		
		param.put("DATA_SEQ", paramMap.get("DATASEQ"));
		param.put("SEQ", paramMap.get("DATASEQ"));
		param.put("CONT_SEQ", paramMap.get("CONTSEQ"));
		
		List colList = (ArrayList)visualizePopupService.selectVisualColumnsList(param);
		Map tableMap = (HashMap)visualizePopupService.selectVisualTableId(param);
		
		for(int i=0; i<colList.size(); i++) {
			Map param2 = new HashMap();
			Map tmp = new HashMap();
			tmp = (HashMap) colList.get(i);
			
			param2.put("COLUMN_NM", tmp.get("COLUMN_ID"));
			param2.put("TABLE_ID", tableMap.get("TABLE_ID"));
			
			System.out.println(param2);
			Integer tmpCnt = (Integer)visualizePopupService.selectViusalColumnCnt(param2);
			
			tmp.put("CNT", tmpCnt);
		}
		
		resultMap.put("selTableList", tableMap);
		resultMap.put("selColumnsList", colList);
		
		
		return resultMap;
	}
	
	
	//Missing value
	@RequestMapping(value="/visualizeMissingValue")
	@ResponseBody
	public Object visualizeMissingValue(@RequestBody Map<String,Object> paramMap, Model model) throws Exception{
		logger.info(">>> visualizeMissingValue");
	
		Map<String, Object> param = new HashMap();
		Map<String, Object> param2 = new HashMap();
		Map<String, Object> resultMap = new HashMap();
		Map<Object, Object> param3 = new HashMap();
		param.put("SEQ", paramMap.get("DATASEQ"));
		param.put("CONT_SEQ", paramMap.get("CONTSEQ"));
		param.put("DATA_SEQ", paramMap.get("DATASEQ"));
		
		param.put("TABLE_ID", paramMap.get("TABLEID"));
		param.put("COL_ID", paramMap.get("COLID"));
		param.put("COL_TYPE", paramMap.get("COLTYPE"));
		
		resultMap = (HashMap)visualizePopupService.selectVisualTableData(param);
		
		
/*		System.out.println(dataMap.get("dsDataResultList"));
		//resultMap.put("selColumnsList", visualizePopupService.selectVisualColumnsList(param));

		System.out.println(resultMap);*/

		return resultMap;
	}
	
	//Summary data
	@RequestMapping(value="/visualizeSummaryData")
	@ResponseBody
	public Object visualizeSummaryData(@RequestBody Map<String,Object> paramMap, Model model) throws Exception{
		logger.info(">>> visualizeSummary");
	
		Map<String, Object> param = new HashMap();
		Map<String, Object> param2 = new HashMap();
		Map<String, Object> resultMap = new HashMap();
		
		List numlist = new ArrayList();	
		String numstr = new String();
	
		numlist = (ArrayList)paramMap.get("NUMLIST");
		
		for(int i=0; i<numlist.size(); i++) {
			if(i==0) {
				numstr = numlist.get(i).toString();
			}
			else {
				numstr+= " ," + numlist.get(i).toString();
			}
		}
		
		param.put("NUMLIST", paramMap.get("NUMLIST"));
		param.put("NUMTEXT", paramMap.get("NUMTEXT"));
		param.put("SEQ", paramMap.get("DATASEQ"));
		param.put("CONT_SEQ", paramMap.get("CONTSEQ"));
		param.put("DATA_SEQ", paramMap.get("DATASEQ"));
		param.put("NUM_LIST", numstr);
		param.put("TABLE_ID", paramMap.get("TABLEID"));
		param.put("COL_ID", paramMap.get("COLID"));
		param.put("COL_TYPE", paramMap.get("COLTYPE"));
		
		resultMap = (HashMap)visualizePopupService.selectVisualSummaryData(param);
		
		

		return resultMap;
	}
	
	
	//distribution, frequency
	@RequestMapping(value="/visualizeFrequency")
	@ResponseBody
	public Object visualizeFrequency(@RequestBody Map<String,Object> paramMap, Model model) throws Exception{
		logger.info(">>> visualizeFrequency");
	
		Map<String, Object> param = new HashMap();

		Map<String, Object> resultMap = new HashMap();

		param.put("SEQ", paramMap.get("DATASEQ"));
		param.put("CONT_SEQ", paramMap.get("CONTSEQ"));
		param.put("DATA_SEQ", paramMap.get("DATASEQ"));		
		param.put("TABLE_ID", paramMap.get("TABLEID"));
		param.put("GRAPH", paramMap.get("GRAPH"));
		param.put("X", paramMap.get("X"));
		param.put("ITEM_TYPE", paramMap.get("ITEMTYPE"));
		resultMap = (HashMap)visualizePopupService.selectVisualFrequency(param);
		

		return resultMap;
	}
	
	//모든 그래프 확인
	@RequestMapping(value="/visualizeAllGraph")
	@ResponseBody
	public Object visualizeAllGraph(@RequestBody Map<String,Object> paramMap, Model model) throws Exception{
		logger.info(">>> visualizeAllGraph");
	
		Map<String, Object> param = new HashMap();

		Map<String, Object> resultMap = new HashMap();

		//필터링 쿼리 함수
		
		StringBuffer filterQuery = new StringBuffer();
		filterQuery = (StringBuffer)FilterQueryMaker(paramMap);
		
		param.put("SEQ", paramMap.get("DATASEQ"));
		param.put("CONT_SEQ", paramMap.get("CONTSEQ"));
		param.put("DATA_SEQ", paramMap.get("DATASEQ"));		
		param.put("TABLE_ID", paramMap.get("TABLEID"));
		param.put("GRAPH", paramMap.get("GRAPH"));
		param.put("P1", paramMap.get("P1"));
		param.put("P2", paramMap.get("P2"));
		param.put("P3", paramMap.get("P3"));
		param.put("X", paramMap.get("X"));
		param.put("X2", paramMap.get("X2"));
		param.put("Y2", paramMap.get("Y2"));
		param.put("Y", paramMap.get("Y"));
		param.put("GRDT", paramMap.get("GRDT"));
		param.put("GRDT2", paramMap.get("GRDT2"));
		param.put("GRNUM", paramMap.get("GRNUM"));
		param.put("GRNUM2", paramMap.get("GRNUM2"));
		param.put("ITEM_TYPE", paramMap.get("ITEM_TYPE"));
		param.put("ITEM_TYPE2", paramMap.get("ITEM_TYPE2"));
		param.put("filterQuery", filterQuery);
		String tmpGraph = new String();
		
		//그래프 종류 검사
		tmpGraph = GraphKind(param);
		param.put("GKIND", tmpGraph);
		
		System.out.println(param);
		
		if("BAR".equals(paramMap.get("GRAPH"))) {
			
			if(tmpGraph.equals("bar1") || tmpGraph.equals("bar2")) {

				resultMap = (HashMap)visualizePopupService.selectVisualBarGraph1(param);
			}
			else if(tmpGraph.equals("bar3") || tmpGraph.equals("bar4")) {

				resultMap = (HashMap)visualizePopupService.selectVisualBarGraph2(param);
			}
		}
		else if("BOX".equals(paramMap.get("GRAPH"))) {
			resultMap = (HashMap)visualizePopupService.selectVisualBoxGraph(param);
		}
		else if("SCT".equals(paramMap.get("GRAPH"))) {
			resultMap = (HashMap)visualizePopupService.selectVisualScatterGraph(param);
			
		}
		else if("STACKBAR".equals(paramMap.get("GRAPH"))) {
			resultMap = (HashMap)visualizePopupService.selectVisualStackBarGraph(param);
			
		}
		else if("BARSPOT".equals(paramMap.get("GRAPH"))) {
			resultMap = (HashMap)visualizePopupService.selectVisualBarSpotGraph(param);	
		}
		else if ("LINE".equals(paramMap.get("GRAPH"))) {
			resultMap = (HashMap)visualizePopupService.selectVisualLineGraph(param);
		}
		else if ("HEAT".equals(paramMap.get("GRAPH"))) {
			resultMap = (HashMap)visualizePopupService.selectVisualHeatMap(param);
		}
		else if ("PIE".equals(paramMap.get("GRAPH"))) {
			resultMap = (HashMap)visualizePopupService.selectVisualBarGraph1(param);
			resultMap.put("type", "pie");
		}

		

		return resultMap;
	}
	private Object FilterQueryMaker(Map<String,Object> paramMap) {
		
		
		List xArray = (ArrayList)paramMap.get("FILTERX");
		List yArray = (ArrayList)paramMap.get("FILTERY");
		
		StringBuffer sbQuery = new StringBuffer();
		sbQuery.append(SQL.AND + "1=1");
		
		for(int i=0; i<xArray.size(); i++) {
			Map tmpMap = (HashMap)xArray.get(i);
			String filterValue = tmpMap.get("VALUE").toString();
			
			if(filterValue.equals("") || filterValue.equals("~")) continue;
			if("TEXT".equals(tmpMap.get("ITEM_TYPE"))){
				String[] filter = filterValue.split("\\|");
				String itemValue = tmpMap.get("ITEM_VALUE").toString();	
				
				sbQuery.append(SQL.AND);
				sbQuery.append("(");
				for(int j=0; j<filter.length; j++) {
					if(j==0) {
						sbQuery.append(itemValue + SQL.EQUAL +"'"+ filter[j]+ "'");
					}
					else {
						sbQuery.append(SQL.OR + itemValue + SQL.EQUAL +"'"+ filter[j]+ "'");
					}
				}
				sbQuery.append(")");
			}
			else if("NUM".equals(tmpMap.get("ITEM_TYPE"))) {
				String itemValue = tmpMap.get("ITEM_VALUE").toString();	
				
				sbQuery.append(SQL.AND);
				if("BETWEEN".equals(tmpMap.get("NUMVALUE"))) {
					String[] filter = filterValue.split("~");
					sbQuery.append(itemValue + SQL.BETWEEN + filter[0] + SQL.AND + filter[1] );
				}
				else if("EQ".equals(tmpMap.get("NUMVALUE"))){
					sbQuery.append(itemValue + SQL.EQUAL + filterValue);
				}
				else {
					sbQuery.append(itemValue + tmpMap.get("NUMVALUE").toString() + filterValue);
				}
			}
			else{
				String itemValue = tmpMap.get("ITEM_VALUE").toString();	
				
				sbQuery.append(SQL.AND);
				String[] filter = filterValue.split("~");
				if("n".equals(filter[1])) {
					sbQuery.append(itemValue + ">= '" + filter[0] + "'");
				}
				else if("n".equals(filter[0])) {
					sbQuery.append(itemValue + "<= '" + filter[1] + "'");
				}
				else {
					sbQuery.append(itemValue + SQL.BETWEEN +"'"+ filter[0]  + "'"+ SQL.AND +  "'" + filter[1]  +"'");
				}
				
			}
		
		}
		for(int i=0; i<yArray.size(); i++) {
			Map tmpMap = (HashMap)yArray.get(i);
			String filterValue = tmpMap.get("VALUE").toString();
			
			if(filterValue.equals("") || filterValue.equals("~")) continue;

			if("NUM".equals(tmpMap.get("ITEM_TYPE"))) {
				String itemValue = tmpMap.get("ITEM_VALUE").toString();	
				
				sbQuery.append(SQL.AND);
				if("BETWEEN".equals(tmpMap.get("NUMVALUE"))) {
					String[] filter = filterValue.split("~");
					sbQuery.append(itemValue + SQL.BETWEEN + filter[0] + SQL.AND + filter[1] );
				}
				else if("EQ".equals(tmpMap.get("NUMVALUE"))){
					sbQuery.append(itemValue + SQL.EQUAL + filterValue);
				}
				else {
					sbQuery.append(itemValue + tmpMap.get("NUMVALUE").toString() + filterValue);
				}
			}

		
		}
		return sbQuery;
		
	}
	
	//그래프 종류 검사하는 func
	private String GraphKind(Map<String,Object> paramMap) {
		String tmpGraph = new String();
		if("BAR".equals(paramMap.get("GRAPH"))) {
			if( paramMap.get("Y").toString().isEmpty() && paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "bar1";
			}
			else if(paramMap.get("Y").toString().isEmpty() && !paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "bar2";
			}
			else if(!paramMap.get("Y").toString().isEmpty() && paramMap.get("X").toString().isEmpty()) {
				tmpGraph = "bar3";
			}
			else if(!paramMap.get("Y").toString().isEmpty() && !paramMap.get("X").toString().isEmpty()) {
				tmpGraph = "bar4";
			}
		}
		else if("BOX".equals(paramMap.get("GRAPH"))) {
			if( paramMap.get("X").toString().isEmpty() &&  paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "box1";
			}
			else if( !paramMap.get("X").toString().isEmpty() &&  paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "box2";
			}
			else if( !paramMap.get("X").toString().isEmpty() &&  !paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "box3";
			}
		}
		else if("SCT".equals(paramMap.get("GRAPH"))){
			if(paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "sct1";
			}
			else if(!paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "sct2";
			}
		}
		else if("STACKBAR".equals(paramMap.get("GRAPH"))) {
			tmpGraph = "stackbar";
		}
		else if("BARSPOT".equals(paramMap.get("GRAPH"))) {
			tmpGraph = "barspot";
		}
		else if("LINE".equals(paramMap.get("GRAPH"))){
			if(paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "line1";
			}
			else if(!paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "line2";
			}
		}
		else if("HEAT".equals(paramMap.get("GRAPH"))) {
			tmpGraph = "heat";
		}
		if("PIE".equals(paramMap.get("GRAPH"))) {
			if( paramMap.get("Y").toString().isEmpty() && paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "bar1";
			}
			else if(paramMap.get("Y").toString().isEmpty() && !paramMap.get("X2").toString().isEmpty()) {
				tmpGraph = "bar2";
			}
		}
		return tmpGraph;
	}
}
