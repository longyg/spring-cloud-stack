package com.longyg.score.services;

import com.longyg.score.model.Score;
import com.longyg.score.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public Score getScore(String accountId) {
        return scoreRepository.findByAccountId(accountId);
    }

    public void saveScore(String accountId, int received) {
        Score score = scoreRepository.findByAccountId(accountId);

        if (null == score) {
            score = new Score();
            score.setAccountId(accountId);
        }
        score.setLastReceived(received);
        score.setLastReceiveTime(new Date());
        score.setTotal(score.getTotal() + received);

        scoreRepository.save(score);
    }
}
