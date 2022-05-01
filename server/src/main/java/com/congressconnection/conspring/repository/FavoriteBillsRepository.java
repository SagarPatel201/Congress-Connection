package com.congressconnection.conspring.repository;

import com.congressconnection.conspring.model.FavoriteBills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteBillsRepository extends JpaRepository<FavoriteBills, Long> {}
