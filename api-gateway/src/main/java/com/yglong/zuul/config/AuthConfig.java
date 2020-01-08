package com.yglong.zuul.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class AuthConfig {

    @Value("${security.auth.ignored.uris}")
    private String authIgnoredUris;

    public List<String> getAuthIgnoredUris() {
        return Arrays.stream(authIgnoredUris.split(","))
                .map(String::trim).collect(Collectors.toList());
    }
}
