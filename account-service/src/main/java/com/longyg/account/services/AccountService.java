package com.longyg.account.services;

import com.longyg.account.config.ServiceConfig;
import com.longyg.account.model.Account;
import com.longyg.account.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ServiceConfig config;

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

    public String getVersion() {
        return config.getVersion();
    }
}
