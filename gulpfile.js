const {
    dest,
    src,
    series,
    parallel,
    watch
} = require('gulp');
const pug = require('gulp-pug');
const browserSync = require("browser-sync").create();
const sass = require('gulp-dart-sass');
const bulkSass = require('gulp-sass-bulk-import');
const svgSprite = require('gulp-svg-sprite');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mquery-packer');
const concat = require('gulp-concat');
const devip = require('dev-ip');
const autoprefixer = require('autoprefixer');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');

function compileHtml() {
    return src(['src/pages/index.pug','src/pages/test.pug'])
        .pipe(pug({
            pretty: true,
            basedir: './src/'

        }))
        .pipe(dest('build/'));
}

function server() {
    browserSync.init({
        server: {
            baseDir: "./build/",
            ghostMode: false
        },
        host: devip()
    });
    watch("build/").on('change', browserSync.reload);
}

function assets() {
    return src('assets/*')
        .pipe(dest('build/assets/'));
}
function fonts() {
    return src('assets/fonts/*')
        .pipe(dest('build/fonts/'));
}

function styles() {
    const plugins = [
        mqpacker(),
        autoprefixer()
    ];
    return src('src/scss/main.scss')
        .pipe(bulkSass())
        .pipe(sass({
            outputStyle: "expanded",
            // outputStyle: "compressed",
            allowEmpty: true
        }).on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(dest('build/'));
}

function scripts(){
    return src('src/**/*.js')
    .pipe(concat('script.js'))
    // .pipe(sourcemaps.init())
    // .pipe(terser())
    // .pipe(sourcemaps.write('../'))
    .pipe(dest('build/js'));
}

function watcher() {
    watch(['src/**/*.pug','src/**/*.js'], compileHtml);
    watch('src/**/*.scss', styles);
    watch('src/**/*.js', scripts);
    
}

function svg() {
    return src(['assets/fb.svg', 'assets/insta.svg'])
        .pipe(svgSprite({
            svg: { // General options for created SVG files
                xmlDeclaration: false, // Add XML declaration to SVG sprite
                doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
                namespaceIDs: false, // Add namespace token to all IDs in SVG shapes
                namespaceIDPrefix: '', // Add a prefix to the automatically generated namespaceIDs
                namespaceClassnames: false, // Add namespace token to all CSS class names in SVG shapes
                dimensionAttributes: true // Width and height attributes on the sprite
            },
            mode: {
                symbol: {
                    dest: './',
                    sprite: 'icons.svg'
                }
            },
        }))
        .pipe(dest('build/'));
}
exports.server = parallel(server, watcher);

exports.build = parallel(compileHtml, styles, assets, fonts, scripts);
exports.styles = series(styles);
exports.svg = series(svg);