// Se usa la extensión .cjs (CommonJS) porque el package.json de KiwiExpress
// tiene "type": "module". Con .js, "module.exports" daría error.
const path = require('path')

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

      // NUEVO: genera mapas que relacionan el código compilado con el original.
      // Sirven para que el reporte de cobertura muestre las líneas reales de cada archivo.
      devtool: 'inline-source-map',

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
          },

          // NUEVO: mide la cobertura del código de src/.
          // "Instrumentar" = agregar contadores invisibles que anotan qué líneas se ejecutaron
          // mientras corren los tests. enforce: 'post' hace que esta regla corra DESPUÉS de Babel,
          // e include limita la medición a src/ (así no se miden los tests ni las librerías).
          {
            test: /\.jsx?$/,
            include: path.resolve(__dirname, 'src'),
            enforce: 'post',
            use: {
              loader: '@jsdevtools/coverage-istanbul-loader',
              // esModules: true le avisa que el código usa import/export
              options: { esModules: true }
            }
          }
        ]
      },

      // Permite importar sin escribir la extensión:
      // import Boton from '../src/components/layout/Boton'  (en vez de Boton.jsx)
      resolve: { extensions: ['.js', '.jsx'] }
    },

    // Chrome sin ventana: más rápido y no se abre ni se cierra nada en pantalla
    browsers: ['ChromeHeadless'],

    // Corre todos los tests una vez y termina (si no, Karma queda esperando para siempre)
    singleRun: true,

    // NUEVO: se suma 'coverage', que arma el reporte con lo que midieron los contadores
    reporters: ['progress', 'coverage'],

    // NUEVO: dónde y en qué formatos se guarda el reporte
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        // Reporte navegable: se abre coverage/html/index.html en el navegador
        { type: 'html', subdir: 'html' },
        // Tabla de cobertura por archivo guardada en coverage/cobertura.txt
        { type: 'text', subdir: '.', file: 'cobertura.txt' },
        // Resumen con los porcentajes totales, que se imprime en la terminal
        { type: 'text-summary' }
      ]
    }
  })
}