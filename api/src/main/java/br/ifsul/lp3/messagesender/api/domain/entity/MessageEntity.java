package br.ifsul.lp3.messagesender.api.domain.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "message")
public class MessageEntity {

    @Id
    private Long id;

    private String text;

    private LocalDateTime timestamp;

    private boolean isRead;
}
