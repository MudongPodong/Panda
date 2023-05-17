package com.example.panda.repository;

import com.example.panda.entity.FavoriteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<FavoriteEntity, Integer> {
    @Query(value = "SELECT * FROM Favorite WHERE email= :email",nativeQuery = true)
    List<FavoriteEntity> findByEmail(@Param("email") String email);

    @Query(value="DELETE FROM Favorite WHERE email= :email AND wid= :wid",nativeQuery = true)
    @Modifying
    void deleteFavorite(String email,int wid);
    //DELETE FROM table_name WHERE id = 1105;
}
