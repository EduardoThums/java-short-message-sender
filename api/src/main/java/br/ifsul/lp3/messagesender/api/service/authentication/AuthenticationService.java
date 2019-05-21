package br.ifsul.lp3.messagesender.api.service.authentication;

import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.LoginAuthenticationRequest;
import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.RegisterAuthenticationRequest;

public interface AuthenticationService {

    String login(LoginAuthenticationRequest request);

    String register(RegisterAuthenticationRequest request);
}
