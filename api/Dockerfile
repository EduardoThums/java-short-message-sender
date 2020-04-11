FROM java:8-jdk-alpine

WORKDIR /usr/app

COPY ./target/api.jar .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "-Dspring.profiles.active=dev", "api.jar"]