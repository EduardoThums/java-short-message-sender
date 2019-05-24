package br.ifsul.lp3.messagesender.api.service.user;

import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.RegisterAuthenticationRequest;

public interface UserService {

    void save(RegisterAuthenticationRequest request);
}
