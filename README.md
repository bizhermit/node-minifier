# File minifier

Minify file recursively.  
This tool target extension:
* .js
* .html
* .css

Warning: overwrite file.

---

## CLI

No install
```bash
npx @bizhermit/minifier <dirname> <options>
```

Install
```bash
npm i -D @bizhermit/minifier
npx minifier <dirname> <options>
```

### Options
* `-I [extensions]` ignore minify file extensions. colon-separete list.
* `--quiet` not print infomation log.

### Example

```bash
# root dir target
npx @bizhermit/minifier

# bin dir target
npx @bizhermit/minifier bin

# ignore css and html file -> only js
npx @bizhermit/minifier ./ -I css,html
```

---

## Module

Install
```bash
npm i @bizhermit/minifier
```

### Example
```ts
import minifier from "@bizhermit/minifier";

const func = async () => {
  const jsContentStr = "window.addEventListener(\"load\", () => ..."
  const minified = await minifier.minifyJs(jsContentStr);
  console.log(minified); // confirm
}
func();
```