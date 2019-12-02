package com.longyg.score.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Http 请求过滤器，从请求 Header 中获取关联ID
 */
@Component
public class UserContextFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(UserContextFilter.class.getName());

    @Override
    public void doFilter(ServletRequest servletRequest,
                         ServletResponse servletResponse,
                         FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        logger.info("===> UserContext Filter Correlation id: " + request.getHeader(UserContext.CORRELATION_ID));

        filterChain.doFilter(request, servletResponse);
    }
}
