package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.AuthenticationRequest;
import com.congressconnection.conspring.model.AuthenticationResponse;
import com.congressconnection.conspring.model.UserDetailsImpl;
import com.congressconnection.conspring.model.User;
import com.congressconnection.conspring.service.UserDetailsServiceImpl;
import com.congressconnection.conspring.util.JwtUtil;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/login/")
public class UserController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserDetailsServiceImpl userDetailsService;
    @Autowired private JwtUtil jwtTokenUtil;
    private final String USER_DISABLED = "User is disabled";
    private final String INCORRECT_CREDENTIALS = "Incorrect username or password";
    private final String USERNAME_EXISTS = "Username already exists";
    private final String NULL_PASSWORD = "You must enter a password";

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userDetailsService.getAllUsers());
    }

    @PostMapping("/save")
    public String saveUser(@RequestBody User user) {
        if(userDetailsService.existsByUsername(user.getUsername())) { return USERNAME_EXISTS; }
        if(user.getPassword() == null) { return NULL_PASSWORD; }
        userDetailsService.saveUser(user);
        return "User saved";
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable long id) {
        return userDetailsService.getUserById(id);
    }

    @PutMapping("/user/{role}/{id}")
    public String deactivateUser(@PathVariable String role, @PathVariable long id) {
        User userToDeactivate = userDetailsService.getUserById(id);
        if(!userToDeactivate.isActive()) { return "Unable to deactivate user: USER INACTIVE"; }
        userDetailsService.disableUser(id);
        return "Successfully disabled user: " + userToDeactivate;
    }

    @RequestMapping("/test")
    public String testString() { return "test 123"; }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()));
        }
        catch (DisabledException e) {
            throw new Exception(USER_DISABLED, e);
        }
        catch (BadCredentialsException e) {
            throw new Exception(INCORRECT_CREDENTIALS, e);
        }
        final UserDetailsImpl userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }
}
