package br.ifsul.lp3.messagesender.api.web.controller.authentication;

import br.ifsul.lp3.messagesender.api.service.authentication.AuthenticationService;
import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.LoginAuthenticationRequest;
import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.RegisterAuthenticationRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authentication")
public class AuthenticationController {

    private AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public String register(RegisterAuthenticationRequest request) {
        return authenticationService.register(request);
    }

    @GetMapping("/login")
    public String login(LoginAuthenticationRequest request) {
        return authenticationService.login(request);
    }
}
