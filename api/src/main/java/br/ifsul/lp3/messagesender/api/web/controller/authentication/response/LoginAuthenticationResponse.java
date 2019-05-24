package br.ifsul.lp3.messagesender.api.web.controller.authentication.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginAuthenticationResponse {

    private String token;
}
