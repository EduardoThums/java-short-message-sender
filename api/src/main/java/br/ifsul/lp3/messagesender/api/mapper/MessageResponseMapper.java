package br.ifsul.lp3.messagesender.api.mapper;

import br.ifsul.lp3.messagesender.api.domain.entity.MessageEntity;
import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.exception.InvalidUserException;
import br.ifsul.lp3.messagesender.api.repository.user.UserRepository;
import br.ifsul.lp3.messagesender.api.web.controller.message.response.MessageResponse;
import br.ifsul.lp3.messagesender.api.web.controller.message.response.MessageUserResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MessageResponseMapper {

    private UserRepository userRepository;

    public MessageResponseMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<MessageResponse> mapMessageEntityToMessageResponse(List<MessageEntity> messageEntities) {
        return messageEntities
                .stream()
                .map(messageEntity -> {

                    final MessageUserResponse receiverResponse = mapUserEntityToMessageUserResponse(messageEntity);

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

    private MessageUserResponse mapUserEntityToMessageUserResponse(MessageEntity messageEntity) {
        final UserEntity userEntity = userRepository.findById(messageEntity.getSenderId()).orElseThrow(InvalidUserException::new);

        return MessageUserResponse.builder()
                .id(userEntity.getId())
                .username(userEntity.getUsername())
                .imageUrl(userEntity.getImageUrl())
                .build();
    }
}
