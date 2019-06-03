create database java_short_message_service;

create table "user" (
	id int PRIMARY key,
	username varchar (256) not null,
	password varchar(512) not null,
	image_url varchar (2048) not null
);

create table if not exists message (
	id int PRIMARY key,
	text varchar not null,
	subject varchar not null,
	created_date timestamp default now(),
	sender_id int not null,
	receiver_id int not null,
	is_read boolean default false
);

ALTER TABLE message ADD CONSTRAINT fk_sender_id FOREIGN KEY ( sender_id ) REFERENCES "user" ( id ) ;
ALTER TABLE message ADD CONSTRAINT fk_receiver_id FOREIGN KEY ( receiver_id ) REFERENCES "user" ( id ) ;

CREATE SEQUENCE user_sequence START 1;
CREATE SEQUENCE message_sequence START 1;

