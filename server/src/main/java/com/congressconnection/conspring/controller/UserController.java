package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.User;
import com.congressconnection.conspring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }
    /*@GetMapping("/users")
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }*/
}
