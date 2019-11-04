package com.softcen.bigcen.med.utils;

import java.security.SecureRandom;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.TimeZone;

public class DateUtils {
	/**
	 * 
	 * @param sDate
	 * @param year
	 * @param month
	 * @param day
	 * @return
	 */
    public static String addYearMonthDay(String sDate, int year, int month, int day) {

    	String dateStr = validChkDate(sDate);
        
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd", Locale.getDefault());
        try {
            cal.setTime(sdf.parse(dateStr));
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format: " + dateStr, e);
        }
        
        if (year != 0){ 
            cal.add(Calendar.YEAR, year);
        }
        if (month != 0){ 
            cal.add(Calendar.MONTH, month);
        }
        if (day != 0){ 
            cal.add(Calendar.DATE, day);
        }
        return sdf.format(cal.getTime());
    }
    
    /**
     * 
     * @param dateStr
     * @param year
     * @return
     */
    public static String addYear(String dateStr, int year) {
        return addYearMonthDay(dateStr, year, 0, 0);
    }
    
    /**
     * 
     * @param dateStr
     * @param month
     * @return
     */
    public static String addMonth(String dateStr, int month) {
        return addYearMonthDay(dateStr, 0, month, 0);
    }
    
    /**
     * 
     * @param dateStr
     * @param day
     * @return
     */
    public static String addDay(String dateStr, int day) {
        return addYearMonthDay(dateStr, 0, 0, day);
    }
    
    /**
     * 
     * @param sDate1
     * @param sDate2
     * @return
     */
    public static int getDaysDiff(String sDate1, String sDate2) {
    	String dateStr1 = validChkDate(sDate1);
    	String dateStr2 = validChkDate(sDate2);
    	
        if (!checkDate(sDate1) || !checkDate(sDate2)) {
            throw new IllegalArgumentException("Invalid date format: args[0]=" + sDate1 + " args[1]=" + sDate2);
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd", Locale.getDefault());
        
        Date date1 = null;
        Date date2 = null;
        try {
            date1 = sdf.parse(dateStr1);
            date2 = sdf.parse(dateStr2);
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format: args[0]=" + dateStr1 + " args[1]=" + dateStr2, e);
        }
        int days1 = (int)((date1.getTime()/3600000)/24);
        int days2 = (int)((date2.getTime()/3600000)/24);
        
        return days2 - days1;
    }
        
    /**
     * 
     * @param sDate
     * @return
     */
    public static boolean checkDate(String sDate) {
    	String dateStr = validChkDate(sDate);

        String year  = dateStr.substring(0,4);
        String month = dateStr.substring(4,6);
        String day   = dateStr.substring(6);
   
        return checkDate(year, month, day);
    }   

    /**
     * 
     * @param year
     * @param month
     * @param day
     * @return
     */
    public static boolean checkDate(String year, String month, String day) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy.MM.dd", Locale.getDefault());
            
            Date result = formatter.parse(year + "." + month + "." + day);
            String resultStr = formatter.format(result);
            if (resultStr.equalsIgnoreCase(year + "." + month + "." + day)){
                return true;
            }else{
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * 
     * @param strSource
     * @param fromDateFormat
     * @param toDateFormat
     * @param strTimeZone
     * @return
     */
    public static String convertDate(String strSource, String fromDateFormat, 
            String toDateFormat, String strTimeZone) {
        SimpleDateFormat simpledateformat = null;
        Date date = null;
        String _fromDateFormat = "";
        String _toDateFormat = "";
        
        /*if(StringUtils.isNullToString(strSource).trim().equals("")) {
            return "";
        }
        if(StringUtils.isNullToString(fromDateFormat).trim().equals("")){
        	_fromDateFormat = "yyyyMMddHHmmss";                    // default��
        }
        if(StringUtils.isNullToString(toDateFormat).trim().equals("")){
        	_toDateFormat = "yyyy-MM-dd HH:mm:ss";                 // default��
        }*/

        try {
        	simpledateformat = new SimpleDateFormat(_fromDateFormat, Locale.getDefault());
            date = simpledateformat.parse(strSource);
            if (!StringUtils.isNullToString(strTimeZone).trim().equals("")) {
                simpledateformat.setTimeZone(TimeZone.getTimeZone(strTimeZone));
            }
            simpledateformat = new SimpleDateFormat(_toDateFormat, Locale.getDefault());
        }
        catch(Exception exception) {
        	//Logger.getLogger(KctcDateUtil.class).warn("convertDate Exception.     " + exception);
        }        
        return simpledateformat.format(date);
        
    }    
    
    
    /**
     * 
     * @param sDate
     * @param ch
     * @return
     */
    public static String formatDate(String sDate, String ch) {
    	//String dateStr = validChkDate(sDate);

        String str = sDate.trim();
        String yyyy = "";
        String mm = "";
        String dd = "";

        if (str.length() == 8) {
            yyyy = str.substring(0, 4);
            if (yyyy.equals("0000")){
                return "";
            }

            mm = str.substring(4, 6);
            if (mm.equals("00")){
                return yyyy;
            }

            dd = str.substring(6, 8);
            if (dd.equals("00")){
                return yyyy + ch + mm;
            }

            return yyyy + ch + mm + ch + dd;
        } else if (str.length() == 6) {
            yyyy = str.substring(0, 4);
            if (yyyy.equals("0000")){
                return "";
            }

            mm = str.substring(4, 6);
            if (mm.equals("00")){
                return yyyy;
            }

            return yyyy + ch + mm;
        } else if (str.length() == 4) {
            yyyy = str.substring(0, 4);
            if (yyyy.equals("0000")){
                return "";
            }else{
                return yyyy;
            }
        } else{
            return "";
        }
    }    
    
    /**
     * 
     * @param sTime
     * @param ch
     * @return
     */
     public static String formatTime(String sTime, String ch) {
     	String timeStr = validChkTime(sTime);
        return timeStr.substring(0, 2) + ch + timeStr.substring(2, 4) + ch + timeStr.substring(4, 6);
     }    
    
    /**
     * 
     * @param year
     * @return
     */
     public static String leapYear(int year) {
         if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
             return "29";
         }

         return "28";
     }    
    
     /**
      * 
      * @param year
      * @return
      */
     public static boolean isLeapYear(int year) {
         if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
             return false;
         }
         return true;
     }     
     
     
     /**
      * 
      * @return
      */
     public static String getToday(){
         return getCurrentDate("");
     }

