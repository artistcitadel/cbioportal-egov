package com.softcen.bigcen.med.tableau;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 타블러서버에서 Ticket 값을 받아오기 위한 클래스
 * @author RedEye
 *
 */
public class TableauServlet {
	private static final Logger logger = LoggerFactory.getLogger(TableauServlet.class);
	
	/**
	 * 타블러서버에서 Ticket 값을 받아온다
	 * @param paramMap
	 * @return
	 * @throws ServletException
	 */
	public static String getTrustedTicket(Map<String, String> paramMap) throws ServletException {
		logger.debug("[--- START getTrustedTicket");
		logger.debug(paramMap.toString());
		
		OutputStreamWriter out = null;
		BufferedReader in = null;
		try {
			// Encode the parameters
			StringBuffer data = new StringBuffer();
			data.append(URLEncoder.encode("username", "UTF-8"));
			data.append("=");
			data.append(URLEncoder.encode((String)paramMap.get("userId"), "UTF-8"));
			data.append("&");
			data.append(URLEncoder.encode("client_ip", "UTF-8"));
			data.append("=");
			data.append(URLEncoder.encode((String)paramMap.get("clientIp"), "UTF-8"));
			data.append("&");
			data.append(URLEncoder.encode("target_site", "UTF-8"));
			data.append("=");
			data.append(URLEncoder.encode((String)paramMap.get("targetId"), "UTF-8"));
			
			//request.getSession().getAttribute("INSTCD");

			// Send the request
			URL url = new URL((String)paramMap.get("wgserver") + "/trusted");
			System.out.println("url::"+url);
			URLConnection conn = url.openConnection();
			System.out.println("conn::"+conn);
			conn.setDoOutput(true);
			out = new OutputStreamWriter(conn.getOutputStream());
			System.out.println("out::"+out);
			out.write(data.toString());
			out.flush();

			// Read the response
			StringBuffer rsp = new StringBuffer();
			in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				System.out.println("line::"+line);
				rsp.append(line);
			}

			System.out.println("tableau ticket : " + rsp.toString());
			
			return rsp.toString();

		} catch (Exception e) {
			throw new ServletException(e);
		} finally {
			try {
				if (in != null)
					in.close();
				if (out != null)
					out.close();
			} catch (IOException e) {
			}
		}
	}
	
}
