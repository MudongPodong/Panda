package com.example.panda.repository;

import com.example.panda.entity.AdvertisementEntity;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import static com.example.panda.entity.QAdvertisementEntity.advertisementEntity;

import java.util.List;

@Repository
@Slf4j
@RequiredArgsConstructor
public class AdvertiseDSLRepository {
    private final JPAQueryFactory queryFactory;

    public List<AdvertisementEntity> todayAdvertise(){ //현재 광고테이블에 존재하는 데이터 중 가장 비싼 광고료를 낸 사용자의 게시글을 올려줌(5개만)
        return queryFactory
                .selectFrom(advertisementEntity)
                .orderBy(advertisementEntity.ad_price.desc())
                .limit(5)
                .fetch();
    }
}
