import gulp from 'gulp';
import uglify from 'gulp-uglify';

/**
 * Uglifies scripts for dist.
 */

export function uglifyScript_dist() {
    return gulp.src([
            './app/script.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('./.tmp/'));
}
