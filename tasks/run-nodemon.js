import nodemon from 'gulp-nodemon';

/**
 * Runs express server through nodemon. 
 */
export function runNodemon(cb) {
    var called = false;

    return nodemon({
        script: 'server/server.js',
        ext: 'js',
        env: {
            'ENV': 'DEV'
        },
        ignore: [
            'server/node_modules/'
        ],
        watch: [
            'server/'
        ],
    })
    .on('start', function () {
        if (!called) {
            called = true;
            cb();
        }
    });
}
