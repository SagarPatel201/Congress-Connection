package com.congressconnection.conspring.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "favoritebills")
@IdClass(FavoriteBillsPK.class)
@Getter @Setter
public class FavoriteBills {
    @Id @Column(name = "bill_number") private int billNumber;
    @Id @Column(name = "bill_type") private String billType;
    @Id @Column(name = "user_id") private long userId;

    public boolean emptyParam() {
        if(billNumber == 0 || billType.isBlank() || billType==null || userId == 0) return true;
        return false;
    }
}
