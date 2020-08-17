package com.reactkorea.patient.dao;


import com.reactkorea.RkDAOImpl;
import com.reactkorea.patient.vo.Patient;
import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;

@Repository
public class PatientDAOImpl extends RkDAOImpl<Patient> {}
