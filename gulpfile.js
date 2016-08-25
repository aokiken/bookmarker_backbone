'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var util = require('gulp-util');
var concat = require('gulp-concat-util');
var ptu = require('gulp-pug-template-underscore');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var javascriptTasks = function () {
  util.log('javascriptTasks...',Date.now());
  gulp.src([
    'src/javascripts/vendors/jquery.js',
    'src/javascripts/vendors/underscore.js',
    'src/javascripts/vendors/backbone.js',
    'src/javascripts/vendors/backbone.localStorage.js',
    'src/javascripts/vendors/moment.js',
    'src/javascripts/libraries/**/*.js',
    'src/javascripts/app.js',
    'src/javascripts/models/**/*.js',
    'src/javascripts/collections/**/*.js',
    'src/javascripts/views/**/*.js',
    'src/javascripts/routes/**/*.js'
  ])
    .pipe(concat('app.js'))
    .pipe(concat.header("(function(window) {\n"))
    .pipe(concat.footer("\n})(window);"))
    .pipe(ptu({
      templateDirPath: 'src/pug/templates',
      prefix: 'tmp-'
    }))
    .pipe(gulp.dest('dest/javascripts')).on('end', function () {
    util.log('javascriptTasks done.',Date.now());
  });
};
var stylesheetTasks = function () {
  util.log('stylesheetTasks...');
  gulp.src(['src/sass/**/*.scss', '!src/sass/{vendors,modules}/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dest/stylesheets')).on('end', function () {
    util.log('stylesheetTasks done.')
  });
};
var htmlTasks = function () {
  util.log('htmlTasks...');
  gulp.src(['src/pug/**/*.pug', '!src/pug/{templates,modules,layouts}/**/*.pug'])
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dest')).on('end', function () {
    util.log('htmlTasks done.')
  });
};

var developTasks = function () {
  startTasks();
  watch(['src/javascripts/**/*.js', 'src/pug/**/*.pug'], javascriptTasks);
  watch(['src/sass/**/*.scss'], stylesheetTasks);
  watch(['src/pug/**/*.pug'], htmlTasks);
};

var startTasks = function(){
  javascriptTasks();
  stylesheetTasks();
  htmlTasks();
};

gulp.task('start',startTasks);
gulp.task('develop', developTasks);