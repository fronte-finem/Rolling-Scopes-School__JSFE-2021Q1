const path = require('path');
const { src, dest, watch, series } = require('gulp');
const pugDependency = require('pug-dependency');
const execa = require('execa');
const del = require('del');

const srcDir = 'src';
const dstDir = 'online-zoo';
const srcPug = `${srcDir}/**/*.pug`;
const srcSCSS = `${srcDir}/**/*.scss`;

const pugDep = pugDependency(srcPug);

function getAbsDstDir(absSrcFile) {
  const absSrcDir = path.resolve(srcDir);
  const relSrcFile = path.relative(absSrcDir, absSrcFile);
  const absDstFile = path.resolve(dstDir, relSrcFile);
  const absDstDir = path.dirname(absDstFile);
  return absDstDir;
}

async function cleanDst(cb) {
  try {
    const deleted = await del([dstDir]);
    console.log('Deleted:\n', deleted.join('\n'));
    cb();
  } catch (error) {
    console.log(error);
    cb(error);
  }
}

async function pugAdded(pug) {
  pugDep.file_changed(pug);
  await pugChanged(pug);
}

async function pugChanged(pug) {
  let pugs = pugDep.find_dependents(pug);
  pugs = [pug, ...pugs].filter(p => !path.basename(p).startsWith('_'));
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

exports.build = series(cleanDst, buildPug, buildSCSS);

exports.watch = function () {
  const pugWatcher = watch(srcPug);
  pugWatcher.on('add', pugAdded);
  pugWatcher.on('change', pugChanged);

  watch(srcSCSS, buildSCSS);
}
