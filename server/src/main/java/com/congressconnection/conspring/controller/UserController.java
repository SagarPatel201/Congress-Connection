package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.User;
import com.congressconnection.conspring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @RequestMapping("/users")
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }
}
