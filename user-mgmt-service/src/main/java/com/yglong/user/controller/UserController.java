package com.yglong.user.controller;

import com.yglong.user.model.Resource;
import com.yglong.user.model.Response;
import com.yglong.user.model.User;
import com.yglong.user.service.ResourceService;
import com.yglong.user.service.UserService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Api(tags = "用户API接口")
@RestController
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class.getName());

    @Autowired
    private UserService userService;

    @Autowired
    private ResourceService resourceService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @ApiOperation(value = "根据登录用户名获取用户信息")
    @ApiResponses({@ApiResponse(code = 200, message = "获取成功", response = User.class)})
    @GetMapping(value = "/user/{username}")
    public User getUser(@ApiParam (value = "登录用户名", required = true) @PathVariable(name = "username") String username) {
        return userService.getUser(username);
    }

    @GetMapping(value = "/resources")
    public List<Resource> getResources() {
        return resourceService.getAllResources();
    }

    @ApiOperation(value = "获取所有用户")
    @ApiResponses({@ApiResponse(code = 200, message = "获取成功")})
    @GetMapping(value = "/user")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @ApiOperation(value = "添加用户")
    @ApiImplicitParam(value = "待添加用户对象", required = true, dataTypeClass = User.class)
    @ApiResponses({@ApiResponse(code = 200, message = "添加成功", response = User.class)})
    @PostMapping(value = "/user")
    public void addUser(@RequestBody User user) {
        User existUser = userService.getUser(user.getUsername());
        if (null != existUser) {
            logger.error(String.format("The username {%s} is already exist", user.getUsername()));
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    String.format("The username {%s} is already exist", user.getUsername()));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);
    }

    @ApiOperation(value = "修改用户")
    @ApiImplicitParam(value = "待修改用户对象", required = true, dataTypeClass = User.class)
    @ApiResponses({@ApiResponse(code = 200, message = "修改成功")})
    @PutMapping(value = "/user")
    public void updateUser(@RequestBody User user) {
        User existUser = userService.getUser(user.getUsername());
        if (existUser == null) {
            logger.error(String.format("The username {%s} does not exist", user.getUsername()));
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("The username {%s} does not exist", user.getUsername()));
        }
        existUser.setUsername(user.getUsername());
        if (!existUser.getPassword().equals(user.getPassword())) {
            existUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        existUser.setName(user.getName());
        existUser.setAddress(user.getAddress());
        userService.saveUser(existUser);
    }

    @ApiOperation(value = "删除用户")
    @ApiImplicitParam(value = "待删除用户列表", required = true, dataTypeClass = User[].class)
    @ApiResponses({@ApiResponse(code = 200, message = "删除成功")})
    @DeleteMapping(value = "/user")
    public void deleteUsers(@RequestBody List<User> users) {
        userService.deleteUsers(users);
    }
}
