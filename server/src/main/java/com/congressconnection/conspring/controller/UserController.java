package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.UserDetailsImpl;
import com.congressconnection.conspring.util.AuthenticationRequest;
import com.congressconnection.conspring.util.AuthenticationResponse;
import com.congressconnection.conspring.model.User;
import com.congressconnection.conspring.service.UserDetailsServiceImpl;
import com.congressconnection.conspring.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/login/")
public class UserController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private UserDetailsServiceImpl userDetailsService;
    @Autowired private JwtUtil jwtTokenUtil;
    @SuppressWarnings("FieldCanBeLocal") private final String USER_DISABLED = "User is disabled";
    @SuppressWarnings("FieldCanBeLocal") private final String INCORRECT_CREDENTIALS = "Incorrect username or password";
    private final String USERNAME_EXISTS = "Username already exists";
    private final String NULL_PASSWORD = "You must enter a password";

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userDetailsService.getAllUsers());
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveUser(@RequestBody User user) {
        if(userDetailsService.existsByUsername(user.getUsername())) { return new ResponseEntity<>(USERNAME_EXISTS, HttpStatus.BAD_REQUEST); }
        if(user.getPassword() == null || user.getPassword().isBlank()) { return new ResponseEntity<>(NULL_PASSWORD, HttpStatus.BAD_REQUEST); }
        user.setActive(true);
        user.setRoles("ROLE_USER");
        String encodedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setPassword(encodedPassword);
        userDetailsService.saveUser(user);
        return new ResponseEntity<>("User saved successfully", HttpStatus.OK);
    }

    @PostMapping("/saveAdmin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveAdmin(@RequestBody User user) {
        if(userDetailsService.existsByUsername(user.getUsername())) { return new ResponseEntity<>(USERNAME_EXISTS, HttpStatus.BAD_REQUEST); }
        if(user.getPassword() == null || user.getPassword().isBlank()) { return new ResponseEntity<>(NULL_PASSWORD, HttpStatus.BAD_REQUEST); }
        user.setActive(true);
        user.setRoles("ROLE_ADMIN");
        String encodedPassword = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setPassword(encodedPassword);
        userDetailsService.saveUser(user);
        return new ResponseEntity<>("Admin saved successfully", HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> getUser(@PathVariable long id) {
        return new ResponseEntity<>(userDetailsService.getUserById(id), HttpStatus.OK);
    }

    @PutMapping("/user/update/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUser(@PathVariable long id) {
        User user = userDetailsService.getUserById(id);
        userDetailsService.updateUser(user);
        return new ResponseEntity<>("Successfully updated user information", HttpStatus.OK);
    }

    @DeleteMapping("/user/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteUser(@PathVariable long id) {
        User userToDelete = userDetailsService.getUserById(id);
        if(userToDelete == null) { return new ResponseEntity<>("ERROR: Unable to delete User ID: '" + id + "' (does not exist)", HttpStatus.BAD_REQUEST); }
        userDetailsService.deleteUser(userToDelete);
        return new ResponseEntity<>("Successfully deleted user with ID:[" + id + "]", HttpStatus.OK);
    }

    @PutMapping("/user/activate/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> activateUser(@PathVariable long id) {
        User userToActivate = userDetailsService.getUserById(id);
        if(userToActivate.isActive()) { return new ResponseEntity<>("Unable to activate user: USER ACTIVE", HttpStatus.BAD_REQUEST); }
        userToActivate.setActive(true);
        userDetailsService.disableUser(userToActivate);
        return new ResponseEntity<>("Successfully disabled user: " + userToActivate, HttpStatus.OK);
    }

    @PutMapping("/user/deactivate/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deactivateUser(@PathVariable long id) {
        User userToDeactivate = userDetailsService.getUserById(id);
        if(!userToDeactivate.isActive()) { return new ResponseEntity<>("Unable to deactivate user: USER INACTIVE", HttpStatus.BAD_REQUEST); }
        userToDeactivate.setActive(false);
        userDetailsService.disableUser(userToDeactivate);
        return new ResponseEntity<>("Successfully disabled user: \n" + userToDeactivate, HttpStatus.OK);
    }

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
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new AuthenticationResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
    }
}
