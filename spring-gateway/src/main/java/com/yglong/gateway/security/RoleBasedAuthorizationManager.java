package com.yglong.gateway.security;

import com.yglong.gateway.client.UserServiceClient;
import com.yglong.user.model.Resource;
import net.minidev.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.ReactiveAuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.server.authorization.AuthorizationContext;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class RoleBasedAuthorizationManager implements ReactiveAuthorizationManager<AuthorizationContext> {
    private static final Logger logger = LoggerFactory.getLogger(RoleBasedAuthorizationManager.class.getName());

    @Autowired
    private UserServiceClient userServiceClient;

    private AntPathMatcher antPathMatcher = new AntPathMatcher();

    @Override
    public Mono<AuthorizationDecision> check(Mono<Authentication> authentication, AuthorizationContext context) {
        return authentication.flatMap(it -> {
            JwtAuthenticationToken auth = (JwtAuthenticationToken) it;
            Map<String, Object> claims = auth.getTokenAttributes();
            String user = claims.get("user_name").toString();
            JSONArray authorities = (JSONArray) claims.get("authorities");
            String requestUrl = context.getExchange().getRequest().getPath().value();
            List<String> requiredRoles = getRequiredRolesForResource(requestUrl);
            logger.info("=====> Current User: " + user);
            logger.info("=====> User has roles: " + authorities.toString());
            logger.info("=====> Request URL: " + requestUrl);
            logger.info("=====> Resource required roles: " + requiredRoles);
            boolean granted = decide(authorities, requiredRoles);
            return Mono.just(new AuthorizationDecision(granted));
        });
    }

    /**
     * 查询可以访问资源的角色
     * @param requestUrl 请求的资源URL
     * @return 角色名称列表
     */
    private List<String> getRequiredRolesForResource(String requestUrl) {
        boolean matched = false;
        List<Resource> allResources = userServiceClient.getAllResources();
        List<String> requiredRoles = new ArrayList<>();
        for (Resource resource : allResources) {
            // 如果找到与请求url相匹配的资源
            if (antPathMatcher.match(resource.getUrl(), requestUrl)) {
                matched = true;
                if ( resource.getRoles().size() > 0) {
                    List<String> roleNames = resource.getRoles().stream().map(role -> role.getName()).collect(Collectors.toList());
                    requiredRoles.addAll(roleNames);
                } else {
                    requiredRoles.add("ROLE_NONE");
                }
                break;
            }
        }
        if (!matched) {
            requiredRoles.add("ROLE_ANONYMOUS");
        }
        return requiredRoles;
    }

    /**
     * 判断用户是否具有访问资源的角色
     * @param authorities
     * @param requiredRoles
     * @return
     */
    private boolean decide(JSONArray authorities, List<String> requiredRoles) {
        for (String role: requiredRoles) {
            if ("ROLE_ANONYMOUS".equals(role)) {
                return true;
            }

            if ("ROLE_NONE".equals(role)) {
                return true;
            }

            if (authorities.contains("ROLE_ADMIN") || authorities.contains(role)) {
                return true;
            }
        }
        return false;
    }
}
