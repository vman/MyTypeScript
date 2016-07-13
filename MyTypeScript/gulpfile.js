//Load gulp
var gulp = require('gulp');

//Load gulp plugins
var concat = require('gulp-concat'); //bundle
var uglify = require('gulp-uglify'); //minify
var rename = require('gulp-rename'); //renaming to min
var spsave = require('gulp-spsave'); //upload to SharePoint
var tslint = require('gulp-tslint');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('tsconfig.json');
var browserify = require('browserify');
var transform = require('vinyl-transform');;

//gulp.task('concat-js', ['compile-ts'], function () {
//    return gulp.src(["./Scripts/libs/*.js", "./Scripts/js/*.js"])
//    .pipe(concat("app.js"))
//    .pipe(gulp.dest("./Output"));
//});

gulp.task('browserify', function () {

    var browserified = transform(function (filename) {
        var b = browserify({ entries: filename, debug: true });
        return b.bundle();
    });

    return gulp.src(['./Scripts/js/*.js'])
      .pipe(browserified)
      .pipe(uglify())
      .pipe(gulp.dest('./Output'));
});

gulp.task('lint-ts', function () {
    return gulp.src(['./Scripts/**/*.ts', '!./Scripts/**/*.d.ts'])
    .pipe(tslint({
        formatter: "verbose"
    }))
    .pipe(tslint.report());
});

gulp.task('compile-ts', ['lint-ts'], function () {
    return gulp.src("./Scripts/ts/*.ts")
    .pipe(tsc(tsProject))
    .pipe(gulp.dest("./Scripts/js"));
});

gulp.task('minify-js', ['concat-js'], function () {
    return gulp.src("./Output/app.js")
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("./Output"))
});

gulp.task('upload-to-sp', ['minify-js'], function () {
    return gulp.src("./Output/*.js")
      .pipe(spsave({
          username: "ccdev2@tenant.onmicrosoft.com",
          password: "tenant",
          siteUrl: "https://tenant.sharepoint.com/sites/pub/",
          folder: "Style Library/My Folder",
          checkin: true,
          checkinType: 1
      }));
});

gulp.task('watch-ts-upload-to-sp', function () {
    return gulp.watch("./Scripts/**/*.ts", ['upload-to-sp']);
});

gulp.task('default', ['upload-to-sp'], function () {

});