package com.congressconnection.conspring.service;

import com.congressconnection.conspring.model.Bill;
import com.congressconnection.conspring.repository.BillRepository;
import org.junit.gen5.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import static org.junit.gen5.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class BillServiceTest {

    @Mock
    private BillRepository repository;

    @InjectMocks
    private BillService service;

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
        this.service = new BillService();
    }

    @Test
    public void test_getAllPaginated(){
        PageRequest pageRequest = PageRequest.of(1, 1);
        when(repository.findAll(pageRequest)).thenReturn((Page<Bill>) page);
        Page<Bill> returnVal = service.getAllPaginated(1,1);
        assertTrue(returnVal != null);
    }

    @Test
    public void test_getByBillType(){
        PageRequest pageRequest = PageRequest.of(1, 1);
        when(repository.findByBillType("HR",pageRequest)).thenReturn((Page<Bill>) page);
        Page<Bill> returnVal = service.getByBillType("HR", 1,1);
        assertTrue(returnVal != null);
    }
    @Test
    public void test_getByBillNumber(){
        PageRequest pageRequest = PageRequest.of(1, 1);
        when(repository.findByBillTypeAndBillNumber("HR",1)).thenReturn((Optional.of(new Bill())));
        Bill returnVal = service.getByBillNumber(1, "HR");
        assertTrue(returnVal != null);
    }

    @Test
    public void test_getByOriginChamberAndBillNumber(){
        PageRequest pageRequest = PageRequest.of(1, 1);
        when(repository.findByBillTypeAndBillNumber("HR",1)).thenReturn((Optional.empty()));
        Optional<Bill> returnVal = service.getByOriginChamberAndBillNumber("HR", 1);
        assertTrue(returnVal.isEmpty());
    }

}
