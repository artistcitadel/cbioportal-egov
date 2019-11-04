package com.softcen.bigcen.med.rept.controller;

import java.net.InetAddress;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.rept.service.IReptService;
import com.softcen.bigcen.med.tableau.TableauServlet;

@Controller
@RequestMapping(value="/report")
public class ReptController extends BigcenMedAbstractController{	
	@Autowired
	private IReptService iReptService;
	
	@RequestMapping(value = "/reportMain")
	public String reportMain(Model model, Map<Object, Object> paramMap, HttpServletRequest request) {
		try {
			// reportLeft.jsp 로부터 세부항목의 seq 값을 받아온다.
			String seq = request.getParameter("SEQ");
			String sp = request.getParameter("SP");
			paramMap.put("SEQ", seq);
			
			// reportLeft.jsp에 보여질 항목 리스트 및 세부 항목 리스트를 view에 던짐
			List<Object> reptMenuList = iReptService.selectReportMenuList(paramMap);
			List<Object> reptSubMenuList = iReptService.selectReportSubMenuList(paramMap);
			List<Object> tableauInfo = iReptService.selectTableauInfo(paramMap);
			
			// tableau에 필요한 url, user id, target id 세팅
			Map<Object, Object> info =  (Map<Object, Object>) tableauInfo.get(0);
			String url = (String) info.get("URL");
			String userId = (String) info.get("USER_ID");
			String targetId = (String) info.get("TARGET_ID");
			
			
			// 권한에 맞는 사람만 세부 항목 리스트(REPTMNUINK) 받아 옴
			HttpSession session = request.getSession(true);
			List<Object> reptMnuINK = (List<Object>) session.getAttribute("REPTMNUINK");

			
			String tableauUrl = "";
			String wgserver = "";
			String menuActive = "";
			Map<String, Object> reptSubMenuMap;

			
			// 정형보고서 tableau 그래프 출력
			// remote Address 
			/*InetAddress inetAddress = InetAddress.getLocalHost();
			String clientIp = inetAddress.getHostAddress();
			System.out.println("clientIp >> " + clientIp);*/
			String clientIp = "";
            try {
                     InetAddress inetAddress = InetAddress.getLocalHost();
                     clientIp = inetAddress.getHostAddress();
                     System.out.println(">>>> inetAddress.getHostAddress()");
            } catch (Exception e) {
                     clientIp = request.getRemoteAddr();
                     System.out.println(">>>> request.getRemoteAddr()");
            }
            System.out.println("clientIp >> " + clientIp);
			

			// wgserver
			// test data 중 올바른 URL 값이 없는 경우 예외 처리
			if (url.contains("http://") || url.contains("https://")) {
				String[] urlBuffer = url.split("/");
				wgserver = urlBuffer[0] + "//" + urlBuffer[2];
			}

			// Tableau 티켓 발행을 위한 parameter 만들기*/
			Map<String, String> param = new HashMap<String, String>();
			param.put("userId", userId);
			param.put("clientIp", clientIp);
			param.put("wgserver", wgserver);
			param.put("targetId", targetId);

			/* tableau URL */
			String ticketId = "";
			ticketId = new TableauServlet().getTrustedTicket(param);
			System.out.println("Ticket >> " + ticketId);
			System.out.println("userId >> " + userId);
			System.out.println("clientIp >> " + clientIp);
			System.out.println("targetId >> " + targetId);

			tableauUrl = url.replace("t/" + targetId, "trusted/" + ticketId + "/t/" + targetId);		
			System.out.println("wgserver>> " + wgserver);
			System.out.println("tableauUrl>> " + tableauUrl);

			String INSTCD_YN = (String) request.getSession().getAttribute("INSTCD_YN");
			if(INSTCD_YN.equals("Y")){
				tableauUrl = tableauUrl + "&";
				tableauUrl = tableauUrl + "HOSPITAL_CODE";
				tableauUrl = tableauUrl + "=";
				tableauUrl = tableauUrl + (String)request.getSession().getAttribute("HOSPITAL_CODE");
			}
		
			// reportMain.jsp에서 처리
			model.addAttribute("tableauUrl", tableauUrl); 
			// reportLeft.jsp에서 처리
			model.addAttribute("reptMenuList", reptMenuList);
			model.addAttribute("reptMnuINK", reptMnuINK);
			model.addAttribute("reptSubMenuList", reptSubMenuList);
			model.addAttribute("reptSeq", seq);
			model.addAttribute("reptSp", sp);
			
		
		} catch (Exception e) {
			e.printStackTrace();
		}

		return "/report/reportMain.tiles";
	}
	
}
