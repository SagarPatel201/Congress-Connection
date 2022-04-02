package com.congressconnection.conspring.model;

import java.util.List;

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
    public String getJwt() { return jwt; }
}
