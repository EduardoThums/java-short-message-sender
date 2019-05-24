package br.ifsul.lp3.messagesender.api.web.controller.message;

import br.ifsul.lp3.messagesender.api.service.message.MessageService;
import br.ifsul.lp3.messagesender.api.web.controller.message.request.SendMessageRequest;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/message")
public class MessageController {

    private MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/send")
    public void sendMessage(@RequestBody SendMessageRequest request) {
        messageService.sendMessage(request);
    }
}
