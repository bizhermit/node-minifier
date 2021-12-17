#! /usr/bin/env node

import { minify } from "./scripts/minify";

const title = `::: minifier v${require("../package.json").version} :::`;
process.stdout.write(`${title}\n`);

const argv = process.argv;
let dir: string = process.argv[2] || "./";
const options = { infoLog: true, js: true, css: true, html: true };
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
    minify(dir, options).catch((e: any) => {
        process.stderr.write(`${String(e)}\n`);
    }).finally(() => {
        process.stdout.write(`minify fin.\n`);
    });
} catch(e) {
    process.stderr.write(`${String(e)}\n`);
    process.stdout.write(`minify failed fin.\n`);
}