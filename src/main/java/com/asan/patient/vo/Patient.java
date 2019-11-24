package com.asan.patient.vo;

import com.reactkorea.RkCmmnVO;

public class Patient extends RkCmmnVO {
    private String id;
    private String pid;

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

    public String getCancerStudies() {
        return cancerStudies;
    }

    public void setCancerStudies(String cancerStudies) {
        this.cancerStudies = cancerStudies;
    }

    public String getCancerType() {
        return cancerType;
    }

    public void setCancerType(String cancerType) {
        this.cancerType = cancerType;
    }

    public String getCancerTypeDetails() {
        return cancerTypeDetails;
    }

    public void setCancerTypeDetails(String cancerTypeDetails) {
        this.cancerTypeDetails = cancerTypeDetails;
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

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
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
    private String cancerStudies;
    private String cancerType;
    private String cancerTypeDetails;
    private String subject;
    private String recpDt;
    private String patientId;
    private String sampleId;
}
