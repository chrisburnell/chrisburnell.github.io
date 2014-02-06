/**
 * Gulp Configuration
 */

var gulp = require('gulp'),
    autoprefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    svgmin = require('gulp-svgmin'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

var cssDir = 'css/',
    imagesDir = 'images/';

// Compile SCSS, autoprefix CSS3, and minify
gulp.task('styles', function() {
    return gulp.src(cssDir + 'ravenous.scss')
        .pipe(sass({ style: 'expanded', includePaths: [cssDir] }))
        .pipe(autoprefix("last 2 versions", "> 1%"))
        .pipe(gulp.dest(cssDir))
        .pipe(rename('ravenous.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDir))
        .pipe(livereload(server))
        .pipe(notify({ title: 'Gulp', message: 'CSS compiled.', onLast: true }));
});

// Crush images
gulp.task('images', function() {
    return gulp.src(imagesDir + '**/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(imagesDir))
        .pipe(livereload(server))
        .pipe(notify({ title: 'Gulp', message: 'Images crushed.', onLast: true }));
});

// Crush SVGs
gulp.task('svg', function() {
    return gulp.src(imagesDir + '**/*')
        .pipe(svgmin())
        .pipe(gulp.dest(imagesDir))
        .pipe(livereload(server))
        .pipe(notify({ title: 'Gulp', message: 'SVGs crushed.', onLast: true }));
});

// Default task
gulp.task('default', function() {
    gulp.start('styles');
});

// Watch files and perform tasks
gulp.task('watch', function() {

    // Listen on port 35729
    server.listen(8888, function(err) {
        if (err) {
            return console.log(err)
        };
        // Watch CSS files
        gulp.watch(cssDir + '**/*.scss', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.start('styles');
        });
        // Watch images and SVGs
        gulp.watch(imagesDir + '**/*', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.start('images');
            gulp.start('svg');
        });
    });

});