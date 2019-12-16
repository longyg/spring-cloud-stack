package com.longyg.account.services;

import com.longyg.account.clients.ScoreDiscoveryClient;
import com.longyg.account.clients.ScoreFeignClient;
import com.longyg.account.clients.ScoreRestTemplateClient;
import com.longyg.account.config.ServiceConfig;
import com.longyg.account.model.Account;
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

// 设置 Hystrix 的默认配置
@DefaultProperties(
    commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "5000"), // 超时时间
            @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "20"), // 一个窗口时间内最小调用次数
            @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50"), // 调用故障百分比阈值
            @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "5000"), // 断路器跳闸后，Hystrix 尝试服务调用的间隔时间
            @HystrixProperty(name = "metrics.rollingStats.timeInMilliseconds", value = "10000"), // 收集和监控服务调用信息的滚动窗口时长
            @HystrixProperty(name = "metrics.rollingStats.numBuckets", value = "10"),
    },
    threadPoolKey = "accountDbAccessPool",
    threadPoolProperties = {
            @HystrixProperty(name = "coreSize", value = "30"), // 线程池中线程最大数量
            @HystrixProperty(name = "maxQueueSize", value = "10") // 请求队列大小
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
        return accountRepository.findAll();
    }

    // 使用 Hystrix 包装访问数据库的方法
    @HystrixCommand(
        fallbackMethod = "buildFallbackAccount",  // 指定后备方法，当调用本方法失败时，调用该后备方法
        commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "5000"),
        }
    )
    public Account getAccount(String accountId) {
        randomlyRunLong();
        logger.info("AccountService.getAccount Correlation ID: " + UserContextHolder.getContext().getCorrelationId());
        Account account = accountRepository.findByAccountId(accountId);
        return account;
    }

    // 使用 Hystrix 包装访问数据库的方法
    @HystrixCommand
    public void saveAccount(Account account) {account.setAccountId(UUID.randomUUID().toString());
        account.setAccountType(config.getAccountType());
        accountRepository.save(account);
    }

    // 使用 Hystrix 包装访问数据库的方法
    @HystrixCommand
    public void deleteAccount(String accountId) {
        accountRepository.deleteById(accountId);
    }

    public String getVendor() {
        return config.getVendor();
    }

    // 使用 Hystrix 包装调用积分服务的方法
    @HystrixCommand(
        fallbackMethod = "buildFallbackScore", // 指定后备方法，当调用本方法失败时，调用该后备方法
        threadPoolKey = "scoreAccessPool"  // 在单独的线程池中调用积分服务
    )
    public Score getScore(String accountId, String clientType) {
        randomlyRunLong();
        logger.info("AccountService.getScore Correlation ID: " + UserContextHolder.getContext().getCorrelationId());
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

    /**
     * 测试辅助方法，模拟调用服务超时
     */
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

    /**
     * 访问数据库查询所有账户失败时的后备方法
     * @return
     */
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

    /**
     * 访问数据库获取指定账户信息失败的后备方法
     * @param accountId
     * @return
     */
    private Account buildFallbackAccount(String accountId) {
        Account account = new Account();
        account.setAccountId("-1");
        account.setAccountName("dummy");
        account.setAccountType("dummy");
        account.setPassword("dummy");
        return account;
    }

    /**
     * 调用积分服务失败的后备方法
     * @param accountId
     * @param clientType
     * @return
     */
    private Score buildFallbackScore(String accountId, String clientType) {
        Score score = new Score();
        score.setLastReceived(-1);
        score.setLastReceiveTime(null);
        score.setTotal(-1);
        return score;
    }
}
