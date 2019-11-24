package com.reactkorea;

import java.util.Iterator;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RkCmmnUtil {
    private static final Logger log = LoggerFactory.getLogger(RkCmmnUtil.class);
    public static void printMap(Map oMap) {
        if(oMap == null) {
            log.debug("\n\n printMap is null");
        } else {
            RkCmmnUtil.printMap(oMap.getClass().getName(), oMap);
        }
    }

    public static void printMap(String asTitle, Map aoMap) {
        StringBuilder loSb = new StringBuilder();

        loSb.append("\n------------------------------------------------------------------");
        loSb.append("\n " + asTitle);
        loSb.append("\n------------------------------------------------------------------");

        Iterator loItor = aoMap.keySet().iterator();

        while (loItor.hasNext()) {
            String lsKey = loItor.next().toString();
            loSb.append("\n").append(lsKey).append(" = ").append(aoMap.get(lsKey));
        }
        loSb.append("\n------------------------------------------------------------------");

        log.debug("\n\n");
        log.debug(loSb.toString());
        log.debug("\n\n");
    }
}
