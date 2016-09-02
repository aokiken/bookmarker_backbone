import gulp from 'gulp';
import plumber from 'gulp-plumber';
import eslint from 'gulp-eslint';
import watch from 'gulp-watch';
import util from 'gulp-util';
import concat from 'gulp-concat-util';
import ptu from 'gulp-pug-template-underscore';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

const javascriptTasks = () => {
  util.log('javascriptTasks...', Date.now());
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
    'src/javascripts/routes/**/*.js',
  ])
    .pipe(concat('app.js'))
    .pipe(concat.header('(function(window) {\n'))
    .pipe(concat.footer('\n})(window);'))
    .pipe(ptu({
      templateDirPath: 'src/pug/templates',
      prefix: 'tmp-',
    }))
    .pipe(gulp.dest('dest/javascripts'))
    .on('end', () =>
      util.log('javascriptTasks done.', Date.now()));
};

const stylesheetTasks = () => {
  util.log('stylesheetTasks...');
  gulp.src(['src/sass/**/*.scss', '!src/sass/{vendors,modules}/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dest/stylesheets'))
    .on('end', () => util.log('stylesheetTasks done.')
  );
};

const htmlTasks = () => {
  util.log('htmlTasks...');
  gulp.src(['src/pug/**/*.pug', '!src/pug/{templates,modules,layouts}/**/*.pug'])
    .pipe(plumber())
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dest'))
    .on('end', () =>
      util.log('htmlTasks done.'));
};

gulp.task('start', () => {
  javascriptTasks();
  stylesheetTasks();
  htmlTasks();
});
gulp.task('develop', () => {
  gulp.start('start');
  watch(['src/javascripts/**/*.js', 'src/pug/**/*.pug'], javascriptTasks);
  watch(['src/sass/**/*.scss'], stylesheetTasks);
  watch(['src/pug/**/*.pug'], htmlTasks);
});

gulp.task('lint', () =>
  gulp.src(['src/javascripts/**/*.js', 'gulpfile.babel.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('es6', () => {
  gulp.src('bundle.js')
    .pipe(ptu({
      templateDirPath: 'src/pug/templates',
      prefix: 'tmp-',
    }))
    .pipe(gulp.dest('dest/javascripts'));
});
