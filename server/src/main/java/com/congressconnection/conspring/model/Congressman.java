package com.congressconnection.conspring.model;

import com.congressconnection.conspring.enums.Chamber;
import com.congressconnection.conspring.enums.Party;
import com.congressconnection.conspring.enums.State;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "politicians")
@Getter
public class Congressman {
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "chamber")
    @Enumerated(EnumType.STRING)
    private Chamber chamber;
    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private State state;
    @Column(name = "district")
    private int district;
    @Column(name = "party")
    @Enumerated(EnumType.STRING)
    private Party party;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "in_office")
    private boolean inOffice;
    @Column(name = "address")
    private String address;
    @Column(name = "phone")
    private String phone;
    @Column(name = "contact_link")
    private String contactLink;
    @Column(name = "reelection_date")
    private String reelectionDate;
}
