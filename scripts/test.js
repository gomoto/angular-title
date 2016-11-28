const browserify = require('browserify');
const browserRun = require('browser-run');
const glob = require('glob');
const tsify = require('tsify');

const paths = require('./paths');

browserify({
  debug: true
})
.add(glob.sync(paths.tests))
.plugin(tsify, { project: paths.tsconfig })
.bundle()
.pipe(browserRun())
.pipe(process.stdout);
