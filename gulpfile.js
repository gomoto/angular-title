const del = require('del');
const gulp = require('gulp');
const typescript = require('gulp-typescript');

const noop = Function.prototype;

const paths = {
  lib: 'lib/',
  source: 'src/**/!(*.spec).ts',
  tsconfig: 'tsconfig.json'
};

const buildTypescript = typescript.createProject(paths.tsconfig, {
  declaration: true
});

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
