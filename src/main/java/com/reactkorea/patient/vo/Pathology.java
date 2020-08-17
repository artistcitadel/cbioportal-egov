package com.reactkorea.patient.vo;

public class Pathology extends Event {
  public String getExamCd() {
    return examCd;
  }

  public void setExamCd(String examCd) {
    this.examCd = examCd;
  }

  public String getExamKorNm() {
    return examKorNm;
  }

  public void setExamKorNm(String examKorNm) {
    this.examKorNm = examKorNm;
  }

  private String examCd;
  private String examKorNm;
}
