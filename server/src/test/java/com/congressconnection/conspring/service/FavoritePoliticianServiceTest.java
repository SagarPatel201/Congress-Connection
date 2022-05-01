package com.congressconnection.conspring.service;

import com.congressconnection.conspring.model.FavoritePolitician;
import com.congressconnection.conspring.repository.FavoritePoliticianRepository;
import org.junit.gen5.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Example;

import java.util.ArrayList;
import java.util.List;

import static org.junit.gen5.api.Assertions.*;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class FavoritePoliticianServiceTest {

    @Mock
    private FavoritePoliticianRepository repository;

    @InjectMocks
    private FavoritePoliticianService service;

    @BeforeEach
    void setUp(){
        this.service = new FavoritePoliticianService();
    }

    @Test
    public void test_favoriteBill(){
        when(repository.saveAndFlush(Mockito.any(FavoritePolitician.class)))
                .thenAnswer(i -> i.getArguments()[0]);
        service.favoritePolitician(new FavoritePolitician());
    }

    @Test
    public void test_getByUserId(){
        List<FavoritePolitician> list = new ArrayList<>();
        when(repository.findAll()).thenReturn(list);
        assertEquals(service.getByUserId(1), list);
    }

    @Test
    public void test_isFavorite(){
        FavoritePolitician bill = new FavoritePolitician();
        when(repository.exists(Example.of(bill))).thenReturn(true);
        assertTrue(service.isFavorite(bill));
        when(repository.exists(Example.of(bill))).thenReturn(false);
        assertFalse(service.isFavorite(bill));
    }
    @Test
    public void test_removeBill(){
        FavoritePolitician politician = new FavoritePolitician();
        FavoritePoliticianRepository spy = Mockito.spy(repository);
        Mockito.doNothing().when(spy).delete(politician);
        spy.delete(politician);
        service.removePolitician(politician);
    }
}
