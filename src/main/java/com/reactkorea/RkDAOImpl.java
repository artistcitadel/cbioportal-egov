package com.reactkorea;

import java.util.List;
import java.util.Map;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
//@Repository("cmmnDAO")
public class RkDAOImpl<T> extends EgovAbstractMapper {

   /*private Class<T> type;
   public CmmnDAOImpl(Class<T> type1){
       this.type = type1;
   }*/
   public List<T> fetch(String mappingName, T o) throws Exception {
       return selectList(mappingName, o);
   }

//    public List<T> fetch(Map ds_inData) throws Exception {
//        Map ds_cond = ((LinkedTreeMap) ds_inData.get("ds_cond"));
//        CmmnUtil.printMap(ds_cond);
//        return getSqlSession().selectList(ds_cond.get("queryId").toString(), ds_cond);
//    }

    public T fetchOne(String mappingName, T o) throws Exception {
        return (T) selectOne(mappingName, o);
    }


    public void updateOne(String mappingName, T o) throws Exception {
        update(mappingName, o);
    }


    public int insertOne(String mappingName, T o) throws Exception {
        return insert(mappingName, o);
    }


    public int deleteOne(String mappingName, T o) throws Exception {
        return delete(mappingName, o);
    }


    /*public int retrieveCnt(T entity) throws Exception {
        return selectOne("EmpMapper.retrieveListTotCnt", entity);
    }*/
}
