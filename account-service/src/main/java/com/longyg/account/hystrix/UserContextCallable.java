package com.longyg.account.hystrix;

import com.longyg.account.utils.UserContext;
import com.longyg.account.utils.UserContextHolder;

import java.util.concurrent.Callable;

public class UserContextCallable<V> implements Callable<V> {
    private final Callable<V> callable;

    private UserContext parentThreadContext;

    public UserContextCallable(Callable<V> callable, UserContext parentThreadContext) {
        this.callable = callable;
        this.parentThreadContext = parentThreadContext;
    }

    @Override
    public V call() throws Exception {
        // 在调用call之前，将父线程传递过来的UserContext保存到当前线程的ThreadLocal中
        UserContextHolder.setContext(parentThreadContext);

        try {
            return callable.call();
        } finally {
            this.parentThreadContext = null;
        }
    }

    public static <V> Callable<V> create(Callable<V> callable, UserContext parentThreadContext) {
        return new UserContextCallable<>(callable, parentThreadContext);
    }
}
