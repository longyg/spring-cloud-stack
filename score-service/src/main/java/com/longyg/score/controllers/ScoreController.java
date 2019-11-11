package com.longyg.score.controllers;

import com.longyg.score.model.Score;
import com.longyg.score.services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/v1/score")
public class ScoreController {
    @Autowired
    private ScoreService scoreService;

    @RequestMapping(path = "/{accountId}", method = RequestMethod.GET)
    public Score getScore(@PathVariable String accountId) {
        return scoreService.getScore(accountId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void receiveScore(@RequestParam String accountId,
                             @RequestParam int received) {
        scoreService.saveScore(accountId, received);
    }
}
