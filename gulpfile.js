const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const del = require('del');
const glob = require('glob');
const gulp = require('gulp');
const karma = require('karma');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const tsify = require('tsify');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');

const noop = Function.prototype;

const paths = {
  tests: {
    bundle: 'all.spec.js',
    source: 'src/**/*.spec.ts'
  },
  lib: 'lib/',
  source: 'src/**/!(*.spec).ts',
  karma: `${__dirname}/karma.conf.js`,
  tsconfig: 'tsconfig.json'
};

function bundleTests(done) {
  done = done || noop;
  browserify({
    entries: glob.sync(paths.tests.source),
    debug: true
  })
  .plugin(tsify, { project: paths.tsconfig })
  .bundle()
  .on('error', console.error)
  .pipe(source(paths.tests.bundle))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('.'))
  .on('finish', () => {
    done();
  });
}

function runTests(done) {
  done = done || noop;
  new karma.Server({
    configFile: paths.karma,
    singleRun: true,
    files: [paths.tests.bundle]
  },
  (exitCode) => {
    if (exitCode !== 0) {
      console.warn(`Karma returned exit code ${exitCode}`);
    }
    done();
  })
  .start();
}

function deleteTests(done) {
  done = done || noop;
  del([paths.tests.bundle]).then(() => {
    done();
  });
}

gulp.task('test', (done) => {
  bundleTests(() => {
    runTests(() => {
      deleteTests(done);
    });
  });
});

const buildTypescript = typescript.createProject(paths.tsconfig);

function build(done) {
  done = done || noop;
  gulp.src(paths.source)
  .pipe(buildTypescript())
  .pipe(gulp.dest(paths.lib))
  .on('finish', () => {
    done();
  });
}

gulp.task('build', (done) => {
  build(done);
});

function clean(done) {
  done = done || noop;
  del([paths.lib]).then(() => {
    done();
  });
}

gulp.task('clean', (done) => {
  clean(done);
})
