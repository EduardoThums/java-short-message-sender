package br.ifsul.lp3.messagesender.api.web.controller.message.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageUserResponse {

    private Long id;

    private String username;

    private String imageUrl;
}
