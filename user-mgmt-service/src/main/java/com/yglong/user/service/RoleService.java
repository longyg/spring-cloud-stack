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

    public void addRoles(List<Role> roles) {
        roleRepository.saveAll(roles);
    }
}
