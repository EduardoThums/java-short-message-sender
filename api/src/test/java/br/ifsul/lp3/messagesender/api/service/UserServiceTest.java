package br.ifsul.lp3.messagesender.api.service;

import br.ifsul.lp3.messagesender.api.component.CustomPageResponseComponent;
import br.ifsul.lp3.messagesender.api.config.AbstractUnitTest;
import br.ifsul.lp3.messagesender.api.config.DummyObjects;
import br.ifsul.lp3.messagesender.api.config.security.CustomUserDetailsService;
import br.ifsul.lp3.messagesender.api.config.security.UserPrincipal;
import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.exception.IllegalUserException;
import br.ifsul.lp3.messagesender.api.mapper.UserResponseMapper;
import br.ifsul.lp3.messagesender.api.repository.user.UserRepository;
import br.ifsul.lp3.messagesender.api.service.user.UserServiceImpl;
import br.ifsul.lp3.messagesender.api.web.controller.authentication.request.RegisterAuthenticationRequest;
import br.ifsul.lp3.messagesender.api.web.controller.user.response.UserResponse;
import org.junit.Assert;
import org.junit.Test;
import org.mockito.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;

public class UserServiceTest extends AbstractUnitTest {

    @Spy
    @InjectMocks
    private UserServiceImpl service;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private CustomUserDetailsService customUserDetailsService;

    @Mock
    private UserResponseMapper userResponseMapper;

    @Mock
    private CustomPageResponseComponent customPageResponseComponent;

    @Captor
    private ArgumentCaptor<UserEntity> userEntityArgumentCaptor;

    @Test
    public void save() {
        // Arrange
        final RegisterAuthenticationRequest request = DummyObjects.newInstance(RegisterAuthenticationRequest.class);

        Mockito.when(userRepository.findByUsername(request.getUsername())).thenReturn(Optional.empty());

        // Act
        service.save(request);

        Mockito.verify(userRepository, Mockito.times(1)).save(userEntityArgumentCaptor.capture());

        // Assert
        final UserEntity savedUser = userEntityArgumentCaptor.getValue();
        Assert.assertEquals(request.getUsername(), savedUser.getUsername());
        Assert.assertEquals(request.getImageUrl(), savedUser.getImageUrl());
    }

    @Test(expected = IllegalUserException.class)
    public void saveThrowsIllegalUserException() {
        // Arrange
        final RegisterAuthenticationRequest request = DummyObjects.newInstance(RegisterAuthenticationRequest.class);

        Mockito.when(userRepository.findByUsername(request.getUsername())).thenReturn(Optional.of(new UserEntity()));

        // Act
        service.save(request);
    }

    @Test
    public void findAll() {
        // Arrange
        final int page = 0;
        final UserPrincipal mockedLoggedUser = setupUser();
        final UserEntity mockedUser = DummyObjects.newInstance(UserEntity.class);
        mockedUser.setId(2L);
        final UserResponse mockedResponse = DummyObjects.newInstance(UserResponse.class);
        final Page<UserResponse> mockedPageResponse = new PageImpl<>(Collections.singletonList(mockedResponse));

        Mockito.when(customUserDetailsService.getUser()).thenReturn(mockedLoggedUser);
        Mockito.when(userRepository.findAllExceptByLoggedUser(mockedLoggedUser.getId())).thenReturn(Collections.singletonList(mockedUser));
        Mockito.when(userResponseMapper.mapUserEntityToUserResponse(Collections.singletonList(mockedUser))).thenReturn(Collections.singletonList(mockedResponse));
        Mockito.when(customPageResponseComponent.customPageResponse(Collections.singletonList(mockedResponse), page)).thenReturn(mockedPageResponse);

        // Act
        final Page<UserResponse> responsePage = service.findAll(page);

        // Assert
        Assert.assertEquals(1, responsePage.getTotalElements());

        final UserResponse response = responsePage.getContent().get(0);
        Assert.assertEquals(mockedResponse.getId(), response.getId());
        Assert.assertEquals(mockedResponse.getUsername(), response.getUsername());
        Assert.assertEquals(mockedResponse.getImageUrl(), response.getImageUrl());
    }

    @Test
    public void findAllByUsernameAutoComplete() {
        // Arrange
        final String username = "some-username";
        final int page = 0;
        final UserPrincipal mockedLoggedUser = setupUser();
        final UserEntity mockedUser = DummyObjects.newInstance(UserEntity.class);
        final UserResponse mockedResponse = DummyObjects.newInstance(UserResponse.class);
        final Page<UserResponse> mockedPageResponse = new PageImpl<>(Collections.singletonList(mockedResponse));

        Mockito.when(customUserDetailsService.getUser()).thenReturn(mockedLoggedUser);
        Mockito.when(userRepository.findAllExceptByLoggedUserAndUsernameAutoComplete(mockedLoggedUser.getId(), username)).thenReturn(Collections.singletonList(mockedUser));
        Mockito.when(userResponseMapper.mapUserEntityToUserResponse(Collections.singletonList(mockedUser))).thenReturn(Collections.singletonList(mockedResponse));
        Mockito.when(customPageResponseComponent.customPageResponse(Collections.singletonList(mockedResponse), page)).thenReturn(mockedPageResponse);

        // Act
        final Page<UserResponse> responsePage = service.findAllByUsernameAutoComplete(username, page);

        // Assert
        Assert.assertEquals(1, responsePage.getTotalElements());

        final UserResponse response = responsePage.getContent().get(0);
        Assert.assertEquals(mockedResponse.getId(), response.getId());
        Assert.assertEquals(mockedResponse.getUsername(), response.getUsername());
        Assert.assertEquals(mockedResponse.getImageUrl(), response.getImageUrl());
    }

    private UserPrincipal setupUser() {
        final UserPrincipal userPrincipal = new UserPrincipal();
        userPrincipal.setId(1L);
        userPrincipal.setImageUrl("image-url");
        userPrincipal.setUsername("username");

        return userPrincipal;
    }

}
