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

    @ManyToMany(cascade = {
        CascadeType.PERSIST,
        CascadeType.MERGE
    })
    @JoinTable(name = "user_groups",
            joinColumns =@JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "group_id"
    ))
    private Set<Group> userGroups= new HashSet<>();

    public Set<Group> getUserGroups() {
        return userGroups;
    }

    public void setUserGroups(Set<Group> userGroups) {
        this.userGroups = userGroups;
    }
}
