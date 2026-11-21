# KIWI-GANG - KiwiExpress

Proyecto de la asignatura DSY1104 Desarrollo FullStack II de Duoc UC.

KiwiExpress es una empresa de transporte y distribucion de paquetes que opera en la Region
Metropolitana. Este sitio web permite que los clientes soliciten sus envios, revisen el estado
de sus paquetes con un codigo de seguimiento, y que los administradores gestionen los envios
y usuarios desde un panel aparte.

## Integrantes

- LiinooRF
- TomAlig
- ignmartinezt

## Tecnologias

- React 19
- Vite
- React Router
- react-bootstrap
- El sitio esta publicado con GitHub Pages

## Como correrlo

```
cd KiwiExpress
npm install
npm run dev
```

Y para generar la version de produccion se usa npm run build.

Las pruebas unitarias se hacen con Jasmine y Karma, con `npm test`.

## Mockups

Los mockups del sitio los hicimos en Figma antes de programar y estan en la carpeta docs/mockups.

## Como verlo

El sitio esta publicado en https://liinoorf.github.io/KIWI-GANG/

## Deploy a AWS (learner lab)

cada repo despliega lo suyo a la ec2 automaticamente cuando algo llega a staging:

- este repo compila el react y renueva la pagina (nginx, puerto 80)
- el repo KIWI-GANG-API sube el jar y renueva la api (puerto 8080) con mysql adentro

los dos tambien se pueden lanzar a mano con el boton "run workflow" de la pestaña
actions, y los dos instalan docker solos si la maquina es nueva.

### secrets en github (en este repo)

en settings > secrets and variables > actions:

- `EC2_HOST`: la ip publica de la instancia
- `EC2_KEY`: el contenido completo de `labsuser.pem`

(`DB_PASSWORD` y `JWT_SECRET` van en el repo del api, no aca)

si faltan los secrets el workflow avisa y no despliega.

### preparar una ec2 (cualquiera sirve)

1. crear una instancia amazon linux 2023 con el key pair `vockey`
2. abrir los puertos 22 (ssh), 80 (la pagina) y 8080 (la api)
3. asociarle una elastic ip para que la ip no cambie al reiniciar (recomendado)

la base de datos no se borra en cada deploy, asi los usuarios y las ordenes se
mantienen. para correr el frontend en local se copia `KiwiExpress/.env.example`
como `.env`.

## Organizacion del trabajo

Las tareas estan repartidas en los issues del repositorio y cada uno trabaja en su propia
rama, despues se hace un pull request hacia staging para revisar los cambios entre todos.
