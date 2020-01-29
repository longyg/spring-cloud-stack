package com.yglong.user.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.util.Set;

@ApiModel(description = "资源类")
@Entity
@Table(name = "resource")
public class Resource {
    @ApiModelProperty(value = "资源ID")
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(updatable = false, nullable = false)
    private Long id;

    @ApiModelProperty(value = "资源URL")
    @Column(unique = true)
    private String url;

    @ApiModelProperty(value = "资源名称")
    @Column(unique = true)
    private String name;

    @ApiModelProperty(value = "可以访问资源的角色")
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "resource_role",
        joinColumns = {@JoinColumn(name = "resource_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "id")})
    private Set<Role> roles;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
