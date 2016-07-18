//Load gulp
var gulp = require('gulp');

//Load gulp plugins
var uglify = require('gulp-uglify'); //minify
var rename = require('gulp-rename'); //renaming to min
var spsave = require('gulp-spsave'); //upload to SharePoint
var tslint = require('gulp-tslint');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./gulpconfig.json');

gulp.task('lint-ts', function () {
    return gulp.src('./Scripts/ts/*.ts')
    .pipe(tslint({
        formatter: "verbose"
    }))
    .pipe(tslint.report());
});

gulp.task('browserify', ['lint-ts'], function () {
    return browserify({
        entries: ['./scripts/ts/app.ts']
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./Output/'));
});

gulp.task('minify-js', ['browserify'], function () {
    return gulp.src("./Output/app.js")
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./Output"))
});

gulp.task('upload-js-to-sp', ['minify-js'], function () {
    return gulp.src("./Output/*.*")
      .pipe(spsave({
          username: config.userName,
          password: config.password,
          siteUrl: config.siteUrl,
          folder: "Style Library/My Folder",
          checkin: true,
          checkinType: 1
      }));
});

gulp.task('upload-html-to-sp', function () {
    return gulp.src("./index.html")
      .pipe(spsave({
          username: config.userName,
          password: config.password,
          siteUrl: config.siteUrl,
          folder: "Style Library/My Folder",
          checkin: true,
          checkinType: 1
      }));
});

gulp.task('watch-ts-upload-to-sp', function () {
    return gulp.watch("./Scripts/**/*.ts", ['upload-js-to-sp']);
});