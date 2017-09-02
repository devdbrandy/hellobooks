import path from 'path';
import gulp from 'gulp';
import babel from 'gulp-babel';
import Cache from 'gulp-file-cache';
import eslint from 'gulp-eslint';
import runSequence from 'run-sequence';
import nodemon from 'gulp-nodemon';
import plumber from 'gulp-plumber';

const cache = new Cache();

/* config */
const { scripts, app } = {
  scripts: [
    path.join('server', '**', '*.js')
  ],
  app: path.join('dist', 'bin', 'www.js')
};

const nodemonConfig = {
  script: app,
  ignore: ['node_modules'],
  env: {
    NODE_ENV: 'development'
  }
};

/* default task */
gulp.task('default', () => {
  runSequence(
    ['eslint'],
    ['compile'],
    ['nodemon'],
    ['watch']
  );
});

/* eslint */
gulp.task('eslint', () => {
  gulp
    .src(scripts)
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format());
});

/* compiler */
gulp.task('compile', () => {
  gulp
    .src('server/**/*.js')
    .pipe(cache.filter())
    .pipe(babel({ presets: ['es2015', 'stage-2'] }))
    .pipe(cache.cache())
    .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', () => nodemon(nodemonConfig));

gulp.task('watch', () => {
  gulp.watch(scripts, ['eslint', 'compile']);
});
