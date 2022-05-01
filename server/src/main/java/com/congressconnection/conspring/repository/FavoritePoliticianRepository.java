package com.congressconnection.conspring.repository;

import com.congressconnection.conspring.model.FavoritePolitician;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritePoliticianRepository extends JpaRepository<FavoritePolitician, Long> {}
