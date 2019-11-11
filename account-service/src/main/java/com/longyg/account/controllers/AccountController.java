package com.longyg.account.controllers;

import com.longyg.account.model.Account;
import com.longyg.account.model.AccountInfo;
import com.longyg.account.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/v1/account")
public class AccountController {

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
        return accountService.getAccountInfo(accountId, clientType);
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
