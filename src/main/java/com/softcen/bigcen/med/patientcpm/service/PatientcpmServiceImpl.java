package com.softcen.bigcen.med.patientcpm.service;

import java.util.List;
import java.util.Map;

import com.softcen.bigcen.med.patientcpm.dao.PatientcpmDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service(value="patientcpmService")
public class PatientcpmServiceImpl{

	@Autowired
	private PatientcpmDAO patientcpmDAO;

	public List<Map<Object, Object>> selectPatientView(Map<String, String> paramMap){
		return patientcpmDAO.selectPatientView(paramMap);
	}

}
