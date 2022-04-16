package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.FavoriteBills;
import com.congressconnection.conspring.service.FavoriteBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/favorites")
public class FavoritesController {

    @Autowired FavoriteBillService favoriteBillService;
    //@Autowired FavoritePoliticiansService favoritePoliticiansService;

    @PostMapping("/politician/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> favoritePolitician(@PathVariable long id) {
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PostMapping("/save/bill")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> favoriteBill(@RequestBody FavoriteBills favoriteBill) {
        if(favoriteBill.emptyParam()) return new ResponseEntity<>("Missing a parameter in body", HttpStatus.BAD_REQUEST);
        if(favoriteBillService.isFavorite(favoriteBill))
            return new ResponseEntity<>("Already a favorite bill", HttpStatus.BAD_REQUEST);

        favoriteBillService.favoriteBill(favoriteBill);
        return new ResponseEntity<>("Favorite successful", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> getFavoriteBills(@PathVariable long id) {
        List<FavoriteBills> favoriteBillsList = favoriteBillService.getByUserId(id);
        return new ResponseEntity<>(favoriteBillsList, HttpStatus.OK);
    }
}
