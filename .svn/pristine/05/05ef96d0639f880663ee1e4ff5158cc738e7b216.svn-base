package com.softcen.bigcen.med.research.visualize.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.primitives.Doubles;
import com.softcen.bigcen.cmm.service.BigcenMedAbstractServiceImpl;
import com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions;
import com.softcen.bigcen.med.research.query.sql.helper.SQL;
import com.softcen.bigcen.med.research.visualize.dao.VisualizePopupDAO;

@Service(value="visualizePopupService")
public class VisualizePopupServiceImpl extends BigcenMedAbstractServiceImpl implements IVisualizePopupService {
	@Autowired(required = false)
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Autowired
	private VisualizePopupDAO visualizePopupDAO;

	public AnalysisFunctions AnalysisFunctions = new AnalysisFunctions();
	@Override
	public Object selectVisualColumnsList(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		List resultList = new ArrayList();
		
		//컬럼 리스트
		List colList =  (ArrayList)visualizePopupDAO.selectVisualColumnsList(paramMap);
		for(int i=0; i<colList.size(); i++) {
			List coldata = new ArrayList();
			String tmpStr = new String();
			String tmpStrItem = new String();
			
			Map tmp = new HashMap();
			tmp = (HashMap) colList.get(i);
			
			tmpStr = tmp.get("DATA_TYPE").toString();
			tmpStrItem = tmp.get("ITEM_TYPE").toString();
			
			if("TEX".equals(tmpStrItem)){
				if(tmpStr.indexOf("varchar")!=-1) {
					tmpStr = tmpStr.substring(8,tmpStr.length()-1);

					if( Integer.parseInt(tmpStr)>501) continue;
				}
			}
			
			resultList.add(colList.get(i));
		}
		
		return resultList;
	}


	@Override
	public Object selectViusalColumnCnt(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return visualizePopupDAO.selectViusalColumnCnt(paramMap);
	}
	
	@Override
	public Object selectVisualTableId(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return visualizePopupDAO.selectVisualTableId(paramMap);
	}

	//Number타입 Grouping 값 변경 Func (String 형)
	private String NumTypeGrouping(String a, String b) {
		int val = Integer.parseInt(a);
		String resultStr = new String();
			
		float range = Float.valueOf(b);
			
		resultStr = range*val +" ~ "+(range+1)*val;
		return resultStr;
	}
	
	//Number타입  Grouping 값 변경 Func (List 형)
	private List NumTypeGroupingList(String a, List b) {
		int val = Integer.parseInt(a);
		List resultList = new ArrayList();
		
		for(int i=0; i<b.size(); i++) {
			int range = Integer.parseInt(b.get(i).toString());
			resultList.add(range*val +" ~ "+(range+1)*val);
		}


		return resultList;
	}
	
	//Missing value patterns
	@Override
	public Object selectVisualTableData(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> param = new HashMap();
		Map<Integer, Object> param2 = new HashMap();
		List<List> param3 = new ArrayList();
		Map resultMap = new HashMap();
		List colnmList = new ArrayList();
		List tmpY = new ArrayList();
		
		//컬럼 리스트
		List colList =  (ArrayList)visualizePopupDAO.selectVisualColumnsList(paramMap);
		
		//컬럼별 데이터 추출
		List dsList = (ArrayList)visualizePopupDAO.selectVisualTableData(paramMap);
		
		Map<String,Integer> paramCnt = new HashMap();
		
		for(int i=0; i<colList.size(); i++) {
			List coldata = new ArrayList();
			
			Map tmp = new HashMap();
			tmp = (HashMap) colList.get(i);
			
			colnmList.add(tmp.get("COLUMN_COMMENT"));
			
			param2.put(i+1, tmp.get("COLUMN_ID"));

		}
		

		System.out.println(param2.keySet());
	
			for(int i=0; i<dsList.size(); i++) {
				
				
				Map tmp = new HashMap();
				tmp = (HashMap) dsList.get(i);
				
				tmpY.add(i+1); // y값
				List tmpArr = new ArrayList();
				
				for(Object key : param2.keySet()) {
					
					//데이터가 있는 것 1, 없으면 0
					if(tmp.containsKey(param2.get(key))) {
						tmpArr.add("1");
					}
					else {
						tmpArr.add("0");
					}
					
				}
				param3.add(tmpArr);
			
			}
		

		resultMap.put("xdata", colnmList);
		resultMap.put("ydata", tmpY);
		resultMap.put("zdata", param3);
		resultMap.put("dsCount", dsList.size());
		return resultMap;
	}

	@Override
	public Object selectVisualFrequency(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> param = new HashMap();
		Map resultMap = new HashMap();
		List tmpY = new ArrayList();
		List tmpX = new ArrayList();
		String tmpType = new String();
		
		System.out.println(paramMap);
		if(paramMap.get("GRAPH").equals("FRQ")) {
							
			List colList =  (ArrayList)visualizePopupDAO.selectVisualFrequency(paramMap);
			

			for(int i=0; i<colList.size(); i++) {
				
				Map tmp = new HashMap();
				tmp = (HashMap) colList.get(i);
				
				tmpX.add(tmp.get(paramMap.get("X")));
				tmpY.add(tmp.get("CNT"));
				
			}
			
			tmpType = "bar";
		}
		else {
			List colList =  (ArrayList)visualizePopupDAO.selectVisualFrequency(paramMap);
			List colList2 = (ArrayList)visualizePopupDAO.selectVisualNumFrequency(paramMap);

			
			for(int i=0; i<colList.size(); i++) {
				
				Map tmp = new HashMap();
				tmp = (HashMap) colList.get(i);
				
				tmpX.add(tmp.get(paramMap.get("X")));
				tmpY.add(tmp.get("CNT"));
				
			}
			resultMap.put("numdata", colList2);
			tmpType = "bar";
		}

		resultMap.put("xdata", tmpX);
		resultMap.put("ydata", tmpY);
		resultMap.put("type", tmpType);
		return resultMap;
	}

