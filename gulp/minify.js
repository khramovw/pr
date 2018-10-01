var gulp   = require('gulp');
const minify = require('gulp-minify');

gulp.task('compress', function() {
    gulp.src(['dist/js/*.js', 'dist/js/*.mjs'])
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
});