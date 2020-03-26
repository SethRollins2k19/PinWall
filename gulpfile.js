const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const image = require('gulp-image');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


const paths = {
    styles: {
        src: 'src/css/**/*.css',
        dest: 'docs/styles/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'docs/scripts/'
    },
    images: {
        src: 'src/assets/**/*.*',
        dest: 'docs/assets/'
    }
};


function bSync() {
    browserSync.init({
        server: {
            baseDir: './docs'
        },
        notify: false
    })
}


function clean() {
    return del(['docs']);
}

function html(){
    return gulp.src('src/index.html')
        .pipe(gulp.dest('docs/'))
        .pipe(browserSync.reload({stream: true}))

}

function imagesLoad(){
    return gulp.src(paths.images.src)
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.reload({stream: true}))

}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(cleanCSS())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('style.css'))
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.reload({stream: true}))

}

function scripts() {
    return gulp.src(paths.scripts.src, {sourcemaps: true})
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.reload({stream: true}))

}

function watch() {
    gulp.watch('./src/index.html',html);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.images.src, imagesLoad);
}
const build = gulp.series(clean,html,gulp.parallel(styles,scripts),imagesLoad);


exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = gulp.series(imagesLoad,gulp.parallel(bSync,watch));
exports.build = build;
exports.default = build;