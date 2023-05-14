package com.example.panda.entity;

import com.example.panda.dto.ChatDTO;
import com.example.panda.dto.JoinMemDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "User")
public class JoinMemEntity {
    @Id // pk
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String user_email;
    private String user_pw;
    private String user_nick_name;
    private String user_phone;
    private String user_addr;
    private int user_point;

    public JoinMemEntity() {};
    public JoinMemEntity(String email, String pw, String nick, String phone, String addr){
        this.user_email = email;
        this.user_pw = pw;
        this.user_nick_name = nick;
        this.user_phone = phone;
        this.user_addr = addr;
        this.user_point = 0;
    }
    public JoinMemEntity(String email, String pw, String nick, String phone, String addr, int point){
        this.user_email = email;
        this.user_pw = pw;
        this.user_nick_name = nick;
        this.user_phone = phone;
        this.user_addr = addr;
        this.user_point = point;
    }


    public static JoinMemEntity toSaveEntity(JoinMemDTO joinMemDTO) {

        JoinMemEntity joinMemEntity = new JoinMemEntity();
        joinMemEntity.setUser_email(joinMemDTO.getEmail());
        joinMemEntity.setUser_pw(joinMemDTO.getPw());
        joinMemEntity.setUser_nick_name(joinMemDTO.getNickName());
        joinMemEntity.setUser_phone(joinMemDTO.getPhone());
        joinMemEntity.setUser_addr(joinMemDTO.getAddr());

        return joinMemEntity;
    }
}
