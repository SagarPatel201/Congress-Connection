package com.congressconnection.conspring.service;

import com.congressconnection.conspring.model.Bill;
import com.congressconnection.conspring.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class BillService {
    @Autowired
    private BillRepository billRepository;

    public Page<Bill> getAllPaginated(int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        return billRepository.findAll(pageRequest);
    }

    public Page<Bill> getByBillType(String billType, int pageNumber, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);
        return billRepository.findByBillType(billType, pageRequest);
    }

    public Bill getByBillNumber(int billNumber, String billType) {
        return billRepository.findByBillTypeAndBillNumber(billType, billNumber).orElse(null);
    }

    public Optional<Bill> getByOriginChamberAndBillNumber(String billType, int billNumber) {
        return billRepository.findByBillTypeAndBillNumber(billType, billNumber);
    }

}
