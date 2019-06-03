package br.ifsul.lp3.messagesender.api.service;

import br.ifsul.lp3.messagesender.api.component.CustomPageResponseComponent;
import br.ifsul.lp3.messagesender.api.config.AbstractUnitTest;
import br.ifsul.lp3.messagesender.api.config.DummyObjects;
import br.ifsul.lp3.messagesender.api.config.security.CustomUserDetailsService;
import br.ifsul.lp3.messagesender.api.config.security.UserPrincipal;
import br.ifsul.lp3.messagesender.api.domain.entity.MessageEntity;
import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.exception.InvalidMessageException;
import br.ifsul.lp3.messagesender.api.exception.InvalidUserException;
import br.ifsul.lp3.messagesender.api.mapper.MessageResponseMapper;
import br.ifsul.lp3.messagesender.api.repository.message.MessageJdbcCriteria;
import br.ifsul.lp3.messagesender.api.repository.message.MessageJdbcRepository;
import br.ifsul.lp3.messagesender.api.repository.message.MessageRepository;
import br.ifsul.lp3.messagesender.api.repository.user.UserRepository;
import br.ifsul.lp3.messagesender.api.service.message.MessageServiceImpl;
import br.ifsul.lp3.messagesender.api.web.controller.message.request.SearchMessageRequest;
import br.ifsul.lp3.messagesender.api.web.controller.message.request.SendMessageRequest;
import br.ifsul.lp3.messagesender.api.web.controller.message.response.MessageResponse;
import org.junit.Assert;
import org.junit.Test;
import org.mockito.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.Collections;
import java.util.Optional;

public class MessageServiceTest extends AbstractUnitTest {

    @Spy
    @InjectMocks
    private MessageServiceImpl service;

    @Mock
    private MessageRepository messageRepository;

    @Mock
    private MessageJdbcRepository messageJdbcRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CustomUserDetailsService customUserDetailsService;

    @Mock
    private CustomPageResponseComponent customPageResponseComponent;

    @Mock
    private MessageResponseMapper messageResponseMapper;

    @Captor
    private ArgumentCaptor<MessageEntity> messageEntityArgumentCaptor;

    @Test
    public void sendMessage() {
        // Arrange
        final SendMessageRequest request = DummyObjects.newInstance(SendMessageRequest.class);
        request.setReceiverId(2L);
        final UserEntity mockedUser = DummyObjects.newInstance(UserEntity.class);
        mockedUser.setId(2L);
        final UserPrincipal mockedLoggedUser = setUpUser();

        Mockito.when(userRepository.findById(request.getReceiverId())).thenReturn(Optional.of(mockedUser));
        Mockito.when(customUserDetailsService.getUser()).thenReturn(mockedLoggedUser);

        // Act
        service.sendMessage(request);

        Mockito.verify(messageRepository, Mockito.times(1)).save(messageEntityArgumentCaptor.capture());

        // Assert
        final MessageEntity savedMessage = messageEntityArgumentCaptor.getValue();
        Assert.assertEquals(request.getReceiverId(), savedMessage.getReceiverId());
        Assert.assertEquals(request.getText(), savedMessage.getText());
        Assert.assertEquals(mockedLoggedUser.getId(), savedMessage.getSenderId());
        Assert.assertFalse(savedMessage.getIsRead());
    }

    @Test(expected = InvalidUserException.class)
    public void sendMessageThrowsInvalidUserException() {
        // Arrange
        final SendMessageRequest request = DummyObjects.newInstance(SendMessageRequest.class);

        Mockito.when(userRepository.findById(request.getReceiverId())).thenReturn(Optional.empty());

        // Act
        service.sendMessage(request);
    }

