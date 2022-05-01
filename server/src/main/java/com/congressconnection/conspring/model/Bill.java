package com.congressconnection.conspring.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "bills")
@IdClass(BillId.class)
public class Bill {
    @Id
    @Column(name = "bill_number")
    private int billNumber;
    @Column(name = "update_date")
    private Date updateDate;
    @Column(name = "bill_type")
    @Id
    private String billType;
    @Column(name = "introduced_date")
    private Date introducedDate;
    @Column(name = "congress")
    private int congress;
    @Column(name = "title")
    private String title;
    @Column(name = "policy_area")
    private String policyArea;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "billcommittee",
            joinColumns = {
                    @JoinColumn(name = "bill_type", referencedColumnName = "bill_type"),
                    @JoinColumn(name = "bill_number", referencedColumnName = "bill_number")
            },
            inverseJoinColumns = @JoinColumn(name = "committee_id", referencedColumnName = "id")
    )
    private List<Committee> referredToCommittees;
}
