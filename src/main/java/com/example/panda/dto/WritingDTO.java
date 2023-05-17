package com.example.panda.dto;

import com.example.panda.entity.WritingEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WritingDTO {
    private int writing_Id;
    private String writing_name;
    private String category;
    private String detail_category;
    private int count;
    private int price;
    private LocalDateTime regit_date;
    private UserDTO userDTO;


    public static WritingDTO toWritingDTO(WritingEntity writingEntity) {
        WritingDTO writingDTO = new WritingDTO();
        writingDTO.setWriting_Id(writingEntity.getWid());
        writingDTO.setWriting_name(writingEntity.getWriting_name());
        writingDTO.setCategory(writingEntity.getCategory());
        writingDTO.setDetail_category(writingEntity.getDetail_category());
        writingDTO.setCount(writingEntity.getCount());
        writingDTO.setPrice(writingEntity.getPrice());
        writingDTO.setRegit_date(writingEntity.getRegit_date());

        writingDTO.setUserDTO(UserDTO.toUserDTO(writingEntity.getUserEntity()));
        return writingDTO;
    }

}
