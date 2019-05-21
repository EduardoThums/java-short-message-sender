package br.ifsul.lp3.messagesender.api.exception;

public class InvalidNameException extends RuntimeException {

    public InvalidNameException() {
        super("Can't create user with an already registered name!");
    }
}
