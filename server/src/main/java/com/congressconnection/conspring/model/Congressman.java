package com.congressconnection.conspring.model;
import lombok.Getter;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "politicians")
@Getter
public class Congressman {
    @Id private String id;
    private String chamber;
    private String state;
    private String district;
    private String firstName;
    private String lastName;
    private boolean inOffice;
    private String address;
    private String phone;
    private String contactLink;
    private String reelectionDate;
}
