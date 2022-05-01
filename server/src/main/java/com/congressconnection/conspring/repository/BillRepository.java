package com.congressconnection.conspring.repository;

import com.congressconnection.conspring.model.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    Page<Bill> findByBillType(String billType, Pageable pageRequest);

    Optional<Bill> findByBillTypeAndBillNumber(String billType, int billNumber);
}
