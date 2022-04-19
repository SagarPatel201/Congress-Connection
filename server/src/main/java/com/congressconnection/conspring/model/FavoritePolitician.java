package com.congressconnection.conspring.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "favoritepoliticians")
@IdClass(FavoritePoliticianPK.class)
@Getter @Setter
public class FavoritePolitician {
    @Id @Column(name = "politician_id") private String politicianId;
    @Id @Column(name = "user_id") private long userId;

    public boolean emptyParam() {
        return politicianId == null || politicianId.isBlank() || userId == 0;
    }
}
