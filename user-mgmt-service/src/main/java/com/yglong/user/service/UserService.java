package com.yglong.user.service;

import com.yglong.user.model.Role;
import com.yglong.user.model.User;
import com.yglong.user.model.UserRoles;
import com.yglong.user.repository.RoleRepository;
import com.yglong.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class.getName());
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    public void addUsers(List<User> users) {
        userRepository.saveAll(users);
    }

    public void addUserRoles(List<UserRoles> userRoles) {
        for (UserRoles userRole : userRoles) {
            User user = userRepository.findByUsername(userRole.getUsername());
            if (user == null) {
                logger.error("Unknown user: ", userRole.getUsername());
                continue;
            }
            Long userId = user.getId();
            for (String role : userRole.getRoles()) {
                Role r = roleRepository.findByName(role);
                if (r == null) {
                    logger.error("Unknown role: ", role);
                    continue;
                }
                Long roleId = r.getId();
                userRepository.addUserRole(userId, roleId);
            }
        }
    }

    public void addUserWithRoles(List<User> users) {
        for (User user : users) {
            Set<Role> roles = new HashSet<>();
            for (Role role : user.getRoles()) {
                Role persistRole = roleRepository.findByName(role.getName());
                if (null != persistRole) {
                    roles.add(persistRole);
                } else {
                    logger.warn("Unknown role: ", role.getName());
                }
            }
            user.setRoles(roles);
            userRepository.save(user);
        }
    }
}
