package br.ifsul.lp3.messagesender.api.web.controller.authentication.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterAuthenticationRequest {

    private String username;

    private String password;

    private String imageUrl;
}
