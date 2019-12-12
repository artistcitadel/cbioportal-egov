package com.softcen.bigcen.med.patient.vo;

public class Tissue extends Event{
  private String ordrCd;

  public String getOrdrCd() {
    return ordrCd;
  }

  public void setOrdrCd(String ordrCd) {
    this.ordrCd = ordrCd;
  }

  public String getExamCd() {
    return examCd;
  }

  public void setExamCd(String examCd) {
    this.examCd = examCd;
  }

  public String getExamNo() {
    return examNo;
  }

  public void setExamNo(String examNo) {
    this.examNo = examNo;
  }

  public String getSpcnNo() {
    return spcnNo;
  }

  public void setSpcnNo(String spcnNo) {
    this.spcnNo = spcnNo;
  }

  public String getSpcnExamOrdrTypCd() {
    return spcnExamOrdrTypCd;
  }

  public void setSpcnExamOrdrTypCd(String spcnExamOrdrTypCd) {
    this.spcnExamOrdrTypCd = spcnExamOrdrTypCd;
  }

  private String examCd;
  private String examNo;
  private String spcnNo;
  private String spcnExamOrdrTypCd;
}
