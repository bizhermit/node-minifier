declare type Options = {
    infoLog?: boolean;
    js?: boolean;
    css?: boolean;
    html?: boolean;
};
declare const minifier: {
    minify: (rootDirname: string, options?: Options) => Promise<void>;
    minifyJs: (content: string) => Promise<string>;
    minifyCss: (content: string) => Promise<string>;
    minifyHtml: (content: string) => Promise<string>;
};
export default minifier;
