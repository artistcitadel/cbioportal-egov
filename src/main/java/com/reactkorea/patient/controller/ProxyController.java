package com.reactkorea.patient.controller;
import com.reactkorea.patient.vo.Patient;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Map;

/**
 * 1.업무명 : 환자관리시스템
 * 2.단위업무명 : ONCO연계
 * 3.프로그램명 : annotation
 * 4.설명 : oncokb 지식정보 조회 Controller 클래스다.
 *
 * @Class  ProxyController.java
 * @author
 * @since   2019. 12. 07.
 * @version 1.0
 *
 * @Copyright (c)
 *------------------------------------------------------------------------
 * Modification Information
 *------------------------------------------------------------------------
 * 수정일               수정자            수정내용
 *------------------------------------------------------------------------
 * 2019. 12. 07.     오세영          [환자진단진료조회시스템] 최초생성
 */

@Controller
@RequestMapping(value="/proxy")
public class ProxyController {
  @ResponseBody
  @RequestMapping(value="/geanList")
  public String geanList(@RequestBody(required = false) String body, HttpServletRequest request)
      throws URISyntaxException {

//    System.err.println("ProxyController getanList called");
    URI uri = new URI("http://legacy.oncokb.org/api/v1/utils/cancerGeneList");

    HttpHeaders httpHeaders = new HttpHeaders();
    String contentType = request.getHeader("Content-Type");
    if (contentType != null) {
      httpHeaders.setContentType(MediaType.valueOf(contentType));
    }

    RestTemplate restTemplate = new RestTemplate();
    restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
//    System.err.println(restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(body, httpHeaders), String.class).getBody());
    return restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(body, httpHeaders), String.class).getBody();
  }

  @ResponseBody
  @RequestMapping(value="/searchGean")
  public String searchGean(@RequestBody(required = false) String body, HttpServletRequest request)
      throws URISyntaxException {
    //System.err.println("ProxyController searchGean called " + body);

    URI uri = new URI("http://legacy.oncokb.org/api/v1/search");
    HttpHeaders httpHeaders = new HttpHeaders();
    String contentType = request.getHeader("Content-Type");
    if (contentType != null) {
      httpHeaders.setContentType(MediaType.valueOf(contentType));
    }

    RestTemplate restTemplate = new RestTemplate();
    restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
    return restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<>(body, httpHeaders), String.class).getBody();
  }

  @ResponseBody
  @RequestMapping(value="/searchEvidence")
  public String searchEvidence(@RequestBody(required = false) String body, HttpServletRequest request)
      throws URISyntaxException {
//    System.err.println("ProxyController searchEvidence called " + body);

    URI uri = new URI("http://legacy.oncokb.org/api/v1/evidences/lookup");
    HttpHeaders httpHeaders = new HttpHeaders();
    String contentType = request.getHeader("Content-Type");
    if (contentType != null) {
      httpHeaders.setContentType(MediaType.valueOf(contentType));
    }

    RestTemplate restTemplate = new RestTemplate();
    restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
    return restTemplate.exchange(uri, HttpMethod.POST, new HttpEntity<>(body, httpHeaders), String.class).getBody();
  }

  @ResponseBody
  @RequestMapping(value="/searchCivic")
  public String searchCivic(@RequestBody(required = false) Map<String,String> body, HttpServletRequest request)
      throws URISyntaxException {
//    System.err.println("ProxyController searchCivic called " + body.get("ids"));
    URI uri = new URI("https://civicdb.org/api/genes/"+body.get("ids")+"?identifier_type=entrez_id");
    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
    HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
//    System.err.println(restTemplate.exchange(uri, HttpMethod.GET, entity, String.class).getBody());
    return restTemplate.exchange(uri, HttpMethod.GET, entity, String.class).getBody();

    /*HttpHeaders httpHeaders = new HttpHeaders();
    String contentType = request.getHeader("Content-Type");
    HttpEntity<String> entity = new HttpEntity<String>("parameters", httpHeaders);
    System.err.println(entity);
    if (contentType != null) {
      httpHeaders.setContentType(MediaType.valueOf(contentType));
    }

    RestTemplate restTemplate = new RestTemplate();
    restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));
//    System.err.println(restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(body, httpHeaders), String.class).getBody());
    return restTemplate.exchange(uri, HttpMethod.GET, new HttpEntity<>(body, httpHeaders), String.class).getBody();*/

  }

  @ResponseBody
  @RequestMapping(value="/searchCivicVarient")
  public String searchCivicVarient(@RequestBody(required = false) Map<String,String> body, HttpServletRequest request)
      throws URISyntaxException {
//    System.err.println("ProxyController searchCivicVarient called " + body);
    URI uri = new URI("https://civicdb.org/api/variants/"+body.get("id"));
    RestTemplate restTemplate = new RestTemplate();

    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
    HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
//    System.err.println(restTemplate.exchange(uri, HttpMethod.GET, entity, String.class).getBody());
    return restTemplate.exchange(uri, HttpMethod.GET, entity, String.class).getBody();

  }


}
