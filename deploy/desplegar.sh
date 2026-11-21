#!/bin/bash
# este script corre EN LA EC2 y lo llama el workflow de github actions.
# deja el proyecto completo arriba: la base de datos, la api y la pagina.
# borra los contenedores de antes y crea los nuevos, la base parte vacia.

set -e

# si la maquina es nueva y no tiene docker, se instala solo
command -v docker >/dev/null || sudo dnf install -y docker
sudo systemctl enable --now docker

# la red interna donde se ven los tres contenedores
sudo docker network create kiwi 2>/dev/null || true

# se borra todo lo del deploy anterior
sudo docker rm -f kiwi-api kiwi-db kiwi-front 2>/dev/null || true

# 1) la base de datos (mysql, sin volumen: no guarda nada entre deploys)
sudo docker run -d --name kiwi-db --network kiwi --restart unless-stopped \
  -e MYSQL_ROOT_PASSWORD="$DB_PASSWORD" \
  -e MYSQL_DATABASE=kiwiexpress \
  mysql:9.7

# 2) la api con el jar nuevo. si parte antes que mysql se cae y docker la reinicia sola
sudo docker run -d --name kiwi-api --network kiwi --restart unless-stopped \
  -p 8080:8080 \
  -v /home/ec2-user/kiwiapi.jar:/app.jar \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://kiwi-db:3306/kiwiexpress \
  -e DB_USER=root \
  -e DB_PASSWORD="$DB_PASSWORD" \
  -e JWT_SECRET="$JWT_SECRET" \
  eclipse-temurin:21-jre java -jar /app.jar

# 3) la pagina (nginx mostrando los archivos que compila react)
sudo docker run -d --name kiwi-front --network kiwi --restart unless-stopped \
  -p 80:80 \
  -v /home/ec2-user/front:/usr/share/nginx/html:ro \
  nginx:alpine

echo "listo: la pagina en el puerto 80 y la api en el 8080"
