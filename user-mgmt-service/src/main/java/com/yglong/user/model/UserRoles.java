package com.yglong.user.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class UserRoles {
    public UserRoles(String username, String roles) {
        this.username = username;
        this.roles = Arrays.stream(roles.split(",")).map(s -> s.trim()).collect(Collectors.toList());
    }
    private String username;

    private List<String> roles = new ArrayList<>();

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
