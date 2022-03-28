package com.congressconnection.conspring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) long id;
    private String username;
    @JsonIgnore private String password;
    private String roles;
    private boolean active;
}
