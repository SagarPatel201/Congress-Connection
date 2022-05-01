package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.FavoriteBills;
import com.congressconnection.conspring.model.FavoritePolitician;
import com.congressconnection.conspring.service.BillService;
import com.congressconnection.conspring.service.CongressmanService;
import com.congressconnection.conspring.service.FavoriteBillService;
import com.congressconnection.conspring.service.FavoritePoliticianService;
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

import static org.junit.gen5.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class FavoritesControllerTest {

    @Mock private FavoriteBillService favoriteBillService;
    @Mock private FavoritePoliticianService favoritePoliticianService;
    @Mock private CongressmanService politicianService;
    @Mock private BillService billService;
    @InjectMocks FavoritesController controller;

    @BeforeEach
    void setUp() {
        this.controller = new FavoritesController();
    }

    @Test
    void test_getFavoritePoliticians() {
        List<FavoritePolitician> favoritePoliticianList = new ArrayList<>();
        when(favoritePoliticianService.getByUserId(1)).thenReturn(favoritePoliticianList);
        ResponseEntity<?> responseEntity = controller.getFavoritePoliticians(1);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void getFavoriteBills() {
        List<FavoriteBills> favoriteBillsList = new ArrayList<>();
        when(favoriteBillService.getByUserId(1)).thenReturn(favoriteBillsList);
        ResponseEntity<?> responseEntity = controller.getFavoriteBills(1);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void favoritePolitician() {
        FavoritePolitician politician = new FavoritePolitician();
        politician.setPoliticianId("AK0");
        politician.setUserId(1);
        when(favoritePoliticianService.isFavorite(politician)).thenReturn(false);
        ResponseEntity<?> responseEntity = controller.favoritePolitician(politician);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void favoriteBill() {
        FavoriteBills bills = new FavoriteBills();
        bills.setBillNumber(1);
        bills.setBillType("HR");
        bills.setUserId(1);
        when(favoriteBillService.isFavorite(bills)).thenReturn(false);
        ResponseEntity<?> responseEntity = controller.favoriteBill(bills);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void removeFavoriteBill() {
        FavoriteBills bills = new FavoriteBills();
        when(favoriteBillService.isFavorite(bills)).thenReturn(true);
        ResponseEntity<?> responseEntity = controller.removeFavoriteBill(bills);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void removeFavoritePolitician() {
        FavoritePolitician politician = new FavoritePolitician();
        when(favoritePoliticianService.isFavorite(politician)).thenReturn(true);
        ResponseEntity<?> responseEntity = controller.removeFavoritePolitician(politician);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }
}