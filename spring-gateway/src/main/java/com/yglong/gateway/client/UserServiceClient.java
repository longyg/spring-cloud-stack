package com.yglong.gateway.client;

import com.yglong.user.model.Resource;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@FeignClient(value = "user-mgmt-service")
public interface UserServiceClient {
    @RequestMapping(
            path = "/resource",
            method = RequestMethod.GET,
            consumes = "application/json"
    )
    List<Resource> getAllResources();
}
