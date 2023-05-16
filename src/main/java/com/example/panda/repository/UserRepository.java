// title : UserRepository
// 설명 : 사용자 Repository
//      sql 쿼리 실행을 위한 사용자 repository
//      UserEntity를 이용해 User table에 sql쿼리문 사용.
// 작성자 : 심상혁
// 생성일 : 2023.05.16
// 업데이트 : -
package com.example.panda.repository;

import com.example.panda.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    boolean existsByEmailAndPhoneNumber(String email, String phoneNumber);
    Optional<UserEntity> findByEmail(String email);
}
