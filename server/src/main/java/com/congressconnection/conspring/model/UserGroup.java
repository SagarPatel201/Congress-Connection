package main.java.com.congressconnection.conspring.model;

@Entity
@Table(name = "principle_groups")
public class Group{
    
    //removed getter and setter to save space
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;
    private String name;

    @ManyToMany(mappedBy = "userGroups")
    private Set<UserEntity> users;
}