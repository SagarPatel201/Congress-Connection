package com.congressconnection.conspring.repository;

import com.congressconnection.conspring.model.FavoriteBills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteBillsRepository extends JpaRepository<FavoriteBills, Long> {
}
