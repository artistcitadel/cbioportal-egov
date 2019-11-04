package com.softcen.bigcen.med.utils;

import java.io.File;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

/**
 * Properties Util 
 * @author user
 *
 */

public class PropertiesUtils {

	/** Property  */
	private Map<String, String> propertyMap = new HashMap<String, String>();
	
	/** Property 파일 */
	public final String resouce_property = "bigcen";
	
	/** Property ResourceBundle Object */
	public final ResourceBundle resources;
	
	/** */
	private static PropertiesUtils thisInstance;
	
	public static String targetProperty = "server.division";
	
	/**
	 * 
	 * @throws Exception
	 */
	private PropertiesUtils() throws Exception  {
		propertyMap = new HashMap<String, String>();
		resources = ResourceBundle.getBundle(resouce_property);
	}
	
	
	
	/**
	 * 
	 * @param property
	 * @return
	 * @throws Exception
	 */
	private String getProperty( String property ) throws Exception {
		if (!propertyMap.containsKey( property ) ) {
			propertyMap.put( property, resources.getString( property ) );
		}
		
		return propertyMap.get( property );
	}
	
	
	private void setProperty( String property, String value ) throws Exception {
		if ( ! propertyMap.containsKey( property ) ) {
			propertyMap.put( property, value );
			
		}else{
			throw new Exception("Exist Property Info");
		}
	}
	
	
	/**
	 * 
	 * @param property
	 * @return
	 * @throws Exception
	 */
	public static String getString( String property ) throws Exception {
		if ( thisInstance == null )
		{
			thisInstance = new PropertiesUtils();
		}
		
		return thisInstance.getProperty( property );
	}
	
	
	/**
	 * 서버 Division에 따른 Property값 반환
	 * @param property
	 * @return
	 * @throws Exception
	 */
	public static String getTargetString( String property ) throws Exception {
		if ( thisInstance == null ){
			thisInstance = new PropertiesUtils();
		}
		String result = "";
		
		result = thisInstance.getProperty(property + "_" + thisInstance.getProperty(targetProperty));
		
		if(result.length() == 0) {
			result = thisInstance.getProperty(targetProperty);
		}
			
		return result;
	}
	
	/**
	 * 
	 * @param property
	 * @param value
	 * @throws Exception
	 */
	public static void setString( String property, String value ) throws Exception {
		if ( thisInstance == null ){
			thisInstance = new PropertiesUtils();
		}
		
		thisInstance.setProperty( property, value );
	}
	
	/**
	 * test main 
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		File file = new File("C:\\SOFTCEN");
		URL[] urls = {file.toURI().toURL()};
		ClassLoader loader = new URLClassLoader(urls);
		
		//String path = "C:\\SOFTCEN\\bigcen";
		
		ResourceBundle rb = ResourceBundle.getBundle("bigcen", Locale.getDefault(), loader);
		
		
		
	}
	
	
	

}
