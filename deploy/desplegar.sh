#!/bin/bash
# este script corre EN LA EC2 y lo llama el workflow del frontend.
# renueva la pagina: borra el contenedor de nginx y crea uno con los archivos nuevos.

set -e

# si la maquina es nueva y no tiene docker, se instala solo
command -v docker >/dev/null || sudo dnf install -y docker
sudo systemctl enable --now docker

# la misma red interna que usa el backend
sudo docker network create kiwi 2>/dev/null || true

# fuera el contenedor viejo, arriba el nuevo con la pagina recien compilada
sudo docker rm -f kiwi-front 2>/dev/null || true
sudo docker run -d --name kiwi-front --network kiwi --restart unless-stopped \
  -p 80:80 \
  -v /home/ec2-user/front:/usr/share/nginx/html:ro \
  nginx:alpine

echo "pagina desplegada en el puerto 80"
