package com.longyg.score.repository;

import com.longyg.score.model.Score;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreRepository extends CrudRepository<Score, String> {
    Score findByAccountId(String accountId);
}
