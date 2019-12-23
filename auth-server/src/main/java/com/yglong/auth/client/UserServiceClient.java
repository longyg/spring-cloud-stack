package com.yglong.auth.client;

import com.yglong.auth.model.Resource;
import com.yglong.auth.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(value = "user-mgmt-service")
public interface UserServiceClient {

    @RequestMapping(
            value = "/user/{username}",
            method = RequestMethod.GET,
            consumes = "application/json"
    )
    User getUser(@PathVariable(name = "username") String username);


    @RequestMapping(
            value = "/resource",
            method = RequestMethod.GET,
            consumes = "application/json"
    )
    List<Resource> getAllResources();
}
