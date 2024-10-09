const gulp = require("gulp");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const gulpIf = require("gulp-if");

function minify() {
  return gulp
    .src([
      "**/*.css",
      "**/*.js",
      "!**/*.min.*",
      "!node_modules/**",
      "!gulpfile.js",
      "!.prettierrc",
      "!.prettierignore",
      "!package.json",
      "!package-lock.json",
    ])
    .pipe(gulpIf("*.css", cleanCSS()))
    .pipe(gulpIf("*.js", terser()))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./min"));
}

function watch() {
  gulp.watch(
    [
      "**/*.css",
      "**/*.js",
      "!**/*.min.*",
      "!node_modules/**",
      "!gulpfile.js",
      "!.prettierrc",
      "!.prettierignore",
      "!package.json",
      "!package-lock.json",
    ],
    minify
  );
}

exports.default = watch;
