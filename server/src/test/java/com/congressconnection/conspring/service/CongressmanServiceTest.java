package com.congressconnection.conspring.service;

import com.congressconnection.conspring.model.Congressman;
import com.congressconnection.conspring.repository.CongressmanRepository;
import org.junit.gen5.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.gen5.api.Assertions.assertEquals;
import static org.junit.gen5.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class CongressmanServiceTest {

    @Mock
    private CongressmanRepository repository;

    @InjectMocks
    private CongressmanService service;


    @BeforeEach
    void setUp(){
        this.service = new CongressmanService();
    }

    @Test
    public void test_listAll(){
        List<Congressman> list = new ArrayList<>();
        when(repository.findAll()).thenReturn(list);
        List<Congressman> returnVal = service.listAll();
        assertEquals(list, returnVal);
    }

    @Test
    public void test_getById(){
        when(repository.findById("ID")).thenReturn(Optional.of(new Congressman()));
        Congressman congressman = service.getById("ID");
        assertTrue(congressman != null);
    }

    @Test
    public void test_getByState(){
        List<Congressman> list = new ArrayList<>();
        when(repository.findAll()).thenReturn(list);
        List<Congressman> returnVal = service.getByState("NJ");
        assertEquals(list, returnVal);
    }

    @Test
    public void test_getByChamber(){
        List<Congressman> list = new ArrayList<>();
        when(repository.findAll()).thenReturn(list);
        List<Congressman> returnVal = service.getByChamber("NJ");
        assertEquals(list, returnVal);
    }

}
