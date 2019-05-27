package br.ifsul.lp3.messagesender.api.service.user;

import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.RegisterAuthenticationRequest;
import br.ifsul.lp3.messagesender.api.web.controller.user.response.UserResponse;
import org.springframework.data.domain.Page;

public interface UserService {

    void save(RegisterAuthenticationRequest request);

    Page<UserResponse> findAll(int page);

    Page<UserResponse> findAllByUsernameAutoComplete(String username, int page);

    UserResponse findLoggedUser();
}