     /**
      * 
      * @param dateType
      * @return
      */
     public static String getCurrentDate(String dateType) {
         Calendar aCalendar = Calendar.getInstance();

         int year = aCalendar.get(Calendar.YEAR);
         int month = aCalendar.get(Calendar.MONTH) + 1;
         int date = aCalendar.get(Calendar.DATE);
         String strDate = Integer.toString(year) +
                 ((month<10) ? "0" + Integer.toString(month) : Integer.toString(month)) +
                 ((date<10) ? "0" + Integer.toString(date) : Integer.toString(date));
         
         if(!"".equals(dateType)){
        	 strDate = convertDate(strDate, "yyyyMMdd", dateType);
         }

         return  strDate;
     }
     
	/**
	 * 
	 * @param sDate
	 * @param sTime
	 * @param sFormatStr
	 * @return
	 */
    public static String convertDate(String sDate, String sTime, String sFormatStr) {
    	String dateStr = validChkDate(sDate);
    	String timeStr = validChkTime(sTime);
    	
    	Calendar cal = null;
    	cal = Calendar.getInstance() ;
    	
    	cal.set(Calendar.YEAR        , Integer.parseInt(dateStr.substring(0,4)));
    	cal.set(Calendar.MONTH       , Integer.parseInt(dateStr.substring(4,6))-1 );
    	cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(dateStr.substring(6,8)));
    	cal.set(Calendar.HOUR_OF_DAY , Integer.parseInt(timeStr.substring(0,2)));
    	cal.set(Calendar.MINUTE      , Integer.parseInt(timeStr.substring(2,4)));
    	
    	SimpleDateFormat sdf = new SimpleDateFormat(sFormatStr,Locale.ENGLISH);
    	
