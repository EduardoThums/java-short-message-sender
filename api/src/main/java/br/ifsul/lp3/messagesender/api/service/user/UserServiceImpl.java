package br.ifsul.lp3.messagesender.api.service.user;

import br.ifsul.lp3.messagesender.api.component.CustomPageResponseComponent;
import br.ifsul.lp3.messagesender.api.config.security.CustomUserDetailsService;
import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.exception.IllegalUserException;
import br.ifsul.lp3.messagesender.api.exception.InvalidUserException;
import br.ifsul.lp3.messagesender.api.mapper.UserResponseMapper;
import br.ifsul.lp3.messagesender.api.repository.user.UserRepository;
import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.RegisterAuthenticationRequest;
import br.ifsul.lp3.messagesender.api.web.controller.user.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    private CustomUserDetailsService customUserDetailsService;

    private UserResponseMapper userResponseMapper;

    private CustomPageResponseComponent customPageResponseComponent;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, CustomUserDetailsService customUserDetailsService, UserResponseMapper userResponseMapper, CustomPageResponseComponent customPageResponseComponent) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customUserDetailsService = customUserDetailsService;
        this.userResponseMapper = userResponseMapper;
        this.customPageResponseComponent = customPageResponseComponent;
    }

    @Override
    public void save(RegisterAuthenticationRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalUserException();
        }

        final UserEntity userEntity = new UserEntity();
        userEntity.setUsername(request.getUsername());
        userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        userEntity.setImageUrl(request.getImageUrl());

        userRepository.save(userEntity);
    }

    @Override
    public Page<UserResponse> findAll(int page) {
        final Long loggedUserId = customUserDetailsService.getUser().getId();
        final List<UserEntity> userEntities = userRepository.findAllExceptByLoggedUser(loggedUserId);
        final List<UserResponse> userResponses = userResponseMapper.mapUserEntityToUserResponse(userEntities);

        return customPageResponseComponent.customPageResponse(userResponses, page);
    }

    @Override
    public Page<UserResponse> findAllByUsernameAutoComplete(String username, int page) {
        final Long loggedUserId = customUserDetailsService.getUser().getId();
        final List<UserEntity> userEntities = userRepository.findAllExceptByLoggedUserAndUsernameAutoComplete(loggedUserId, username);
        final List<UserResponse> userResponses = userResponseMapper.mapUserEntityToUserResponse(userEntities);

        return customPageResponseComponent.customPageResponse(userResponses, page);
    }

    @Override
    public UserResponse findLoggedUser() {
        final Long loggedUserId = customUserDetailsService.getUser().getId();
        final UserEntity loggedUser = userRepository.findById(loggedUserId).orElseThrow(InvalidUserException::new);

        return userResponseMapper.mapUserEntityToUserResponse(Collections.singletonList(loggedUser)).get(0);
    }
}
