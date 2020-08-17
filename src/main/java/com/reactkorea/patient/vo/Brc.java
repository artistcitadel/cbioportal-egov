package com.reactkorea.patient.vo;

public class Brc extends Event {
  private String spcnNo;
  private String cellCd;

  public String getCellCd() {
    return cellCd;
  }

  public void setCellCd(String cellCd) {
    this.cellCd = cellCd;
  }

  public String getCellSpecCd() {
    return cellSpecCd;
  }

  public void setCellSpecCd(String cellSpecCd) {
    this.cellSpecCd = cellSpecCd;
  }

  public String getOperator() {
    return operator;
  }

  public void setOperator(String operator) {
    this.operator = operator;
  }

  public String getTt() {
    return tt;
  }

  public void setTt(String tt) {
    this.tt = tt;
  }

  public String getNtt() {
    return ntt;
  }

  public void setNtt(String ntt) {
    this.ntt = ntt;
  }

  public String getPlasma() {
    return plasma;
  }

  public void setPlasma(String plasma) {
    this.plasma = plasma;
  }

  public String getBuffy() {
    return buffy;
  }

  public void setBuffy(String buffy) {
    this.buffy = buffy;
  }

  public String getFluid() {
    return fluid;
  }

  public void setFluid(String fluid) {
    this.fluid = fluid;
  }

  public String getUrine() {
    return urine;
  }

  public void setUrine(String urine) {
    this.urine = urine;
  }

  private String cellSpecCd;
  private String operator;
  private String tt;
  private String ntt;
  private String plasma;
  private String buffy;
  private String fluid;
  private String urine;

  public String getspcnNo() {
    return spcnNo;
  }

  public void setSpcnNo(String spcnNo) {
    this.spcnNo = spcnNo;
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
