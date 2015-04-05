# typescript-simplify

Browserify transforms for compiling TypeScript 1.4 >=.

## Purpose of typescript-simplify

Provide valid SourceMap on gulp + Browserify + TypeScript.

**Important!** typescript-simple suppress compiler warnings by default.

The limitation come from [teppeis/typescript-simple](https://github.com/teppeis/typescript-simple "teppeis/typescript-simple").
So, typescript-simplify is no use without creating **bundle file**.

I recommend that use a combination of **tsc** compiler directly and typescript-simplify.

## Installation

    npm install --save-dev typescript-simplify

## Usage

```js
var gulp = require("gulp");
var ts = require("gulp-typescript");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
gulp.task('bundle', function () {
    var b = browserify({
        entries: './src/index.ts',
        debug: true,
        extensions: [".ts"],
        transform: [tss.configure({
          "module": "commonjs",
          "noImplicitAny": true,
          "sourceMap": true
        })]
    });
    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/'));
});
```

## Tests

- [ ] Write How to Tests

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT