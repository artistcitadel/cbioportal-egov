package com.softcen.bigcen.rg.main.controller;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.rept.service.IReptService;
import com.softcen.bigcen.med.tableau.TableauServlet;
import com.softcen.bigcen.med.utils.PropertiesUtils;

@Controller
@RequestMapping(value="/rg")
public class RgMainController extends BigcenMedAbstractController{
	@Autowired
	private IReptService iReptService;
	/**
	 * 레지스트리 메인화면
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "/rgMain")
	public String rgMain(HttpServletRequest request, HttpServletResponse response, Model model,  Map<Object, Object> paramMap){
		logger.debug("[--- /rg/rgMain START ");
		
		try{
			// reportLeft.jsp 로부터 세부항목의 seq 값을 받아온다.
			String reportSeq = request.getParameter("SEQ");
			String sp = request.getParameter("SP");
			paramMap.put("SEQ", reportSeq);
						
			request.getSession().setAttribute("SITE_CODE",PropertiesUtils.getString("SITE_CODE"));
			String SITE_CODE = PropertiesUtils.getString("SITE_CODE");
			
			List<Map<String,Object>> bmcdwMenuList = (ArrayList)request.getSession().getAttribute("MNUINX");
			List<Map<String,Object>> rgMenuList = new ArrayList();
			
			List<Object> reptMenuRGList = iReptService.selectRGReportMenuList(paramMap);
			System.out.println("reptMenuRGList :: " + reptMenuRGList);
			List<Object> reptSubMenuList = iReptService.selectReportSubMenuList(paramMap);
			System.out.println("reptSubMenuList :: " + reptSubMenuList);
			
			// 권한에 맞는 사람만 세부 항목 리스트(REPTMNUINK) 받아 옴
			HttpSession session = request.getSession(true);
			List<Object> reptMnuINK = (List<Object>) session.getAttribute("REPTMNUINK");
			System.out.println("reptMnuINK :: " + reptMnuINK);
						
			String activeMenuSeq = "";
			String startUrl = "";
			
			Map<String,Object> startMenuMap = new HashMap<String,Object>();
			
			
			for(Map<String,Object> dsMap : bmcdwMenuList){
				String upperSeq = String.valueOf(dsMap.get("UPPER_SEQ"));
				
				if("RG".equals(dsMap.get("MENU_GBN_CD")) && "0".equals(upperSeq)){
					String chkVal = String.valueOf(dsMap.get("CHKVAL"));
					
					if("1".equals(chkVal)){
						startMenuMap.put("ACTIVE_SEQ", String.valueOf(dsMap.get("SEQ")));
						startMenuMap.put("ACTIVE_NM", String.valueOf(dsMap.get("MENU_NM")));
						startMenuMap.put("ACTIVE_URL", String.valueOf(dsMap.get("MENU_URL")));
						
						break;
					}
				}
			}
			
			/**
			 * 레지스트리 메뉴만 추출
			 */
			for(Map<String,Object> dsMap : bmcdwMenuList){
				if("RG".equals(dsMap.get("MENU_GBN_CD"))){
					String seq = "";
					
					seq = String.valueOf(dsMap.get("SEQ"));
					
					if(startMenuMap.get("ACTIVE_SEQ").equals(seq)){
						dsMap.put("ACTIVE", "active");
						
					}else{
						dsMap.put("ACTIVE", "");
						
					}
					rgMenuList.add(dsMap);
				}
			}
						
			model.addAttribute("dsRgMenuList", rgMenuList);
			model.addAttribute("dsStartMenuMap", startMenuMap);
			model.addAttribute("SITE_CODE", PropertiesUtils.getString("SITE_CODE")); 
			
			// reportLeft.jsp에서 처리
			model.addAttribute("reptMenuList", reptMenuRGList);
			model.addAttribute("reptMnuINK", reptMnuINK);
			model.addAttribute("reptSubMenuList", reptSubMenuList);
			model.addAttribute("reptSeq", reportSeq);
			model.addAttribute("reptSp", sp);
			
		}catch(Exception e){
			logger.error("rgMain ERROR : " + e.getMessage());
		}
		return "/rg/rgMain.tiles"; 
	}

}
