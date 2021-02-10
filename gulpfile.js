var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series(['sass'], function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", gulp.series(['sass']));
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./*.js").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series(['serve']));