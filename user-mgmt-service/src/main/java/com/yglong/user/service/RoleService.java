package com.yglong.user.service;

import com.yglong.user.model.Role;
import com.yglong.user.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public void addRole(Role role) {
        roleRepository.save(role);
    }

    public Role getRole(String name) {
        return roleRepository.findByName(name);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public void deleteRoles(List<Role> roles) {
        roleRepository.deleteAll(roles);
    }
}
