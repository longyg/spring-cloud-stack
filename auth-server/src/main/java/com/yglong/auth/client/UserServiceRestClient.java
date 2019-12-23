package com.yglong.auth.client;

import com.yglong.auth.model.Resource;
import com.yglong.auth.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
public class UserServiceRestClient {
    private static final String USER_URI = "http://user-mgmt-service/user/{username}";
    private static final String RESOURCE_URI = "http://user-mgmt-service/resource";

    @Autowired
    private RestTemplate restTemplate;

    public List<Resource> getAllResources() {
        ResponseEntity<List> restExchange = restTemplate.exchange(
                RESOURCE_URI,
                HttpMethod.GET,
                null, List.class
        );
        return restExchange.getBody();
    }

    public User getUser(String username) {
        ResponseEntity<User> restExchange = restTemplate.exchange(
                USER_URI,
                HttpMethod.GET,
                null, User.class, username
        );
        return restExchange.getBody();
    }
}
