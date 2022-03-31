package com.congressconnection.conspring.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "bills")
@IdClass(BillId.class)
public class Bill {
    @Id int billNumber;
    public Date updateDate;
    @Id public String billType;
    public Date introducedDate;
    public int congress;
    public String title;
    public String policyArea;
}
