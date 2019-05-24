package br.ifsul.lp3.messagesender.api.web.controller.authentication;

import br.ifsul.lp3.messagesender.api.config.security.AuthenticationService;
import br.ifsul.lp3.messagesender.api.service.user.UserService;
import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.LoginAuthenticationRequest;
import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.RegisterAuthenticationRequest;
import br.ifsul.lp3.messagesender.api.web.controller.authentication.response.LoginAuthenticationResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/")
public class AuthenticationController {

    private AuthenticationService authenticationService;

    private UserService userService;

    public AuthenticationController(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public LoginAuthenticationResponse login(@RequestBody LoginAuthenticationRequest request) {
        final String token = authenticationService.authenticate(request.getUsername(), request.getPassword());
        return LoginAuthenticationResponse.builder().token(token).build();
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterAuthenticationRequest request) {
        userService.save(request);
    }
}
