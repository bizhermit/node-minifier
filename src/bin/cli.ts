#! /usr/bin/env node

import path from "path";
import { getArg, getKeyArg, hasKeyArg } from "@bizhermit/cli-utils";
import minifier from "../dist";

const quiet = hasKeyArg("--quiet");
if (!quiet) process.stdout.write(`::: minifier v${require("../package.json").version} :::\n`);

let cwd = process.cwd();
const argPath = getArg();
if (argPath && !argPath.startsWith("-")) {
  if (argPath[1] === ":" || argPath.startsWith("\\\\")) cwd = argPath;
  else cwd = path.join(cwd, argPath);
}

const options = { infoLog: !quiet, js: true, css: true, html: true };
const ignores: Array<string> = [];
const ignoreStr = getKeyArg("-I");
if (ignoreStr) ignoreStr.split(",").forEach(v => ignores.push(v));
if (ignores.indexOf("js") >= 0) options.js = false;
if (ignores.indexOf("css") >= 0) options.css = false;
if (ignores.indexOf("html") >= 0) options.html = false;

if (!quiet) process.stdout.write(`${JSON.stringify(options)}\n`);
try {
  minifier.minify(cwd, options).catch((e: any) => {
    process.stderr.write(`${String(e)}\n`);
  }).finally(() => {
    if (!quiet) process.stdout.write(`minify fin.\n`);
  });
} catch (err) {
  process.stderr.write(`${String(err)}\n`);
  if (!quiet) process.stdout.write(`minify failed fin.\n`);
}