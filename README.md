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

El workflow `.github/workflows/aws.yml` compila el react y lo sube a un bucket de S3 cada vez
que algo llega a staging. En los pull request no corre.

### Preparar el bucket (una sola vez)

1. Entrar al learner lab, darle a start lab y abrir la consola de AWS
2. En S3 crear un bucket en us-east-1, por ejemplo `kiwiexpress-front`, desmarcando
   "bloquear todo el acceso publico"
3. En propiedades del bucket prender "alojamiento de sitios web estaticos" con
   `index.html` como documento de indice y tambien como documento de error
   (asi las rutas de react no dan 404)
4. En permisos pegar esta politica para que cualquiera pueda ver la pagina:

```
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::kiwiexpress-front/*"
  }]
}
```

### Variables y secrets en GitHub

En settings > secrets and variables > actions del repo:

- variable `S3_BUCKET`: el nombre del bucket
- variable `VITE_API_URL`: la url del backend, por ejemplo `http://IP_DE_LA_EC2:8080/api/v1`
- secrets `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` y `AWS_SESSION_TOKEN`: salen del
  learner lab en "aws details > aws cli"

### Ojo: las credenciales del lab se vencen

Las tres credenciales duran como 4 horas y cambian cada vez que se reinicia el lab. Antes de
publicar hay que copiar las nuevas a los tres secrets (el session token tambien, es el que se
olvida) y despues correr el workflow a mano desde la pestaña actions con "run workflow".

Para correrlo en local se copia `KiwiExpress/.env.example` como `.env`.

## Organizacion del trabajo

Las tareas estan repartidas en los issues del repositorio y cada uno trabaja en su propia
rama, despues se hace un pull request hacia staging para revisar los cambios entre todos.
