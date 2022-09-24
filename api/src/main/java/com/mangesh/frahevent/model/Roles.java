package com.mangesh.frahevent.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String roleCode;
    private String roleType;
    private String description;
    @CreationTimestamp
    @Column(updatable = false)
    LocalDateTime createdOn;
    @UpdateTimestamp
    LocalDateTime modifiedOn;
}
