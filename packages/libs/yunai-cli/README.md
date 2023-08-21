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
`npm install commander inquirer download-git-repo util ora fs-estra axios`
|  工具名称 | 作用 |
|  ------    |------|
|  commander | 自定义命令工具 |
|  inquirer  | 命令行交互工具 |
| download-git-repo | 从git上下载项目模板工具 |
|   util     | dowload-git-repo 不支持异步调用，需要使用util插件的util.promisify进行转换 |
|   ora      | 命令行 loading 动效  |
|   fs-extra | 提供文件操作方法  |
|   axios    | 发送接口，请求git上的模板列表  |

