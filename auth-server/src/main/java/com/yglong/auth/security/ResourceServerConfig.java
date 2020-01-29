package com.yglong.auth.security;

import com.yglong.auth.config.ServiceConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {
    @Autowired
    private ServiceConfig serviceConfig;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(serviceConfig.getAuthIgnoredUris().toArray(new String[] {})).permitAll()
                .anyRequest().authenticated();
    }
}
