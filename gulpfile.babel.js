import gulp from 'gulp';

import {
    compileSass_dev,
    compileSass_dist,

    uglifyScript_dist,    

    // concatScripts_dev,
    // concatScripts_dist,

    runNodemon,
    cleanTemp,
    cleanDist,
    copyApp,
    injectStyle,
    injectScript,
    updatePM2File,
    linkServer
} from './tasks';

gulp.task('dev',
    gulp.series(
        cleanTemp,
        compileSass_dev,
        gulp.parallel(
            runNodemon,
            watch
        )
    )
);

gulp.task('build',
    gulp.series(
        cleanDist,
        cleanTemp,

        compileSass_dist,
        uglifyScript_dist,

        copyApp,
        injectStyle,
        injectScript,
        updatePM2File(__dirname),
        linkServer
    )
);

function watch() {
    gulp.watch([
        'app/**/*.scss'
    ], gulp.series(compileSass_dev));
}
