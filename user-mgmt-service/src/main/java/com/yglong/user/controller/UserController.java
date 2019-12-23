package com.yglong.user.controller;

import com.yglong.user.model.Resource;
import com.yglong.user.model.User;
import com.yglong.user.service.ResourceService;
import com.yglong.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ResourceService resourceService;

    @RequestMapping(value = "/user/{username}", method = RequestMethod.GET)
    public User getUser(@PathVariable(name = "username") String username) {
        return userService.getUser(username);
    }

    @RequestMapping(value = "/resources", method = RequestMethod.GET)
    List<Resource> getResources() {
        return resourceService.getAllResources();
    }
}
