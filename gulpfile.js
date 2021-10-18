const { src, dest, symlink, watch, series } = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const execa = require('execa');
const del = require('del');

const srcDir = 'src';
// const dstDir = 'photo-filter';
const dstDir = 'r:/photo-filter';


function cpyStatic() {
  return src(`${srcDir}/app/index.html`)
    .pipe(dest(dstDir))
}
function linkAssets() {
  return src([
      `${srcDir}/assets`,
    ])
    .pipe(symlink(dstDir))
}

function optimizeAssets() {
  return src(`${srcDir}/assets/**`)
    .pipe(changed(dstDir))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
          plugins: [
            {removeViewBox: false},
            {cleanupIDs: false}
          ]
        })
      ],
      {verbose: true}))
    .pipe(dest(`${dstDir}/assets/`))
}

async function cleanDst(cb) {
  try {
    const paths = [`${dstDir}/**`, `!${dstDir}`];
    const opts = { force: true };
    const deleted = await del(paths, opts);
    console.log('Deleted:\n', deleted.join('\n'));
    cb();
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

/**
 * @param {string} cmd
 * @param {readonly string[]} [args]
 */
function genShellTask(cmd, args) {
  return async function (/** @type {(arg0: undefined) => void} */ cb) {
    try {
      const {stdout} = await execa(cmd, args);
      console.log(stdout);
      cb();
    } catch (error) {
      console.log(error);
      cb(error);
    }
  }
}

// const buildSCSS = genShellTask('sass', ['--update', '--stop-on-error', '--embed-sources', `${srcDir}/app/index.scss:${dstDir}/index.css`]);
const buildSCSS = genShellTask('sass', ['--update', '--stop-on-error', '--no-source-map', `${srcDir}/app/index.scss:${dstDir}/index.css`]);

const checkTS = genShellTask('tsc');
const compileTS = genShellTask('spack');
// const compileTS = genShellTask('swc', [srcDir, '--out-dir', dstDir]);

async function buildTS(cb) {
  try {
    await checkTS(cb);
    await compileTS(cb);
    cb();
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

exports['build:dev'] = series(cleanDst, cpyStatic, linkAssets, buildSCSS, buildTS);
exports['build:deploy'] = series(cleanDst, cpyStatic, optimizeAssets, buildSCSS, buildTS);

exports['watch:sass'] = function () {
  watch(`${srcDir}/**/*.scss`, buildSCSS);
}
exports['watch:ts'] = function () {
  watch(`${srcDir}/**/*.ts`, compileTS);
}

exports['watch:all'] = function () {
  watch(`${srcDir}/**/*.scss`, buildSCSS);
  watch(`${srcDir}/**/*.ts`, compileTS);
}
