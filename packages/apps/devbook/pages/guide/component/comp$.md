# 组件库搭建 
基于 dumi + gulp + Github Actions

## 代码规范
`pnpm i @umijs/fabric prettier -D` // 因为@umijs/fabric没有把prettier作为依赖，所以我们需要手动安装

## .editorconfig
是一种用于定义和维护多人协作项目中代码格式一致性的文件格式。它可以帮助开发者在不同的编辑器和 IDE 中保持代码风格的一致性，从而降低代码维护成本。

#表示注释
root = true 表示 .editorconfig 文件是最顶层的配置文件。

[*] 表示通用配置，适用于所有文件类型。

charset = utf-8 表示使用 UTF-8 编码格式。

end_of_line = lf 表示使用 Unix-like 的换行符。

indent_style = space 表示使用空格缩进。

indent_size = 2 表示每级缩进所用的空格数。

insert_final_newline = true 表示在文件末尾插入一个空行。

trim_trailing_whitespace = true 表示删除行末的空格。

[*.js] 表示 JavaScript 文件特有的配置。

indent_size = 2 表示 JavaScript 文件中每级缩进所用的空格数为 2。

除了上面的示例配置，.editorconfig 还支持其他的配置参数，例如：

tab_width：设置 Tab 缩进的宽度。

max_line_length：设置行的最大长度。 max_line_length = 0 表示没有长度限制

indent_style：设置缩进的样式，可以是 space 或 tab。

charset：设置文件的字符集编码。

end_of_line：设置换行符的类型，可以是 lf、cr 或者 crlf。

总之，.editorconfig 是一种用于定义和维护多人协作项目中代码格式一致性的文件格式，可以帮助开发者在不同的编辑器和 IDE 中保持代码风格的一致性，从而降低代码维护成本。它支持多种配置参数，可以帮助开发者定义各种代码规范和风格。

## .eslintrc.js
.eslintrc.js 是 ESLint 的配置文件，用于配置 ESLint 的规则和插件。ESLint 是一个用于检查 JavaScript 代码错误和风格的工具，它可以在编写代码时发现潜在的问题，从而提高代码质量和可维护性。
env：指定代码运行的环境，包括浏览器、ES2021、node 等。

extends：指定一个或多个扩展规则集，这里使用了 eslint:recommended 和 plugin:@typescript-eslint/recommended，前者是 ESLint 官方推荐的规则，后者是 TypeScript ESLint 推荐的规则。

parser：指定解析器，这里使用了 @typescript-eslint/parser，用于解析 TypeScript 代码。

parserOptions：指定解析器选项，包括 ECMAScript 版本和模块类型等。

plugins：指定插件，这里使用了 @typescript-eslint，用于增强 TypeScript ESLint 的功能。

rules：指定规则，包括 no-console、no-unused-vars 和 quotes 等。

以上是一个示例配置，具体的规则和插件可以根据项目需求进行配置。可以通过 .eslintrc.js 文件来自定义 ESLint 规则，以确保 JavaScript 代码的质量和可维护性。

总之，.eslintrc.js 是 ESLint 的配置文件，用于配置 ESLint 的规则和插件。它可以帮助开发者在编写 JavaScript 代码时发现潜在的问题，从而提高代码质量和可维护性。具体的规则和插件可以根据项目需求进行配置。

## .prettierrc
eslint 虽然能帮我们提高代码质量，但并不能完全统一编码风格，因为这些代码规范的重点并不在代码风格上，虽然有一定的限制。prettier 是一个能够统一团队编码风格的工具，能够极大的提高团队执行效率，统一的编码风格能很好的保证代码可读性。

## husky 
- 一个让配置 git hooks 变得更简单的工具 .huskyrc
- 原理： husky会根据 package.json的配置， 在.git/hooks 目录生成的hook脚本 （如果你已经自定义了一个hook脚本，husky不会覆盖它）

