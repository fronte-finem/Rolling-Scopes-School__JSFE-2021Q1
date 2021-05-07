const path = require('path');
const { src, dest, symlink, watch, series } = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const execa = require('execa');
const del = require('del');

const srcDir = 'src';
// const dstDir = 'online-zoo';
const dstDir = 'r:/online-zoo';


function linkAssets() {
  return src([`${srcDir}/assets`, `${srcDir}/favicon.*`])
    .pipe(symlink(dstDir))
}

function copyAssets() {
  return src([`${srcDir}/**/assets/**/*`, `${srcDir}/favicon.*`])
    .pipe(dest(dstDir))
}

function processAssets() {
  return src(`${srcDir}/assets/**`)
    .pipe(changed(`${dstDir}/assets`))
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
    .pipe(dest(`${dstDir}/assets`))
}

async function cleanDst(cb) {
  try {
    const paths = [dstDir];
    const opts = { force: true };
    const deleted = await del(paths, opts);
    console.log('Deleted:\n', deleted.join('\n'));
    cb();
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

async function buildPug(cb) {
  try {
    const {stdout} = await execa('pug', ['--pretty', srcDir, '--out', dstDir]);
    console.log(stdout);
    cb();
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

async function buildSCSS(cb) {
  try {
    const {stdout} = await execa('sass', ['--update', '--stop-on-error', '--no-source-map', `${srcDir}:${dstDir}`]);
    console.log(stdout);
    cb();
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

async function buildJS(cb) {
  try {
    const {stdout} = await execa('rollup', [`${srcDir}/script/main.js`, '--file', `${dstDir}/script/main.js`, '--format', 'es']);
    console.log(stdout);
    cb();
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

exports.clean = cleanDst;
exports['build:link'] = linkAssets;
exports['build:copy'] = copyAssets;

exports['build:dev'] = series(cleanDst, linkAssets, buildPug, buildSCSS, buildJS);
exports['build:deploy'] = series(cleanDst, copyAssets, buildPug, buildSCSS, buildJS);

exports['watch'] = function () {
  watch(`${srcDir}/**/*.scss`, buildSCSS);
  watch(`${srcDir}/script/*.js`, buildJS);
}
