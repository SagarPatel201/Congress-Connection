package com.congressconnection.conspring.model;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "politicians")
@Getter
public class Congressman {
    @Id @Column(name = "id") private String id;
    @Column(name = "chamber") private String chamber;
    @Column(name = "state") private String state;
    @Column(name = "district") private int district;
    @Column(name = "first_name") private String firstName;
    @Column(name = "last_name") private String lastName;
    @Column(name = "in_office") private boolean inOffice;
    @Column(name = "address") private String address;
    @Column(name = "phone") private String phone;
    @Column(name = "contact_link") private String contactLink;
    @Column(name = "reelection_date") private String reelectionDate;
}
