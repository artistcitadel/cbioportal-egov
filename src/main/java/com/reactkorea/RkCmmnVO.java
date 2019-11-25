package com.reactkorea;

import java.io.Serializable;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
public abstract class RkCmmnVO implements Serializable{
    final protected Logger logger = LoggerFactory.getLogger(this.getClass());

    public String getQueryId() {
        return queryId;
    }

    public void setQueryId(String queryId) {
        this.queryId = queryId;
    }

    protected String queryId;
    protected String inParam;
    protected String beginRow;
    protected String endRow;
    protected String totRow;

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    private String patientId;

    public String getInParam() {
        return inParam;
    }

    public void setInParam(String inParam) {
        this.inParam = inParam;
    }

    public String getBeginRow() {
        return beginRow;
    }

    public void setBeginRow(String beginRow) {
        this.beginRow = beginRow;
    }

    public String getEndRow() {
        return endRow;
    }

    public void setEndRow(String endRow) {
        this.endRow = endRow;
    }

    public String getTotRow() {
        return totRow;
    }

    public void setTotRow(String totRow) {
        this.totRow = totRow;
    }


}
