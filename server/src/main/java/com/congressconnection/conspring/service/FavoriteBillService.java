package com.congressconnection.conspring.service;

import com.congressconnection.conspring.model.FavoriteBills;
import com.congressconnection.conspring.repository.FavoriteBillsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class FavoriteBillService {
    @Autowired
    FavoriteBillsRepository favoriteBillsRepository;

    public void favoriteBill(FavoriteBills favoriteBill) { favoriteBillsRepository.saveAndFlush(favoriteBill); }

    public List<FavoriteBills> getByUserId(long id) {
        return favoriteBillsRepository
                .findAll()
                .stream()
                .filter(favoriteBills -> Objects.equals(favoriteBills.getUserId(), id))
                .collect(Collectors.toList());
    }

    public boolean isFavorite(FavoriteBills favoriteBill) {
        if(favoriteBillsRepository.exists(Example.of(favoriteBill))) { return true; }
        return false;
    }
}
