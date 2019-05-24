package br.ifsul.lp3.messagesender.api.web.controller.message.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {

    private String text;

    private Long receiverId;
}
