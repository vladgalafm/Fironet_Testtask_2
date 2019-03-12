const gulp = require("gulp");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");

gulp.task('sass', function(){
  gulp.src('src/scss/main.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(rename('style.css'))
    .pipe(autoprefixer({
      browsers: ['> 0.2%', 'last 2 versions', 'not dead'],
      cascade: false
    }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('watch', ['sass'], function(){
  gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch']);

gulp.task('build', function () {
  gulp.src('src/css/style.css')
    .pipe(gulp.dest('build/css'));
  gulp.src('src/js/*.js')
    .pipe(gulp.dest('build/js'));
  gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});