    @Test
    public void findAllReceived() {
        // Arrange
        final int page = 0;
        final SearchMessageRequest request = DummyObjects.newInstance(SearchMessageRequest.class);
        final UserPrincipal mockedLoggedUser = setUpUser();
        final MessageEntity mockedMessage = DummyObjects.newInstance(MessageEntity.class);
        final MessageJdbcCriteria messageJdbcCriteria = MessageJdbcCriteria.builder()
                .loggedUserId(mockedLoggedUser.getId())
                .subject(request.getSubject())
                .senderUsername(request.getUsername())
                .build();
        final MessageResponse mockedResponse = DummyObjects.newInstance(MessageResponse.class);
        final Page<MessageResponse> mockedPageResponse = new PageImpl<>(Collections.singletonList(mockedResponse));

        Mockito.when(customUserDetailsService.getUser()).thenReturn(mockedLoggedUser);
        Mockito.when(messageJdbcRepository.findAllByCriteria(messageJdbcCriteria)).thenReturn(Collections.singletonList(mockedMessage));
        Mockito.when(messageResponseMapper.mapMessageEntityToMessageResponse(Collections.singletonList(mockedMessage))).thenReturn(Collections.singletonList(mockedResponse));
        Mockito.when(customPageResponseComponent.customPageResponse(Collections.singletonList(mockedResponse), page)).thenReturn(mockedPageResponse);

        // Act
        final Page<MessageResponse> responsePage = service.findAllReceived(page, request);

        // Assert
        Assert.assertEquals(1, responsePage.getTotalElements());

        final MessageResponse response = responsePage.getContent().get(0);
        Assert.assertEquals(mockedResponse.getId(), response.getId());
        Assert.assertEquals(mockedResponse.getText(), response.getText());
        Assert.assertEquals(mockedResponse.getCreatedDate(), response.getCreatedDate());
        Assert.assertEquals(mockedResponse.getIsRead(), response.getIsRead());
    }

    @Test
    public void maskAsRead() {
        // Arrange
        final Long messageId = 1L;
        final MessageEntity mockedMessage = DummyObjects.newInstance(MessageEntity.class);

        Mockito.when(messageRepository.findById(messageId)).thenReturn(Optional.of(mockedMessage));

        // Act
        service.maskAsRead(messageId);

        Mockito.verify(messageRepository, Mockito.times(1)).save(messageEntityArgumentCaptor.capture());

        // Assert
        final MessageEntity savedMessage = messageEntityArgumentCaptor.getValue();
        Assert.assertTrue(savedMessage.getIsRead());
    }

    @Test(expected = InvalidMessageException.class)
    public void maskAsReadThrowsInvalidMessageException() {
        // Arrange
        final Long messageId = 1L;

        Mockito.when(messageRepository.findById(messageId)).thenReturn(Optional.empty());

        // Act
        service.maskAsRead(messageId);
    }

    private UserPrincipal setUpUser() {
        final UserPrincipal userPrincipal = new UserPrincipal();
        userPrincipal.setId(1L);
        userPrincipal.setUsername("username");
        userPrincipal.setImageUrl("image-url");

        return userPrincipal;
    }

    @Test
    public void findById() {
        // Arrange
        final Long messageId = 1L;
        final MessageEntity mockedMessage = DummyObjects.newInstance(MessageEntity.class);
        final MessageResponse mockedResponse = DummyObjects.newInstance(MessageResponse.class);

        Mockito.when(messageRepository.findById(messageId)).thenReturn(Optional.of(mockedMessage));
        Mockito.when(messageResponseMapper.mapMessageEntityToMessageResponse(Collections.singletonList(mockedMessage))).thenReturn(Collections.singletonList(mockedResponse));

        // Act
        MessageResponse response = service.findById(messageId);

        // Assert
        Assert.assertEquals(mockedResponse.getCreatedDate(), response.getCreatedDate());
        Assert.assertEquals(mockedResponse.getId(), response.getId());
        Assert.assertEquals(mockedResponse.getIsRead(), response.getIsRead());
        Assert.assertEquals(mockedResponse.getText(), response.getText());
        Assert.assertEquals(mockedResponse.getSender(), response.getSender());
    }

    @Test(expected = InvalidMessageException.class)
    public void findByIdThrowsInvalidMessageException() {
        // Arrange
        final Long messageId = 1L;

        Mockito.when(messageRepository.findById(messageId)).thenReturn(Optional.empty());

        // Act
        service.findById(messageId);
    }
}
