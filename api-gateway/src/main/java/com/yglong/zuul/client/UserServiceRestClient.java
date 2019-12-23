package com.yglong.zuul.client;

import com.yglong.zuul.model.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserServiceRestClient {
    private static final String RESOURCE_URI = "http://user-mgmt-service/resources";

    @Autowired
    private RestTemplate restTemplate;

    public List<Resource> getAllResources() {
        ResponseEntity<Resource[]> restExchange = restTemplate.exchange(
                RESOURCE_URI,
                HttpMethod.GET,
                null, Resource[].class
        );
        Resource[] resources = restExchange.getBody();
        return Arrays.stream(resources).collect(Collectors.toList());
    }
}
