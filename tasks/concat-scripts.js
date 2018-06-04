import gulp from 'gulp';
import uglify from 'gulp-uglify';

/**
 * Uglifies scripts for dist.
 */

export function script_dist() {
    return gulp.src([
            './.tmp/script.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('./.tmp/'));
}
