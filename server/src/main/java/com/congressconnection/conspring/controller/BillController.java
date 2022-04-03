package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.Bill;
import com.congressconnection.conspring.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/api/bills")
public class BillController {
    @Autowired
    private BillService billService;

    @GetMapping("/all")
    public ResponseEntity<Page<Bill>> getBills(
            @RequestParam int pageNumber,
            @RequestParam int pageSize
    ) {
        Page<Bill> bills = billService.getAllPaginated(pageNumber, pageSize);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @GetMapping("/house")
    public ResponseEntity<Page<Bill>> getBillsInHouse(
            @RequestParam int pageNumber,
            @RequestParam int pageSize
    ) {
        Page<Bill> bills = billService.getByBillType("HR", pageNumber, pageSize);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @GetMapping("/senate")
    public ResponseEntity<Page<Bill>> getBillsInSenate(
            @RequestParam int pageNumber,
            @RequestParam int pageSize
    ) {
        Page<Bill> bills = billService.getByBillType("S", pageNumber, pageSize);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }
}
