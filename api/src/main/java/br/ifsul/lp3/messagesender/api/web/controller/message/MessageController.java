package br.ifsul.lp3.messagesender.api.web.controller.message;

import br.ifsul.lp3.messagesender.api.service.message.MessageService;
import br.ifsul.lp3.messagesender.api.web.controller.message.request.SearchMessageRequest;
import br.ifsul.lp3.messagesender.api.web.controller.message.request.SendMessageRequest;
import br.ifsul.lp3.messagesender.api.web.controller.message.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("find-all/received")
    public Page<MessageResponse> findAllReceived(@ModelAttribute SearchMessageRequest request, @RequestParam int page) {
        return messageService.findAllReceived(page, request);
    }

    @PutMapping("/mark-as-read/{messageId}")
    public void markAsRead(@PathVariable(name = "messageId") Long messageId) {
        messageService.maskAsRead(messageId);
    }
}
