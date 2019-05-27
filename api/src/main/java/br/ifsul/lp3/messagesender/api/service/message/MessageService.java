package br.ifsul.lp3.messagesender.api.service.message;

import br.ifsul.lp3.messagesender.api.web.controller.message.request.SearchMessageRequest;
import br.ifsul.lp3.messagesender.api.web.controller.message.request.SendMessageRequest;
import br.ifsul.lp3.messagesender.api.web.controller.message.response.MessageResponse;
import org.springframework.data.domain.Page;

public interface MessageService {

    void sendMessage(SendMessageRequest request);

    Page<MessageResponse> findAllReceived(int page, SearchMessageRequest request);

    void maskAsRead(Long messageId);

    MessageResponse findById(Long messageId);
}
