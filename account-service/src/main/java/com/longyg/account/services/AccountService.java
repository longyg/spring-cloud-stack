package com.longyg.account.services;

import com.longyg.account.clients.ScoreDiscoveryClient;
import com.longyg.account.clients.ScoreFeignClient;
import com.longyg.account.clients.ScoreRestTemplateClient;
import com.longyg.account.config.ServiceConfig;
import com.longyg.account.model.Account;
import com.longyg.account.model.AccountInfo;
import com.longyg.account.model.Score;
import com.longyg.account.repository.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountService {
    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ServiceConfig config;

    @Autowired
    private ScoreDiscoveryClient scoreDiscoveryClient;

    @Autowired
    private ScoreRestTemplateClient scoreRestTemplateClient;

    @Autowired
    private ScoreFeignClient scoreFeignClient;

    public Iterable<Account> getAccounts() {
        return accountRepository.findAll();
    }

    public Account getAccount(String accountId) {
        Account account = accountRepository.findByAccountId(accountId);
        return account;
    }

    public void saveAccount(Account account) {
        account.setAccountId(UUID.randomUUID().toString());
        account.setAccountType(config.getAccountType());
        accountRepository.save(account);
    }

    public void deleteAccount(String accountId) {
        accountRepository.deleteById(accountId);
    }

    public String getVendor() {
        return config.getVendor();
    }

    public AccountInfo getAccountInfo(String accountId, String clientType) {
        Account account = accountRepository.findByAccountId(accountId);
        AccountInfo ai = null;
        if (null != account) {
            ai = new AccountInfo();
            ai.setAccountId(account.getAccountId());
            ai.setAccountName(account.getAccountName());
            ai.setAccountType(account.getAccountType());
            ai.setPassword(account.getPassword());

            Score score = getScore(accountId, clientType);
            ai.setScore(score);
        }

        return ai;
    }

    private Score getScore(String accountId, String clientType) {
        Score score = null;
        switch (clientType) {
            case "discovery-client":
                logger.info("Getting score via discovery client...");
                score = scoreDiscoveryClient.getScore(accountId);
                break;
            case "rest-template":
                logger.info("Getting score via rest template client...");
                score = scoreRestTemplateClient.getScore(accountId);
                break;
            case "feign":
                logger.info("Getting score via Feign client...");
                score = scoreFeignClient.getScore(accountId);
                break;
            default:
                break;
        }
        return score;
    }
}
