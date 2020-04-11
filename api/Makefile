run-api:
	make stop-all
	docker-compose up -d --build

run-dev-services:
	make stop-all
	docker-compose up -d database

stop-all:
	docker-compose down