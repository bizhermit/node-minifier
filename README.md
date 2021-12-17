# minifier

ファイルを難読化します。  
以下の拡張子が対象です。

- .js
- .html
- .css

## 使い方

```bash
> npx @bizhermit/minifier [dirname]
# 例
> npx @bizhermit/minifier ./bin
```

- dirname: 難読化対象のディレクトリの相対パス（初期値はカレントディレクトリ）

対象ディレクトリ内のファイルを再帰的に処理を実行します。  
※注意）元ファイルを上書きします。