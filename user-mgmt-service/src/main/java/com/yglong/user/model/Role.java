package com.yglong.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.util.Set;

@ApiModel(description = "角色类")
@Entity
@Table(name = "role")
public class Role {
    public Role() {

    }
    public Role(String name) {
        this.name = name;
    }

    @ApiModelProperty(value = "角色ID")
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(updatable = false, nullable = false)
    private Long id;

    @ApiModelProperty(value = "角色名")
    @Column(unique = true)
    private String name;

    @ApiModelProperty(value = "具有该角色的用户")
    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Set<User> users;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
