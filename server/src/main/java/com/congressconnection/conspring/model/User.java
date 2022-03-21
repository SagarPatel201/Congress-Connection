package com.congressconnection.conspring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Table(name = "users")
@Getter @Setter
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) long id;
    private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) private String password;
    private String roles;
    private boolean active;

    public String toString() { return "Username: " + username + "\nRole(s): " + roles + "\nStatus: " + isActive(); }
}
