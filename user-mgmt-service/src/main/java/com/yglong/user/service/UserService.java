package com.yglong.user.service;

import com.yglong.user.model.Role;
import com.yglong.user.model.User;
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

    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public void deleteUsers(List<User> users) {
        userRepository.deleteAll(users);
    }
}
