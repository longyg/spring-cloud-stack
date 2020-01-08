package com.yglong.zuul.security;

import com.yglong.zuul.client.UserServiceClient;
import com.yglong.zuul.config.AuthConfig;
import com.yglong.zuul.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.util.AntPathMatcher;

import java.util.Collection;
import java.util.List;

@Configuration
public class RoleBasedMetadataSource implements FilterInvocationSecurityMetadataSource {
    private static final Logger logger = LoggerFactory.getLogger(RoleBasedMetadataSource.class.getName());

    @Autowired
    private UserServiceClient userServiceClient;

    @Autowired
    private AuthConfig authConfig;

    private AntPathMatcher antPathMatcher = new AntPathMatcher();

    /**
     * 从数据库读取所有资源，并获取哪些角色可以访问所请求的url
     * @param o
     * @return
     * @throws IllegalArgumentException
     */
    @Override
    public Collection<ConfigAttribute> getAttributes(Object o) throws IllegalArgumentException {
        // 得到请求url
        String requestUrl = ((FilterInvocation) o).getRequestUrl();
        logger.info("Requesting url: " + requestUrl);

        if (isAnonymousAllowedUrl(requestUrl)) {
            return SecurityConfig.createList("ROLE_ANONYMOUS");
        }

        // 从数据库获取所有资源
        List<Resource> allResources = userServiceClient.getAllResources();
        // 循环所有资源，找到与请求url相匹配的资源
        for (Resource resource : allResources) {
            // 如果找到与请求url相匹配的资源
            if (antPathMatcher.match(resource.getUrl(), requestUrl)) {
                if ( resource.getRolesArray().length > 0) {
                    return SecurityConfig.createList(resource.getRolesArray());
                }
            }
        }

        // 匹配不成功返回一个特殊的ROLE_NONE
        return SecurityConfig.createList("ROLE_NONE");
    }

    private boolean isAnonymousAllowedUrl(String requestUrl) {
        for (String url : authConfig.getAuthIgnoredUris()) {
            if (antPathMatcher.match(url, requestUrl)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return FilterInvocation.class.isAssignableFrom(aClass);
    }
}
