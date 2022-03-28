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
    private String first_name;
    private String last_name;
    private String address;
    private String phone;
    private String contact_link;
    private String reelection_date;
}
