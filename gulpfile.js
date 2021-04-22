const { src, dest, symlink, watch, series } = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const execa = require('execa');
const del = require('del');

const srcDir = 'src';
// const dstDir = 'photo-filter';
const dstDir = 'r:/photo-filter';
const srcSCSS = `${srcDir}/**/*.scss`;

function linkStatic() {
  return src([
      `${srcDir}/assets`,
      `${srcDir}/pages/**/*.html`,
    ])
    .pipe(symlink(dstDir))
}

function cpyStatic() {
  return src(`${srcDir}/pages/**/*.html`)
    .pipe(dest(dstDir))
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

async function buildSCSS(cb) {
  try {
    const {stdout} = await execa('sass', ['--update', '--stop-on-error', '--no-source-map', `${srcDir}/pages:${dstDir}`]);
    console.log(stdout);
    cb();
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

exports.clean = cleanDst;
exports['assets:cpy'] = cpyStatic;
exports['assets:link'] = linkStatic;

exports['build:dev'] = series(cleanDst, linkStatic, buildSCSS);
exports['build:deploy'] = series(cleanDst, cpyStatic, optimizeAssets, buildSCSS);

exports['watch:sass'] = function () {
  watch(srcSCSS, buildSCSS);
}
