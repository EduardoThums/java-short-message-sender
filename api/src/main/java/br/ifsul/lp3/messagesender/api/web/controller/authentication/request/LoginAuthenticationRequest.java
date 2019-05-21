package br.ifsul.lp3.messagesender.api.web.controller.authentication.request;

import lombok.Data;

@Data
public class LoginAuthenticationRequest {

    private String name;

    private String password;
}
