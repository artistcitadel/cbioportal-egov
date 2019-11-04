package com.softcen.bigcen.med.utils;

import java.security.MessageDigest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;


public class BigcenSecurityUtils {
	public static final String strKey = "uuhgroupware!!!!";
	public static final String strIV = "uuhgroupware!!!!";

	public static void main(String[] args) throws Exception {
		String perCode = "0000000";
		String perPass = "0000001";

		String message = getUpdateStr(perCode, perPass);

		String strEncrypted = encrypt(message);
		String strDecrypted = decrypt(strEncrypted);
		//
		System.out.println("[비밀번호] " + perCode + perPass);
		System.out.println("[Original URL] " + message);
		System.out.println("[암호화된 URL] str=" + strEncrypted);
		System.out.println("[비밀번호 업데이트 시 호출되는 URL] updateUserPassword.do?str=" + strEncrypted);

		System.out.println("");
		System.out.println("[updateUserPassword.do 처리 내역]");
		System.out.println("1. str 파라미터 값 획득 : " + strEncrypted);
		System.out.println("3. 복호화: " + strDecrypted);
		System.out.println("4. perCode(" + getUserId(strDecrypted) + "), perPass(" + getPassword(strDecrypted) + ") parsing");
		System.out.println("5. 사용자 관리 테이블 비밀번호 변경 : UPDATE CC_PERINX SET PER_PASS = #perPass# WHERE PER_CODE = #perCode#");
	}

	public static String getUpdateStr(String id, String password) throws Exception {
		return "perCode=" + id + "&perPass=" + encryptPassword(password, id);
	}
	
	
	public static String encryptPassword(String password) throws Exception {
		if (password == null) {
			return "";
		}

		String iptpwd_sha256 = DigestUtils.sha256Hex(password);
		System.out.println("[SHA256 Hash] " + iptpwd_sha256);

		return iptpwd_sha256;
	}

	
	public static String encryptPassword(String password, String id) throws Exception {
		if (password == null) {
			return "";
		}

		StringBuffer sb = new StringBuffer();

		MessageDigest md = MessageDigest.getInstance("SHA-256");
		md.reset();
		md.update(id.getBytes("UTF-8"));
		md.update(password.getBytes("UTF-8"));

		byte[] hash = md.digest();

		for (int i = 0; i < hash.length; i++) {
			String hex = Integer.toHexString(0xff & hash[i]);
			if (hex.length() == 1) {
				sb.append('0');
			}

			sb.append(hex);
		}
//		System.out.println("[SHA256 Hash] " + sb.toString().toUpperCase());

		return sb.toString().toUpperCase();
	}

	public static String decrypt(String message) throws Exception {
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

		byte[] keyBytes = new byte[16];
		byte[] b = strKey.getBytes("UTF-8");
		int len = b.length;

		if (len > keyBytes.length)
			len = keyBytes.length;

		System.arraycopy(b, 0, keyBytes, 0, len);

		SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
		IvParameterSpec ivSpec = new IvParameterSpec(keyBytes);

		cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);
		
		byte[] results = cipher.doFinal(Base64.decodeBase64(Base64.decodeBase64(message)));
		return new String(results, "UTF-8");
	}

	public static String encrypt(String message) throws Exception {

		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

		byte[] keyBytes = new byte[16];
		byte[] b = strKey.getBytes("UTF-8");
		int len = b.length;

		if (len > keyBytes.length)
			len = keyBytes.length;

		System.arraycopy(b, 0, keyBytes, 0, len);

		SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");
		IvParameterSpec ivSpec = new IvParameterSpec(keyBytes);

		cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivSpec);
		byte[] results = cipher.doFinal(message.getBytes("UTF-8"));
		
		return new String(Base64.encodeBase64(Base64.encodeBase64(results)));
	}

	public static String getPassword(String str) {
		if (str == null)
			return null;

		Pattern p = Pattern.compile("&perPass=(.*)");
		Matcher m = p.matcher(str);

		if (m.find())
			return m.group(1);
		else
			return null;
	}

	public static String getUserId(String str) {
		if (str == null)
			return null;

		Pattern p = Pattern.compile("perCode=([\\d\\w]+)");
		Matcher m = p.matcher(str);

		if (m.find())
			return m.group(1);
		else
			return null;
	}
	
	

	/**
	 * 경북대 비밀번호 패턴 체크
	 * @param password
	 * @param userid
	 * @return
	 */
	public static String fCommonCheckPassword(String password, String userid) 
	{
			String sResult = "";
			
			String alpha = "[a-zA-Z]";
			String number = "[0-9]";
			String special = "[\\\\,\\-,_,=,\\+,|,(,),*,&,^,%,$,#,@,!,\\],~,`,?},\\[,{,;,:,/,.,>,<, ,\\,]";
			String repeat = "(\\w)\\1\\1\\1";
			String strlength = ".{10,17}";
			
			boolean flag1 = false, flag2 = false, flag3 = false;
			boolean repeatflag = false;
			boolean lengthflag = false;
			
			Pattern p1 = Pattern.compile(alpha);
			Matcher m1 = p1.matcher(password);
			
			Pattern p2 = Pattern.compile(number);
			Matcher m2 = p2.matcher(password);
			
			Pattern p3 = Pattern.compile(special);
			Matcher m3 = p3.matcher(password);
		
			Pattern p4 = Pattern.compile(repeat);
			Matcher m4 = p4.matcher(password);
			
			Pattern p5 = Pattern.compile(strlength);
			Matcher m5 = p5.matcher(password);
			
			if(m1.find()) flag1 = true;
			if(m2.find()) flag2 = true;
			if(m3.find()) flag3 = true;
			if(m4.find()) repeatflag = true;
			if(m5.find()) lengthflag = true;
			
			if(!(flag1 && flag2 && flag3) || !lengthflag){
				sResult = "10~17자 영문, 숫자, 특수문자를 모두 사용하십시오.\n"; 
			}
			if(repeatflag){
				sResult += "패스워드에 같은 문자/숫자를 4번 이상 사용하실 수 없습니다.\n"; 
			}
			if(password.toUpperCase().indexOf(userid.toUpperCase()) > -1){
				sResult += "ID 또는 사번과 동일한 문자는 사용하실 수 없습니다."; 	
			}
			
			return sResult; 
		}

}
