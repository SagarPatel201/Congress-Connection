package com.congressconnection.conspring.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "committees")
public class Committee {
    @Id
    private String id;
    private String name;
    private String chamber;

    @ManyToMany(mappedBy = "referredToCommittees")
    @JsonIgnore
    private List<Bill> billsInCommittee;
}
