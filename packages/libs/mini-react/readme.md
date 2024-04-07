## 建设此项目的目的

**以 TDD 的方式编写 mini 版 react** _开源框架的开发模式一般都是采用 TDD 模式，没有业务开发基于浏览器调试源码的痛点，TDD 虽不太适合所有的业务开发，但对开源框架比较适合。_

### 项目构建过程

#### 1、创建 vite 纯净版 项目

![https://vitejs.dev] `pnpm create vite mini-react --template vanilla`

#### 2、添加 vitest

![https://vitest.dev/guide/why.html] 一个基于 vite 并且兼容 Jest 的下一代测试框架，让你更快的运行单元测试，并通过即时的热模块重载提高开发体验

1. 安装 `pnpm add vitest -D --filter mini-react`
2. package.json 下添加 scripts 项 `"test": "vitest"`

### 3、添加 dom 环境支持依赖 happy-dom

模拟 dom 环境 和 浏览器 API

1. 安装 `pnpm add happy-dom -D --filter mini-react`
2. 添加 vitest 配置文件新建 vite.config.ts ![https://vitest.dev/guide/features.html#mocking]

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'happy-dom', // or 'jsdom', 'node'
    },
})
```

1. 添加用于 debug 的 launch.json 文件 ![https://vitest.dev/guide/debugging.html]

### 4、添加测试文件 areact01/tdd.test.js 测试同/异步方法

使用 vitest 提供的 describe、it、expect

### 5、JSX 与同步模式

1. 在 vite.config.ts 中指定 AReact 作为 jsx 的依赖项（代替 react）

```js
esbuild: {
    jsxFactory: 'AReact.createElement'
}
```
2. `pnpm test` 提示找不到 AReact
新建 AReact.jsx 文件 => 编写 createElement 方法 => jsx.test.jsx 引入AReact

1. JSX 的编译方法
2. 同步渲染模式：基于栈递归

### 6、Fiber 与并发模式

### 7、手写函数组件

### 8、手写 useState & useReducer

### 7、Reconciler 协调器
