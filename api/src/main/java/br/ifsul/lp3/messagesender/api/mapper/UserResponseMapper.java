package br.ifsul.lp3.messagesender.api.mapper;

import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.web.controller.user.response.UserResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserResponseMapper {

    public List<UserResponse> mapUserEntityToUserResponse(List<UserEntity> userEntities) {
        return userEntities
                .stream()
                .map(userEntity ->
                        UserResponse.builder()
                                .id(userEntity.getId())
                                .imageUrl(userEntity.getImageUrl())
                                .username(userEntity.getUsername())
                                .build())
                .collect(Collectors.toList());
    }
}