	@Override
	public Object selectVisualBarGraph1(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map resultMap = new HashMap();
		List tmpY = new ArrayList();
		List tmpX = new ArrayList();
		List tmpXa = new ArrayList();
		List tmpXb= new ArrayList();
		List tmpR = new ArrayList();
		String tmpType = new String();
		
		List colList =  (ArrayList)visualizePopupDAO.selectVisualBarGraph1(paramMap);
		
		for(int i=0; i<colList.size(); i++) {
			
			Map tmp = new HashMap();
			tmp = (HashMap) colList.get(i);
			
			if("bar1".equals(paramMap.get("GKIND"))) {
				if(paramMap.get("GRDT").toString().isEmpty() || paramMap.get("GRDT").toString().equals("")) {
					if(!paramMap.get("GRNUM").toString().isEmpty() && !paramMap.get("GRNUM").toString().equals("")) {
						tmpX.add(NumTypeGrouping(paramMap.get("GRNUM").toString(),tmp.get("XDATA").toString()));
					}
					else {
						tmpX.add(tmp.get("XDATA"));
					}
				}
				else if( "WEEK".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("DY")+"년 "+tmp.get("DW")+"주기");
				}
				else if( "MONTH".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("DY")+"년 "+tmp.get("DM")+"월");
				}
				else if( "QUARTER".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("DY")+"년 "+tmp.get("DQ")+"분기");
				}
				else if( "YEAR".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("DY")+"년");
				}
			}
			else {
				String str1 = new String();
				String str2 = new String();
				if(paramMap.get("GRDT").toString().isEmpty() || paramMap.get("GRDT").toString().equals("")) {
					if(!paramMap.get("GRNUM").toString().isEmpty() && !paramMap.get("GRNUM").toString().equals("")) {
						str1 = NumTypeGrouping(paramMap.get("GRNUM").toString(),tmp.get("XDATA").toString());
					}
					else {
						str1 = tmp.get("XDATA").toString();			
					}
				}
				else if( "WEEK".equals(paramMap.get("GRDT").toString())) {
					str1 = tmp.get("DY")+"년 "+tmp.get("DW")+"주기";
				}
				else if( "MONTH".equals(paramMap.get("GRDT").toString())) {
					str1 = tmp.get("DY")+"년 "+tmp.get("DM")+"월";
				}
				else if( "QUARTER".equals(paramMap.get("GRDT").toString())) {
					str1 = tmp.get("DY")+"년 "+tmp.get("DQ")+"분기";
				}
				else if( "YEAR".equals(paramMap.get("GRDT").toString())) {
					str1 = tmp.get("DY")+"년 ";
				}
				
				if(paramMap.get("GRDT2").toString().isEmpty() || paramMap.get("GRDT2").toString().equals("")) {
					if(!paramMap.get("GRNUM2").toString().isEmpty() && !paramMap.get("GRNUM2").toString().equals("")) {
						str2 = NumTypeGrouping(paramMap.get("GRNUM2").toString(),tmp.get("X2DATA").toString());
					}
					else {
						str2 = tmp.get("X2DATA").toString();
					}
				}
				else if( "WEEK".equals(paramMap.get("GRDT2").toString())) {
					str2 = tmp.get("DY2")+"년 "+tmp.get("DW2")+"주기";
				}
				else if( "MONTH".equals(paramMap.get("GRDT2").toString())) {
					str2 = tmp.get("DY2")+"년 "+tmp.get("DM2")+"월";
				}
				else if( "QUARTER".equals(paramMap.get("GRDT2").toString())) {
					str2 = tmp.get("DY2")+"년 "+tmp.get("DQ2")+"분기";
				}
				else if( "YEAR".equals(paramMap.get("GRDT2").toString())) {
					str2 = tmp.get("DY2")+"년 ";
				}
				tmpX.add(str1 + " , " + str2);
			}
			
			tmpY.add(tmp.get("CNT"));
			tmpR.add(tmp.get("RATIO"));
			
		}
		
		tmpType = "bar";
	
		resultMap.put("xdata", tmpX);
		resultMap.put("ydata", tmpY);
		resultMap.put("rdata", tmpR);
		resultMap.put("type", tmpType);	
		return resultMap;
	}

	@Override
	public Object selectVisualBarGraph2(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map resultMap = new HashMap();
		List tmpY = new ArrayList();
		List tmpX = new ArrayList();
		List tmpS = new ArrayList();
		String tmpType = new String();
		
		List colList =  (ArrayList)visualizePopupDAO.selectVisualBarGraph2(paramMap);
		
		for(int i=0; i<colList.size(); i++) {
			
			Map tmp = new HashMap();
			tmp = (HashMap) colList.get(i);
			
			if("bar3".equals(paramMap.get("GKIND"))) {
				tmpX.add(paramMap.get("Y").toString());
			}
			else {
				if(paramMap.get("GRDT").toString().isEmpty() || paramMap.get("GRDT").toString().equals("")) {
					if(!paramMap.get("GRNUM").toString().isEmpty() && !paramMap.get("GRNUM").toString().equals("")) {
						tmpX.add(NumTypeGrouping(paramMap.get("GRNUM").toString(),tmp.get("XDATA").toString()));
					}
					else {
						tmpX.add(tmp.get("XDATA"));
					}
				}
				else if( "WEEK".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("DY")+"년 "+tmp.get("DW")+"주기");
				}
				else if( "MONTH".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("DY")+"년 "+tmp.get("DM")+"월");
				}
				else if( "QUARTER".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("DY")+"년 "+tmp.get("DQ")+"분기");
				}
				else if( "YEAR".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("DY")+"년 ");
				}
			}
			
			tmpY.add(tmp.get("M"));
			tmpS.add(tmp.get("S"));
			
		}
		
		tmpType = "bar";
		
		resultMap.put("xdata", tmpX);
		resultMap.put("ydata", tmpY);
		resultMap.put("sdata", tmpS);
		resultMap.put("type", tmpType);	
		return resultMap;
	}

	@Override
	public Object selectVisualBoxGraph(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map resultMap = new HashMap();
		List tmpY = new ArrayList();
		List tmpX = new ArrayList();
		List tmpR = new ArrayList();
		String tmpType = new String();
		String tmpName = new String();
		tmpType = "box";
		System.out.println(paramMap);
		if("box1".equals(paramMap.get("GKIND"))) {
			List colList =  (ArrayList)visualizePopupDAO.selectVisualBoxGraph1(paramMap);
			tmpY = colList;
			tmpName = paramMap.get("Y").toString();
			
			resultMap.put("ydata", tmpY);
			resultMap.put("name", tmpName);
			resultMap.put("type", tmpType);
		}
		else {
			List trace = new ArrayList();
			if("box2".equals(paramMap.get("GKIND"))) {
				Map tmpMap = new HashMap();
				tmpMap.put("COLUMN_NM", paramMap.get("X"));
				tmpMap.put("TABLE_ID", paramMap.get("TABLE_ID"));
				tmpMap.put("GRDT", paramMap.get("GRDT"));
				tmpMap.put("ITEM_TYPE", paramMap.get("ITEM_TYPE"));
				Integer axisCnt = (Integer)visualizePopupDAO.selectViusalColumnAxisCnt(tmpMap);
				System.out.println(axisCnt);
				if(axisCnt>4000) {
					 resultMap.put("COLUMN", paramMap.get("X"));
       				 resultMap.put("ERROR", axisCnt);
					return resultMap;
				}
				
				trace = (ArrayList)visualizePopupDAO.selViusalGroupData(paramMap);
				List colList =  (ArrayList)visualizePopupDAO.selectVisualBoxGraph2(paramMap);
				List<Map> totalhash = new ArrayList();
				

				for(int i=0; i<trace.size(); i++) {
					
					Map tmpResult = new HashMap();
					
					List tmpLx = new ArrayList();
					List tmpLy = new ArrayList();
					String strX = trace.get(i).toString();
					
					for(int j=0; j<colList.size(); j++) {

						Map tmp = new HashMap();
						tmp = (HashMap) colList.get(j);
						
						String str1 = new String();
						if(paramMap.get("GRDT").toString().isEmpty() || paramMap.get("GRDT").toString().equals("")) {
							str1 = tmp.get("XDATA").toString();
						}
						else if( "WEEK".equals(paramMap.get("GRDT").toString())) {
							str1 = tmp.get("DY")+"년 "+tmp.get("DW")+"주기";
						}
						else if( "MONTH".equals(paramMap.get("GRDT").toString())) {
							str1 = tmp.get("DY")+"년 "+tmp.get("DM")+"월";
						}
						else if( "QUARTER".equals(paramMap.get("GRDT").toString())) {
							str1 = tmp.get("DY")+"년 "+tmp.get("DQ")+"분기";
						}
						else if( "YEAR".equals(paramMap.get("GRDT").toString())) {
							str1 = tmp.get("DY")+"년";
						}

						if(strX.equals(str1) ) {
							
							tmpLy.add(tmp.get("YDATA"));
							if(paramMap.get("GRDT").toString().isEmpty() || paramMap.get("GRDT").toString().equals("")) {
								if(!paramMap.get("GRNUM").toString().isEmpty() && !paramMap.get("GRNUM").toString().equals("")) {
									tmpLx.add(NumTypeGrouping(paramMap.get("GRNUM").toString(),tmp.get("XDATA").toString()));
									
								}
								else {
									tmpLx.add(tmp.get("XDATA"));
								}
							}
							else if( "WEEK".equals(paramMap.get("GRDT").toString())) {
								tmpLx.add(tmp.get("DY")+"년 "+tmp.get("DW")+"주기");
							}
							else if( "MONTH".equals(paramMap.get("GRDT").toString())) {
								tmpLx.add(tmp.get("DY")+"년 "+tmp.get("DM")+"월");
							}
							else if( "QUARTER".equals(paramMap.get("GRDT").toString())) {
								tmpLx.add(tmp.get("DY")+"년 "+tmp.get("DQ")+"분기");
							}
							else if( "YEAR".equals(paramMap.get("GRDT").toString())) {
								tmpLx.add(tmp.get("DY")+"년");
							}
						}
						
					}
					if(paramMap.get("GRDT").toString().isEmpty() || paramMap.get("GRDT").toString().equals("")) {
						if(!paramMap.get("GRNUM").toString().isEmpty() && !paramMap.get("GRNUM").toString().equals("")) {
							strX = NumTypeGrouping(paramMap.get("GRNUM").toString(),strX);
						}
						else {
							strX = strX;
						}
					}
					tmpResult.put("xdata", tmpLx);
					tmpResult.put("ydata", tmpLy);
					tmpResult.put("name",strX);
					tmpResult.put("type", tmpType);
					
					totalhash.add(tmpResult);
				}
				
				resultMap.put("trace",trace);
				resultMap.put("total", totalhash);
				
			}
			else {
				Map tmpMap = new HashMap();
				tmpMap.put("COLUMN_NM", paramMap.get("X"));
				tmpMap.put("TABLE_ID", paramMap.get("TABLE_ID"));
				tmpMap.put("GRDT", paramMap.get("GRDT"));
				tmpMap.put("ITEM_TYPE", paramMap.get("ITEM_TYPE"));
				Integer axisCnt = (Integer)visualizePopupDAO.selectViusalColumnAxisCnt(tmpMap);
				if(axisCnt>4000) {
					resultMap.put("COLUMN", paramMap.get("X"));
					resultMap.put("ERROR", axisCnt);
					return resultMap;
				}
				System.out.println(axisCnt);
				tmpMap.put("COLUMN_NM", paramMap.get("X2"));
				tmpMap.put("GRDT", paramMap.get("GRDT2"));
				tmpMap.put("GRNUM", paramMap.get("GRNUM2"));
				tmpMap.put("ITEM_TYPE", paramMap.get("ITEM_TYPE2"));
				Integer axisCnt2 = (Integer)visualizePopupDAO.selectViusalColumnAxisCnt(tmpMap);
				if(axisCnt2>4000) {
					resultMap.put("COLUMN", paramMap.get("X2"));
					resultMap.put("ERROR", axisCnt2);
					return resultMap;
				}
				System.out.println(axisCnt2);
				Map param = new HashMap();

				param.put("X", paramMap.get("X2"));
				param.put("GRDT", paramMap.get("GRDT2"));
				param.put("GRNUM", paramMap.get("GRNUM2"));
				param.put("TABLE_ID", paramMap.get("TABLE_ID"));
				param.put("ITEM_TYPE", paramMap.get("ITEM_TYPE2"));
				trace = (ArrayList)visualizePopupDAO.selViusalGroupData(param);

				List colList =  (ArrayList)visualizePopupDAO.selectVisualBoxGraph2(paramMap);
				List<Map> totalhash = new ArrayList();
				
				for(int i=0; i<trace.size(); i++) {
					
					Map tmpResult = new HashMap();
					
					List tmpLx = new ArrayList();
					List tmpLy = new ArrayList();
					String strX = trace.get(i).toString();
					
					for(int j=0; j<colList.size(); j++) {

						Map tmp = new HashMap();
						tmp = (HashMap) colList.get(j);
						
						String str1 = new String();
						if(paramMap.get("GRDT2").toString().isEmpty() || paramMap.get("GRDT2").toString().equals("")) {
							str1 = tmp.get("X2DATA").toString();
						}
						else if( "WEEK".equals(paramMap.get("GRDT2").toString())) {
							str1 = tmp.get("DY2")+"년 "+tmp.get("DW2")+"주기";
						}
						else if( "MONTH".equals(paramMap.get("GRDT2").toString())) {
							str1 = tmp.get("DY2")+"년 "+tmp.get("DM2")+"월";
						}
						else if( "QUARTER".equals(paramMap.get("GRDT2").toString())) {
							str1 = tmp.get("DY2")+"년 "+tmp.get("DQ2")+"분기";
						}
						else if( "YEAR".equals(paramMap.get("GRDT2").toString())) {
							str1 = tmp.get("DY2")+"년";
						}
						
						if(strX.equals(str1)) {
							tmpLy.add(tmp.get("YDATA"));
							if(paramMap.get("GRDT").toString().isEmpty() || paramMap.get("GRDT").toString().equals("")) {
								if(!paramMap.get("GRNUM").toString().isEmpty() && !paramMap.get("GRNUM").toString().equals("")) {
									tmpLx.add(NumTypeGrouping(paramMap.get("GRNUM").toString(),tmp.get("XDATA").toString()));
								}
								else {
									tmpLx.add(tmp.get("XDATA"));
								}
							}
							else if( "WEEK".equals(paramMap.get("GRDT").toString())) {
								tmpLx.add(tmp.get("DY")+"년 "+tmp.get("DW")+"주기");
							}
							else if( "MONTH".equals(paramMap.get("GRDT").toString())) {
								tmpLx.add(tmp.get("DY")+"년 "+tmp.get("DM")+"월");
							}
							else if( "QUARTER".equals(paramMap.get("GRDT").toString())) {
								tmpLx.add(tmp.get("DY")+"년 "+tmp.get("DQ")+"분기");
							}
							else if( "YEAR".equals(paramMap.get("GRDT").toString())) {
								tmpLx.add(tmp.get("DY")+"년");
							}
							
						}
						
					}
					
					if(paramMap.get("GRDT2").toString().isEmpty() || paramMap.get("GRDT2").toString().equals("")) {
						if(!paramMap.get("GRNUM2").toString().isEmpty() && !paramMap.get("GRNUM2").toString().equals("")) {
							strX = NumTypeGrouping(paramMap.get("GRNUM2").toString(),strX);
						}
						else {
							strX = strX;
						}
					}
					
					tmpResult.put("xdata", tmpLx);
					tmpResult.put("ydata", tmpLy);
					tmpResult.put("name",strX);
					tmpResult.put("type", tmpType);
					
					totalhash.add(tmpResult);
				}
				resultMap.put("trace",trace);
				resultMap.put("total", totalhash);
			}

			
		}
		
		return resultMap;
	}

	@Override
	public Object selViusalGroupData(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub

		return null;
	}

	@Override
	public Object selectVisualScatterGraph(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map resultMap = new HashMap();
		List tmpY = new ArrayList();
		List tmpX = new ArrayList();
		List tmpR = new ArrayList();
		String tmpType = new String();
		String tmpMode = new String();
		String tmpName = new String();
		tmpType = "scattergl";
		tmpMode = "markers";
		
		if("sct1".equals(paramMap.get("GKIND"))) {
			List colList =  (ArrayList)visualizePopupDAO.selectVisualScatterGraph(paramMap);
			
			for(int i=0; i<colList.size(); i++) {
				Map tmp = new HashMap();
				tmp = (HashMap) colList.get(i);
				if(!paramMap.get("GRNUM").toString().isEmpty() && !paramMap.get("GRNUM").toString().equals("")) {
					tmpX.add(NumTypeGrouping(paramMap.get("GRNUM").toString(),tmp.get("XDATA").toString()));
				}
				else {
					tmpX.add(tmp.get("XDATA"));
				}
				tmpY.add(tmp.get("YDATA"));
			}
			
			resultMap.put("ydata", tmpY);
			resultMap.put("xdata", tmpX);
			resultMap.put("type", tmpType);
			resultMap.put("mode", tmpMode);
		}
		else {
			Map tmpMap = new HashMap();
			tmpMap.put("X",paramMap.get("X2"));
			tmpMap.put("GRDT", paramMap.get("GRDT2"));
			tmpMap.put("TABLE_ID",paramMap.get("TABLE_ID"));
			tmpMap.put("GRNUM", paramMap.get("GRNUM2"));
			tmpMap.put("ITEM_TYPE", paramMap.get("ITEM_TYPE2"));
			List trace = (ArrayList)visualizePopupDAO.selViusalGroupData(tmpMap);
			List colList =  (ArrayList)visualizePopupDAO.selectVisualScatterGraph(paramMap);
			List<Map> totalhash = new ArrayList();
			
			for(int i=0; i<trace.size(); i++) {
				
				Map tmpResult = new HashMap();
				
				List tmpLx = new ArrayList();
				List tmpLy = new ArrayList();
				String strX = trace.get(i).toString();
				
				for(int j=0; j<colList.size(); j++) {

					Map tmp = new HashMap();
					tmp = (HashMap) colList.get(j);
					if(strX.equals(tmp.get("X2DATA").toString()) ) {
						tmpLy.add(tmp.get("YDATA"));
						tmpLx.add(tmp.get("XDATA"));
					}
					
				}

				if(paramMap.get("GRDT2").toString().isEmpty() || paramMap.get("GRDT2").toString().equals("")) {
					if(!paramMap.get("GRNUM2").toString().isEmpty() && !paramMap.get("GRNUM2").toString().equals("")) {
						strX = NumTypeGrouping(paramMap.get("GRNUM2").toString(),strX);
					}
					else {
						strX = strX;
					}
				}
				tmpResult.put("xdata", tmpLx);
				tmpResult.put("ydata", tmpLy);
				tmpResult.put("name",strX);
				tmpResult.put("type", tmpType);
				tmpResult.put("mode", tmpMode);
				
				totalhash.add(tmpResult);
				
			}

			resultMap.put("trace",trace);
			resultMap.put("total", totalhash);
		}
		
		
		return resultMap;
	}

	@Override
	public Object selectVisualStackBarGraph(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map resultMap = new HashMap();
		List tmpY = new ArrayList();
		List tmpX = new ArrayList();
		List tmpS = new ArrayList();
		String tmpType = new String();
		String tmpMode = new String();
		String tmpName = new String();
		tmpType = "bar";
		
		List<Map> totalhash = new ArrayList();
		Map tmpMap = new HashMap();
		tmpMap.put("GRDT", paramMap.get("GRDT2"));
		tmpMap.put("X",paramMap.get("X2"));
		tmpMap.put("TABLE_ID",paramMap.get("TABLE_ID"));
		tmpMap.put("GRNUM", paramMap.get("GRNUM2"));
		tmpMap.put("ITEM_TYPE", paramMap.get("ITEM_TYPE2"));
		
		List trace = (ArrayList)visualizePopupDAO.selViusalGroupData(tmpMap);
		List colList =  (ArrayList)visualizePopupDAO.selectVisualStackBarGraph(paramMap);
		for(int i=0; i<trace.size(); i++) {
			
			Map tmpResult = new HashMap();
			
			List tmpLx = new ArrayList();
			List tmpLy = new ArrayList();
			List tmpLs = new ArrayList();
			String strX = trace.get(i).toString();
			
			for(int j=0; j<colList.size(); j++) {

				Map tmp = new HashMap();
				tmp = (HashMap) colList.get(j);
				
				String str1 = new String();
				if(paramMap.get("GRDT2").toString().isEmpty() || paramMap.get("GRDT2").toString().equals("")) {
					str1 = tmp.get("X2DATA").toString();
				}
				else if( "WEEK".equals(paramMap.get("GRDT2").toString())) {
					str1 = tmp.get("DY2")+"년 "+tmp.get("DW2")+"주기";
				}
				else if( "MONTH".equals(paramMap.get("GRDT2").toString())) {
					str1 = tmp.get("DY2")+"년 "+tmp.get("DM2")+"월";
				}
				else if( "QUARTER".equals(paramMap.get("GRDT2").toString())) {
					str1 = tmp.get("DY2")+"년 "+tmp.get("DQ2")+"분기";
				}
				else if( "YEAR".equals(paramMap.get("GRDT2").toString())) {
					str1 = tmp.get("DY2")+"년";
				}
				
				if(strX.equals(str1)){
					if(paramMap.get("GRDT").toString().isEmpty() || paramMap.get("GRDT").toString().equals("")) {
						if(!paramMap.get("GRNUM").toString().isEmpty() && !paramMap.get("GRNUM").toString().equals("")) {
							tmpLx.add(NumTypeGrouping(paramMap.get("GRNUM").toString(),tmp.get("XDATA").toString()));
						}
						else {
							tmpLx.add(tmp.get("XDATA"));
						}
					}
					else if( "WEEK".equals(paramMap.get("GRDT").toString())) {
						tmpLx.add(tmp.get("DY")+"년 "+tmp.get("DW")+"주기");
					}
					else if( "MONTH".equals(paramMap.get("GRDT").toString())) {
						tmpLx.add(tmp.get("DY")+"년 "+tmp.get("DM")+"월");
					}
					else if( "QUARTER".equals(paramMap.get("GRDT").toString())) {
						tmpLx.add(tmp.get("DY")+"년 "+tmp.get("DQ")+"분기");
					}
					else if( "YEAR".equals(paramMap.get("GRDT").toString())) {
						tmpLx.add(tmp.get("DY")+"년");
					}
					tmpLy.add(tmp.get("M"));
					tmpLs.add(tmp.get("S"));
				}	
				
			}
			
			if(paramMap.get("GRDT2").toString().isEmpty() || paramMap.get("GRDT2").toString().equals("")) {
				if(!paramMap.get("GRNUM2").toString().isEmpty() && !paramMap.get("GRNUM2").toString().equals("")) {
					strX = NumTypeGrouping(paramMap.get("GRNUM2").toString(),strX);
				}
				else {
					strX = strX;
				}
			}
			
			tmpResult.put("xdata", tmpLx);
			tmpResult.put("ydata", tmpLy);
			tmpResult.put("sdata", tmpLs);
			tmpResult.put("type", tmpType);
			tmpResult.put("name", strX);
			
			totalhash.add(tmpResult);
			
		}
		
		resultMap.put("trace",trace);
		resultMap.put("total", totalhash);
		
		return resultMap;
	}

	@Override
	public Object selectVisualBarSpotGraph(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map resultMap = new HashMap();
		List tmpY1 = new ArrayList();
		List tmpX = new ArrayList();
		List tmpY2 = new ArrayList();
		List tmpS1 = new ArrayList();
		List tmpS2 = new ArrayList();
		String tmpType1 = new String();
		String tmpType2 = new String();
		tmpType1 = "bar";
		tmpType2 = "scatter";
		
		List colList =  (ArrayList)visualizePopupDAO.selectVisualBarSpotGraph(paramMap);
		for(int i=0; i<colList.size(); i++) {
			Map tmp = new HashMap();
			tmp = (HashMap) colList.get(i);
			if(paramMap.get("GRDT").toString().isEmpty() || paramMap.get("GRDT").toString().equals("")) {
				if(!paramMap.get("GRNUM").toString().isEmpty() && !paramMap.get("GRNUM").toString().equals("")) {
					tmpX.add(NumTypeGrouping(paramMap.get("GRNUM").toString(),tmp.get("XDATA").toString()));
				}
				else {
					tmpX.add(tmp.get("XDATA"));
				}
			}
			else if( "WEEK".equals(paramMap.get("GRDT").toString())) {
				tmpX.add(tmp.get("DY")+"년 "+tmp.get("DW")+"주기");
			}
			else if( "MONTH".equals(paramMap.get("GRDT").toString())) {
				tmpX.add(tmp.get("DY")+"년 "+tmp.get("DM")+"월");
			}
			else if( "QUARTER".equals(paramMap.get("GRDT").toString())) {
				tmpX.add(tmp.get("DY")+"년 "+tmp.get("DQ")+"분기");
			}
			else if( "YEAR".equals(paramMap.get("GRDT").toString())) {
				tmpX.add(tmp.get("DY")+"년 ");
			}
			tmpY1.add(tmp.get("M1"));
			tmpY2.add(tmp.get("M2"));
			tmpS1.add(tmp.get("S1"));
			tmpS2.add(tmp.get("S2"));			
		}
		
			Map totalMap = new HashMap();
		
			Map tmpMap1 = new HashMap();
			tmpMap1.put("xdata", tmpX);
			tmpMap1.put("ydata", tmpY1);
			tmpMap1.put("sdata", tmpS1);
			tmpMap1.put("name", paramMap.get("Y"));
			tmpMap1.put("type",tmpType1);
			totalMap.put("bar", tmpMap1);
			
			
			Map tmpMap2 = new HashMap();
			tmpMap2.put("xdata", tmpX);
			tmpMap2.put("ydata", tmpY2);
			tmpMap2.put("sdata", tmpS2);
			tmpMap2.put("name", paramMap.get("Y2"));
			tmpMap2.put("type",tmpType2);
			tmpMap2.put("mode", "markers");
			totalMap.put("markers", tmpMap2);
			

			resultMap.put("total", totalMap);
		
		return resultMap;
	}

	@Override
	public Object selectVisualSummaryData(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map resultMap = new HashMap();

		Map param = new HashMap();
		List nList = (ArrayList)paramMap.get("NUMLIST");
		List tList = (ArrayList)paramMap.get("NUMTEXT");
		param.put("TABLE_ID", paramMap.get("TABLE_ID"));
		for(int i=0; i<nList.size(); i++) {
			Map tmpResult = new HashMap();
			
			param.put("NUMLIST", nList.get(i));
			
			List colList = (ArrayList) visualizePopupDAO.selectVisualSummaryData(param);

			double[] a = {};
			if(colList.size() != 0) {
				a = AnalysisFunctions.summary(colList);		//summary function
				tmpResult.put("Min",a[0]);
				tmpResult.put("1st Qu.",a[1]);
				tmpResult.put("Median",a[2]);
				tmpResult.put("Mean",a[3]);
				tmpResult.put("3st Qu.",a[4]);
				tmpResult.put("Max",a[5]);
			}
		
			//min(최소값), 1st Qu.(1사 분위수), Median(중앙값), Mean(평균값), 3st Qu.(3사 분위수), Max(최대값)
			tmpResult.put("ITEM_TEXT", tList.get(i));
			tmpResult.put("ITEM_VALUE", nList.get(i));
			
			tmpResult.put("SummaryData", a);
			resultMap.put(i, tmpResult);
		}
				
		
		return resultMap;
	}

	@Override
	public Object selectVisualLineGraph(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map resultMap = new HashMap();
		List tmpY = new ArrayList();
		List tmpX = new ArrayList();
		List tmpS = new ArrayList();
		String tmpType = new String();
		String tmpMode = new String();
		String tmpName = new String();
		tmpType = "scatter";
		//tmpMode = "markers";
		
		if("line1".equals(paramMap.get("GKIND"))) {
			List colList =  (ArrayList)visualizePopupDAO.selectVisualLineGraph(paramMap);
			

			for(int i=0; i<colList.size(); i++) {
				Map tmp = new HashMap();
				tmp = (HashMap) colList.get(i);
				if(paramMap.get("GRDT").toString().isEmpty() || paramMap.get("GRDT").toString().equals("")) {
					tmpX.add(tmp.get("XDATA"));
				}
				else if( "WEEK".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("XDATA"));
				}
				else if( "MONTH".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("XDATA"));
				}
				else if( "QUARTER".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("XDATA"));
				}
				else if( "YEAR".equals(paramMap.get("GRDT").toString())) {
					tmpX.add(tmp.get("XDATA"));
				}
				tmpY.add(tmp.get("M"));
				tmpS.add(tmp.get("S"));
			}
			resultMap.put("ydata", tmpY);
			resultMap.put("xdata", tmpX);
			resultMap.put("sdata", tmpS);
			resultMap.put("type", tmpType);
			//resultMap.put("mode", tmpMode);
		}
		else {
			Map tmpMap = new HashMap();
			tmpMap.put("X",paramMap.get("X2"));
			tmpMap.put("GRNUM", paramMap.get("GRNUM2"));
			tmpMap.put("GRDT", paramMap.get("GRDT2"));
			tmpMap.put("ITEM_TYPE", paramMap.get("ITEM_TYPE2"));
			tmpMap.put("TABLE_ID",paramMap.get("TABLE_ID"));
			
			List trace = (ArrayList)visualizePopupDAO.selViusalGroupData(tmpMap);
			
			Map tmpMap2 = new HashMap();
			tmpMap2.put("X",paramMap.get("X"));
			tmpMap2.put("TABLE_ID",paramMap.get("TABLE_ID"));
			tmpMap2.put("GRDT", paramMap.get("GRDT"));
			tmpMap2.put("ITEM_TYPE", paramMap.get("ITEM_TYPE"));
			List trace2 = (ArrayList)visualizePopupDAO.selViusalGroupData(tmpMap2);
			
			
			List colList =  (ArrayList)visualizePopupDAO.selectVisualLineGraph(paramMap);
			List<Map> totalhash = new ArrayList();
			
			for(int i=0; i<trace.size(); i++) {
				
				Map tmpResult = new HashMap();
				
				List tmpLx = new ArrayList();
				List tmpLy = new ArrayList();
				List tmpLs = new ArrayList();
				String[] tmpYY = new String[trace2.size()];
				String[] tmpSS = new String[trace2.size()];
				String strX = trace.get(i).toString();
				
				for(int j=0; j<colList.size(); j++) {

					Map tmp = new HashMap();
					tmp = (HashMap) colList.get(j);

					if(strX.equals(tmp.get("X2DATA").toString()) ) {

							tmpYY[trace2.indexOf(tmp.get("XDATA").toString())] = tmp.get("M").toString();
							tmpSS[trace2.indexOf(tmp.get("XDATA").toString())] = tmp.get("S").toString();
		
					}
				}
			
				if(paramMap.get("GRDT2").toString().isEmpty() || paramMap.get("GRDT2").toString().equals("")) {
					if(!paramMap.get("GRNUM2").toString().isEmpty() && !paramMap.get("GRNUM2").toString().equals("")) {
						strX = NumTypeGrouping(paramMap.get("GRNUM2").toString(),strX);
					}
					else {
						strX = strX;
					}
				}
				
				tmpResult.put("ydata", tmpYY);
				tmpResult.put("sdata", tmpSS);
			
				tmpResult.put("xdata", trace2);
				
				tmpResult.put("name",strX);
				tmpResult.put("type", tmpType);
			//	tmpResult.put("mode	", tmpMode);
				
				totalhash.add(tmpResult);
				
			}

			/*if(!paramMap.get("GRNUM2").toString().isEmpty() && !paramMap.get("GRNUM2").toString().equals("")) {
				trace = NumTypeGroupingList(paramMap.get("GRNUM2").toString(),trace);
			}*/
			
			resultMap.put("trace",trace);
			resultMap.put("total", totalhash);
		}
		
		
		return resultMap;
	}

	@Override
	public Object selectVisualHeatMap(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub	
		Map resultMap = new HashMap();
		List<List> tmpResult = new ArrayList();
		String tmpType = new String();
		tmpType = "heatmap";

		
		List tmpYear = (ArrayList)visualizePopupDAO.selVisualHeatYear(paramMap);
		List tmpMonth = (ArrayList)visualizePopupDAO.selVisualHeatMonth(paramMap);
		List colList =  (ArrayList)visualizePopupDAO.selectVisualHeatMap(paramMap);
		
		for(int i=0; i<tmpMonth.size(); i++) {
			String nowM = tmpMonth.get(i).toString();
			List tmplist = new ArrayList();
			
			for(int j=0; j<tmpYear.size(); j++) {
				String nowY = tmpYear.get(j).toString();
				boolean flag = false;
				for(int k=0; k<colList.size(); k++) {
					Map tmp = new HashMap();
					tmp = (HashMap) colList.get(k);
					
					if(nowY.equals(tmp.get("YEAR").toString()) && nowM.equals(tmp.get("MONTH").toString()) ) {
						tmplist.add(tmp.get("M"));
						flag = true;
						break;
					}
					
				}
				
				if(flag == false) {
					tmplist.add(0);
				}
			}
			
			tmpResult.add(tmplist);
			
		}
		
		
		resultMap.put("xdata", tmpYear);
		resultMap.put("ydata", tmpMonth);
		resultMap.put("zdata", tmpResult);
		resultMap.put("type", tmpType);
		
		

		return resultMap;
	}


	@Override
	public Object selectVisualGraphList(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return visualizePopupDAO.selectVisualGraphList(paramMap);
	}

	@Override
	public Object selectVisualGraph(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return visualizePopupDAO.selectVisualGraph(paramMap);
	}

	@Override
	public void insertVisualGraph(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map tmp = new HashMap();
		
		
		//그래프 저장
		visualizePopupDAO.insertVisualGraph(paramMap);
		
		//그래프 저장 번호 확인
		List tmpList = (ArrayList)visualizePopupDAO.selectVisualGraph(paramMap);
		tmp = (HashMap)tmpList.get(0);
		Integer graghSeq = (Integer)tmp.get("GRAPH_SEQ");
		
		
		List itemX = (ArrayList)paramMap.get("ITEMX");
		List itemY = (ArrayList)paramMap.get("ITEMY");
		List xArray = (ArrayList)paramMap.get("FILTERX");
		List yArray = (ArrayList)paramMap.get("FILTERY");
		
		for(int i=0; i<itemX.size(); i++) {
			Map nowItem = new HashMap();
			Map<String, Object> param = new HashMap();
			param.put("GRAPH_SEQ", graghSeq);
			param.put("PER_CODE", paramMap.get("PER_CODE"));
			
			nowItem = (HashMap)itemX.get(i);

			List nowGroup = new ArrayList();
			nowGroup = (ArrayList)nowItem.get("grouping");
			
			if(nowGroup.size()!=0) {
				Map groupMap = (HashMap)nowGroup.get(0);
				param.put("ITEM_GROUP", groupMap.get("value"));
			}
			else {
				param.put("ITEM_GROUP", "");
			}
			
			Map tmpFilter = new HashMap();
			tmpFilter =  (HashMap)xArray.get(i);
			String filterValue1 = "";
			String filterValue2 = "";
			if(tmpFilter.get("ITEM_TYPE").equals("DATE")) {
				String strValue = tmpFilter.get("VALUE").toString();
				if(!strValue.equals("~")) {
					String[] filter = strValue.split("~");
					if("n".equals(filter[1])) {
						filterValue1  = filter[0];
					}
					else if("n".equals(filter[0])) {
						filterValue2  = filter[1];
					}
					else {
						filterValue1  = filter[0];
						filterValue2  = filter[1];
					}
				}
				
			}
			else if(tmpFilter.get("ITEM_TYPE").equals("NUM")) {
				String strValue = tmpFilter.get("VALUE").toString();
				String strNumValue = tmpFilter.get("NUMVALUE").toString();
				if("BETWEEN".equals(strNumValue)) {
					String[] filter = strValue.split("~");
					if(filter.length >= 2) {
						filterValue1  = filter[0];
						filterValue2  = filter[1];
					}
				}
				else {
					filterValue1  = strNumValue;
					filterValue2  = strValue;
				}
				
			}
			else {
				filterValue1 = tmpFilter.get("VALUE").toString();
			}
			
			
			param.put("PARAMXY", "X");
			param.put("ITEM_TYPE", nowItem.get("item_type"));
			param.put("ITEM_VALUE", nowItem.get("id"));
			param.put("FILTER_VALUE1", filterValue1);
			param.put("FILTER_VALUE2", filterValue2);
			
			//그래프 항목 저장
			visualizePopupDAO.insertVisualGraphDetl(param);
		}
		for(int i=0; i<itemY.size(); i++) {
			Map nowItem = new HashMap();
			Map<String, Object> param = new HashMap();
			param.put("GRAPH_SEQ", graghSeq);
			param.put("PER_CODE", paramMap.get("PER_CODE"));
			nowItem = (HashMap)itemY.get(i);
			
			Map tmpFilter = new HashMap();
			tmpFilter =  (HashMap)yArray.get(i);
			String filterValue1 = "";
			String filterValue2 = "";
			if(tmpFilter.get("ITEM_TYPE").equals("NUM")) {
				String strValue = tmpFilter.get("VALUE").toString();
				String strNumValue = tmpFilter.get("NUMVALUE").toString();
				if("BETWEEN".equals(strNumValue)) {
					String[] filter = strValue.split("~");
					if(filter.length >= 2) {
						filterValue1  = filter[0];
						filterValue2  = filter[1];
					}
				}
				else {
					filterValue1  = strNumValue;
					filterValue2  = strValue;
				}
				
			}
			
			param.put("ITEM_GROUP", "");
			param.put("PARAMXY", "Y");
			param.put("ITEM_TYPE", nowItem.get("item_type"));
			param.put("ITEM_VALUE", nowItem.get("id"));
			param.put("FILTER_VALUE1", filterValue1);
			param.put("FILTER_VALUE2", filterValue2);

			//그래프 항목 저장
			visualizePopupDAO.insertVisualGraphDetl(param);
		}
		
	}


	@Override
	public void insertVisualGraphDetl(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		visualizePopupDAO.insertVisualGraphDetl(paramMap);
		
	}


	@Override
	public Object selectViusalGraphDetlList(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		return visualizePopupDAO.selectViusalGraphDetlList(paramMap);
	}

	@Override
	public void deleteVisualGraph(Map<String, Object> paramMap) throws Exception {
		// TODO Auto-generated method stub
		Map<String, Object> dsparam = new HashMap();
		
		dsparam.put("CONT_SEQ", paramMap.get("CONT_SEQ"));
		dsparam.put("DATA_SEQ", paramMap.get("DATA_SEQ"));
		List<HashMap<String,String>> itemContDetlList = (ArrayList)paramMap.get("dsItemContList");
		
		
		for(int i=0; i < itemContDetlList.size(); i++){
			Map<String,String> dsMap = itemContDetlList.get(i);
			dsparam.put("GRAPH_SEQ", dsMap.get("GRAPH_SEQ"));
			
			List columnList = new ArrayList();		
			//항목 seq 찾기
			columnList = (ArrayList)visualizePopupDAO.selectViusalGraphDetlList(dsparam);
			
			//항목 제거
			for(int j=0; j<columnList.size(); j++) {
				Map<String, Object> param = new HashMap();
				Map tmp = (HashMap)columnList.get(j);
				
				Integer tmpSeq = (Integer)tmp.get("SEQ");
				
				param.put("SEQ", tmp.get("SEQ"));
				
				visualizePopupDAO.deleteVisualGraphDetl(param);
			}
			
			//항목 제거 후 그래프 제거
			visualizePopupDAO.deleteVisualGraph(dsparam);		
			
			
		}

		
	}

}