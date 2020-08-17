package com.reactkorea.patient.vo;

public class Sugery extends Event{
  private String opDt;
  private String opdpCdNm;

  public String getOpDt() {
    return opDt;
  }

  public void setOpDt(String opDt) {
    this.opDt = opDt;
  }

  public String getOpdpCdNm() {
    return opdpCdNm;
  }

  public void setOpdpCdNm(String opdpCdNm) {
    this.opdpCdNm = opdpCdNm;
  }

  public String getInhospOpCd() {
    return inhospOpCd;
  }

  public void setInhospOpCd(String inhospOpCd) {
    this.inhospOpCd = inhospOpCd;
  }

  public String getInhospOpEngNm() {
    return inhospOpEngNm;
  }

  public void setInhospOpEngNm(String inhospOpEngNm) {
    this.inhospOpEngNm = inhospOpEngNm;
  }

  private String inhospOpCd;
  private String inhospOpEngNm;

}
