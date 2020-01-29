package com.yglong.user.repository;

import com.yglong.user.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
    Resource findByUrl(String url);
}
