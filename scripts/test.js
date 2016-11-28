const browserify = require('browserify');
const browserRun = require('browser-run');
const faucet = require('faucet');
const glob = require('glob');
const tapFinished = require('tap-finished');
const tsify = require('tsify');

const paths = require('./paths');

const browserRunner = browserRun();

const b = browserify({
  debug: true
})
.add(glob.sync(paths.tests))
.plugin(tsify, { project: paths.tsconfig })
.bundle()
.pipe(browserRunner);

b.pipe(tapFinished((results) => {
  browserRunner.stop();
}))

b.pipe(faucet())
.pipe(process.stdout)
