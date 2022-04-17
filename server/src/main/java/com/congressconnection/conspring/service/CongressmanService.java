package com.congressconnection.conspring.service;
import com.congressconnection.conspring.enums.Chamber;
import com.congressconnection.conspring.enums.Party;
import com.congressconnection.conspring.enums.State;
import com.congressconnection.conspring.model.Congressman;
import com.congressconnection.conspring.repository.CongressmanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CongressmanService {
    @Autowired
    private CongressmanRepository congressmanRepository;

    public List<Congressman> listAll() {
        return congressmanRepository.findAll();
    }

    public Congressman getById(String id) {
        return congressmanRepository.findById(id).orElse(null);
    }

    public List<Congressman> getByState(State state) {
        return congressmanRepository
                .findAll()
                .stream()
                .filter(congressman -> Objects.equals(congressman.getState(), state))
                .collect(Collectors.toList());
    }

    public List<Congressman> getByChamber(Chamber chamber) {
        return congressmanRepository
                .findAll()
                .stream()
                .filter(congressman -> Objects.equals(congressman.getChamber(), chamber))
                .collect(Collectors.toList());
    }

    public List<Congressman> getByParty(Party party) {
        return congressmanRepository
                .findAll()
                .stream()
                .filter(congressman -> Objects.equals(congressman.getParty(), party))
                .collect(Collectors.toList());
    }
}
