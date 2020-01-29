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

    public Resource getResource(String url) {
        return resourceRepository.findByUrl(url);
    }

    public void addResource(Resource resource) {
        resourceRepository.save(resource);
    }

    public void updateResource(Resource resource) {
        resourceRepository.save(resource);
    }

    public void deleteResources(List<Resource> resources) {
        resourceRepository.deleteAll(resources);
    }
}
