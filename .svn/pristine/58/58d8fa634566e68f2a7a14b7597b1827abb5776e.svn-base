package com.softcen.bigcen.med.common.sys.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;
import com.softcen.bigcen.cmm.web.BigcenMedAbstractController;
import com.softcen.bigcen.med.utils.PropertiesUtils;

/**
 * 첨부파일 관련 컨트롤러
 * @author abcd
 *
 */

@Controller
@RequestMapping(value="/attach")
public class FileUploadController extends BigcenMedAbstractController {
	
	/**
	 * 첨부파일 업로드
	 * @param request
	 * @param res
	 */
	@RequestMapping(value="/fileUpload")
	public void fileUpload(HttpServletRequest request, HttpServletResponse response){
		logger.debug(request.toString());
		String repository = "";
		PrintWriter printWriter = null;
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset-utf-8");

		try{
			repository = PropertiesUtils.getTargetString("ATTACH_FILE_PATH");
			
			MultipartRequest mr = new MultipartRequest( request, repository, 1024*1024*5, "utf-8", new DefaultFileRenamePolicy());
			
			Enumeration enumer = mr.getFileNames();
			
			
			
			
			while(enumer.hasMoreElements()){
				String file = (String)enumer.nextElement();
				System.out.println(">>>>" + file);
				
				File s_file = mr.getFile(file);
				System.out.println(">>>>" + repository + s_file.getName());
				
				String fileName = s_file.getName();
				
				String callback = request.getParameter("CKEditorFuncNum");
				printWriter = response.getWriter();

				printWriter.println("<script type='text/javascript'>window.parent.CKEDITOR.tools.callFunction("
	                    + callback
	                    + ",'"
	                    + repository + "\\" + fileName
	                    + "','이미지를 업로드 하였습니다.'"
	                    + ")</script>");
				printWriter.flush();
			}
			

			
			
		}catch(Exception e){
			System.err.println("ERROR : " + e.getMessage());
		}
	}
	
	/**
	 * 첨부파일 다운로드
	 * @param request
	 * @param res
	 */
	@RequestMapping(value="/fileDownload")
	public void fileDownload(HttpServletRequest request, HttpServletResponse response){
		String repository = "";
		String fileName = "";
		
		
		try{
			repository = PropertiesUtils.getTargetString("ATTACH_FILE_PATH");
			fileName = "test.png";
			
			String filePath = repository + "\\" + fileName;
			
			File file = new File(filePath);
			byte b[] = new byte[4096];
			
			response.setContentType("application/octet-stream");
			
			String Encoding = new String(fileName.getBytes("UTF-8"), "8859_1");

			response.setHeader("Content-Disposition", "attachment; filename = " + Encoding);
			

			FileInputStream in = new FileInputStream(filePath);
			ServletOutputStream out2 = response.getOutputStream();
			   
			int numRead;
			while((numRead = in.read(b, 0, b.length)) != -1){
			    out2.write(b, 0, numRead);
			}
			   
			out2.flush();
			out2.close();
			in.close();


						
		}catch(Exception e){
			System.err.println("ERROR : " + e.getMessage());
		}
	}
	
	

}
