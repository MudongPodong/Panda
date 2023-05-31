package com.example.panda.dto;

import com.example.panda.entity.PurchaseHistoryEntity;
import com.example.panda.entity.WritingCompleteEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseHistoryDTO {
    private int pid;
    private UserDTO userDTO;
    private WritingCompleteDTO writingCompleteDTO;
    private LocalDateTime purchase_date;
    public static PurchaseHistoryDTO toPurchaseHistoryDTO(PurchaseHistoryEntity purchaseHistoryEntity){
        PurchaseHistoryDTO purchaseHistoryDTO=new PurchaseHistoryDTO();
        purchaseHistoryDTO.setPid(purchaseHistoryDTO.getPid());
        purchaseHistoryDTO.setUserDTO(UserDTO.toUserDTO(purchaseHistoryEntity.getUserEntity()));
        purchaseHistoryDTO.setWritingCompleteDTO(WritingCompleteDTO.toWritingComplete(purchaseHistoryEntity.getWritingCompleteEntity()));
        purchaseHistoryDTO.setPurchase_date(purchaseHistoryEntity.getPurchase_date());

        return purchaseHistoryDTO;
    }
}
