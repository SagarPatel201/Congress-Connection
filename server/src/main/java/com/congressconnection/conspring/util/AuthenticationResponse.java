package com.congressconnection.conspring.util;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AuthenticationResponse {
    private final String jwt;
    private final long id;
    private final String username;
    private final List<String> roles;


    public AuthenticationResponse(String jwt, long id, String username, List<String> roles) {
        this.jwt = jwt;
        this.id = id;
        this.username = username;
        this.roles = roles;
    }

}