    	return sdf.format(cal.getTime());
    }   

    /**
     * 
     * @param sDate1
     * @param sDate2
     * @return
     */
    public static String getRandomDate(String sDate1, String sDate2) {    
    	String dateStr1 = validChkDate(sDate1);
    	String dateStr2 = validChkDate(sDate2);

    	String randomDate   = null;
    	
    	int sYear, sMonth, sDay;
    	int eYear, eMonth, eDay;
    	
    	sYear  = Integer.parseInt(dateStr1.substring(0, 4));
    	sMonth = Integer.parseInt(dateStr1.substring(4, 6));
    	sDay   = Integer.parseInt(dateStr1.substring(6, 8));
    	
    	eYear  = Integer.parseInt(dateStr2.substring(0, 4));
    	eMonth = Integer.parseInt(dateStr2.substring(4, 6));
    	eDay   = Integer.parseInt(dateStr2.substring(6, 8));
    	
    	GregorianCalendar beginDate = new GregorianCalendar(sYear, sMonth-1, sDay,    0, 0);
    	GregorianCalendar endDate   = new GregorianCalendar(eYear, eMonth-1, eDay,   23,59);
    	
    	if (endDate.getTimeInMillis() < beginDate.getTimeInMillis()) {
    	    throw new IllegalArgumentException("Invalid input date : " + sDate1 + "~" + sDate2);
    	}
    	
    	SecureRandom r = new SecureRandom();

    	long rand = ((r.nextLong()>>>1)%( endDate.getTimeInMillis()-beginDate.getTimeInMillis() + 1)) + beginDate.getTimeInMillis();
    	
    	GregorianCalendar cal = new GregorianCalendar();
    	//SimpleDateFormat calformat = new SimpleDateFormat("yyyy-MM-dd");
    	SimpleDateFormat calformat = new SimpleDateFormat("yyyyMMdd",Locale.ENGLISH);
    	cal.setTimeInMillis(rand);
    	randomDate = calformat.format(cal.getTime()); 
    	
    	// �������ڿ��� ����
    	return  randomDate;
    }
          
    


    /**
     * 
     * @param sWeek
     * @return
     */
	public static String convertWeek(String sWeek) {
		String retStr = null;
		
		if        (sWeek.equals("SUN")   ) { retStr = "�Ͽ���";
		} else if (sWeek.equals("MON")   ) { retStr = "������";
		} else if (sWeek.equals("TUE")   ) { retStr = "ȭ����";
		} else if (sWeek.equals("WED")   ) { retStr = "������";
		} else if (sWeek.equals("THR")   ) { retStr = "�����";
		} else if (sWeek.equals("FRI")   ) { retStr = "�ݿ���";
		} else if (sWeek.equals("SAT")   ) { retStr = "�����";
		}
		   
		return retStr;
	}

    /**
     * 
     * @param sDate
     * @return
     */
    public static boolean validDate(String sDate) {
    	String dateStr = validChkDate(sDate);

		Calendar cal ;
		boolean ret  = false;
		
		cal = Calendar.getInstance() ;
		
		cal.set(Calendar.YEAR        , Integer.parseInt(dateStr.substring(0,4)));
		cal.set(Calendar.MONTH       , Integer.parseInt(dateStr.substring(4,6))-1 );
		cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(dateStr.substring(6,8)));
		
		String year  = String.valueOf(cal.get(Calendar.YEAR        )    );
		String month = String.valueOf(cal.get(Calendar.MONTH       ) + 1);
		String day   = String.valueOf(cal.get(Calendar.DAY_OF_MONTH)    );
		
		String pad4Str = "0000";
		String pad2Str = "00";
		
		String retYear  = (pad4Str + year ).substring(year .length());
		String retMonth = (pad2Str + month).substring(month.length());
		String retDay   = (pad2Str + day  ).substring(day  .length());
		
		String retYMD = retYear+retMonth+retDay;
		
		if(sDate.equals(retYMD)) {
			ret  = true;
		}
		
		return ret;
	}
    
    /**
     * 
     * @param sDate
     * @param sWeek
     * @return
     */
    public static boolean validDate(String sDate, int sWeek) {
    	String dateStr = validChkDate(sDate);

		Calendar cal ;
		boolean ret  = false;
		
		cal = Calendar.getInstance() ;
		
		cal.set(Calendar.YEAR        , Integer.parseInt(dateStr.substring(0,4)));
		cal.set(Calendar.MONTH       , Integer.parseInt(dateStr.substring(4,6))-1 );
		cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(dateStr.substring(6,8)));
		
		int    Week  =                cal.get(Calendar.DAY_OF_WEEK      );
		
		if (validDate(sDate)) {
			if (sWeek == Week) {
				ret = true;
			}
		}
		
		return ret;
	}

    /**
     * 
     * @param sTime
     * @return
     */
    public static boolean validTime(String sTime) {
    	String timeStr = validChkTime(sTime);

		Calendar cal ;
		boolean ret = false;
		
		cal = Calendar.getInstance() ;
		
		cal.set(Calendar.HOUR_OF_DAY  , Integer.parseInt(timeStr.substring(0,2)));
		cal.set(Calendar.MINUTE       , Integer.parseInt(timeStr.substring(2,4)));
		
		String HH     = String.valueOf(cal.get(Calendar.HOUR_OF_DAY  ));
		String MM     = String.valueOf(cal.get(Calendar.MINUTE       ));
		
		String pad2Str = "00";
		
		String retHH = (pad2Str + HH).substring(HH.length());
		String retMM = (pad2Str + MM).substring(MM.length());
		
		String retTime = retHH + retMM;
		
		if(sTime.equals(retTime)) {
			ret  = true;
		}
		
		return ret;
	}
    
    /**
     * 
     * @param sDate
     * @param year
     * @param month
     * @param day
     * @return
     */
    public static String addYMDtoWeek(String sDate, int year, int month, int day) {
    	String dateStr = validChkDate(sDate);
    	
		dateStr = addYearMonthDay(dateStr, year, month, day);
		
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd",Locale.ENGLISH);
		try {
			cal.setTime(sdf.parse(dateStr));
		} catch (ParseException e) {
			throw new IllegalArgumentException("Invalid date format: " + dateStr, e);
		}
		
		SimpleDateFormat rsdf = new SimpleDateFormat("E",Locale.ENGLISH);
		
		return rsdf.format(cal.getTime());
	}

    /**
     * 
     * @param sDate
     * @param sTime
     * @param year
     * @param month
     * @param day
     * @param hour
     * @param minute
     * @param formatStr
     * @return
     */
    public static String addYMDtoDayTime(String sDate, String sTime, int year, int month, int day, int hour, int minute, String formatStr) {
    	String dateStr = validChkDate(sDate);
    	String timeStr = validChkTime(sTime);
    	
		dateStr = addYearMonthDay(dateStr, year, month, day);
		
		dateStr = convertDate(dateStr, timeStr, "yyyyMMddHHmm");      
		
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm",Locale.ENGLISH);

        try {
    		cal.setTime(sdf.parse(dateStr));
        } catch (ParseException e) {
            throw new IllegalArgumentException("Invalid date format: " + dateStr, e);
        }
		
		if (hour != 0) {
			cal.add(Calendar.HOUR, hour);
		}

		if (minute != 0) {
			cal.add(Calendar.MINUTE, minute);
		}
		
		SimpleDateFormat rsdf = new SimpleDateFormat(formatStr,Locale.ENGLISH);
		
		return rsdf.format(cal.getTime());
	}
 
    /**
     * 
     * @param sDate
     * @return
     */
    public static int datetoInt(String sDate) {
    	return Integer.parseInt(convertDate(sDate, "0000", "yyyyMMdd"));
    }
    
    /**
     * 
     * @param sTime
     * @return
     */
    public static int timetoInt(String sTime) {
        return Integer.parseInt(convertDate("00000101", sTime, "HHmm"));
    }

   /**
    * 
    * @param dateStr
    * @return
    */
    public static String validChkDate(String dateStr) {
    	String _dateStr = dateStr;
    	
        if (dateStr == null || !(dateStr.trim().length() == 8 || dateStr.trim().length() == 10)) {
            throw new IllegalArgumentException("Invalid date format: " + dateStr);
        }
        if (dateStr.length() == 10) {
        	_dateStr = StringUtils.removeMinusChar(dateStr);
        }
        return _dateStr;
    }
 
    /**
     * 
     * @param timeStr
     * @return
     */
    public static String validChkTime(String timeStr) {
    	String _timeStr = timeStr;
    	
    	if (_timeStr.length() == 5) {
    		_timeStr = StringUtils.remove(_timeStr,':');
    	}
    	if (_timeStr == null || !(_timeStr.trim().length() == 6 || _timeStr.trim().length() == 4)) {
    	    throw new IllegalArgumentException("Invalid time format: " + _timeStr);
    	}

    	return _timeStr;
    }

}
