#! /usr/bin/env node

import minifier from ".";

process.stdout.write(`::: minifier v${require("../package.json").version} :::\n`);

const getArgV = (key: string) => {
  const index = process.argv.findIndex(v => v === key);
  if (index < 0) return null;
  const val = process.argv[index + 1];
  if (val.startsWith("-")) return null;
  return val;
};

let dirname: string = process.argv[2] || process.cwd();
if (dirname.startsWith("-")) dirname = process.cwd();

const options = { infoLog: true, js: true, css: true, html: true };
const ignores: Array<string> = [];
const ignoreStr = getArgV("-I");
if (ignoreStr) ignoreStr.split(",").forEach(v => ignores.push(v));
if (ignores.indexOf("js") >= 0) options.js = false;
if (ignores.indexOf("css") >= 0) options.css = false;
if (ignores.indexOf("html") >= 0) options.html = false;

const argv = process.argv;
for (let i = 0, il = argv.length; i < il; i++) {
  const arg = argv[i];
  if (arg === "-ignore" || arg === "-i") {
    for (let j = i + 1; j < il; j++) {
      const argEx = argv[j];
      if (argEx.indexOf("-") === 0) break;
      switch (argEx) {
        case "js":
          options.js = false;
          break;
        case "css":
          options.css = false;
          break;
        case "html":
          options.html = false;
          break;
        default:
          break;
      }
    }
  }
}
process.stdout.write(`${JSON.stringify(options)}\n`);
try {
  minifier.minify(dirname, options).catch((e: any) => {
    process.stderr.write(`${String(e)}\n`);
  }).finally(() => {
    process.stdout.write(`minify fin.\n`);
  });
} catch (err) {
  process.stderr.write(`${String(err)}\n`);
  process.stdout.write(`minify failed fin.\n`);
}