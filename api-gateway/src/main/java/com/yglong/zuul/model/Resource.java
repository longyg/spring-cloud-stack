package com.yglong.zuul.model;

public class Resource {
    private Long id;

    private String url;

    private String roles;

    public Resource() {}

    public Resource(String url, String roles) {
        this.url = url;
        this.roles = roles;
    }

    public String[] getRolesArray() {
        return roles.split(",");
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
