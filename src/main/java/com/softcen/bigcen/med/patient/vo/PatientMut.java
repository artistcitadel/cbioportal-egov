package com.softcen.bigcen.med.patient.vo;

import com.reactkorea.RkCmmnVO;

public class PatientMut  extends RkCmmnVO {
    private String mttnExamRsltId;
    private String reschPatId;
    private String ms;
    private String copy;
    private String cosmic;

  public String getMutationType() {
    return mutationType;
  }

  public void setMutationType(String mutationType) {
    this.mutationType = mutationType;
  }

  private String mutationType;

  public String getTumorNm() {
    return tumorNm;
  }

  public void setTumorNm(String tumorNm) {
    this.tumorNm = tumorNm;
  }

  private String tumorNm;
    private String svExamRsltId;
    private String geneNm1;

  public String getPtegGeneReadRsltVal() {
    return ptegGeneReadRsltVal;
  }

  public void setPtegGeneReadRsltVal(String ptegGeneReadRsltVal) {
    this.ptegGeneReadRsltVal = ptegGeneReadRsltVal;
  }

  public String getGnex() {
    return gnex;
  }

  public void setGnex(String gnex) {
    this.gnex = gnex;
  }

  public String getGnexMsrVal() {
    return gnexMsrVal;
  }

  public void setGnexMsrVal(String gnexMsrVal) {
    this.gnexMsrVal = gnexMsrVal;
  }

  private String ptegGeneReadRsltVal;
    private String gnex;
    private String gnexMsrVal;

    private String geneExamSpcnSeq;

  public String getGeneExamSpcnSeq() {
    return geneExamSpcnSeq;
  }

  public void setGeneExamSpcnSeq(String geneExamSpcnSeq) {
    this.geneExamSpcnSeq = geneExamSpcnSeq;
  }

  public String getCytbNm() {
    return cytbNm;
  }

  public void setCytbNm(String cytbNm) {
    this.cytbNm = cytbNm;
  }

  public String getLog2() {
    return log2;
  }

  public void setLog2(String log2) {
    this.log2 = log2;
  }

  private String cytbNm;
    private String log2;

  public String getSvExamRsltId() {
    return svExamRsltId;
  }

  public void setSvExamRsltId(String svExamRsltId) {
    this.svExamRsltId = svExamRsltId;
  }

  public String getGeneNm1() {
    return geneNm1;
  }

  public void setGeneNm1(String geneNm1) {
    this.geneNm1 = geneNm1;
  }

  public String getGeneNm2() {
    return geneNm2;
  }

  public void setGeneNm2(String geneNm2) {
    this.geneNm2 = geneNm2;
  }

  public String getCytbNm1() {
    return cytbNm1;
  }

  public void setCytbNm1(String cytbNm1) {
    this.cytbNm1 = cytbNm1;
  }

  public String getCytbNm2() {
    return cytbNm2;
  }

  public void setCytbNm2(String cytbNm2) {
    this.cytbNm2 = cytbNm2;
  }

  private String geneNm2;
    private String cytbNm1;
    private String cytbNm2;


  public String getCnvExamRsltid() {
    return cnvExamRsltid;
  }

  public void setCnvExamRsltid(String cnvExamRsltid) {
    this.cnvExamRsltid = cnvExamRsltid;
  }

  public String getGcvGeneNm() {
    return gcvGeneNm;
  }

  public void setGcvGeneNm(String gcvGeneNm) {
    this.gcvGeneNm = gcvGeneNm;
  }

  private String cnvExamRsltid;
    private String gcvGeneNm;


  public String getChrmNo() {
    return chrmNo;
  }

  public void setChrmNo(String chrmNo) {
    this.chrmNo = chrmNo;
  }

  public String getGeneStLocVal() {
    return geneStLocVal;
  }

  public void setGeneStLocVal(String geneStLocVal) {
    this.geneStLocVal = geneStLocVal;
  }

  public String getGeneEndLocVal() {
    return geneEndLocVal;
  }

  public void setGeneEndLocVal(String geneEndLocVal) {
    this.geneEndLocVal = geneEndLocVal;
  }

  private String chrmNo;
    private String geneStLocVal;
    private String geneEndLocVal;

    public String getMs() {
        return ms;
    }

    public void setMs(String ms) {
        this.ms = ms;
    }

    public String getCopy() {
        return copy;
    }

    public void setCopy(String copy) {
        this.copy = copy;
    }

    public String getCosmic() {
        return cosmic;
    }

    public void setCosmic(String cosmic) {
        this.cosmic = cosmic;
    }

    public String getCsmcId() {
        return csmcId;
    }

    public void setCsmcId(String csmcId) {
        this.csmcId = csmcId;
    }

    public String getGeneVariOccurCnt() {
        return geneVariOccurCnt;
    }

    public void setGeneVariOccurCnt(String geneVariOccurCnt) {
        this.geneVariOccurCnt = geneVariOccurCnt;
    }

    private String csmcId;
    private String geneVariOccurCnt;

    public String getMttnExamRsltId() {
        return mttnExamRsltId;
    }

    public void setMttnExamRsltId(String mttnExamRsltId) {
        this.mttnExamRsltId = mttnExamRsltId;
    }

    public String getReschPatId() {
        return reschPatId;
    }

    public void setReschPatId(String reschPatId) {
        this.reschPatId = reschPatId;
    }

