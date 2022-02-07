import fs from "fs";
import path from "path";
import terser from "terser";
import csso from "csso";
import htmlMinifier from "html-minifier";

type Options = {
  infoLog?: boolean;
  js?: boolean;
  css?: boolean;
  html?: boolean;
};

const minify = async (rootDirname: string, options?: Options) => {
  if (rootDirname == null || rootDirname === "") throw new Error("not set source directory");

  const infoLog = options?.infoLog === true;
  const js = options?.js !== false;
  const css = options?.css !== false;
  const html = options?.html !== false;

  const impl = async (dir: string) => {
    const names = fs.readdirSync(dir);
    for await (const name of names) {
      if (name.startsWith(".")) continue;
      const fullName = path.join(dir, name);
      const stats = fs.statSync(fullName);
      if (stats.isDirectory()) {
        await impl(fullName);
        continue;
      }
      try {
        if (/.*\.js$/.test(name)) {
          if (!js) continue;
          if (infoLog) process.stdout.write(`js   : ${fullName}\n`)
          fs.writeFileSync(fullName, await minifyJs(extractData(fullName)));
          continue;
        }
        if (/.*\.css$/.test(name)) {
          if (!css) continue;
          if (infoLog) process.stdout.write(`css  : ${fullName}\n`);
          fs.writeFileSync(fullName, await minifyCss(extractData(fullName)));
          continue;
        }
        if (/.*\.html$/.test(name)) {
          if (!html) continue;
          if (infoLog) process.stdout.write(`html : ${fullName}\n`);
          fs.writeFileSync(fullName, await minifyHtml(extractData(fullName)));
          continue;
        }
      } catch (err) {
        process.stderr.write(`${String(err)}\n`);
      }
    }
  };
  await impl(rootDirname);
};

const extractData = (fullName: string) => {
  return fs.readFileSync(fullName, "utf8").toString();
};

const minifyJs = async (content: string) => {
  const ret = await terser.minify(content);
  return ret.code || "";
};

const minifyCss = async (content: string) => {
  return csso.minify(content).css;
};

const minifyHtml = (content: string) => {
  return new Promise<string>((resolve) => {
    const ret = htmlMinifier.minify(content, {
      caseSensitive: true,
      collapseWhitespace: true,
    });
    resolve(ret);
  });
};

const minifier = {
  minify,
  minifyJs,
  minifyCss,
  minifyHtml,
};

export default minifier;
