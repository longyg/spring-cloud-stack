package com.longyg.account.repository;

import com.longyg.account.model.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<Account, String> {
    Account findByAccountId(String accountId);
}
