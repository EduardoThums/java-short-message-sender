package br.ifsul.lp3.messagesender.api.web.controller.message.request;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SearchMessageRequest {

    private String username;

    private String subject;
}
