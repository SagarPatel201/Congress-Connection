package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.Bill;
import com.congressconnection.conspring.service.BillService;
import org.junit.gen5.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Iterator;
import java.util.List;
import java.util.function.Function;

import static org.junit.gen5.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class BillControllerTest {

    @Mock
    private BillService service;
    @InjectMocks
    private BillController controller;

    Page<Bill> page = new Page<Bill>() {
        @Override
        public int getTotalPages() {
            return 0;
        }

        @Override
        public long getTotalElements() {
            return 0;
        }

        @Override
        public <U> Page<U> map(Function<? super Bill, ? extends U> converter) {
            return null;
        }

        @Override
        public int getNumber() {
            return 0;
        }

        @Override
        public int getSize() {
            return 0;
        }

        @Override
        public int getNumberOfElements() {
            return 0;
        }

        @Override
        public List<Bill> getContent() {
            return null;
        }

        @Override
        public boolean hasContent() {
            return false;
        }

        @Override
        public Sort getSort() {
            return null;
        }

        @Override
        public boolean isFirst() {
            return false;
        }

        @Override
        public boolean isLast() {
            return false;
        }

        @Override
        public boolean hasNext() {
            return false;
        }

        @Override
        public boolean hasPrevious() {
            return false;
        }

        @Override
        public Pageable nextPageable() {
            return null;
        }

        @Override
        public Pageable previousPageable() {
            return null;
        }

        @Override
        public Iterator<Bill> iterator() {
            return null;
        }
    };

    @BeforeEach
    void setUp(){
        this.controller = new BillController();
    }

    @Test
    public void test_getAllBills(){
        when(service.getAllPaginated(1,1)).thenReturn(page);
        ResponseEntity<Page<Bill>> responseEntity = controller.getBills(1,1);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void test_getBillsInHouse(){
        when(service.getByBillType("HR", 1, 1)).thenReturn(page);
        ResponseEntity<Page<Bill>> responseEntity = controller.getBillsInHouse(1,1);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void test_getBillsInSenate(){
        when(service.getByBillType("S", 1, 1)).thenReturn(page);
        ResponseEntity<Page<Bill>> responseEntity = controller.getBillsInSenate(1,1);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

}
