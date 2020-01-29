package com.yglong.gateway.security;

import com.yglong.gateway.config.AuthConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@EnableWebFluxSecurity
public class ResourceServerConfig {
    @Autowired
    private AuthConfig authConfig;

    @Autowired
    private RoleBasedAuthorizationManager roleBasedAuthorizationManager;

    @Bean
    public SecurityWebFilterChain springSecurityWebFilterChain(ServerHttpSecurity http) {
        http.csrf().disable().authorizeExchange()
                .pathMatchers(HttpMethod.OPTIONS).permitAll()
                .pathMatchers(authConfig.getAuthIgnoredUris().toArray(new String[] {})).permitAll()
                .anyExchange().access(roleBasedAuthorizationManager);
        http.oauth2ResourceServer().jwt();
        return http.build();
    }

}
