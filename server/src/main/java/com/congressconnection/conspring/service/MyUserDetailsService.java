package com.congressconnection.conspring.service;

import com.congressconnection.conspring.model.UserDetailsImpl;
import com.congressconnection.conspring.model.User;
import com.congressconnection.conspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetailsImpl loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);

            user.orElseThrow(() -> new UsernameNotFoundException("No username found: " + username));

        return user.map(UserDetailsImpl::new).get();
    }

    public List<User> getAllUsers() { return userRepository.findAll(); }

    public User getUserById(long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByUsername(String username) { return userRepository.findByUsername(username).orElse(null); }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public void createUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(String email, User user) {
        userRepository.save(user);
    }

    public void deleteUser(User user) {
        userRepository.delete(user);
    }

}
