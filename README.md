# Java Short Message Service
Projeto realizado para a disciplina de Linguagem de Programação III, visando construir uma aplicação que seja capaz de prover um serviço de mensageria entre os usuários da plataforma.


## Tópicos
   * [Tecnologias usadas](#tecnologias-usadas)
   * [Funcionalidades](#funcionalidades)
   * [Instalação](#instalação)
   * [Contribuidores](#contribuidores)
 

## Tecnologias usadas
A aplicação conta com uma API construída em Java usando Spring Boot e JPA, com integração do Postgresql como banco de dados.

A aplicação tambem possui uma interface web usando React, Typescript e SASS que podem ser compiladas para HTML, CSS e JS.

## Funcionalidades
   * **Realizar cadastro:** é possível cadastrar-se no na plataforma informando um nome de usuário e uma senha.

   * **Visualizar usuários do sistema:** a visualização de usuários cadastrados no sistema consiste em uma lista com todos usuários, que pode ser filtrada pelo nome previamente cadastrado no sistema.

   * **Enviar mensagens:** o serviço de mensageria é composto primeiramente pelo envio de mensagens, que contém um destinatário e um corpo de texto.

   * **Visualização de mensagens recebidas:** é possível visualizar mensagens recebidas de outros usuário e identificar quais já foram lidas. Como na listagem de usuários, também é possível realizar e filtragem das mensagens, tanto pelo remetente, quanto por palavras chaves contidas no corpo da mensagem.

## Instalação
   * **Requisitos**
     * Java 8 instalado no computador
     * Node instalado no computador
   * **Back-end**
     * ```make run-api```
   * **Front-end**
     * ```cd ./web-app```
     * ```npm i``` ou ```yarn```
     * ```npm run build``` ou ```yarn build```

## Contribuidores
[Eduardo Thums](https://github.com/EduardoThums)\
[Patrick Dorneles](https://github.com/PatrickDorneles)
