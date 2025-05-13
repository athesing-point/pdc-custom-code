const gulp = require("gulp");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const gulpIf = require("gulp-if");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

function bundleJS() {
  return browserify("home.js")
    .bundle()
    .pipe(source("home.js"))
    .pipe(buffer())
    .pipe(terser())
    .pipe(gulp.dest("./min"));
}

function minifyCSS() {
  return gulp
    .src(["**/*.css", "!**/*.min.*", "!node_modules/**"])
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./min"));
}

function watch() {
  gulp.watch(["**/*.css", "!**/*.min.*", "!node_modules/**"], minifyCSS);

  gulp.watch(
    ["**/*.js", "!**/*.min.*", "!node_modules/**", "!gulpfile.js"],
    bundleJS
  );
}

exports.default = gulp.series(gulp.parallel(minifyCSS, bundleJS), watch);
