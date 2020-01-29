package com.yglong.user.controller;

import com.yglong.user.model.Role;
import com.yglong.user.model.User;
import com.yglong.user.service.RoleService;
import com.yglong.user.service.UserService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Api(tags = "角色API接口")
@RestController
public class RoleController {
    private static final Logger logger = LoggerFactory.getLogger(RoleController.class.getName());

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @ApiOperation(value = "获取所有角色")
    @ApiResponses({@ApiResponse(code = 200, message = "获取成功", response = Role[].class)})
    @GetMapping(value = "/role")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @ApiOperation(value = "添加角色")
    @ApiImplicitParam(value = "待添加角色对象", required = true, dataTypeClass = Role.class)
    @ApiResponses({@ApiResponse(code = 200, message = "添加成功")})
    @PostMapping(value = "/role")
    public void addRole(@RequestBody Role role) {
        Role existRole = roleService.getRole(role.getName());
        if (null != existRole) {
            logger.error(String.format("The role {%s} is already exist", role.getName()));
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    String.format("The role {%s} is already exist", role.getName()));
        }
        roleService.addRole(role);
    }

    @ApiOperation(value = "删除角色")
    @ApiImplicitParam(value = "待删除角色列表", required = true, dataTypeClass = Role[].class)
    @ApiResponses({@ApiResponse(code = 200, message = "删除成功")})
    @DeleteMapping(value = "/role")
    public void deleteRoles(@RequestBody List<Role> roles) {
        List<User> users = userService.getAllUsers();
        List<Role> usedRoles = new ArrayList<>();
        roles.forEach(role -> {
            users.forEach(user -> {
                if (user.getRoles().contains(role)) {
                    usedRoles.add(role);
                    return;
                }
            });
        });
        if (usedRoles.size() > 0) {
            List<String> usedRoleNames = usedRoles.stream().map(role -> role.getName()).collect(Collectors.toList());
            String roleNames = String.join(", ", usedRoleNames);
            logger.error(String.format("The role {%s} is assigned to some users already, can't be deleted", roleNames));
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    String.format("The role {%s} is assigned to some users already, can't be deleted", roleNames));
        }
        roleService.deleteRoles(roles);
    }
}
