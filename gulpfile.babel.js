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
import util from 'gulp-util';
import ptu from 'gulp-pug-template-underscore';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import remapIstanbul from 'remap-istanbul/lib/gulpRemapIstanbul';

const javascriptTasks = () => {
  browserify('./src/javascripts/app.js').transform(babel).bundle()
    .on('error', (err) => {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(ptu({
      templateDirPath: 'src/pug/templates',
      prefix: 'tmp-',
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dest/javascripts'));
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

gulp.task('clean', () => del(['dest/javascripts/', 'test/', 'maps/', 'coverage/']));

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
  gulp.src(['src/javascripts/**/*.js', 'src/test/**/*.js', 'gulpfile.babel.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('build', ['clean'], () =>
  browserify('./src/javascripts/app.js').transform(babel).bundle()
    .on('error', (err) => {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(ptu({
      templateDirPath: 'src/pug/templates',
      prefix: 'tmp-',
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dest/javascripts'))
);

gulp.task('build:test', ['clean'], () => {
  const srcPath = 'src/test';
  recursive(srcPath, ['helper.js'], (err, files) => {
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
        .pipe(gulp.dest(destPath));
    });
  });
});

gulp.task('test', ['build:test'], () =>
  gulp.src(['test/**/*.js'])
    .pipe(mocha({ timeout: 10000 }))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 50 } }))
);


gulp.task('remap-istanbul', ['test'], () =>
  gulp.src('coverage/coverage-final.json')
    .pipe(remapIstanbul({
      basePath: 'maps/',
      reports: {
        json: 'coverage/coverage.json',
        html: 'coverage/lcov-report',
        lcovonly: 'coverage/lcov.info',
      },
    }))
);

gulp.task('default', ['lint', 'test']);
