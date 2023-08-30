# pnpm-monorepo
基于pnpm管理的monorepo仓库，致力于项目中常用的解决方案

# 项目准备
1. 确认安装 node 环境
2. 全局安装pnpm 
* npm install pnpm -g

# 构建项目完整过程

## 1、项目初始化
1. github 新建仓库，本地clone下来
2. 依赖包管理环境初始化 pnpm init (全部默认)
3. 新增 .gitignore 文件 排除 node_modules/、dist/
4. 添加 pnpm-workspace.yaml 文件
- (定义了工作区的根目录，并允许您在工作区中包含/排除目录。默认情况下，包含所有子目录下的所有包。)
- 本项目中我们指定packages作为我们工作空间的根目录

## 2、目录结构初始化
1. 新建packages目录
2. 新建apps\components\libs
一般情况下：
- apps: web 项目
- components: 组件库
- libs: 工具
  
## 3、仓库初始化 & pnpm init & name => @proj/packageName
- apps->react-x
      ->vue-x
- components->react-components
            ->vue-components
- libs

## 4、建立软连接
通过软连接方式将@proj/react-components作为依赖包安装到@proj/react-x下
* pnpm add @proj/react-components --filter @proj/react-x
**软连接的过程都会体现在root下的node_modules/.pnpm中**

## 5、安装代码检测环境
### eslint做代码检测 prettier做代码格式美化
```bash
pnpm add eslint prettier -D -w
npx eslint --init

# 由于命令行自动化，不给我们加 w
pnpm add @typescript-eslint/eslint-plugin @typescript-eslint/parser -D -w
pnpm add eslint-plugin-react -D -w
pnpm add eslint-config-prettier eslint-plugin-prettier -D -w 处理eslint和prettier的冲突
```
### 配置 .prettierrc.json文件

## 6、配置代码提交规范
安装commitlint\husky
```bash
npx husky-init
pnpm add @commitlint-cli @commitlint/config-conventional -D -w
pnpm i 
```

### 添加commitlint.config.js配置文件
```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```
在提交commit时可能会报错： SyntaxErroe: Invalid or unexpected token
解决办法：
这是因为配置文件的编码格式不正确：更改vscode下方编码格式改成 UTF-

## commit lint
1. 进行 pre-commit 代码规范检测
`pnpm i husky lint-staged -D`
package.json 中配置：
```json
 "lint-staged": {
    "src/**/*.ts?(x)": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ],
    "src/**/*.less": [
      "stylelint --syntax less --fix",
      "git add"
    ]
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-commit": "lint-staged"
    }
  },
```
**/表示匹配任何子路径, 包括目录分隔符/也会被它匹配, 所以用来这个通配符后, 目录下有多少子目录都会被匹配到

*表示匹配除了目录分隔符(/)外的任何长度的字符串

2. 进行 commit message 检测
`pnpm add commitizen cz-conventional-changelog lint-staged -D -w`
- Commitizen 是一个用于规范化 Git 提交信息的工具，它可以帮助我们更好地书写符合规范的 Git 提交信息，从而提高代码的可读性和可维护性。
- cz-conventional-changelog 是 Commitizen 工具的一个插件,可以根据 Git 提交信息自动生成 CHANGELOG.md 文件，从而方便我们查看项目的版本历史和变化。
- commitlint: 结合 git commit 完成 commit message的标准校验
- 新增.commitlintrc.js
- commitizen cz-conventional-changelog 可以生成一个标准的changelog, 在package.json的scripts 里配置命令如下：
```json
"scripts": {
  "commit": "git-cz"
},
"config": {
  "commitizen": {
    "path": "cz-conventional-changelog"
  }
}
```
这样后续就可以用pnpm run commit 生成标准 changelog了

## 7、配置 typescript 环境
### 配置tsconfig.json
如果本地环境没有typescirpt的可以装一下
```bash
pnpm add typescript -g
tsc --init
```

### 安装 react ts 环境
```bash
pnpm add react @types/react react-dom @types/react-dom --filter @proj/react-x
```

## 配置 react 构建环境
```bash
pnpm add webpack webpack-cli webpack-merge webpack-dev-server @babel/core @babel/preset-react @babel/preset-typescript babel-loader css-loader less style-loader less-loader postcss postcss-loader tailwindcss autoprefixer html-webpack-plugin cross-env -D --filter @proj/react-x
```

### 编写webpack.base.js等配置文件
如遇到 require文件时报错
```bash
Require statement not part of import statement.(@typescript-eslint/no-var-requires)
```
可以在eslintrc.json的rules添加以下内容：
```bash
  rules: {
    '@typescript-eslint/no-var-requires': 0
  }
```

### 配置.babelrc文件

### 测试项目
1. 本地开发环境
```bash
pnpm start 
```
2. 生产环境
```bash
pnpm build
```
把dist包用一个新窗口打开
右键html文件 open with live server

## 配置 webpack loader
"autoprefixer": {} // 加上不同浏览器的兼容前缀

## 配置样式处理方案
css
less
cssModule

### css in js 
- @emotion/css 
- styled-component
- 好处是灵活了，坏处是代码更复杂了，没有提示

### utility css
- tailwindcss 
- tailwindcss初始化配置
```bash
npx tailwindcss init
```
- 配置 tailwind 基础设施 tailwind.css
**想要样式生效还需在.postcssrc.json里加入tailwindcss**

## 线上webpack配置优化
- @babel/preset-env 根据指定的执行环境提供语法转换 配置了useBuiltIns:"usage",corejs:3 按需加载polyfill
- cross-env 可以让本地开发模拟线上的环境
- DefinePlugin 可以定义全局参数

# 用 vite + react + mdx 搭建 开发文档站点
查看开发文档 `pnpm doc`

package.json 内添加
```bash 
"scripts": {
    ...,
    "pnpm doc": "pnpm --filter devbook run dev"
}
```

