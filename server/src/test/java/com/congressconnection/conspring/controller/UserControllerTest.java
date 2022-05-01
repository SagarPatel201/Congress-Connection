package com.congressconnection.conspring.controller;

import com.congressconnection.conspring.model.User;
import com.congressconnection.conspring.model.UserDetailsImpl;
import com.congressconnection.conspring.service.UserDetailsServiceImpl;
import com.congressconnection.conspring.util.AuthenticationRequest;
import com.congressconnection.conspring.util.JwtUtil;
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

import java.util.List;

import static org.junit.gen5.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {

    @Mock private AuthenticationManager authenticationManager;
    @Mock private UserDetailsServiceImpl userDetailsService;
    @Mock private JwtUtil jwtUtil;
    @InjectMocks private UserController controller;

    @BeforeEach
    void setUp() { this.controller = new UserController(); }

    @Test
    void test_canGetUsers() {
        List<User> users = userDetailsService.getAllUsers();
        when(userDetailsService.getAllUsers()).thenReturn(users);
        ResponseEntity<List<User>> responseEntity = controller.getUsers();
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void test_canSaveUser() {
        User testUser = new User();
        testUser.setUsername("test123");
        testUser.setActive(true);
        testUser.setRoles("ROLE_USER");
        testUser.setPassword(new BCryptPasswordEncoder().encode("testpass"));
        when(userDetailsService.existsByUsername(testUser.getUsername())).thenReturn(false);
        ResponseEntity<?> responseEntity = controller.saveUser(testUser);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void test_canSaveAdmin() {
        User testUser = new User();
        testUser.setUsername("testadmin");
        testUser.setActive(true);
        testUser.setRoles("ROLE_ADMIN");
        testUser.setPassword(new BCryptPasswordEncoder().encode("testpass"));
        when(userDetailsService.existsByUsername(testUser.getUsername())).thenReturn(false);
        ResponseEntity<?> responseEntity = controller.saveAdmin(testUser);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void test_canGetUser() {
        int adminID = 1;
        User user = new User(adminID, "admin", "$2a$10$ZnZT1MNY/444Dx1BXbYv/eUVt7G5dmx80.dbfSx7I.QAvGFWR51t2", "ROLE_USER", true);
        when(userDetailsService.getUserById(adminID)).thenReturn(user);
        ResponseEntity<?> responseEntity = controller.getUser(adminID);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void test_canActivateUser() {
        int userID = 11;
        User user = new User(userID, "inactiveUser", "$2a$10$ZnZT1MNY/444Dx1BXbYv/eUVt7G5dmx80.dbfSx7I.QAvGFWR51t2", "ROLE_USER", false);
        when(userDetailsService.getUserById(userID)).thenReturn(user);
        ResponseEntity<?> responseEntity = controller.activateUser(userID);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void test_canDeactivateUser() {
        int userID = 1;
        User user = new User(userID, "admin", "$2a$10$ZnZT1MNY/444Dx1BXbYv/eUVt7G5dmx80.dbfSx7I.QAvGFWR51t2", "ROLE_ADMIN", true);
        when(userDetailsService.getUserById(userID)).thenReturn(user);
        ResponseEntity<?> responseEntity = controller.deactivateUser(userID);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }

    @Test
    void test_canCreateAuthenticationToken() throws Exception {
        AuthenticationRequest authenticationRequest = new AuthenticationRequest("admin", "password");
        User user = new User(1, "admin", "$2a$10$ZnZT1MNY/444Dx1BXbYv/eUVt7G5dmx80.dbfSx7I.QAvGFWR51t2", "ROLE_ADMIN", true);
        UserDetailsImpl userDetails = new UserDetailsImpl(user);
        when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                authenticationRequest.getPassword()))).thenReturn(null);
        when(userDetailsService.loadUserByUsername(authenticationRequest.getUsername())).thenReturn(userDetails);
        String jwt = jwtUtil.generateToken(userDetails);
        when(jwtUtil.generateToken(userDetails)).thenReturn(jwt);
        ResponseEntity<?> responseEntity = controller.createAuthenticationToken(authenticationRequest);
        assertEquals(responseEntity.getStatusCode(), HttpStatus.OK);
    }
}