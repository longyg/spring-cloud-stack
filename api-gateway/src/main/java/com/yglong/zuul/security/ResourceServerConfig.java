package com.yglong.zuul.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.ObjectPostProcessor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

    @Autowired
    private RoleBasedMetadataSource roleBasedMetadataSource;

    @Autowired
    private RoleBasedAccessDecisionManager roleBasedAccessDecisionManager;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                // 浏览器发送的options请求，不会带上Authorization请求头，因此必须忽略options请求的认证
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .anyRequest().authenticated()
                .withObjectPostProcessor(new ObjectPostProcessor<FilterSecurityInterceptor>() {
                    @Override
                    public <O extends FilterSecurityInterceptor> O postProcess(O object) {
                        object.setSecurityMetadataSource(roleBasedMetadataSource);
                        object.setAccessDecisionManager(roleBasedAccessDecisionManager);
                        return object;
                    }
                });
    }
}
