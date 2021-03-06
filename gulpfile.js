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

function compileHtml() {
    return src('src/*.pug')
        .pipe(pug({
            pretty: true,
            basedir: './src/'

        }))
        .pipe(dest('docs/'));
}

function server() {
    browserSync.init({
        server: {
            baseDir: "./docs/"
        }
    });
    watch("docs/").on('change', browserSync.reload);
}

function assets() {
    return src('assets/**/*')
        .pipe(dest('docs/'));
}

function styles() {
    const plugins = [
        mqpacker()
    ];
    return src('src/scss/main.scss')
        .pipe(bulkSass())
        .pipe(sass({
            outputStyle: "expanded",
            allowEmpty: true
        }).on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(dest('docs/'));
}

function watcher() {
    watch(['src/**/*.pug','src/**/*.js'], compileHtml);
    watch('src/**/*.scss', styles);
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
        .pipe(dest('docs/'));
}
exports.server = parallel(server, watcher);
exports.build = parallel(compileHtml, styles, assets);
exports.styles = series(styles);
exports.svg = series(svg);