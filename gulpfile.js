/* eslint import/no-unresolved: 0 */

require('dotenv').config();
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulp.task('nodemon', ['server'], () => 
  $.nodemon({
    script: './dist/app.js',
    ext: 'js',
    env: { NODE_ENV: process.env.NODE_ENV || 'development' }
  }));

gulp.task('server', () =>
  gulp.src('server/**/*.js')
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist')));

gulp.task('watch', () => gulp.watch('./server/app.js', ['server']));

gulp.task('build', ['nodemon']);
gulp.task('serve', ['build', 'watch']);
gulp.task('default', ['serve']);