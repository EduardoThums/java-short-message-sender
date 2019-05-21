package br.ifsul.lp3.messagesender.api.domain.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "user_message")
public class UserMessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long messageId;

    private Long userSenderId;

    private Long userReceiverId;
}
