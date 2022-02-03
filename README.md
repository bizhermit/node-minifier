# File minifier

Minify file recursively.
his tool target extension:
* .js
* .html
* .css

Warning: overwrite file.

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

### Example

```bash
# root dir target
npx @bizhermit/minifier

# bin dir target
npx @bizhermit/minifier bin

# ignore css and html file -> only js
npx @bizhermit/minifier ./ -I css,html
```