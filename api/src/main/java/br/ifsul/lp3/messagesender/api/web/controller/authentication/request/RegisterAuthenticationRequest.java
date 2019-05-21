package br.ifsul.lp3.messagesender.api.web.controller.authentication.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterAuthenticationRequest {

    private String name;

    private String password;

    private String imageUrl;
}
