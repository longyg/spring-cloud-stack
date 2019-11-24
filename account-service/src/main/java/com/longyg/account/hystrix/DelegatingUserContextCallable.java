package com.longyg.account.hystrix;

import com.longyg.account.utils.UserContext;
import com.longyg.account.utils.UserContextHolder;

import java.util.concurrent.Callable;

public class DelegatingUserContextCallable<V> implements Callable<V> {
    private final Callable<V> callable;

    private UserContext parentThreadContext;

    public DelegatingUserContextCallable(Callable<V> callable, UserContext parentThreadContext) {
        this.callable = callable;
        this.parentThreadContext = parentThreadContext;
    }

    @Override
    public V call() throws Exception {
        UserContextHolder.setContext(parentThreadContext);

        try {
            return callable.call();
        } finally {
            this.parentThreadContext = null;
        }
    }

    public static <V> Callable<V> create(Callable<V> callable, UserContext parentThreadContext) {
        return new DelegatingUserContextCallable<>(callable, parentThreadContext);
    }
}
