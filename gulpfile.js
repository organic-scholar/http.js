var gulp = require('gulp');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

gulp.task('build', function() {
    rjs({
        baseUrl: "./src",
        name: "../vendor/almond",
        include: ["main"],
        wrap: {
            startFile: "vendor/start.frag",
            endFile: "vendor/end.frag",
        },
        out: "http.js"
    }).pipe(gulp.dest("./dist"));
});

gulp.task('build-min', function() {
    rjs({
        baseUrl: "./src",
        name: "../vendor/almond",
        include: ["main"],
        wrap: {
            startFile: "vendor/start.frag",
            endFile: "vendor/end.frag",
        },
        out: "http.min.js"
    }).pipe(uglify({
        mangle: true,
        compress: true,
    })).
    pipe(gulp.dest("./dist"));
});

gulp.task('default', ['build', 'build-min']);
