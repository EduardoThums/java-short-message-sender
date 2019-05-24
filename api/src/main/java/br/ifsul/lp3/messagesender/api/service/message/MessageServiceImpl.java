package br.ifsul.lp3.messagesender.api.service.message;

import br.ifsul.lp3.messagesender.api.config.security.CustomUserDetailsService;
import br.ifsul.lp3.messagesender.api.domain.entity.MessageEntity;
import br.ifsul.lp3.messagesender.api.exception.InvalidUserException;
import br.ifsul.lp3.messagesender.api.repository.message.MessageRepository;
import br.ifsul.lp3.messagesender.api.repository.user.UserRepository;
import br.ifsul.lp3.messagesender.api.web.controller.message.request.SendMessageRequest;
import org.springframework.stereotype.Service;

@Service
public class MessageServiceImpl implements MessageService {

    private MessageRepository messageRepository;

    private UserRepository userRepository;

    private CustomUserDetailsService customUserDetailsService;

    public MessageServiceImpl(MessageRepository messageRepository, UserRepository userRepository, CustomUserDetailsService customUserDetailsService) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
        this.customUserDetailsService = customUserDetailsService;
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
}
