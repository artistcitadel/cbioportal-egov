package com.reactkorea.patient.vo;
import com.reactkorea.RkCmmnVO;
public class Blood extends RkCmmnVO {
  private String perCode;
  private String reschPatId;

  public String getPerCode() {
    return perCode;
  }

  public void setPerCode(String perCode) {
    this.perCode = perCode;
  }

  public String getReschPatId() {
    return reschPatId;
  }

  public void setReschPatId(String reschPatId) {
    this.reschPatId = reschPatId;
  }

  public String getExamNo() {
    return examNo;
  }

  public void setExamNo(String examNo) {
    this.examNo = examNo;
  }

  public String getSpcnTypCd() {
    return spcnTypCd;
  }

  public void setSpcnTypCd(String spcnTypCd) {
    this.spcnTypCd = spcnTypCd;
  }

  public String getSpcnRsdQt() {
    return spcnRsdQt;
  }

  public void setSpcnRsdQt(String spcnRsdQt) {
    this.spcnRsdQt = spcnRsdQt;
  }

  private String examNo;
  private String spcnTypCd;
  private String spcnRsdQt;
}
