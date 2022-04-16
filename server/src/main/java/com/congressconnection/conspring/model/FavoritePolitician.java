package com.congressconnection.conspring.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "favoritepoliticians")
@IdClass(FavoritePoliticianPK.class)
@Getter @Setter
public class FavoritePolitician {
    @Id @Column(name = "politician_id") private String politicianId;
    @Id @Column(name = "user_id") private long userId;

    public boolean emptyParam() {
        if(politicianId.isBlank() || politicianId == null || userId == 0) return true;
        return false;
    }
}
