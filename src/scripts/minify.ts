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

export const minify = async (srcDir: string, options?: Options) => {
    if (srcDir == null || srcDir === "") throw new Error("not set source directory");

    const infoLog = options?.infoLog === true;
    const minifyJs = options?.js !== false;
    const minifyCss = options?.css !== false;
    const minifyHtml = options?.html !== false;

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
            if (minifyJs && /.*\.js$/.test(name)) {
                if (infoLog) process.stdout.write(`js   : ${fullName}\n`)
                const code: {[key: string]: any} = {};
                code[fullName] = extractData(fullName);
                try {
                    const ret = await terser.minify(code);
                    fs.writeFileSync(fullName, ret.code as string);
                } catch (err) {
                    process.stderr.write(`${String(err)}\n`);
                }
                continue;
            }
            if (minifyCss && /.*\.css$/.test(name)) {
                if (infoLog) process.stdout.write(`css  : ${fullName}`);
                fs.writeFileSync(fullName, csso.minify(extractData(fullName)).css);
                continue;
            }
            if (minifyHtml && /.*\.html$/.test(name)) {
                if (infoLog) process.stdout.write(`html : ${fullName}`);
                fs.writeFileSync(fullName, htmlMinifier.minify(extractData(fullName), {
                    caseSensitive: true,
                    collapseWhitespace: true,
                }));
                continue;
            }
        }
    };
    await impl(srcDir);
};

const extractData = (fullName: string) => {
    return fs.readFileSync(fullName, "utf8").toString();
};