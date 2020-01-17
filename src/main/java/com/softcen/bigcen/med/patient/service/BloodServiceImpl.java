package com.softcen.bigcen.med.patient.service;

import com.reactkorea.Result;
import com.reactkorea.RkServiceImpl;
import com.softcen.bigcen.med.patient.dao.BloodDAOImpl;
import com.softcen.bigcen.med.patient.vo.Blood;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class BloodServiceImpl extends RkServiceImpl
{
  @Autowired
  public BloodServiceImpl(BloodDAOImpl mapper) {
    super(mapper);
  }

  public int insertBrc(String mappingName, Blood[] vo) throws Exception {
    int k=0;
    for(int i=0;i<vo.length;i++) {
      k = super.register(mappingName, vo[i]);
    }
    return k;
  }
}
