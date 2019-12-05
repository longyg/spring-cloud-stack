package com.longyg.account.clients;

import com.longyg.account.model.Score;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ScoreRestTemplateClient {
    private static final Logger logger = LoggerFactory.getLogger(ScoreRestTemplateClient.class.getName());
    private static final String SCORE_SERVICE_URI = "http://api-gateway/api/score-svc/v1/score/{accountId}";

    @Autowired
    private RestTemplate restTemplate;

    public Score getScore(String accountId) {
        ResponseEntity<Score> restExchange = restTemplate.exchange(
            SCORE_SERVICE_URI,
            HttpMethod.GET,
            null, Score.class, accountId
        );
        return restExchange.getBody();
    }
}
