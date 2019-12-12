package com.softcen.bigcen.med.patient.vo;

public class Brc extends Event {
  private String dpSpcnNo;

  public String getDpSpcnNo() {
    return dpSpcnNo;
  }

  public void setDpSpcnNo(String dpSpcnNo) {
    this.dpSpcnNo = dpSpcnNo;
  }

  public String getTissColecCd() {
    return tissColecCd;
  }

  public void setTissColecCd(String tissColecCd) {
    this.tissColecCd = tissColecCd;
  }

  public String getCellOrganDiyCd() {
    return cellOrganDiyCd;
  }

  public void setCellOrganDiyCd(String cellOrganDiyCd) {
    this.cellOrganDiyCd = cellOrganDiyCd;
  }

  public String getCdNm() {
    return cdNm;
  }

  public void setCdNm(String cdNm) {
    this.cdNm = cdNm;
  }

  private String tissColecCd;
  private String cellOrganDiyCd;
  private String cdNm;
}
