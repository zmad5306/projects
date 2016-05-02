var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    watch = require('gulp-watch'),
    Server = require('karma').Server;


gulp.task('default', ['clean', 'build-html', 'test']);

gulp.task('build-html', function() {
  return gulp.src(['src/**/*.html'], {base: './src/'})
         .pipe(useref())
         //.pipe(gulpif('*.js', uglify()))
         //.pipe(gulpif('*.css', uglify()))
         .pipe(gulp.dest('dist'));

});

gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('watch', function() {
  gulp.watch('/src/**/*', ['clean','build-html','test']);
});
