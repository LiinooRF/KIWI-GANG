// Se usa la extensión .cjs (CommonJS) porque el package.json de KiwiExpress
// tiene "type": "module". Con .js, "module.exports" daría error.
module.exports = function (config) {
  config.set({
    basePath: '',

    // jasmine: define cómo se escriben las pruebas (describe, it, expect)
    // webpack: lo necesita karma-webpack para empaquetar los specs antes de correrlos
    frameworks: ['jasmine', 'webpack'],

    // Dónde están los tests. "**" significa "cualquier subcarpeta".
    // watched: false = no vuelve a correr los tests al guardar (solo corre una vez)
    files: [
      { pattern: 'tests/**/*.spec.js', watched: false },
      { pattern: 'tests/**/*.spec.jsx', watched: false }
    ],

    // Antes de ejecutar cada spec, pasa por webpack.
    // Chrome no entiende JSX ni "import", así que se compila primero.
    preprocessors: {
      'tests/**/*.spec.js': ['webpack'],
      'tests/**/*.spec.jsx': ['webpack']
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            // Aplica esta regla a todos los archivos .js y .jsx...
            test: /\.jsx?$/,
            // ...menos a las librerías instaladas, que ya vienen compiladas
            exclude: /node_modules/,
            use: {
              // babel-loader le pasa cada archivo a Babel para traducirlo
              loader: 'babel-loader',
              options: {
                presets: [
                  // preset-env: convierte JavaScript moderno a uno que el navegador entienda
                  '@babel/preset-env',
                  // preset-react: convierte el JSX (<Boton />) en JavaScript normal.
                  // runtime "automatic" evita tener que escribir "import React" en cada archivo
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          }
        ]
      },
      // Permite importar sin escribir la extensión:
      // import Boton from '../src/components/layout/Boton'  (en vez de Boton.jsx)
      resolve: { extensions: ['.js', '.jsx'] }
    },

    //NOTA TESTS DE PROPS - BOTON
    /*
    Instale los paquetes karma-firefox-launcher, @testing-library/react y karma-spec-reporter con --save-dev 
    para testear en mi Firefox, cambiando el browser. Lo deje como lo encontre y los test fueron exitosos.
    */

    // Chrome sin ventana: más rápido y no se abre ni se cierra nada en pantalla
    browsers: ['ChromeHeadless'],

    // Corre todos los tests una vez y termina (si no, Karma queda esperando para siempre)
    singleRun: true,

    // Muestra una barra de progreso y el resultado final en la terminal
    reporters: ['progress']
  })
}