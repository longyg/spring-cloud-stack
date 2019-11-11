package com.longyg.account.model;

import java.util.Date;

public class Score {
    private int total;

    private int lastReceived;

    private Date lastReceiveTime;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getLastReceived() {
        return lastReceived;
    }

    public void setLastReceived(int lastReceived) {
        this.lastReceived = lastReceived;
    }

    public Date getLastReceiveTime() {
        return lastReceiveTime;
    }

    public void setLastReceiveTime(Date lastReceiveTime) {
        this.lastReceiveTime = lastReceiveTime;
    }
}
