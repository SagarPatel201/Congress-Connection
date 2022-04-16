package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.FavoriteBills;
import com.congressconnection.conspring.model.FavoritePolitician;
import com.congressconnection.conspring.service.FavoriteBillService;
import com.congressconnection.conspring.service.FavoritePoliticianService;
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
    @Autowired FavoritePoliticianService favoritePoliticiansService;

    @GetMapping("/politicians/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> getFavoritePoliticians(@PathVariable long id) {
        List<FavoritePolitician> favoritePoliticianList = favoritePoliticiansService.getByUserId(id);
        return new ResponseEntity<>(favoritePoliticianList, HttpStatus.OK);
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

    @GetMapping("/bills/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> getFavoriteBills(@PathVariable long id) {
        List<FavoriteBills> favoriteBillsList = favoriteBillService.getByUserId(id);
        return new ResponseEntity<>(favoriteBillsList, HttpStatus.OK);
    }
}
