package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.enums.Chamber;
import com.congressconnection.conspring.enums.Party;
import com.congressconnection.conspring.enums.State;
import com.congressconnection.conspring.model.Congressman;
import com.congressconnection.conspring.service.CongressmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@Validated
@CrossOrigin
@RequestMapping("/api")
public class CongressmanController {
    @Autowired
    CongressmanService congressmanService;

    @GetMapping("/congressmen")
    public ResponseEntity<List<Congressman>> getCongressmen(
            @RequestParam Optional<State> state,
            @RequestParam Optional<Chamber> chamber,
            @RequestParam Optional<Integer> district,
            @RequestParam Optional<Party> party
    ) {
        List<Congressman> congressmen = congressmanService
                .listAll()
                .stream()
                .filter(congressman ->
                        Objects.equals(congressman.getState(), state.orElse(congressman.getState())) &&
                        Objects.equals(congressman.getParty(), party.orElse(congressman.getParty())) &&
                        Objects.equals(congressman.getChamber(), chamber.orElse(congressman.getChamber())) &&
                        congressman.getDistrict() == district.orElse(congressman.getDistrict()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(congressmen, HttpStatus.OK);
    }

}
