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
```sh
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
```sh
npx husky-init
pnpm add @commitlint-cli @commitlint/config-conventional -D -w
pnpm i 
```

### 添加commitlint.config.js配置文件
```sh
echo "module.exports = {extends: ['@commitlint/config-conventional']};" > commitlint.config.js
```
在提交commit时可能会报错： SyntaxErroe: Invalid or unexpected token
解决办法：
这是因为配置文件的编码格式不正确：更改vscode下方编码格式改成 UTF-8

## 7、配置 typescript 环境
### 配置tsconfig.json
如果本地环境没有typescirpt的可以装一下
```sh
pnpm add typescript -g
tsc --init
```

### 安装 react ts 环境
```sh
pnpm add react @types/react react-dom @types/react-dom --filter @proj/react-x
```

## 配置 react 构建环境
```sh
pnpm add webpack webpack-cli webpack-merge webpack-dev-server @babel/core @babel/preset-react @babel/preset-typescript babel-loader css-loader less style-loader less-loader postcss postcss-loader tailwindcss autoprefixer html-webpack-plugin cross-env -D --filter @proj/react-x
```

### 编写webpack.base.js等配置文件
如遇到 require文件时报错
```sh
Require statement not part of import statement.(@typescript-eslint/no-var-requires)
```
可以在eslintrc.json的rules添加以下内容：
```sh
  rules: {
    '@typescript-eslint/no-var-requires': 0
  }
```

### 配置.babelrc文件

### 测试项目
1. 本地开发环境
```sh
pnpm start 
```
2. 生产环境
```sh
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
```sh
npx tailwindcss init
```
- 配置 tailwind 基础设施 tailwind.css
**想要样式生效还需在.postcssrc.json里加入tailwindcss**

