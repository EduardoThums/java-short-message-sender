package br.ifsul.lp3.messagesender.api.service.message;

import br.ifsul.lp3.messagesender.api.component.CustomPageResponseComponent;
import br.ifsul.lp3.messagesender.api.config.security.CustomUserDetailsService;
import br.ifsul.lp3.messagesender.api.domain.entity.MessageEntity;
import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.exception.InvalidUserException;
import br.ifsul.lp3.messagesender.api.mapper.MessageResponseMapper;
import br.ifsul.lp3.messagesender.api.repository.message.MessageRepository;
import br.ifsul.lp3.messagesender.api.repository.user.UserRepository;
import br.ifsul.lp3.messagesender.api.web.controller.message.request.SendMessageRequest;
import br.ifsul.lp3.messagesender.api.web.controller.message.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    private MessageRepository messageRepository;

    private UserRepository userRepository;

    private CustomUserDetailsService customUserDetailsService;

    private CustomPageResponseComponent customPageResponseComponent;

    private MessageResponseMapper messageResponseMapper;

    public MessageServiceImpl(MessageRepository messageRepository, UserRepository userRepository, CustomUserDetailsService customUserDetailsService, CustomPageResponseComponent customPageResponseComponent, MessageResponseMapper messageResponseMapper) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.customUserDetailsService = customUserDetailsService;
        this.customPageResponseComponent = customPageResponseComponent;
        this.messageResponseMapper = messageResponseMapper;
    }

    @Override
    public void sendMessage(SendMessageRequest request) {
        userRepository.findById(request.getReceiverId()).orElseThrow(InvalidUserException::new);

        final Long userId = customUserDetailsService.getUser().getId();

        final MessageEntity messageEntity = new MessageEntity();
        messageEntity.setText(request.getText());
        messageEntity.setReceiverId(request.getReceiverId());
        messageEntity.setSenderId(userId);

        messageRepository.save(messageEntity);
    }

    @Override
    public Page<MessageResponse> findAll(int page) {
        final Long senderId = customUserDetailsService.getUser().getId();
        final List<MessageEntity> messageEntities = messageRepository.findAllBySenderId(senderId);
        final List<Long> receiverIds = messageEntities.stream().map(MessageEntity::getId).collect(Collectors.toList());
        final List<UserEntity> userEntities = userRepository.findAllByIdIn(receiverIds);
        final List<MessageResponse> messageResponses = messageResponseMapper.mapMessageEntityToMessageResponse(messageEntities, userEntities);

        return customPageResponseComponent.customPageResponse(messageResponses, page);
    }
}
