package com.congressconnection.conspring.repository;

import com.congressconnection.conspring.model.Congressman;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CongressmanRepository extends JpaRepository<Congressman, String> {}
