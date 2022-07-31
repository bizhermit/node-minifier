"use strict";var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});const fs_1=__importDefault(require("fs")),path_1=__importDefault(require("path")),terser_1=__importDefault(require("terser")),csso_1=__importDefault(require("csso")),html_minifier_1=__importDefault(require("html-minifier")),minify=async(t,i)=>{if(null==t||""===t)throw new Error("not set source directory");const e=!0===i?.infoLog,s=!1!==i?.js,r=!1!==i?.css,n=!1!==i?.html,f=async t=>{const i=fs_1.default.readdirSync(t);for await(const a of i){if(a.startsWith("."))continue;const i=path_1.default.join(t,a);if(fs_1.default.statSync(i).isDirectory())await f(i);else try{if(/.*\.js$/.test(a)){if(!s)continue;e&&process.stdout.write(`js   : ${i}\n`),fs_1.default.writeFileSync(i,await minifyJs(extractData(i)));continue}if(/.*\.css$/.test(a)){if(!r)continue;e&&process.stdout.write(`css  : ${i}\n`),fs_1.default.writeFileSync(i,await minifyCss(extractData(i)));continue}if(/.*\.html$/.test(a)){if(!n)continue;e&&process.stdout.write(`html : ${i}\n`),fs_1.default.writeFileSync(i,await minifyHtml(extractData(i)));continue}}catch(t){process.stderr.write(`${String(t)}\n`)}}};await f(t)},extractData=t=>fs_1.default.readFileSync(t,"utf8").toString(),minifyJs=async t=>(await terser_1.default.minify(t)).code||"",minifyCss=async t=>csso_1.default.minify(t).css,minifyHtml=t=>new Promise((i=>{i(html_minifier_1.default.minify(t,{caseSensitive:!0,collapseWhitespace:!0}))})),minifier={minify:minify,minifyJs:minifyJs,minifyCss:minifyCss,minifyHtml:minifyHtml};exports.default=minifier;