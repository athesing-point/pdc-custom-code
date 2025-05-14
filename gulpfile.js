const gulp = require("gulp");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const gulpIf = require("gulp-if");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

// Bundle and minify home.js separately since it uses browserify
function bundleHomeJS() {
  return browserify("home.js")
    .bundle()
    .pipe(source("home.js"))
    .pipe(buffer())
    .pipe(terser())
    .pipe(gulp.dest("./min"));
}

// Minify all other JS files while preserving directory structure
function minifyJS() {
  return gulp
    .src([
      "**/*.js",
      "!home.js", // Exclude home.js as it's handled separately
      "!**/*.min.*",
      "!node_modules/**",
      "!gulpfile.js",
      "!min/**",
    ])
    .pipe(terser())
    .pipe(gulp.dest("./min"));
}

function minifyCSS() {
  return gulp
    .src(["**/*.css", "!**/*.min.*", "!node_modules/**", "!min/**"])
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("./min"));
}

function watch() {
  gulp.watch(
    ["**/*.css", "!**/*.min.*", "!node_modules/**", "!min/**"],
    minifyCSS
  );

  gulp.watch(["home.js"], bundleHomeJS);

  gulp.watch(
    [
      "**/*.js",
      "!home.js",
      "!**/*.min.*",
      "!node_modules/**",
      "!gulpfile.js",
      "!min/**",
    ],
    minifyJS
  );
}

exports.default = gulp.series(
  gulp.parallel(minifyCSS, bundleHomeJS, minifyJS),
  watch
);
