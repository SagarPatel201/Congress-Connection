package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.enums.Chamber;
import com.congressconnection.conspring.enums.State;
import com.congressconnection.conspring.model.Congressman;
import com.congressconnection.conspring.service.CongressmanService;
import org.junit.gen5.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.gen5.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class CongressmanControllerTest {

    @Mock
    private CongressmanService service;
    @InjectMocks
    private CongressmanController controller;

    @BeforeEach
    void setUp(){
        this.controller = new CongressmanController();
    }

    @Test
    public void test_getCongressmen(){
        Optional<State> pararam1  = Optional.empty();
        Optional<Chamber> pararam2  = Optional.empty();
        Optional<Integer> pararam3  = Optional.empty();
        List<Congressman> list = new ArrayList<>();
        when(service.listAll()).thenReturn(list);
        ResponseEntity<List<Congressman>> responseEntity = controller.getCongressmen(
                pararam1,
                pararam2,
                pararam3
        );
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }
}
