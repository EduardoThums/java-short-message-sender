package br.ifsul.lp3.messagesender.api.service.authentication;

import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.exception.InvalidLoginException;
import br.ifsul.lp3.messagesender.api.exception.InvalidNameException;
import br.ifsul.lp3.messagesender.api.repository.UserRepository;
import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.LoginAuthenticationRequest;
import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.RegisterAuthenticationRequest;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private UserRepository userRepository;

    public AuthenticationServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public String login(LoginAuthenticationRequest request) {
        final UserEntity userEntity = userRepository.findByNameAndPassword(request.getName(), request.getPassword()).orElseThrow(InvalidLoginException::new);

        return generateAuthenticationToken(userEntity.getName(), userEntity.getPassword());
    }

    @Override
    public String register(RegisterAuthenticationRequest request) {
        userRepository.findByName(request.getName()).ifPresent(userEntity -> {
            throw new InvalidNameException();
        });

        final UserEntity userEntity = new UserEntity();
        userEntity.setName(request.getName());
        userEntity.setPassword(encodePassword(request.getPassword()));
        userEntity.setImageUrl(request.getImageUrl());

        userRepository.save(userEntity);

        return generateAuthenticationToken(request.getName(), request.getPassword());
    }

    private String encodePassword(String password) {
        return Base64.getEncoder().encodeToString(password.getBytes());
    }

    private String generateAuthenticationToken(String name, String password) {
        final String nameTokenAuthentication = Base64.getEncoder().encodeToString(name.getBytes());
        final String passwordTokenAuthentication = Base64.getEncoder().encodeToString(password.getBytes());

        return nameTokenAuthentication + "/" + passwordTokenAuthentication;
    }
}
