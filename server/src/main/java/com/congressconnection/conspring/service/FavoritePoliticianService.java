package com.congressconnection.conspring.service;

import com.congressconnection.conspring.model.FavoritePolitician;
import com.congressconnection.conspring.repository.FavoritePoliticianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class FavoritePoliticianService {
    @Autowired FavoritePoliticianRepository favoritePoliticianRepository;

    public void favoritePolitician(FavoritePolitician favoritePolitician) { favoritePoliticianRepository.saveAndFlush(favoritePolitician); }

    public List<FavoritePolitician> getByUserId(long id) {
        return favoritePoliticianRepository
                .findAll()
                .stream()
                .filter(favoritePolitician -> Objects.equals(favoritePolitician.getUserId(), id))
                .collect(Collectors.toList());
    }

    public boolean isFavorite(FavoritePolitician favoritePolitician) {
        return favoritePoliticianRepository.exists(Example.of(favoritePolitician));
    }

    public void removePolitician(FavoritePolitician favoritePolitician) {
        favoritePoliticianRepository.delete(favoritePolitician);
    }
}
