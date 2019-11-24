package com.longyg.account.services;

import com.longyg.account.clients.ScoreDiscoveryClient;
import com.longyg.account.clients.ScoreFeignClient;
import com.longyg.account.clients.ScoreRestTemplateClient;
import com.longyg.account.config.ServiceConfig;
import com.longyg.account.model.Account;
import com.longyg.account.model.AccountInfo;
import com.longyg.account.model.Score;
import com.longyg.account.repository.AccountRepository;
import com.longyg.account.utils.UserContextHolder;
import com.netflix.hystrix.contrib.javanica.annotation.DefaultProperties;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@DefaultProperties(
    commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "5000"),
            @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "20"),
            @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50"),
            @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "5000"),
            @HystrixProperty(name = "metrics.rollingStats.timeInMilliseconds", value = "10000"),
            @HystrixProperty(name = "metrics.rollingStats.numBuckets", value = "10"),
    },
    threadPoolKey = "accountDbAccessPool",
    threadPoolProperties = {
            @HystrixProperty(name = "coreSize", value = "30"),
            @HystrixProperty(name = "maxQueueSize", value = "10")
    }
)
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

    @HystrixCommand
    public Iterable<Account> getAccounts() {
        randomlyRunLong();
        logger.info("===> AccountService.getAccounts Correlation id: " + UserContextHolder.getContext().getCorrelationId());
        return accountRepository.findAll();
    }

    @HystrixCommand(
        fallbackMethod = "buildFallbackAccount"
    )
    public Account getAccount(String accountId) {
        randomlyRunLong();
        logger.info("===> AccountService.getAccount Correlation id: " + UserContextHolder.getContext().getCorrelationId());
        Account account = accountRepository.findByAccountId(accountId);
        return account;
    }

    @HystrixCommand
    public void saveAccount(Account account) {
        randomlyRunLong();
        logger.info("===> AccountService.getAccount Correlation id: " + UserContextHolder.getContext().getCorrelationId());
        account.setAccountId(UUID.randomUUID().toString());
        account.setAccountType(config.getAccountType());
        accountRepository.save(account);
    }

    @HystrixCommand
    public void deleteAccount(String accountId) {
        accountRepository.deleteById(accountId);
    }

    public String getVendor() {
        return config.getVendor();
    }

    @HystrixCommand(
        fallbackMethod = "buildFallbackScore",
        threadPoolKey = "scoreAccessPool"
    )
    public Score getScore(String accountId, String clientType) {
        randomlyRunLong();
        logger.info("===> AccountService.getScore Correlation id: " + UserContextHolder.getContext().getCorrelationId());
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

    private Iterable<Account> buildFallbackAccounts() {
        Account account = new Account();
        account.setAccountId("-1");
        account.setAccountName("dummy");
        account.setAccountType("dummy");
        account.setPassword("dummy");
        List<Account> list =  new ArrayList<>();
        list.add(account);
        return list;
    }

    private Account buildFallbackAccount(String accountId) {
        Account account = new Account();
        account.setAccountId("-1");
        account.setAccountName("dummy");
        account.setAccountType("dummy");
        account.setPassword("dummy");
        return account;
    }

    private Score buildFallbackScore(String accountId, String clientType) {
        Score score = new Score();
        score.setLastReceived(-1);
        score.setLastReceiveTime(null);
        score.setTotal(-1);
        return score;
    }
}
