package com.example.panda.repository;

import com.example.panda.entity.JoinMemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JoinMemRepository extends JpaRepository<JoinMemEntity, String> {

    @Query("SELECT COUNT(j.user_email) > 0 FROM JoinMemEntity j WHERE j.user_email = :email OR j.user_phone = :phone")
    boolean existByUserEmailAndPhone(String email, String phone);

//    @Query("INSERT INTO JoinMemEntity(email, password, nickname, phone_number, address, point, user_img) VALUES(:email, :pw, :nickname, :phone, :addr, 0, img)")
//    boolean joinMem(String email, String pw, String nickname, String phone, String addr);
}
