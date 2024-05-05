# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### 调试源码需操作如下

#### 指定分支浅克隆

git clone git@github.com:facebook/react.git --depth 1 --branch v18.2.0

#### 修改项目配置

1. config/webpack.config.js 搜索 alias，修改引用 react 相关包的地址

```js
alias: {
        react: path.resolve(__dirname, "../src/react/packages/react"),
        "react-dom": path.resolve(__dirname, "../src/react/packages/react-dom"),
        "react-reconciler": path.resolve(__dirname, "../src/react/packages/react-reconciler"),
        "react-dom-bindings": path.resolve(__dirname, "../src/react/packages/react-dom-bindings"),
        scheduler: path.resolve(__dirname, "../src/react/packages/scheduler"),
        shared: path.resolve(__dirname, "../src/react/packages/shared"),
      },
```

2. 修改 env.js 文件 配置 webpack DefinePlugin 的环境参数 **搜索 stringified** "**DEV**": true, "**PROFILE**": true, "**UMD**": true, "**EXPERIMENTAL**": true
3. 启动项目，处理报错

    1. 解决 src/index.js 下的导出错误 import _ as React from 'react'; mport _ as ReactDOM from 'react-dom/client';
    2. 处理 react-reconciler/src/Scheduler.js 编译错误两个mock变量 unstable_yieldValue、unstable_setDisableYieldValue 赋值空函数()=>{}

4. 添加 .env 文件 **禁用eslint** DISABLE_ESLINT_PLUGIN=true
5. 解决 ReactSharedInternals 的报错 import ReactSharedInternals from '../react/src/ReactSharedInternals'
6. 解决 ReactFiberHostConfig 的报错这个文件其他内容是rollup动态注入的，决定渲染终端的方式删除抛出异常的代码，添加代码`export * from './forks/ReactFiberHostConfig.dom'`
7. 如果有因为 flow 类型导致的 ts 报错，可以直接关掉 ts 报错 settings -> 搜索 script:validate -> 把出现的 JavaScript 和 TypeScript 的 validation 取消勾选

#### 开始调试

打开 http://localhost:3000/ 即可开始调试。建议先完成以下任务，增加对 React 了解：

1. 火焰图查看代码的调用堆栈，并跳转到感兴趣的代码
1. 查看 workloop 的代码 `src/react/packages/react-reconciler/src/ReactFiberWorkLoop.old.js`
1. 查看 render(beginWork, completeWork)、commit 阶段
1. 查看 Fiber 的数据结构 `src/react/packages/react-reconciler/src/ReactInternalTypes.js`
1. 查看 Hooks 的数据结构 `src/react/packages/react-reconciler/src/ReactFiberHooks.old.js`