    public String getGeneExamSpcnId() {
        return geneExamSpcnId;
    }

    public void setGeneExamSpcnId(String geneExamSpcnId) {
        this.geneExamSpcnId = geneExamSpcnId;
    }

    public String getExamNo() {
        return examNo;
    }

    public void setExamNo(String examNo) {
        this.examNo = examNo;
    }

    public String getGeneExamMthNm() {
        return geneExamMthNm;
    }

    public void setGeneExamMthNm(String geneExamMthNm) {
        this.geneExamMthNm = geneExamMthNm;
    }

    public String getChrnNo() {
        return chrnNo;
    }

    public void setChrnNo(String chrnNo) {
        this.chrnNo = chrnNo;
    }

    public String getGeneNm() {
        return geneNm;
    }

    public void setGeneNm(String geneNm) {
        this.geneNm = geneNm;
    }

    public String getGeneVariStLocVal() {
        return geneVariStLocVal;
    }

    public void setGeneVariStLocVal(String geneVariStLocVal) {
        this.geneVariStLocVal = geneVariStLocVal;
    }

    public String getGeneVariEndLocVal() {
        return geneVariEndLocVal;
    }

    public void setGeneVariEndLocVal(String geneVariEndLocVal) {
        this.geneVariEndLocVal = geneVariEndLocVal;
    }

    public String getDnaStandVal() {
        return dnaStandVal;
    }

    public void setDnaStandVal(String dnaStandVal) {
        this.dnaStandVal = dnaStandVal;
    }

    public String getGeneVariClsfNm() {
        return geneVariClsfNm;
    }

    public void setGeneVariClsfNm(String geneVariClsfNm) {
        this.geneVariClsfNm = geneVariClsfNm;
    }

    public String getGeneVariTypNo() {
        return geneVariTypNo;
    }

    public void setGeneVariTypNo(String geneVariTypNo) {
        this.geneVariTypNo = geneVariTypNo;
    }

    public String getRefAlleleSqncVal() {
        return refAlleleSqncVal;
    }

    public void setRefAlleleSqncVal(String refAlleleSqncVal) {
        this.refAlleleSqncVal = refAlleleSqncVal;
    }

    public String getVariAlleleSqncVal() {
        return variAlleleSqncVal;
    }

    public void setVariAlleleSqncVal(String variAlleleSqncVal) {
        this.variAlleleSqncVal = variAlleleSqncVal;
    }

    public String getMttnStatNo() {
        return mttnStatNo;
    }

    public void setMttnStatNo(String mttnStatNo) {
        this.mttnStatNo = mttnStatNo;
    }

    public String getHgvscVal() {
        return hgvscVal;
    }

    public void setHgvscVal(String hgvscVal) {
        this.hgvscVal = hgvscVal;
    }

    public String getHgvspVal() {
        return hgvspVal;
    }

    public void setHgvspVal(String hgvspVal) {
        this.hgvspVal = hgvspVal;
    }

    public String getTotAlleleReadCnt() {
        return totAlleleReadCnt;
    }

    public void setTotAlleleReadCnt(String totAlleleReadCnt) {
        this.totAlleleReadCnt = totAlleleReadCnt;
    }

    public String getRefAlleleReadCnt() {
        return refAlleleReadCnt;
    }

    public void setRefAlleleReadCnt(String refAlleleReadCnt) {
        this.refAlleleReadCnt = refAlleleReadCnt;
    }

    public String getVariAlleleReadCnt() {
        return variAlleleReadCnt;
    }

    public void setVariAlleleReadCnt(String variAlleleReadCnt) {
        this.variAlleleReadCnt = variAlleleReadCnt;
    }

    public String getVariAlleleReadRt() {
        return variAlleleReadRt;
    }

    public void setVariAlleleReadRt(String variAlleleReadRt) {
        this.variAlleleReadRt = variAlleleReadRt;
    }

    public String getExonLocVal() {
        return exonLocVal;
    }

    public void setExonLocVal(String exonLocVal) {
        this.exonLocVal = exonLocVal;
    }

    public String getIntrnLocVal() {
        return intrnLocVal;
    }

    public void setIntrnLocVal(String intrnLocVal) {
        this.intrnLocVal = intrnLocVal;
    }

    public String getTrscId() {
        return trscId;
    }

    public void setTrscId(String trscId) {
        this.trscId = trscId;
    }

    private String geneExamSpcnId;
    private String examNo;
    private String geneExamMthNm;
    private String chrnNo;
    private String geneNm;
    private String geneVariStLocVal;
    private String geneVariEndLocVal;
    private String dnaStandVal;
    private String geneVariClsfNm;
    private String geneVariTypNo;
    private String refAlleleSqncVal;
    private String variAlleleSqncVal;
    private String mttnStatNo;
    private String hgvscVal;
    private String hgvspVal;
    private String totAlleleReadCnt;
    private String refAlleleReadCnt;
    private String variAlleleReadCnt;
    private String variAlleleReadRt;
    private String exonLocVal;
    private String intrnLocVal;
    private String trscId;

  public String getChrnNo1() {
    return chrnNo1;
  }

  public void setChrnNo1(String chrnNo1) {
    this.chrnNo1 = chrnNo1;
  }

  private String chrnNo1;

  public String getSegCol() {
    return segCol;
  }

  public void setSegCol(String segCol) {
    this.segCol = segCol;
  }

  private String segCol;


}
