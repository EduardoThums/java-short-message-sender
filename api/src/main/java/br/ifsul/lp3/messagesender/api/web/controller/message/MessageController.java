package br.ifsul.lp3.messagesender.api.web.controller.message;

import br.ifsul.lp3.messagesender.api.service.message.MessageService;
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

    @GetMapping("find-all/sent")
    public Page<MessageResponse> findAllSent(@RequestParam int page) {
        return messageService.findAllSent(page);
    }

    @GetMapping("find-all/received")
    public Page<MessageResponse> findAllReceived(@RequestParam int page) {
        return messageService.findAllReceived(page);
    }

    @PutMapping("/mark-as-read/{messageId}")
    public void markAsRead(@PathVariable(name = "messageId") Long messageId){
        messageService.maskAsRead(messageId);
    }
}
