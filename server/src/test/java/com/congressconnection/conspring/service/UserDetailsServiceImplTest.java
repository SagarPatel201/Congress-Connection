package com.congressconnection.conspring.service;

import com.congressconnection.conspring.model.User;
import com.congressconnection.conspring.repository.UserRepository;
import org.junit.gen5.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.gen5.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)
public class UserDetailsServiceImplTest {
    @Mock
    private UserRepository repository;

    @InjectMocks
    private UserDetailsServiceImpl service;

    @BeforeEach
    void setUp() {
        this.service = new UserDetailsServiceImpl();
    }

    @Test
    public void test_loadUserByUsername() {
        User user = new User();
        user.setRoles("ROLE_ADMIN");
        when(repository.findByUsername("admin")).thenReturn(Optional.of(user));
        service.loadUserByUsername("admin");
    }

    @Test
    public void test_getAllUsers() {
        List<User> list = new ArrayList<>();
        when(repository.findAll()).thenReturn(list);
        assertEquals(service.getAllUsers(), list);
    }

    @Test
    public void test_getUserById() {
        User user = new User();
        user.setRoles("ROLE_ADMIN");
        when(repository.findById(1L)).thenReturn(Optional.of(user));
        assertEquals(service.getUserById(1L), user);
    }

    @Test
    public void test_existsByUsername() {
        when(repository.existsByUsername("admin")).thenReturn(true);
        assertTrue(service.existsByUsername("admin"));
        when(repository.existsByUsername("admin")).thenReturn(false);
        assertFalse(service.existsByUsername("admin"));
    }

    @Test
    public void test_saveUser() {
        User user = new User();
        user.setRoles("ROLE_ADMIN");
        when(repository.save(user)).thenReturn(user);
        service.saveUser(user);
    }

    @Test
    public void test_disableUser() {
        User user = new User();
        user.setRoles("ROLE_ADMIN");
        when(repository.saveAndFlush(user)).thenReturn(user);
        service.disableUser(user);
    }


    @Test
    public void test_updateUser() {
        User user = new User();
        user.setRoles("ROLE_ADMIN");
        when(repository.saveAndFlush(user)).thenReturn(user);
        service.updateUser(user);
    }

    @Test
    public void test_deleteUser() {
        User user = new User();
        user.setRoles("ROLE_ADMIN");
        doNothing().when(repository).delete(user);
        service.deleteUser(user);
    }
}