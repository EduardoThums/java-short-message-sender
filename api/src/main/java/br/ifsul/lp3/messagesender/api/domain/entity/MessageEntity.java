package br.ifsul.lp3.messagesender.api.domain.entity;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.Instant;

@Data
@Entity
@Table(name = "message")
@SequenceGenerator(name = "message_sequence", sequenceName = "message_sequence", allocationSize = 1)
public class MessageEntity {

    @Id
    @GeneratedValue(generator = "message_sequence", strategy = GenerationType.SEQUENCE)
    private Long id;

    private String text;

    private String subject;

    @CreatedDate
    @Column(updatable = false)
    private Instant createdDate = Instant.now();

    private Long senderId;

    private Long receiverId;

    private Boolean isRead;
}
