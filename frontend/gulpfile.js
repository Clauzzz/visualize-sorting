var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');

sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(gulp.dest('./dist/styles/'));
});
gulp.task('scripts', function () {
  return gulp.src('./src/scripts/*.js')
  .pipe(gulp.dest('./dist/scripts/'));
});
gulp.task('html', function () {
    return gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./dist/html/'));
  });
gulp.task('images', function () {
    return gulp.src('./src/images/*.svg')
    .pipe(gulp.dest('./dist/images/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/styles/*.scss', gulp.series('sass'));
  gulp.watch('./src/scripts/*.js', gulp.series('scripts'));
  gulp.watch('./src/html/*.html', gulp.series('html'));
  gulp.watch('./src/images/*.svg', gulp.series('images'));
});