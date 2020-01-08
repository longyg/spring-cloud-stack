package com.yglong.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import java.io.StringWriter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class ServiceConfig {
    @Value("${jwt.signing.key}")
    private String jwtSigningKey;

    @Value("${security.auth.ignored.uris}")
    private String authIgnoredUris;

    public String getJwtSigningKey() {
        return jwtSigningKey;
    }

    public void setJwtSigningKey(String jwtSigningKey) {
        this.jwtSigningKey = jwtSigningKey;
    }

    public List<String> getAuthIgnoredUris() {
        return Arrays.stream(authIgnoredUris.split(","))
                .map(String::trim).collect(Collectors.toList());
    }
}
