package com.yglong.user.service;

import com.yglong.user.model.Resource;
import com.yglong.user.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {
    @Autowired
    private ResourceRepository resourceRepository;

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public void addResources(List<Resource> resources) {
        resourceRepository.saveAll(resources);
    }
}
