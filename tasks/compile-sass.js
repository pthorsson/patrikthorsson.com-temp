import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cssnano from 'gulp-cssnano';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sass from 'gulp-sass';
import { revNr } from './';

const autoprefixerConfig = {
    browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR'
    ]
};

/**
 * Sass compilation tasks for development and distribution.
 */

export function compileSass_dev() {
    return gulp.src('app/style.scss')
        .pipe(plumber(function(error) {
            console.log(error.message);
            this.emit('end');
        }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(postcss([
            autoprefixer(autoprefixerConfig)
        ]))
        .pipe(gulp.dest('.tmp'));
};

export function compileSass_dist() {
    return gulp.src('app/styles.scss')
        .pipe(plumber(function(error) {
            console.log(error.message);
            this.emit('end');
        }))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(postcss([
            autoprefixer(autoprefixerConfig)
        ]))
        .pipe(cssnano())
        .pipe(gulp.dest('.tmp'));
}
