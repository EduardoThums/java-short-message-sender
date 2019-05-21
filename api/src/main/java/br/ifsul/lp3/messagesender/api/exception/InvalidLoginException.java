package br.ifsul.lp3.messagesender.api.exception;

public class InvalidLoginException extends RuntimeException {
    public InvalidLoginException() {
        super("Invalid name or password!");
    }
}
