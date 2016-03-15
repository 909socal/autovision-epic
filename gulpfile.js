'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rimraf = require('rimraf');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

var config = {
  paths: {
    dest: {
      js: './public/js/',
      css: './public/css/',
      html: './public/html/',
      images: './public/images/',
      public: './public/'
    },
    src: {
      js: './src/js/**/*.js',
      sass: './src/css/**/*.scss',
      html: './src/html/**/*.html',
      images: './src/**/*.+(jpg|png)'
    }
  }
};

gulp.task('clean-js', function(cb) {
  rimraf(config.paths.dest.js, cb);
});
gulp.task('clean-css', function(cb) {
  rimraf(config.paths.dest.css, cb);
});
gulp.task('clean-html', function(cb) {
  rimraf(config.paths.dest.html, cb);
});
gulp.task('clean-images', function(cb) {
  rimraf(config.paths.dest.images, cb);
});

gulp.task('js', ['clean-js'], function() {
  return gulp.src(config.paths.src.js)
    .pipe(plumber())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ngAnnotate().on('error', gutil.log))

    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.dest.js));
});

gulp.task('css', ['clean-css'], function() {
  return gulp.src(config.paths.src.sass)
    .pipe(sass())
    .pipe(gulp.dest(config.paths.dest.css));
});

gulp.task('html', ['clean-html'], function() {
  return gulp.src(config.paths.src.html)
    .pipe(gulp.dest(config.paths.dest.html))
});

gulp.task('images', ['clean-images'], function() {
  return gulp.src(config.paths.src.images)
    .pipe(gulp.dest(config.paths.dest.public))
});


gulp.task('watch', function() {
  gulp.watch(config.paths.src.sass, ['css']);
  gulp.watch(config.paths.src.js, ['js']);
  gulp.watch(config.paths.src.html, ['html']);
  gulp.watch(config.paths.src.images, ['images']);
});

gulp.task('build', ['js', 'css', 'html', 'images']);
gulp.task('default', ['build', 'watch']);
