package br.ifsul.lp3.messagesender.api.mapper;

import br.ifsul.lp3.messagesender.api.config.AbstractUnitTest;
import br.ifsul.lp3.messagesender.api.config.DummyObjects;
import br.ifsul.lp3.messagesender.api.domain.entity.MessageEntity;
import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.exception.InvalidUserException;
import br.ifsul.lp3.messagesender.api.repository.user.UserRepository;
import br.ifsul.lp3.messagesender.api.web.controller.message.response.MessageResponse;
import br.ifsul.lp3.messagesender.api.web.controller.message.response.MessageUserResponse;
import org.junit.Assert;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

public class MessageResponseMapperTest extends AbstractUnitTest {

    @Spy
    @InjectMocks
    private MessageResponseMapper mapper;

    @Mock
    private UserRepository userRepository;

    @Test
    public void mapMessageEntityToMessageResponse() {
        // Arrange
        final MessageEntity messageEntity = DummyObjects.newInstance(MessageEntity.class);
        messageEntity.setSenderId(1L);
        final UserEntity mockedUser = DummyObjects.newInstance(UserEntity.class);
        mockedUser.setId(1L);

        Mockito.when(userRepository.findById(messageEntity.getSenderId())).thenReturn(Optional.of(mockedUser));

        // Act
        final List<MessageResponse> responseList = mapper.mapMessageEntityToMessageResponse(Collections.singletonList(messageEntity));

        // Assert
        Assert.assertEquals(1, responseList.size());

        final MessageResponse response = responseList.get(0);
        Assert.assertEquals(messageEntity.getId(), response.getId());
        Assert.assertEquals(messageEntity.getCreatedDate(), response.getCreatedDate());
        Assert.assertEquals(messageEntity.isRead(), response.getIsRead());
        Assert.assertEquals(messageEntity.getText(), response.getText());

        final MessageUserResponse userResponse = response.getReceiver();
        Assert.assertEquals(mockedUser.getId(), userResponse.getId());
        Assert.assertEquals(mockedUser.getUsername(), userResponse.getUsername());
        Assert.assertEquals(mockedUser.getImageUrl(), userResponse.getImageUrl());
    }

    @Test(expected = InvalidUserException.class)
    public void mapMessageEntityToMessageResponseThrowsInvalidUserException() {
        // Arrange
        final MessageEntity messageEntity = DummyObjects.newInstance(MessageEntity.class);

        Mockito.when(userRepository.findById(messageEntity.getSenderId())).thenReturn(Optional.empty());

        // Act
        mapper.mapMessageEntityToMessageResponse(Collections.singletonList(messageEntity));
    }
}
