package com.yglong.auth.service;

import com.yglong.auth.client.UserServiceRestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserServiceRestClient userServiceRestClient;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails userDetails = userServiceRestClient.getUser(username);
        if (userDetails == null) {
            throw new UsernameNotFoundException("User [" + username + "] does not exist!");
        }
        return userDetails;
    }
}
