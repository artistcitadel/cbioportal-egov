package com.softcen.bigcen.med.patient.dao;


import com.reactkorea.RkDAOImpl;
import com.softcen.bigcen.med.patient.vo.Event;
import com.softcen.bigcen.med.patient.vo.Patient;
import org.springframework.stereotype.Repository;
//import org.springframework.transaction.annotation.Transactional;

@Repository
public class EventDAOImpl extends RkDAOImpl<Event> {}
