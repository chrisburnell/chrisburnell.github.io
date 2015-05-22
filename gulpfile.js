/**
 * Ravenous gulp Configuration
 */

// Define gulp objects
var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb      = require('gulp-csscomb'),
    minifycss    = require('gulp-minify-css'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'),
    watch        = require('gulp-watch');

// Define the locations of our assets
var cssPath = 'css/',
    jsPath =  'js/',
    includesPath = '_includes';

// -----------------------------------------------------------------------------

// Compile SASS, autoprefix, generate sourcemaps, and minify
gulp.task('css', function() {
    return gulp.src(cssPath + 'ravenous.scss')
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%']
        }))
        .pipe(csscomb())
        .pipe(gulp.dest(cssPath))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss({
            advanced: false,
            roundingPrecision: 3
        }))
        .pipe(gulp.dest(cssPath))
        .pipe(notify({
            title: 'gulp',
            message: 'CSS compiled.',
            onLast: true
        }));
});

// Compile SASS, autoprefix, generate sourcemaps, and minify
gulp.task('critical', function() {
    return gulp.src(cssPath + 'critical.scss')
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true,
            style: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 1%']
        }))
        .pipe(csscomb())
        .pipe(gulp.dest(cssPath))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss({
            advanced: false,
            keepSpecialComments: 0,
            roundingPrecision: 3
        }))
        .pipe(gulp.dest(cssPath))
        .pipe(rename({
            basename: "css-critical",
            extname: ".html"
        }))
        .pipe(gulp.dest(includesPath))
        .pipe(notify({
            title: 'gulp',
            message: 'Critical CSS compiled.',
            onLast: true
        }));
});

// Minify JS
gulp.task('js', function() {
    return gulp.src([jsPath + '*.js', '!' + jsPath + '*.min.js'])
        .pipe(plumber())
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(jsPath))
        .pipe(notify({
            title: 'gulp',
            message: 'JS compiled.',
            onLast: true
        }));
});

// -----------------------------------------------------------------------------

// Default task
gulp.task('default', function() {
    gulp.start('css');
    gulp.start('critical');
    gulp.start('js');
});

// -----------------------------------------------------------------------------

// Watch files and perform the appropriate tasks
gulp.task('watch', ['css', 'js'], function() {
    watch(cssPath + '**/*.scss', function() {
        gulp.start('css');
    });
    watch(jsPath + '**/*.js', function() {
        gulp.start('js');
    });
    notify({
        title: 'gulp',
        message: 'CSS & JS compiled.'
    });
});
