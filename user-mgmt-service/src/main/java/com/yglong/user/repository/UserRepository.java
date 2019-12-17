package com.yglong.user.repository;

import com.yglong.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Modifying
    @Query(value = "insert into user_role (user_id, role_id) values (:userId, :roleId)", nativeQuery = true)
    @Transactional
    void addUserRole(@Param("userId") Long userId, @Param("roleId") Long roleId);
}
