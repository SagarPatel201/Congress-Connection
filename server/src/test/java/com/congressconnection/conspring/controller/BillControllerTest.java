package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.Bill;
import com.congressconnection.conspring.service.BillService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.function.Function;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.gen5.api.Assertions.assertEquals;
import static org.mockito.BDDMockito.given;

@RunWith(SpringRunner.class)
@WebMvcTest(BillController.class)
public class BillControllerTest {

    @Autowired
    private MockMvc mvc;

    private BillController controller;

    @MockBean
    private BillService service;
    /*
        @GetMapping("/all")
    public ResponseEntity<Page<Bill>> getBills(
            @RequestParam int pageNumber,
            @RequestParam int pageSize
    ) {
        Page<Bill> bills = billService.getAllPaginated(pageNumber, pageSize);
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }
     */
    @Test
    public void test_getAllBills(){
        Page<Bill> allBills = new Page<Bill>() {
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
        given(service.getAllPaginated(1,1)).willReturn(allBills);
        ResponseEntity<Page<Bill>> responseEntity = controller.getBills(1,1);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }
}
