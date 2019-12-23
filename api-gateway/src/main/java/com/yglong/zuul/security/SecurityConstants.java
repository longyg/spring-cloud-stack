package com.yglong.zuul.security;

public class SecurityConstants {
    public static final String[] ANONYMOUS_ALLOWED_URL =
            {
                    "/authservice/**",
                    "/userservice/resources"
            };
}
