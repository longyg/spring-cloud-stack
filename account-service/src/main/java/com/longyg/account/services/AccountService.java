package com.longyg.account.services;

import com.longyg.account.clients.ScoreDiscoveryClient;
import com.longyg.account.clients.ScoreFeignClient;
import com.longyg.account.clients.ScoreRestTemplateClient;
import com.longyg.account.config.ServiceConfig;
import com.longyg.account.model.Account;
import com.longyg.account.model.AccountInfo;
import com.longyg.account.model.Score;
import com.longyg.account.repository.AccountRepository;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;
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

    @HystrixCommand(
        fallbackMethod = "buildFallbackAccount",
        commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "5000")
        }
    )
    public Account getAccount(String accountId) {
        randomlyRunLong();

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

    @HystrixCommand
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

    private void randomlyRunLong() {
        Random rand = new Random();
        int randomNum = rand.nextInt((3 - 1) + 1) + 1;
        if (randomNum == 3) {
            sleep();
        }
    }

    private void sleep() {
        try {
            Thread.sleep(11000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private Account buildFallbackAccount(String accountId) {
        Account account = new Account();
        account.setAccountId("-1");
        account.setAccountName("dummy");
        account.setAccountType("dummy");
        account.setPassword("dummy");
        return account;
    }
}
