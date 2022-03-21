package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.AuthenticationRequest;
import com.congressconnection.conspring.model.AuthenticationResponse;
import com.congressconnection.conspring.model.MyUserDetails;
import com.congressconnection.conspring.model.User;
import com.congressconnection.conspring.service.MyUserDetailsService;
import com.congressconnection.conspring.service.UserService;
import com.congressconnection.conspring.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
public class UserController {
    @Autowired private UserService userService;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private MyUserDetailsService userDetailsService;
    @Autowired private JwtUtil jwtTokenUtil;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }
    /*@GetMapping("/users")
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }*/

    @RequestMapping("/test")
    public String testString() { return "test 123"; }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()));
        }
        catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }
        final MyUserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
