package com.example.panda.repository;

import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSaveRepository extends JpaRepository<UserEntity, String> {

}
