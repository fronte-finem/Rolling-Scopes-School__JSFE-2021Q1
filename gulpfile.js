const path = require('path');
const { src, dest, watch, series } = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const pugDependency = require('pug-dependency');
const execa = require('execa');
const del = require('del');

const srcDir = 'src';
// const dstDir = 'online-zoo';
const dstDir = 'r:/online-zoo';
const srcAssets = `${srcDir}/assets/**`;
const dstAssets = `${dstDir}/assets`;
const srcPug = `${srcDir}/**/*.pug`;
const srcSCSS = `${srcDir}/**/*.scss`;

let pugDep = pugDependency(srcPug);

function getAbsDstDir(absSrcFile) {
  const absSrcDir = path.resolve(srcDir);
  const relSrcFile = path.relative(absSrcDir, absSrcFile);
  const absDstFile = path.resolve(dstDir, relSrcFile);
  const absDstDir = path.dirname(absDstFile);
  return absDstDir;
}

function cpyAssets(cb) {
  src(srcAssets)
    .pipe(changed(dstAssets))
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
    .pipe(dest(dstAssets))
  cb();
}

async function cleanDst(cb) {
  try {
    const paths = [`${dstDir}/**`, `!${dstDir}`, `!${dstDir}/assets`];
    const opts = { force: true };
    const deleted = await del(paths, opts);
    console.log('Deleted:\n', deleted.join('\n'));
    cb();
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

async function pugAdded(pug) {
  pugDep = pugDependency(srcPug);
  await pugChanged(pug);
}

async function pugChanged(pug) {
  pugDep.file_changed(pug);
  let pugs = [pug, ...pugDep.find_dependents(pug)]
      .filter(p => !path.basename(p).startsWith('_'));
  for (const pugFile of pugs) {
    // console.log(pugFile);
    // console.log(getAbsDstDir(pugFile));
    try {
      const {stdout} = await execa('pug', ['--pretty', pugFile, '--out', getAbsDstDir(pugFile)]);
      console.log(stdout);
    } catch (error) {
      console.log(error);
    }
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

exports.clean = cleanDst;

exports.build = series(cleanDst, cpyAssets, buildPug, buildSCSS);

exports.watch = function () {
  watch(srcSCSS, buildSCSS);
}
