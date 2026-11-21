#!/bin/bash
# corre en la ec2 y lo llama el boton de deploy completo
set -e

command -v docker >/dev/null || sudo dnf install -y docker
sudo systemctl enable --now docker

sudo docker network create kiwi 2>/dev/null || true

# se borra lo de antes, la base parte vacia
sudo docker rm -f kiwi-api kiwi-db kiwi-front 2>/dev/null || true

sudo docker run -d --name kiwi-db --network kiwi --restart unless-stopped \
  -e MYSQL_ROOT_PASSWORD="$DB_PASSWORD" \
  -e MYSQL_DATABASE=kiwiexpress \
  mysql:9.7

sudo docker run -d --name kiwi-api --network kiwi --restart unless-stopped \
  -p 8080:8080 \
  -v /home/ec2-user/kiwiapi.jar:/app.jar \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://kiwi-db:3306/kiwiexpress \
  -e DB_USER=root \
  -e DB_PASSWORD="$DB_PASSWORD" \
  -e JWT_SECRET="$JWT_SECRET" \
  eclipse-temurin:21-jre java -jar /app.jar

sudo docker run -d --name kiwi-front --network kiwi --restart unless-stopped \
  -p 80:80 \
  -v /home/ec2-user/front:/usr/share/nginx/html:ro \
  nginx:alpine

echo "listo, pagina en el 80 y api en el 8080"
