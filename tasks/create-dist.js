import gulp from 'gulp';
import clean from 'gulp-clean';
import replace from 'gulp-replace';
import symlink from 'gulp-symlink';
import vfs from 'vinyl-fs';
import path from 'path';

/**
 * Copies app files to 
 */

export function copyApp() {
    return gulp.src([
            'pm2.json',
            'app/index.html',
            'app/images/**',
            'app/pages/**/*.html'
        ], {
            base: './'
        })
        .pipe(gulp.dest('dist/'));
}

export function copyTemp() {
    return gulp.src([
            '.tmp/style.*.min.css',
            '.tmp/script.*.min.js'
        ], {
            base: './.tmp'
        })
        .pipe(gulp.dest('dist/app'));
}

export function updatePM2File(rootPath) {
    return function _updatePM2File() {
        return gulp.src('dist/pm2.json')
            .pipe(replace('PATH_TO_APP', path.join(rootPath, 'server')))
            .pipe(gulp.dest('dist/'));
    }
}

export function cleanDist() {
    return gulp.src('dist', { read: false, force: true, allowEmpty: true })
        .pipe(clean());
}

export function cleanTemp() {
    return gulp.src('.tmp', { read: false, force: true, allowEmpty: true })
        .pipe(clean());
}

export function fixRefs() {
    return gulp.src('dist/app/index.html')
        .pipe(replace('"/style.css"', `"/style.${revNr}.min.css"`))
        .pipe(replace('"/script.js"', `"/script.${revNr}.min.js"`))
        .pipe(gulp.dest('dist/app/'));
}

export function linkServer() {
    return vfs.src('server/')
        .pipe(vfs.symlink('dist/server/'));
}

export const revNr = new Date().getTime().toString(16);