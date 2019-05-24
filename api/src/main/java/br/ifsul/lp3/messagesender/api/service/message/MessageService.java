package br.ifsul.lp3.messagesender.api.service.message;

import br.ifsul.lp3.messagesender.api.web.controller.message.request.SendMessageRequest;

public interface MessageService {

    void sendMessage(SendMessageRequest request);
}
