var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var url = require('url');
var serve = require('gulp-webserver-fast');

gulp.task('sass', function () {
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(gulp.dest('dist/css/'))
});


gulp.task('concat',function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('concat.js'))
        .pipe(gulp.dest('dist/js/'))
});


gulp.task('server',['sass','concat'],function () {
    gulp.watch('src/sass/*.scss',['sass'],function () {
        console.log('sass file changed')
    });
    gulp.watch('src/js/*',['concat']);

    return gulp.src('./')
        .pipe(serve({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});


gulp.task('default',['server']);