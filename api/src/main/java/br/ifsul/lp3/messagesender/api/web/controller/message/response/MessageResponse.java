package br.ifsul.lp3.messagesender.api.web.controller.message.response;

import lombok.*;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {

    private Long id;

    private String text;

    private Boolean isRead;

    private Instant createdDate;

    private MessageUserResponse sender;
}
