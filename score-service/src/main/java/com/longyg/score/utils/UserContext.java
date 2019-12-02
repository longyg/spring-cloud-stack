package com.longyg.score.utils;

public class UserContext {
    public static final String CORRELATION_ID = "correlation-id";
    public static final String USER_ID = "user-id";
    public static final String AUTH_TOKEN = "auto-token";

    private String correlationId;

    private String userId;

    private String authToken;

    public String getCorrelationId() {
        return correlationId;
    }

    public void setCorrelationId(String correlationId) {
        this.correlationId = correlationId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
}
