package com.congressconnection.conspring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class User {
    @Id String username;
    @JsonIgnore private String password;
    private 

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
