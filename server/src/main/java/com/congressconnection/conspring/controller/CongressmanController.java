package com.congressconnection.conspring.controller;
import com.congressconnection.conspring.model.Congressman;
import com.congressconnection.conspring.service.CongressmanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/congressmen")
public class CongressmanController {
    @Autowired
    CongressmanService congressmanService;

    @GetMapping("/all")
    public ResponseEntity<List<Congressman>> listAllCongressmen() {
        List<Congressman> congressmen = congressmanService.listAll();
        return new ResponseEntity<>(congressmen, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Congressman> getCongressmanById(String id) {
        Congressman congressman = congressmanService.getById(id);
        return congressman != null ? new ResponseEntity<>(congressman, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/find/{state}")
    public ResponseEntity<List<Congressman>> getCongressmenByState(String state) {
        List<Congressman> congressmen = congressmanService.getByState(state);
        return congressmen != null ? new ResponseEntity<>(congressmen, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/find/{chamber}")
    public ResponseEntity<List<Congressman>> getCongressmenByChamber(String chamber) {
        List<Congressman> congressmen = congressmanService.getByChamber(chamber);
        return congressmen != null ? new ResponseEntity<>(congressmen, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
