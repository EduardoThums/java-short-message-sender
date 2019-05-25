package br.ifsul.lp3.messagesender.api.web.controller.user;

import br.ifsul.lp3.messagesender.api.service.user.UserService;
import br.ifsul.lp3.messagesender.api.web.controller.user.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("find-by-username/autocomplete/{username}")
    public Page<UserResponse> findAll(@PathVariable(name = "username") String username, @RequestParam int page) {
        return userService.findAllByUsernameAutoComplete(username, page);
    }

    @GetMapping
    public Page<UserResponse> findAll(@RequestParam int page) {
        return userService.findAll(page);
    }
}
