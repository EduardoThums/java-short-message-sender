package br.ifsul.lp3.messagesender.api.mapper;

import br.ifsul.lp3.messagesender.api.domain.entity.MessageEntity;
import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.exception.InvalidUserException;
import br.ifsul.lp3.messagesender.api.web.controller.message.response.MessageResponse;
import br.ifsul.lp3.messagesender.api.web.controller.message.response.MessageUserResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MessageResponseMapper {

    public List<MessageResponse> mapMessageEntityToMessageResponse(List<MessageEntity> messageEntities, List<UserEntity> userEntities) {
        return messageEntities
                .stream()
                .map(messageEntity -> {

                    final UserEntity receiverUser = userEntities
                            .stream()
                            .filter(userEntity -> userEntity.getId().equals(messageEntity.getReceiverId()))
                            .findFirst()
                            .orElseThrow(InvalidUserException::new);

                    final MessageUserResponse receiverResponse = MessageUserResponse.builder()
                            .id(receiverUser.getId())
                            .username(receiverUser.getUsername())
                            .imageUrl(receiverUser.getImageUrl())
                            .build();

                    return MessageResponse.builder()
                            .id(messageEntity.getId())
                            .text(messageEntity.getText())
                            .receiver(receiverResponse)
                            .isRead(messageEntity.isRead())
                            .createdDate(messageEntity.getCreatedDate())
                            .build();
                })
                .collect(Collectors.toList());
    }
}
