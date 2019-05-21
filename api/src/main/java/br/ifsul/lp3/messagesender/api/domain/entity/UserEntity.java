package br.ifsul.lp3.messagesender.api.domain.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String password;

    private String imageUrl;
}
