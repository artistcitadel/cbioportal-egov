package com.softcen.bigcen.med.patient.vo;

public class Image extends Event {
  private String examdate;

  public String getExamdate() {
    return examdate;
  }

  public void setExamdate(String examdate) {
    this.examdate = examdate;
  }

  public String getCdValNm() {
    return cdValNm;
  }

  public void setCdValNm(String cdValNm) {
    this.cdValNm = cdValNm;
  }

  public String getClinicdate() {
    return clinicdate;
  }

  public void setClinicdate(String clinicdate) {
    this.clinicdate = clinicdate;
  }

  public String getModality() {
    return modality;
  }

  public void setModality(String modality) {
    this.modality = modality;
  }

  public String getOrdercode() {
    return ordercode;
  }

  public void setOrdercode(String ordercode) {
    this.ordercode = ordercode;
  }

  public String getOrdrEngNm() {
    return ordrEngNm;
  }

  public void setOrdrEngNm(String ordrEngNm) {
    this.ordrEngNm = ordrEngNm;
  }

  private String cdValNm;
  private String clinicdate;
  private String modality;
  private String ordercode;
  private String ordrEngNm;

}

