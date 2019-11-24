package com.asan.patient.dao;


import com.reactkorea.RkDAOImpl;
import com.asan.patient.vo.Patient;
import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;

@Repository
public class PatientDAOImpl extends RkDAOImpl<Patient> {}
