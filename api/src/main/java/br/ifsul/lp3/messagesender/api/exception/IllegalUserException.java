package br.ifsul.lp3.messagesender.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class IllegalUserException extends RuntimeException {

    public IllegalUserException() {
        super("User already exits with the given username");
    }
}
