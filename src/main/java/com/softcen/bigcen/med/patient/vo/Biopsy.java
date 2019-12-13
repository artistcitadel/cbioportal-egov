package com.softcen.bigcen.med.patient.vo;

public class Biopsy extends Event {
  private String spcnColecDt;
  private String spcnNo;

  public String getSpcnColecDt() {
    return spcnColecDt;
  }

  public void setSpcnColecDt(String spcnColecDt) {
    this.spcnColecDt = spcnColecDt;
  }

  public String getSpcnNo() {
    return spcnNo;
  }

  public void setSpcnNo(String spcnNo) {
    this.spcnNo = spcnNo;
  }

  public String getOrganCd() {
    return organCd;
  }

  public void setOrganCd(String organCd) {
    this.organCd = organCd;
  }

  public String getOrganSiteCd() {
    return organSiteCd;
  }

  public void setOrganSiteCd(String organSiteCd) {
    this.organSiteCd = organSiteCd;
  }

  public String getDpSpcnLocCd() {
    return dpSpcnLocCd;
  }

  public void setDpSpcnLocCd(String dpSpcnLocCd) {
    this.dpSpcnLocCd = dpSpcnLocCd;
  }

  private String organCd;
  private String organSiteCd;
  private String dpSpcnLocCd;

}
