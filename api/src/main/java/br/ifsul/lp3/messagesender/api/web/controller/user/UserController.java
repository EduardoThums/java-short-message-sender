package br.ifsul.lp3.messagesender.api.web.controller.user;

import br.ifsul.lp3.messagesender.api.service.user.UserService;
import br.ifsul.lp3.messagesender.api.web.controller.user.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public Page<UserResponse> findAll(int page) {
        return userService.findAll(page);
    }
}
