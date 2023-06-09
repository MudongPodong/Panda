package com.example.panda.dto;

import com.example.panda.entity.WritingEntity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WritingResponseDTO {
    private int writingId;
//    private byte[] writingImg;
    private String writingImg;
    private String writingName;
    private int price;
    private String addr;
    private int userPoint;
    private boolean isAd;

    public static WritingResponseDTO toWritingResponseDTO(WritingEntity writingEntity, boolean isAd) {
        return WritingResponseDTO.builder()
                .writingId(writingEntity.getWid())
                .writingImg(writingEntity.getWriting_photo())
                .writingName(writingEntity.getWriting_name())
                .price(writingEntity.getPrice())
                .addr(writingEntity.getUserEntity().getAddress())
                .userPoint(writingEntity.getUserEntity().getPoint())
                .isAd(isAd)
                .build();
    }
}
