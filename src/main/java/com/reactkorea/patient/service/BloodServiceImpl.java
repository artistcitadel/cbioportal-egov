package com.reactkorea.patient.service;

import com.reactkorea.Result;
import com.reactkorea.RkServiceImpl;
import com.reactkorea.patient.dao.BloodDAOImpl;
import com.reactkorea.patient.vo.Blood;
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
