package com.yglong.user.controller;

import com.yglong.user.model.Resource;
import com.yglong.user.service.ResourceService;
import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Api(tags = "资源API接口")
@RestController
public class ResourceController {
    private static final Logger logger = LoggerFactory.getLogger(ResourceController.class.getName());

    @Autowired
    private ResourceService resourceService;

    @ApiOperation(value = "获取所有资源")
    @ApiResponses({@ApiResponse(code = 200, message = "获取成功", response = Resource[].class)})
    @GetMapping(value = "/resource")
    public List<Resource> getResources() {
        return resourceService.getAllResources();
    }

    @ApiOperation(value = "添加资源")
    @ApiImplicitParam(value = "待添加资源对象", required = true, dataTypeClass = Resource.class)
    @ApiResponses({@ApiResponse(code = 200, message = "添加成功")})
    @PostMapping(value = "/resource")
    public void addResource(@RequestBody  Resource resource) {
        Resource existSrc = resourceService.getResource(resource.getUrl());
        if (null != existSrc) {
            logger.error(String.format("The resource {%s} is already added", resource.getUrl()));
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    String.format("The resource {%s} is already added", resource.getUrl()));
        }
        resourceService.addResource(resource);
    }

    @ApiOperation(value = "修改资源")
    @ApiImplicitParam(value = "待修改资源对象", required = true, dataTypeClass = Resource.class)
    @ApiResponses({@ApiResponse(code = 200, message = "修改成功")})
    @PutMapping(value = "/resource")
    public void updateResource(@RequestBody Resource resource) {
        Resource existSrc = resourceService.getResource(resource.getUrl());
        if (null == existSrc) {
            logger.error(String.format("The resource {%s} does not exist", resource.getUrl()));
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("The resource {%s} does not exist", resource.getUrl()));
        }
        existSrc.setName(resource.getName());
        existSrc.setUrl(resource.getUrl());
        resourceService.updateResource(existSrc);
    }

    @ApiOperation(value = "删除资源")
    @ApiImplicitParam(value = "待删除资源列表", required = true, dataTypeClass = Resource[].class)
    @ApiResponses({@ApiResponse(code = 200, message = "删除成功")})
    @DeleteMapping(value = "/resource")
    public void deleteResources(@RequestBody List<Resource> resources) {
        resourceService.deleteResources(resources);
    }

    @ApiOperation(value = "为资源绑定角色")
    @ApiImplicitParam(value = "待绑定资源对象", required = true, dataTypeClass = Resource.class)
    @ApiResponses({@ApiResponse(code = 200, message = "绑定成功")})
    @PutMapping(value = "/resource/role")
    public void bindRoles(@RequestBody Resource resource) {
        Resource existSrc = resourceService.getResource(resource.getUrl());
        if (null == existSrc) {
            logger.error(String.format("The resource {%s} does not exist", resource.getUrl()));
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("The resource {%s} does not exist", resource.getUrl()));
        }
        existSrc.setRoles(resource.getRoles());
        resourceService.updateResource(existSrc);
    }
}