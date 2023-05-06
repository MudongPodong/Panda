package com.example.panda.dto;


import com.example.panda.entity.UserEntity;
import com.example.panda.entity.WritingEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WritingDTO {
    private int writing_Id;
    private String writing_name;
    private int writing_photo;
    private String writing_content;
    private String category;
    private String detail_category;
    private Boolean is_sold;
    private int count;
    private Boolean is_auction;
    private int price;
    private LocalDateTime regit_date;


    public static WritingDTO toWritingDTO(WritingEntity writingEntity) {
        WritingDTO writingDTO = new WritingDTO();
        writingDTO.setWriting_Id(writingEntity.getWid());
        writingDTO.setWriting_name(writingEntity.getWriting_name());
        if(writingEntity.getWriting_photo()!=null){
            writingDTO.setWriting_photo(writingEntity.getWriting_photo().getPid());
        }

        writingDTO.setWriting_content(writingEntity.getWriting_content());
        writingDTO.setCategory(writingEntity.getCategory());
        writingDTO.setDetail_category(writingDTO.getDetail_category());
        writingDTO.setIs_sold(writingEntity.getIs_sold());
        writingDTO.setCount(writingEntity.getCount());
        writingDTO.setIs_auction(writingEntity.getIs_auction());
        writingDTO.setPrice(writingEntity.getPrice());
        writingDTO.setRegit_date(writingEntity.getRegit_date());

        return writingDTO;
    }

}
