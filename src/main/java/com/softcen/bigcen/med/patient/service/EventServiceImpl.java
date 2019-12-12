package com.softcen.bigcen.med.patient.service;

//import java.util.List;
//import java.util.Map;

import com.softcen.bigcen.med.patient.dao.EventDAOImpl;
import com.softcen.bigcen.med.patient.dao.PatientDAOImpl;
import com.softcen.bigcen.med.patient.dao.PatientMutDAOImpl;
import com.softcen.bigcen.med.patient.vo.PatientMut;
import com.reactkorea.Result;
import com.reactkorea.ResultFactory;
import com.reactkorea.RkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <pre>
 * 1.업무명 : 이벤트 조회
 * 2.단위업무명 : 환자이벤트조회
 * 3.프로그램명 : 환자이벤트조회
 * 4.설명 : 환자이벤트Service 클래스다.
 * <pre>
 *
 * @Class  EventService.java
 * @author
 * @since  2019. 11. 09.
 * @version 1.0
 *
 * @Copyright (c) com.asan.patient.
 * <pre>
 * ------------------------------------------------------------------------
 *  Modification Information
 * ------------------------------------------------------------------------
 *  수정일               수정자            수정내용
 * ------------------------------------------------------------------------
 *  2019. 11. 09.                [] 최초생성
 * </pre>
 */

@Transactional
@Service
public class EventServiceImpl extends RkServiceImpl {

  @Autowired
  public EventServiceImpl(EventDAOImpl mapper) {
    super(mapper);
  }
}
