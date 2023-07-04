// Crear una primer tarea con Gulp. Las tareas son funciones

function tarea(done) {
    console.log('Mi primer tarea...');

    done(); /* para saber que finalizo la tarea */
}

/* IMPORTAR LOS MODULOS */
const { src, dest, watch, series, parallel } = require('gulp');
// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// Compilar SASS con Gulp
function css(done) {
    // Identificar el archivo
    src('src/scss/app.scss')

    // Compilar el archivo
    .pipe(sass({outputStyle: 'compressed'})) // outputStyle: 'compressed' o 'expanded'
    .pipe(postcss( [autoprefixer() ])) // crear versiones compatibles con navegadores que no soporten la nueva sintaxis

    // Guardar el archivo
    .pipe(dest('build/css'))

    done();
}


// Escuchar por los cambios
function dev() {
    // watch('src/scss/app.scss', css);
    watch('src/scss/**/*.scss', css); // comodin
    // watch('src/img/**/*', imagenes); // comodin
}

exports.css = css;
exports.dev = dev;
exports.tarea = tarea;
// Ejecutar tarea por default
// series - Se inicia una tarea, y hasta que finaliza, incia la siguiente
// parallel - Todas inician al mismo tiempo
exports.default = series(css, dev);

// Llamar la tarea
// exports.tarea = tarea;