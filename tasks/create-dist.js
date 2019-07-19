import gulp from 'gulp';
import clean from 'gulp-clean';
import replace from 'gulp-replace';
import symlink from 'gulp-symlink';
import vfs from 'vinyl-fs';
import path from 'path';
import fs from 'fs';

/**
 * Copies app files to dist
 */
export function copyApp() {
    return gulp.src([
            'pm2.json',
            'app/index.html',
            'app/favicon.ico',
            'app/images/**',
        ], {
            base: './'
        })
        .pipe(gulp.dest('dist/'));
}

/**
 * Replaces styles and script tags with the content of the files
 */
export function injectAssets() {
    return gulp.src('dist/app/index.html', {
            base: './dist'
        })
        .pipe(replace(/<script src="script\/script-header\.js"><\/script>/, function(s) {
            var script = fs.readFileSync('./.tmp/script-header.js', 'utf8');
            return '<script>' + script + '</script>';
        }))
        .pipe(replace(/<script src="script\/script-footer\.js"><\/script>/, function(s) {
            var script = fs.readFileSync('./.tmp/script-footer.js', 'utf8');
            return '<script>' + script + '</script>';
        }))
        .pipe(replace(/<link rel="stylesheet" href="style\.css" \/>/, function(s) {
            var style = fs.readFileSync('./.tmp/style.css', 'utf8');
            return '<style>' + style + '</style>';
        }))
        .pipe(gulp.dest('dist'));
}

/**
 * Replaces styles and script tags with the content of the files
 */
export function updatePM2File(rootPath) {
    return function _updatePM2File() {
        return gulp.src('dist/pm2.json')
            .pipe(replace('PATH_TO_APP', path.join(rootPath, 'server')))
            .pipe(gulp.dest('dist/'));
    }
}

/**
 * Removes dist directory
 */
export function cleanDist() {
    return gulp.src('dist', { read: false, force: true, allowEmpty: true })
        .pipe(clean());
}

/**
 * Removes .tmp directory
 */
export function cleanTemp() {
    return gulp.src('.tmp', { read: false, force: true, allowEmpty: true })
        .pipe(clean());
}

/**
 * Creates symlink to server directory
 */
export function linkServer() {
    return vfs.src('server/')
        .pipe(vfs.symlink('dist/server/'));
}
