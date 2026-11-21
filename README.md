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

Todo el proyecto se despliega con UN solo workflow desde este repo:
`.github/workflows/deploy.yml`. Compila el frontend y el backend (lo baja del repo
KIWI-GANG-API), y sube todo a una sola EC2 con docker: la pagina con nginx en el
puerto 80, la api en el 8080 y mysql adentro. Corre solo cuando algo llega a staging,
o a mano con el boton "run workflow" de la pestaña actions.

En settings > secrets and variables > actions de ESTE repo van los cuatro secrets:

- `EC2_HOST`: la ip publica de la instancia
- `EC2_KEY`: el contenido completo de `labsuser.pem`
- `DB_PASSWORD`: la clave que va a tener mysql, cualquiera
- `JWT_SECRET`: la clave para firmar los token del login, 32 caracteres o mas

Si faltan los secrets el workflow avisa y no despliega.

### preparar una ec2 (cualquiera sirve)

1. crear una instancia amazon linux 2023 con el key pair `vockey`
2. abrir los puertos 22 (ssh), 80 (la pagina) y 8080 (la api)
3. asociarle una elastic ip para que la ip no cambie al reiniciar (opcional pero recomendado)

Docker no hay que instalarlo, lo instala el deploy solo si falta. Despues de eso,
cada push a staging o cada boton de "run workflow" deja todo arriba. Como la base
parte vacia en cada deploy, la api sola carga los usuarios y productos de prueba.

Si se cambia la ip de la ec2, actualizar `EC2_HOST` y apretar run workflow de nuevo.

Para correr el frontend en local se copia `KiwiExpress/.env.example` como `.env`.

## Organizacion del trabajo

Las tareas estan repartidas en los issues del repositorio y cada uno trabaja en su propia
rama, despues se hace un pull request hacia staging para revisar los cambios entre todos.
