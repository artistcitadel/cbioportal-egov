package com.asan.patient.service;

import java.util.List;
import java.util.Map;

import com.asan.patient.dao.PatientDAOImpl;
import com.reactkorea.RkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PatientServiceImpl extends RkServiceImpl {

	@Autowired
	public PatientServiceImpl(PatientDAOImpl mapper) {
		super(mapper);
	}

}
