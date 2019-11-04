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

import com.softcen.bigcen.med.research.query.service.IQueryService;
import com.softcen.bigcen.med.research.visualize.service.IVisualizeService;
import com.softcen.bigcen.med.tableau.TableauServlet;
import com.softcen.bigcen.med.utils.PropertiesUtils;

/**
 * 시각화 controller
 * @author user
 *
 */
@Controller
@RequestMapping(value="/visualize")
public class VisualizeController {

	private static final Logger logger = LoggerFactory.getLogger(VisualizeController.class);
	
	@Autowired
	private IVisualizeService visualizeService;
	@Autowired
	private IQueryService iQueryService;

	// ajax loading 처리를 위한 빈페이지 호출 method
	@RequestMapping(value="/control")
	public String visualizePopupControl(@RequestParam String contSeq, @RequestParam String dataSeq, Model model) throws Exception{
		logger.info(">>> CONT_SEQ : " + contSeq);
		logger.info(">>> DATA_SEQ : " + dataSeq);
		model.addAttribute("contSeq", contSeq);
		model.addAttribute("dataSeq", dataSeq);

		return "/visualize/visualizePopup.tiles";
	}
	
	// 시각화 주요 처리 
		@RequestMapping(value="/main2")
		@ResponseBody
		public Object visualizePopupVisualMain(Model model, HttpServletRequest request, @RequestBody Map<String,Object> tparamMap) throws Exception{
			logger.debug("[--- START visualizePopupMain2");
			String contSeq = tparamMap.get("CONT_SEQ").toString();
			String dataSeq = tparamMap.get("DATA_SEQ").toString();
			logger.info(">>> CONT_SEQ : " + contSeq);
			logger.info(">>> DATA_SEQ : " + dataSeq);

			Map<String, Object> resultMap = new HashMap();
			// get olap id
			Map<String, Object> reportMap = visualizeService.getOlapId();
			
			if (reportMap.size() == 0) {
				model.addAttribute("message", "현재 사용량이 많습니다.\\n잠시후 다시 시도해 주세요.");
				resultMap.put("message", "현재 사용량이 많습니다. 잠시후 다시 시도해 주세요.");
				return resultMap;
			} else {
				try {
					Map<String, Object> olapMap = visualizeService.selectOlapMgmt(reportMap); 
					
					// tableau가 바라 볼 table 생성 
					// get olap information
					Map<Object, Object> paramMap = new HashMap<Object, Object>();
					paramMap.put("CONT_SEQ", contSeq); 
					paramMap.put("DATA_SEQ", dataSeq);			
					Map<Object, Object> olapInfoMap = (Map<Object, Object>) iQueryService.getOlapInfo(paramMap);
					
					// olapInfoMap에서 필요한 table id, column list 추출 후, table 생성
					List<Map<Object, Object>> dataList = (List<Map<Object, Object>>) olapInfoMap.get("dsItemContData");	
					List<Map<Object, Object>> dataDet1List = (List<Map<Object, Object>>) olapInfoMap.get("dsItemContDataDetl");				
					
					Map<String, Object> paramMap2 = new HashMap<String, Object>();
					paramMap2.put("OLAP_ID", olapMap.get("OLAP_ID"));
					
					for(int i = 0; i < dataList.size(); i++){
						paramMap2.put("TABLE_ID", dataList.get(i).get("TABLE_ID"));
					}
					
					// table 생성 시 필요한 컬럼 리스트
					List columnList = new ArrayList();
					for(int i = 0; i < dataDet1List.size(); i++){
						columnList.add(dataDet1List.get(i).get("COLUMN_ID")+" AS \""+dataDet1List.get(i).get("COLUMN_COMMENT")+"\"");
					}
			
					paramMap2.put("COLUMN_NAME", columnList);
					visualizeService.createTableForVisualize(paramMap2);

					// Tableau 티켓 발행을 위한 기본 설정

					String clientIp = "";
	                try {
	                          InetAddress inetAddress = InetAddress.getLocalHost();
	                          clientIp = inetAddress.getHostAddress();
	                          System.out.println(">>>> inetAddress.getHostAddress()");
	                } catch (Exception e) {
	                          clientIp = request.getRemoteAddr();
	                          System.out.println(">>>> request.getRemoteAddr()");
	                }
	                String userId = PropertiesUtils.getString("VISUAL_USER_ID");
	                String targetId = PropertiesUtils.getString("VISUAL_TARGET_ID");
	                String wgserver = olapMap.get("OLAP_URL").toString();

					if (wgserver.contains("http://") || wgserver.contains("https://")) {
						String[] urlBuffer = wgserver.split("/");
						wgserver = urlBuffer[0] + "//" + urlBuffer[2];
					}

					// Tableau 티켓 발행을 위한 parameter 만들기
					Map<String, String> param = new HashMap<String, String>();
					param.put("userId", userId);
					param.put("clientIp", clientIp);
					param.put("wgserver", wgserver);
					param.put("targetId", targetId);

					// get tableau URL
					String ticketId = new TableauServlet().getTrustedTicket(param);
					System.out.println("Ticket >> " + ticketId);

					String tableauUrl = olapMap.get("OLAP_URL").toString().replace("t/" + targetId,"trusted/" + ticketId + "/t/" + targetId);
					//String tableauUrl ="main2?contSeq=762&dataSeq=383";
					model.addAttribute("tableauUrl", tableauUrl);
					resultMap.put("tableauUrl", tableauUrl);
					
				} catch (Exception e) {
					e.printStackTrace();
				}

				return resultMap;
			}
		}
	
	
	// 시각화 주요 처리 method
	@RequestMapping(value="/main")
	public String visualizePopupMain(@RequestParam String contSeq, @RequestParam String dataSeq, Model model, HttpServletRequest request) throws Exception{
		logger.debug("[--- START visualizePopupMain");
		logger.info(">>> CONT_SEQ : " + contSeq);
		logger.info(">>> DATA_SEQ : " + dataSeq);

		
		// get olap id
		Map<String, Object> reportMap = visualizeService.getOlapId();
		
		if (reportMap.size() == 0) {
			model.addAttribute("message", "현재 사용량이 많습니다.\\n잠시후 다시 시도해 주세요.");
			return "/visualize/blank.tiles";
		} else {
			try {
				Map<String, Object> olapMap = visualizeService.selectOlapMgmt(reportMap); 
				
				/* tableau가 바라 볼 table 생성 */
				// get olap information
				Map<Object, Object> paramMap = new HashMap<Object, Object>();
				paramMap.put("CONT_SEQ", contSeq); 
				paramMap.put("DATA_SEQ", dataSeq);			
				Map<Object, Object> olapInfoMap = (Map<Object, Object>) iQueryService.getOlapInfo(paramMap);
				
				// olapInfoMap에서 필요한 table id, column list 추출 후, table 생성
				List<Map<Object, Object>> dataList = (List<Map<Object, Object>>) olapInfoMap.get("dsItemContData");	
				List<Map<Object, Object>> dataDet1List = (List<Map<Object, Object>>) olapInfoMap.get("dsItemContDataDetl");				
				
				Map<String, Object> paramMap2 = new HashMap<String, Object>();
				paramMap2.put("OLAP_ID", olapMap.get("OLAP_ID"));
				
				for(int i = 0; i < dataList.size(); i++){
					paramMap2.put("TABLE_ID", dataList.get(i).get("TABLE_ID"));
				}
				
				// table 생성 시 필요한 컬럼 리스트
				List columnList = new ArrayList();
				for(int i = 0; i < dataDet1List.size(); i++){
					columnList.add(dataDet1List.get(i).get("COLUMN_ID")+" AS \""+dataDet1List.get(i).get("COLUMN_COMMENT")+"\"");
				}
		
				paramMap2.put("COLUMN_NAME", columnList);
				visualizeService.createTableForVisualize(paramMap2);

				// Tableau 티켓 발행을 위한 기본 설정
				/*InetAddress inetAddress = InetAddress.getLocalHost();
				String clientIp = inetAddress.getHostAddress();*/
				String clientIp = "";
                try {
                          InetAddress inetAddress = InetAddress.getLocalHost();
                          clientIp = inetAddress.getHostAddress();
                          System.out.println(">>>> inetAddress.getHostAddress()");
                } catch (Exception e) {
                          clientIp = request.getRemoteAddr();
                          System.out.println(">>>> request.getRemoteAddr()");
                }
                String userId = PropertiesUtils.getString("VISUAL_USER_ID");
                String targetId = PropertiesUtils.getString("VISUAL_TARGET_ID");
                String wgserver = olapMap.get("OLAP_URL").toString();

				if (wgserver.contains("http://") || wgserver.contains("https://")) {
					String[] urlBuffer = wgserver.split("/");
					wgserver = urlBuffer[0] + "//" + urlBuffer[2];
				}

				// Tableau 티켓 발행을 위한 parameter 만들기
				Map<String, String> param = new HashMap<String, String>();
				param.put("userId", userId);
				param.put("clientIp", clientIp);
				param.put("wgserver", wgserver);
				param.put("targetId", targetId);

				// get tableau URL
				String ticketId = new TableauServlet().getTrustedTicket(param);
				System.out.println("Ticket >> " + ticketId);

				String tableauUrl = olapMap.get("OLAP_URL").toString().replace("t/" + targetId,
						"trusted/" + ticketId + "/t/" + targetId);

				model.addAttribute("tableauUrl", tableauUrl);

			} catch (Exception e) {
				e.printStackTrace();
			}

			return "/visualize/visualizePopup.tiles";
		}
		
	}
}
