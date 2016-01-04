var gulp = require('gulp');
var sass = require('gulp-sass');
var neat = require('node-neat').includePaths;
var livereload = require('gulp-livereload');

gulp.task('sass', function () {
  gulp.src('./src/scss/*.scss')
    .pipe(sass({
    	includePaths: ['styles'].concat(neat)
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload());
});
 
gulp.task('sass:watch', function () {
	livereload.listen(); 
  gulp.watch('./src/scss/style.scss', ['sass']);
}); 

