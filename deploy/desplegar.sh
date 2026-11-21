#!/bin/bash
# corre en la ec2, renueva el contenedor de la pagina
set -e

command -v docker >/dev/null || sudo dnf install -y docker
sudo systemctl enable --now docker

sudo docker network create kiwi 2>/dev/null || true

sudo docker rm -f kiwi-front 2>/dev/null || true
sudo docker run -d --name kiwi-front --network kiwi --restart unless-stopped \
  -p 80:80 \
  -v /home/ec2-user/front:/usr/share/nginx/html:ro \
  nginx:alpine

echo "pagina lista en el puerto 80"
