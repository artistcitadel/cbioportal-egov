package com.softcen.bigcen.med.analysisFunctions;

/**
 * RenjinException Class는 {@link com.softcen.bigcen.med.analysisFunctions.AnalysisFunctions AnalysisFunctions}에서 
 * renjin로 구현된 기능에서 발생하는 오류를 따로 처리하는것을  목적으로 합니다.<br> 
 *   
 */
public class RenjinException extends Exception{
	private static final long serialVersionUID = 4420684956285216677L;

	public RenjinException(String message, Throwable cause) {
        super(message, cause);
    }

}
