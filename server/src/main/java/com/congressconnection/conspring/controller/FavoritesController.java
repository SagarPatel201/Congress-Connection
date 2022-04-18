package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.Bill;
import com.congressconnection.conspring.model.Congressman;
import com.congressconnection.conspring.model.FavoriteBills;
import com.congressconnection.conspring.model.FavoritePolitician;
import com.congressconnection.conspring.service.BillService;
import com.congressconnection.conspring.service.CongressmanService;
import com.congressconnection.conspring.service.FavoriteBillService;
import com.congressconnection.conspring.service.FavoritePoliticianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/favorites")
public class FavoritesController {

    @Autowired FavoriteBillService favoriteBillService;
    @Autowired FavoritePoliticianService favoritePoliticiansService;
    @Autowired CongressmanService politicianService;
    @Autowired BillService billService;

    @GetMapping("/politicians/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> getFavoritePoliticians(@PathVariable long id) {
        List<FavoritePolitician> favoritePoliticianList = favoritePoliticiansService.getByUserId(id);
        List<Congressman> politicianList = new ArrayList<>();
        for(int i = 0; i < favoritePoliticianList.size(); i++) {
            politicianList.add(politicianService.getById(favoritePoliticianList.get(i).getPoliticianId()));
        }
        return new ResponseEntity<>(politicianList, HttpStatus.OK);
    }

    @GetMapping("/bills/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> getFavoriteBills(@PathVariable long id) {
        List<FavoriteBills> favoriteBillsList = favoriteBillService.getByUserId(id);
        List<Bill> billList = new ArrayList<>();
        for(int i = 0; i < favoriteBillsList.size(); i++) {
            billList.add(billService.getByBillNumber(favoriteBillsList.get(i).getBillNumber(),
                    favoriteBillsList.get(i).getBillType()));
        }

        return new ResponseEntity<>(billList, HttpStatus.OK);
    }

    @PostMapping("/politician")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> favoritePolitician(@RequestBody FavoritePolitician favoritePolitician) {
        if(favoritePolitician.emptyParam()) return new ResponseEntity<>("Missing a parameter in body", HttpStatus.BAD_REQUEST);
        if(favoritePoliticiansService.isFavorite(favoritePolitician))
            return new ResponseEntity<>("Already a favorite politician", HttpStatus.BAD_REQUEST);

        favoritePoliticiansService.favoritePolitician(favoritePolitician);
        return new ResponseEntity<>("Favorite politician successful", HttpStatus.OK);
    }

    @PostMapping("/bill")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> favoriteBill(@RequestBody FavoriteBills favoriteBill) {
        if(favoriteBill.emptyParam()) return new ResponseEntity<>("Missing a parameter in body", HttpStatus.BAD_REQUEST);
        if(favoriteBillService.isFavorite(favoriteBill))
            return new ResponseEntity<>("Already a favorite bill", HttpStatus.BAD_REQUEST);

        favoriteBillService.favoriteBill(favoriteBill);
        return new ResponseEntity<>("Favorite successful", HttpStatus.OK);
    }

    @DeleteMapping("/remove/bill")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> removeFavoriteBill(@RequestBody FavoriteBills favoriteBill) {
        if(!favoriteBillService.isFavorite(favoriteBill))
            return new ResponseEntity<>("ERROR: Unable to unfavorite a bill that is not favorited", HttpStatus.BAD_REQUEST);

        favoriteBillService.removeBill(favoriteBill);
        return new ResponseEntity<>("Removed bill from favorites", HttpStatus.OK);
    }

    @DeleteMapping("/remove/politician")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> removeFavoritePolitician(@RequestBody FavoritePolitician favoritePolitician) {
        if(!favoritePoliticiansService.isFavorite(favoritePolitician))
            return new ResponseEntity<>("ERROR: Unable to unfavorite a politician that is not favorited", HttpStatus.BAD_REQUEST);

        favoritePoliticiansService.removePolitician(favoritePolitician);
        return new ResponseEntity<>("Removed politician from favorites", HttpStatus.OK);
    }
}
