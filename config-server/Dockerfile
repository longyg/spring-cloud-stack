FROM java:8
ARG JAR_FILE
ADD target/${JAR_FILE} app.jar
ENV ENCRYPT_KEY=helloworld22
ENTRYPOINT ["java", "-jar", "/app.jar"]