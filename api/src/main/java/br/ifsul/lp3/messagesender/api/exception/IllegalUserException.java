package br.ifsul.lp3.messagesender.api.exception;

public class IllegalUserException extends RuntimeException {

    public IllegalUserException() {
        super("User already exits with the given username");
    }
}
