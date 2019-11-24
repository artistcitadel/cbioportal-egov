
package com.reactkorea;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public abstract class RkServiceImpl<T>{

    final protected Logger logger = LoggerFactory.getLogger(this.getClass());

    protected RkDAOImpl mapper;

    public RkServiceImpl(RkDAOImpl mapper) {
        this.mapper = mapper;
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public Result<List> fetch(String mappingName, T o) throws Exception {
        return ResultFactory.getSuccessResult(mapper.fetch(mappingName, o));
    }
    public List<T> getList(String mappingName, T o) throws Exception {
        return mapper.fetch(mappingName, o);
    }
    public int register(String mappingName, T o) throws Exception {
        return mapper.insertOne(mappingName, o);
    }
    public int delete(String mappingName, T o) throws Exception {
        return mapper.deleteOne(mappingName, o);
    }
}
