package br.ifsul.lp3.messagesender.api.web.controller.user.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private Long id;

    private String username;

    private String imageUrl;
}