## lint-staged
是一个可以在 Git 提交或 Git 推送时自动检查和修复代码的工具。它可以在 Git 提交或 Git 推送时，自动执行一些命令或插件工具，以进行代码的风格和错误的检查和修复。
1. 只对 git 中变更的文件进行 lint 操作 .lintstagedrc
2. 针对暂存的 git 文件运行linters, 不要让不规则的代码溜进代码库。lint-staged 总是将暂存的所有文件的列表传递给任务，忽略任何文件都应该在任务本身中配置，比如：.prettierignore / .eslintignore.
3. lint-staged 总是配合husky一起使用
4. 在检查时首先执行 eslint --fix 命令，以进行代码风格和错误的检查和修复。然后，执行 prettier --write 命令，以进行代码格式的统一和优化

## eslint在编码时已经检查过了代码，为什么提交时还要用lint-staged再检查一遍
1. 代码检查的标准可能因项目而异
2. ESlint 的配置可能会有变化
3. 提交的代码可能包含未被检查的文件

## typescript
- 新建 tsconfig.json文件
1. declaration boolean    生成相应的 .d.ts 文件
2. declarationDir string  生成声明文件的路径
3. allowSyntheticDefaultImports boolean 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。
4. skipLibCheck 忽略所有的声明文件（ *.d.ts）的类型检查。

| 可以使用 prop-types 保证 JS用户也能得到友好的运行时报错信息

- 如何选择 PropTypes 还是 TypeScript 取决于你的团队和项目的具体情况。如果你的团队已经熟悉了 PropTypes，并且项目规模较小，那么可以继续使用 PropTypes。如果你的团队已经使用了 TypeScript，并且项目规模较大，那么可以考虑使用 TypeScript。
- 虽然 PropTypes 也可以用于 React 组件的类型检查，但是在 Ant Design 中并没有使用 PropTypes 进行类型检查。相比之下，TypeScript 的类型检查机制更加严格和强大，可以发现更多的类型错误，以及提供更好的开发体验

**Q1：为什么要在style目录下创建index.ts额外引入less而不是直接创建**
组件库要实现按需引入，详情见后面实现
**Q2：详解 npm install**
```sh
npm i moduleName # 安装模块到 node_modules,不会写入到devPendencies或dependencies
npm i moduleName -g # 安装模块到全局，不会到 node_modules里,不会写入到devPendencies或dependencies
npm i moduleName -S # 安装模块到 node_modules,写入到dependencies
npm i moduleName -S -D # 安装模块到 node_modules,写入到devPendencies
```
```bash
pnpm add sax # 保存到 dependencies下
pnpm add -D sax # 保存到devDependencies
pnpm add -g sax # 安装到全局环境下
pnpm add sax --save-peer 
```

## 使用 rollup 打包构建
- 安装依赖
```sh
pnpm add @rollup/plugin-alias @rollup/plugin-commonjs @rollup/plugin-node-resolve postcss rollup-plugin-auto-add rollup-plugin-clear rollup-plugin-filesize rollup-plugin-multi-input rollup-plugin-peer-deps-external rollup-plugin-postcss rollup-plugin-terser rollup-plugin-typescript2 --filter @proj/react-components
```
- 添加 peerDependencies
  react、react-dom

### 添加 rollup 配置文件 以及 打包所用的 tsconfig

### 配置打包命令

## 开发调试
**主要解决开发组件时的调试、预览和组件文档编写**

### 1、集成 dumi
- 选择 [dumi](https://d.umijs.org/) 作为文档站点工具， 并兼具开发调试功能
`pnpm i dumi rimraf serve -S -D --filter @proj/react-components`
- 增加 scripts 到 package.json
```json
"scripts": {
  "dev": "dumi dev",
  "start": "pnpm run dev",
  "build:site": "rimraf doc-site && dumi build",
  "preview:site": "pnpm run build:site && serve doc-site"
}
```
- 新建 .umirc.ts 
- 搭建文档内容，根目录创建docs
- 在每个组件目录下新建index.md