package br.ifsul.lp3.messagesender.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvalidMessageException extends RuntimeException {
    public InvalidMessageException(){
        super("Message doesn't exist!");
    }
}
