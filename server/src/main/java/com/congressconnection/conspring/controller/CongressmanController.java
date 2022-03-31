package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.Congressman;
import com.congressconnection.conspring.service.CongressmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CongressmanController {
    @Autowired
    CongressmanService congressmanService;

    @GetMapping("/congressmen")
    public ResponseEntity<List<Congressman>> getCongressmen(
            @RequestParam Optional<String> state,
            @RequestParam Optional<String> chamber,
            @RequestParam Optional<Integer> district
    ) {
        List<Congressman> congressmen = congressmanService
                .listAll()
                .stream()
                .filter(congressman ->
                        Objects.equals(congressman.getState(), state.orElse(congressman.getState())) &&
                        Objects.equals(congressman.getChamber(), chamber.orElse(congressman.getChamber())) &&
                        congressman.getDistrict() == district.orElse(congressman.getDistrict()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(congressmen, HttpStatus.OK);
    }

}
