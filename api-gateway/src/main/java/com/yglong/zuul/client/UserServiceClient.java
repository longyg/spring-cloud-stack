package com.yglong.zuul.client;

import com.yglong.zuul.model.Resource;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(value = "user-mgmt-service")
public interface UserServiceClient {

    @RequestMapping(
            path = "/resources",
            method = RequestMethod.GET,
            consumes = "application/json"
    )
    List<Resource> getAllResources();
}
