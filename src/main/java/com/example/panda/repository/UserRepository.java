package com.example.panda.repository;

import com.example.panda.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    boolean existsByEmailAndPhoneNumber(String email, String phoneNumber);
    Optional<UserEntity> findByEmail(String email);
}
