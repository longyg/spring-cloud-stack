package com.yglong.auth.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @GetMapping(value = "/user/me")
    public String me() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
