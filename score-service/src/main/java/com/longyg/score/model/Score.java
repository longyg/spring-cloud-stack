package com.longyg.score.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "score")
public class Score {
    @Id
    @Column(name = "account_id")
    private String accountId;

    @Column(name = "total")
    private int total;

    @Column(name = "last_received")
    private int lastReceived;

    @Column(name = "last_receive_time")
    private Date lastReceiveTime;

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

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
