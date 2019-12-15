package com.softcen.bigcen.med.patient.vo;

import com.reactkorea.RkCmmnVO;

public class Patient extends RkCmmnVO {
    private String id;
    private String idd;
    private String pid;
    private String check;

  public String getIdd() {
    return idd;
  }

  public String getCheck() {
    return check;
  }

  public void setCheck(String check) {
    this.check = check;
  }

  public void setIdd(String idd) {
    this.idd = idd;
  }

  public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    private String age;

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    private String time;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExam() {
        return exam;
    }

    public void setExam(String exam) {
        this.exam = exam;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public String getCrte() {
        return crte;
    }

    public void setCrte(String crte) {
        this.crte = crte;
    }

    public String getCancerStudy() {
        return cancerStudy;
    }

    public void setCancerStudy(String cancerStudy) {
        this.cancerStudy = cancerStudy;
    }

    public String getCancerType() {
        return cancerType;
    }

    public void setCancerType(String cancerType) {
        this.cancerType = cancerType;
    }

    public String getCancerTypeDetail() {
        return cancerTypeDetail;
    }

    public void setCancerTypeDetail(String cancerTypeDetail) {
        this.cancerTypeDetail = cancerTypeDetail;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getRecpDt() {
        return recpDt;
    }

    public void setRecpDt(String recpDt) {
        this.recpDt = recpDt;
    }

    public String getSampleId() {
        return sampleId;
    }

    public void setSampleId(String sampleId) {
        this.sampleId = sampleId;
    }

    private String name;
    private String exam;
    private String mark;
    private String crte;
    private String cancerStudy;
    private String cancerType;
    private String cancerTypeDetail;
    private String subject;
    private String recpDt;
    private String sampleId;

    private String sex;

  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }

  public String getAboBlty() {
    return aboBlty;
  }

  public void setAboBlty(String aboBlty) {
    this.aboBlty = aboBlty;
  }

  public String getDeathYn() {
    return deathYn;
  }

  public void setDeathYn(String deathYn) {
    this.deathYn = deathYn;
  }

  public String getDeathReason() {
    return deathReason;
  }

  public void setDeathReason(String deathReason) {
    this.deathReason = deathReason;
  }

  private String aboBlty;
    private String deathYn;
    private String deathReason;
}
