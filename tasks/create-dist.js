import gulp from 'gulp';
import clean from 'gulp-clean';
import replace from 'gulp-replace';
import symlink from 'gulp-symlink';
import vfs from 'vinyl-fs';
import path from 'path';
import fs from 'fs';

/**
 * Copies app files to 
 */

export function copyApp() {
    return gulp.src([
            'pm2.json',
            'app/index.html'
        ], {
            base: './'
        })
        .pipe(gulp.dest('dist/'));
}

export function injectScript() {
    return gulp.src('dist/app/index.html', {
        base: './dist'
    })
    .pipe(replace(/<script src="script\.js"><\/script>/, function(s) {
        var style = fs.readFileSync('./.tmp/script.js', 'utf8');
        return '<script>' + style + '</script>';
    }))
    .pipe(gulp.dest('dist'));
}

export function injectStyle() {
    return gulp.src('dist/app/index.html', {
        base: './dist'
    })
    .pipe(replace(/<link rel="stylesheet" href="style\.css">/, function(s) {
        var style = fs.readFileSync('./.tmp/style.css', 'utf8');
        return '<style>' + style + '</style>';
    }))
    .pipe(gulp.dest('dist'));
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

export function linkServer() {
    return vfs.src('server/')
        .pipe(vfs.symlink('dist/server/'));
}
