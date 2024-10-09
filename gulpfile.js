const gulp = require("gulp");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const gulpIf = require("gulp-if");

function minify() {
  return gulp
    .src(["**/*.css", "**/*.js", "!**/*.min.*", "!node_modules/**"])
    .pipe(gulpIf("*.css", cleanCSS()))
    .pipe(gulpIf("*.js", terser()))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("."));
}

function watch() {
  gulp.watch(["**/*.css", "**/*.js", "!**/*.min.*", "!node_modules/**"], minify);
}

exports.default = watch;
