package com.example.panda.repository;

import com.example.panda.entity.FavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteRepositiory extends JpaRepository<FavoriteEntity, Integer> {

}
