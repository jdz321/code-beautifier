const babel = require('@babel/core');
const { argv } = require('yargs');
const fs = require('fs');
const path = require('path');

function transform(code) {
  let result
  try {
    result = babel.transform(code, {
      plugins: ['transform-beautifier'],
    });
  } catch (error) {
    console.error(error);
    return 'error input, see above';
  }
  return result.code;
}

function transformFile(filepath) {
  let result
  try {
    result = babel.transformFileSync(filepath, {
      plugins: ['transform-beautifier'],
    });
    const { dir, name, ext } = path.parse(filepath);
    fs.writeFileSync(path.format({ dir, name: `${name}.result`, ext }), result.code);
  } catch (error) {
    console.error(error);
    return 'error input, see above';
  }
  return result.code;
}

function printResult(result) {
  console.log(`\n---result---\n${result}\n`);
}

if (argv.file) {
  printResult(transformFile(argv.file))
} else {
  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
      printResult(transform(chunk));
    }
  });
}
