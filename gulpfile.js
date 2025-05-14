const gulp = require("gulp");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const path = require("path");
const through2 = require("through2");
const babelify = require("babelify");

// Process all JS files with browserify
function bundleJS() {
  // Find all JS files except those in node_modules, min directory, and gulpfile.js
  return through2.obj((file, enc, next) => {
    browserify(file.path)
      .transform(babelify, {
        presets: ["@babel/preset-env"],
        sourceMaps: false,
      })
      .bundle()
      .on("error", function (err) {
        console.error(err.message);
        this.emit("end");
      })
      .pipe(source(path.basename(file.path)))
      .pipe(buffer())
      .pipe(terser())
      .pipe(gulp.dest(path.join("min", path.dirname(file.relative))))
      .on("end", next);
  });
}

function processJS() {
  return gulp
    .src([
      "**/*.js",
      "!**/*.min.*",
      "!node_modules/**",
      "!gulpfile.js",
      "!min/**",
    ])
    .pipe(bundleJS());
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

  gulp.watch(
    ["**/*.js", "!**/*.min.*", "!node_modules/**", "!gulpfile.js", "!min/**"],
    processJS
  );
}

exports.default = gulp.series(gulp.parallel(minifyCSS, processJS), watch);
