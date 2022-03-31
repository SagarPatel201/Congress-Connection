package com.congressconnection.conspring.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "committees")
public class Committee {
    @Id private String id;
    private String name;
    private String chamber;

    @ManyToMany(mappedBy = "referredToCommittees")
    private List<Bill> billsInCommittee;
}
