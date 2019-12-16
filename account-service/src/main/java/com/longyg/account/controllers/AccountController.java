package com.longyg.account.controllers;

import com.longyg.account.model.Account;
import com.longyg.account.model.AccountInfo;
import com.longyg.account.model.Score;
import com.longyg.account.services.AccountService;
import com.longyg.account.utils.UserContextHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/v1/account")
public class AccountController {
    private static final Logger logger = LoggerFactory.getLogger(AccountController.class.getName());

    @Autowired
    private AccountService accountService;

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Account> getAccounts() {
        return accountService.getAccounts();
    }

    @RequestMapping(value = "/{accountId}", method = RequestMethod.GET)
    public Account getAccount(@PathVariable String accountId) {
        return accountService.getAccount(accountId);
    }

    @RequestMapping(value = "/{accountId}/{clientType}", method = RequestMethod.GET)
    public AccountInfo getAccountInfo(@PathVariable String accountId,
                                      @PathVariable String clientType) {
        logger.info("AccountController.getAccountInfo Correlation ID: " + UserContextHolder.getContext().getCorrelationId());

        Account account = accountService.getAccount(accountId);
        AccountInfo ai = null;
        if (null != account) {
            ai = new AccountInfo();
            ai.setAccountId(account.getAccountId());
            ai.setAccountName(account.getAccountName());
            ai.setAccountType(account.getAccountType());
            ai.setPassword(account.getPassword());

            Score score = accountService.getScore(accountId, clientType);
            ai.setScore(score);
        }
        return ai;
    }

    @RequestMapping(method = RequestMethod.POST)
    public void createAccount(@RequestBody Account account) {
        accountService.saveAccount(account);
    }

    @RequestMapping(value = "/{accountId}", method = RequestMethod.DELETE)
    public void deleteAccount(@PathVariable String accountId) {
        accountService.deleteAccount(accountId);
    }

    @RequestMapping(value = "/vendor", method = RequestMethod.GET)
    public String getVendor() {
        return accountService.getVendor();
    }
}
