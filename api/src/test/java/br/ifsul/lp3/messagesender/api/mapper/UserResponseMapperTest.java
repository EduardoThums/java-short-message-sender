package br.ifsul.lp3.messagesender.api.mapper;

import br.ifsul.lp3.messagesender.api.config.AbstractUnitTest;
import br.ifsul.lp3.messagesender.api.config.DummyObjects;
import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.web.controller.user.response.UserResponse;
import org.junit.Assert;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Spy;

import java.util.Collections;
import java.util.List;

public class UserResponseMapperTest extends AbstractUnitTest {

    @Spy
    @InjectMocks
    private UserResponseMapper mapper;

    @Test
    public void mapUserEntityToUserResponse() {
        // Arrange
        final UserEntity userEntity = DummyObjects.newInstance(UserEntity.class);

        // Act
        final List<UserResponse> responseList = mapper.mapUserEntityToUserResponse(Collections.singletonList(userEntity));

        // Assert
        Assert.assertEquals(1, responseList.size());

        final UserResponse response = responseList.get(0);
        Assert.assertEquals(userEntity.getId(), response.getId());
        Assert.assertEquals(userEntity.getImageUrl(), response.getImageUrl());
        Assert.assertEquals(userEntity.getUsername(), response.getUsername());
    }
}
