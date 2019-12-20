package com.softcen.bigcen.med.patient.controller;
import com.softcen.bigcen.med.patient.vo.Patient;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value="/proxy")
public class ProxyController {
  @ResponseBody
  @RequestMapping(value="/geanList")
  public String geanList(@RequestBody(required = false) String body, HttpServletRequest request)
      throws URISyntaxException {

    System.err.println("ProxyController getanList called");
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
    System.err.println("ProxyController searchGean called " + body);

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

}
