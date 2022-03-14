package com.example.demo.user;

import javax.annotation.processing.Generated;
import javax.persistence.*;

@Entity
@Table(name = "user_info_and_faves")
public class User {

    @Id private String email;
    private boolean admin;
    private String politician_bill_id;

    public User() { }
    public User(String email, boolean admin, String politician_bill_id) {
        this.email = email;
        this.admin = admin;
        this.politician_bill_id = politician_bill_id;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public boolean isAdmin() {
        return admin;
    }
    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
    public String getPolitician_bill_id() {
        return politician_bill_id;
    }
    public void setPolitician_bill_id(String politician_bill_id) {
        this.politician_bill_id = politician_bill_id;
    }

}
