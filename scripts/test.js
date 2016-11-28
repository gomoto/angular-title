const browserify = require('browserify');
const faucet = require('faucet');
const glob = require('glob');
const tapeRun = require('tape-run');
const tsify = require('tsify');

const paths = require('./paths');

browserify({
  debug: true
})
.add(glob.sync(paths.tests))
.plugin(tsify, { project: paths.tsconfig })
.bundle()
.pipe(tapeRun())
.pipe(faucet())
.pipe(process.stdout);
