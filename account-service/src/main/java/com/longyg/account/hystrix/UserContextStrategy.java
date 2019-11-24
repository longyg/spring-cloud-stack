package com.longyg.account.hystrix;

import com.longyg.account.utils.UserContextHolder;
import com.netflix.hystrix.HystrixThreadPoolKey;
import com.netflix.hystrix.HystrixThreadPoolProperties;
import com.netflix.hystrix.strategy.concurrency.HystrixConcurrencyStrategy;
import com.netflix.hystrix.strategy.concurrency.HystrixRequestVariable;
import com.netflix.hystrix.strategy.concurrency.HystrixRequestVariableLifecycle;
import com.netflix.hystrix.strategy.properties.HystrixProperty;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Callable;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class UserContextStrategy extends HystrixConcurrencyStrategy {

    private HystrixConcurrencyStrategy strategy;

    public UserContextStrategy(HystrixConcurrencyStrategy strategy) {
        this.strategy = strategy;
    }

    @Override
    public BlockingQueue<Runnable> getBlockingQueue(int maxQueueSize) {
        return null != strategy ? strategy.getBlockingQueue(maxQueueSize) : super.getBlockingQueue(maxQueueSize);
    }

    @Override
    public <T> HystrixRequestVariable<T> getRequestVariable(HystrixRequestVariableLifecycle<T> rv) {
        return null != strategy ? strategy.getRequestVariable(rv) : super.getRequestVariable(rv);
    }

    @Override
    public ThreadPoolExecutor getThreadPool(
            HystrixThreadPoolKey threadPoolKey,
            HystrixProperty<Integer> corePoolSize,
            HystrixProperty<Integer> maximumPoolSize,
            HystrixProperty<Integer> keepAliveTime,
            TimeUnit unit, BlockingQueue<Runnable> workQueue) {
        return null != strategy ?
                strategy.getThreadPool(threadPoolKey, corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue) :
                super.getThreadPool(threadPoolKey, corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue);
    }

    @Override
    public <T> Callable<T> wrapCallable(Callable<T> callable) {
        return null != strategy ? strategy.wrapCallable(
                DelegatingUserContextCallable.create(callable, UserContextHolder.getContext())
        ) : super.wrapCallable(
                DelegatingUserContextCallable.create(callable, UserContextHolder.getContext())
        );
    }
}
