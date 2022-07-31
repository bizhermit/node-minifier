#! /usr/bin/env node
"use strict";var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});const path_1=__importDefault(require("path")),cli_utils_1=require("@bizhermit/cli-utils"),dist_1=__importDefault(require("../dist")),quiet=(0,cli_utils_1.hasKeyArg)("--quiet");quiet||process.stdout.write(`::: minifier v${require("../package.json").version} :::\n`);let cwd=process.cwd();const argPath=(0,cli_utils_1.getArg)();argPath&&!argPath.startsWith("-")&&(cwd=":"===argPath[1]||argPath.startsWith("\\\\")?argPath:path_1.default.join(cwd,argPath));const options={infoLog:!quiet,js:!0,css:!0,html:!0},ignores=[],ignoreStr=(0,cli_utils_1.getKeyArg)("-I");ignoreStr&&ignoreStr.split(",").forEach((t=>ignores.push(t))),ignores.indexOf("js")>=0&&(options.js=!1),ignores.indexOf("css")>=0&&(options.css=!1),ignores.indexOf("html")>=0&&(options.html=!1),quiet||process.stdout.write(`${JSON.stringify(options)}\n`);try{dist_1.default.minify(cwd,options).catch((t=>{process.stderr.write(`${String(t)}\n`)})).finally((()=>{quiet||process.stdout.write("minify fin.\n")}))}catch(t){process.stderr.write(`${String(t)}\n`),quiet||process.stdout.write("minify failed fin.\n")}