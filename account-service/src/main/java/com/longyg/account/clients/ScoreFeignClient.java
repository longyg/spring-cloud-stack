package com.longyg.account.clients;

import com.longyg.account.model.Score;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient("score-service")
public interface ScoreFeignClient {

    @RequestMapping(method = RequestMethod.GET,
                    value = "/v1/score/{accountId}",
                    consumes = "application/json")
    public Score getScore(@PathVariable String accountId);
}
