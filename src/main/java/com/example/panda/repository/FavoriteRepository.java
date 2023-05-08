package com.example.panda.repository;

import com.example.panda.entity.ChatEntity;
import com.example.panda.entity.FavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Integer> {
}
