# Respaldo de las pruebas

Evidencia de la corrida de las pruebas unitarias con Jasmine y Karma.

- `cobertura-resumen.png`: reporte de cobertura por carpeta
- `cobertura-detalle.png`: detalle de un componente con las lineas cubiertas
- `tabla-cobertura.txt`: la misma tabla pero en texto
- `salida-pruebas.txt`: lo que imprime la consola al correr npm test

## Resultado de esta corrida

38 pruebas, todas pasaron, ejecutadas en ChromeHeadless.

| Metrica | Cobertura |
|---|---|
| Statements | 80.26% |
| Branches | 63.88% |
| Functions | 85.13% |
| Lines | 79.12% |

Para volver a generar esto hay que correr `npm test` dentro de la carpeta
KiwiExpress y el reporte queda en `KiwiExpress/coverage/`.
