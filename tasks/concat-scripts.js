import gulp from 'gulp';
import uglify from 'gulp-uglify';

/**
 * Uglifies scripts for dist.
 */

export function uglifyScript_dist() {
    return gulp.src([
            './app/script/script-header.js',
            './app/script/script-footer.js'
        ])
        .pipe(uglify())
        .pipe(gulp.dest('./.tmp/'));
}

