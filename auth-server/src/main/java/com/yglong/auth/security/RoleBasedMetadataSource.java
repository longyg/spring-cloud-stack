package com.yglong.auth.security;

import com.yglong.auth.client.UserServiceRestClient;
import com.yglong.auth.model.Resource;
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

    @Autowired
    private UserServiceRestClient userServiceRestClient;

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
        // 从数据库获取所有资源
        List<Resource> allResources = userServiceRestClient.getAllResources();
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

    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        return null;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return FilterInvocation.class.isAssignableFrom(aClass);
    }
}
