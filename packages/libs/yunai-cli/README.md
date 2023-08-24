# npm init

# bin/www.js 
```js
#! usr/bin/env node
// 标识用node来执行此文件
```
- cli执行入口文件
- package.json 设置 bin 执行入口
```json
"bin": "./bin/www.js"
```

# npm link 到全局
测试 yunai-cli 是否 link 成功
- 控制台输入 `yunai-cli` 测试连接是否成功

# 安装脚手架所需依赖包
`npm install commander inquirer download-git-repo util ora fs-extra axios`
|  工具名称 | 作用 |
|  ------    |------|
|  commander | 自定义命令工具 |
|  inquirer  | 命令行交互工具 |
| download-git-repo | 从git上下载项目模板工具 |
|   util     | dowload-git-repo 不支持异步调用，需要使用util插件的util.promisify进行转换 |
|   ora      | 命令行 loading 动效  |
|   fs-extra | 提供文件操作方法  |
|   axios    | 发送接口，请求git上的模板列表  |-
-
# commander 自定义命令行工具
这里用来创建create命令， 用户可以通过输入 yunai-cli create appName 来创建项目

# inquire 命令行交互工具
这里用来询问用户的操作，让用户输入指定的信息，或给出对应的选项让用户选择

## 此处 inquirer 的运用场景有2个
1. 场景1：当用户要创建的项目目录已存在时，提示用户是否要覆盖 or 取消
2. 场景2：让用户输入项目的 author 作者和项目 description 描述

## 创建 create.js
`bin/create.js`

## 创建 ask.js
`bin/ask.js`
- 配置 ask 选项，让用户输入作者和项目描述

## 创建 generator.js
1. 通过接口获取 git 上的模板目录
2. 通过 inquirer 让用户选择需要下载的项目
3. 使用 download-git-repo 下载用户选择的项目模板
4. 将用户创建时， 将 项目名称、作者名字、描述 写入到项目模板的 package.json 文件中

## 创建 http.js
用来发送接口， 获取 git 上的模板列表
`bin/http.js`



