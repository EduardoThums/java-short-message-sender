package br.ifsul.lp3.messagesender.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class InvalidUserException extends RuntimeException {
    public InvalidUserException() {
        super("User doesn't exist");
    }
}
