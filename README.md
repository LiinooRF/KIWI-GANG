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

## Publicar en AWS (learner lab)

Todo el proyecto queda en una sola EC2 con docker: el frontend con nginx en el puerto 80 y el
backend con mysql en el 8080. Como preparar la EC2 esta explicado en el README del repo
KIWI-GANG-API (solo hay que instalar docker).

El workflow `.github/workflows/aws.yml` compila el react y lo sube a la EC2 cada vez que algo
llega a staging, borrando la version anterior. En los pull request no corre.

En settings > secrets and variables > actions de este repo van dos secrets:

- `EC2_HOST`: la ip publica de la instancia
- `EC2_KEY`: el contenido completo de `labsuser.pem`

Si faltan el workflow avisa y no publica. Cuando se reinicia el lab la IP cambia, hay que
actualizar `EC2_HOST` y volver a correr el workflow desde la pestaña actions.

Para correrlo en local se copia `KiwiExpress/.env.example` como `.env`.

## Organizacion del trabajo

Las tareas estan repartidas en los issues del repositorio y cada uno trabaja en su propia
rama, despues se hace un pull request hacia staging para revisar los cambios entre todos.
