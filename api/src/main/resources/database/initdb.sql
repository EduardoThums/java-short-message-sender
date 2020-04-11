CREATE TABLE "user" (
	id int PRIMARY KEY,
	username varchar (256) NOT NULL,
  password varchar(512) NOT NULL,
  image_url varchar (2048) NOT NULL
);


CREATE TABLE IF NOT EXISTS message (
	id int PRIMARY KEY, text varchar NOT NULL,
	subject varchar NOT NULL,
  created_date TIMESTAMP DEFAULT now(),
  sender_id int NOT NULL,
  receiver_id int NOT NULL,
  is_read boolean DEFAULT FALSE
);


ALTER TABLE message ADD CONSTRAINT fk_sender_id
FOREIGN KEY (sender_id) REFERENCES "user" (id) ;


ALTER TABLE message ADD CONSTRAINT fk_receiver_id
FOREIGN KEY (receiver_id) REFERENCES "user" (id) ;


CREATE SEQUENCE user_sequence
START 1;


CREATE SEQUENCE message_sequence
START 1;