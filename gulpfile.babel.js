import gulp from 'gulp';
import plumber from 'gulp-plumber';
import del from 'del';
import eslint from 'gulp-eslint';
import browserify from 'browserify';
import babel from 'babelify';
import recursive from 'recursive-readdir';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import watch from 'gulp-watch';
import uglify from 'gulp-uglify';
import util from 'gulp-util';
import ptu from 'gulp-pug-template-underscore';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import istanbul from 'gulp-istanbul';
import remapIstanbul from 'remap-istanbul/lib/gulpRemapIstanbul';

gulp.task('javascriptTasks', (callback) => {
  browserify({
    entries: './src/javascripts/app.js',
    debug: true,
  })
    .transform(babel)
    .bundle()
    .on('error', (err) => {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ptu({
      templateDirPath: 'src/pug/templates',
      prefix: 'tmp-',
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dest/javascripts'))
    .on('end', () => {
      callback();
    });
});

gulp.task('stylesheetTasks', () => {
  gulp.src(['src/sass/**/*.scss', '!src/sass/{vendors,modules}/**/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dest/stylesheets'));
});

gulp.task('htmlTasks', () => {
  gulp.src(['src/pug/**/*.pug', '!src/pug/{templates,modules,layouts}/**/*.pug'])
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest('dest'));
});

gulp.task('clean', () => del(['test/', 'maps/', 'coverage/']));

gulp.task('start', () => {
  gulp.start(['javascriptTasks', 'stylesheetTasks', 'htmlTasks']);
});

gulp.task('develop', () => {
  gulp.start('start');
  watch(['src/javascripts/**/*.js', 'src/pug/**/*.pug'], () => gulp.start('javascriptTasks'));
  watch(['src/sass/**/*.scss'], () => gulp.start('stylesheetTasks'));
  watch(['src/pug/**/*.pug'], () => gulp.start('htmlTasks'));
});

gulp.task('lint', ['clean'], () => {
  gulp.src(['src/javascripts/**/*.js', 'src/test/**/*.js', 'gulpfile.babel.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

gulp.task('build', ['clean', 'lint'], () => {
  browserify({
    entries: './src/javascripts/app.js',
    debug: true,
  })
    .transform(babel)
    .bundle()
    .on('error', (err) => {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(ptu({
      templateDirPath: 'src/pug/templates',
      prefix: 'tmp-',
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dest/javascripts'))
});

gulp.task('build:test', ['clean', 'lint'], (callback) => {
  const srcPath = 'src/test';
  recursive(srcPath, ['helper.js', 'util.js'], (err, files) => {
    let doneCount = 0;
    files.forEach((file) => {
      const fileName = file.match(new RegExp('(?!.*/).', 'g'), '').join('');
      const destPath = file.replace(new RegExp(`src/|/${fileName}`, 'g'), '');
      browserify(file)
        .transform(babel)
        .bundle()
        .on('error', (err) => console.log(`Error : ${err.message}`))
        .pipe(source(fileName))
        .pipe(buffer())
        .pipe(ptu({
          templateDirPath: 'src/pug/templates',
          prefix: 'tmp-',
        }))
        .pipe(gulp.dest(destPath))
        .on('end', () => {
          doneCount++;
          if (doneCount === files.length) {
            callback();
          }
        });
    });
  });
});

gulp.task('default', ['lint', 'test']);
