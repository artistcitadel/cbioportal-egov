package com.softcen.bigcen.med.patient.service;

import com.reactkorea.Result;
import com.reactkorea.RkServiceImpl;
import com.softcen.bigcen.med.patient.dao.PatientsInfoDAOImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Transactional
@Service
public class PatientsInfoServiceImpl extends RkServiceImpl
  {

	@Autowired
	public PatientsInfoServiceImpl(PatientsInfoDAOImpl mapper) {
    super(mapper);
  }

    public Result<List> fetchPatients(String mappingName, Map<String,String> vo) throws Exception {
    return super.fetch(mappingName, vo);
  }
}
