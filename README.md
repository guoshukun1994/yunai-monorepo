# my all

技术栈：[React](https://reactjs.org/) + [antd](https://ant.design/) + [Vite](https://vitejs.dev/) + [pnpm](https://pnpm.io/) + [rollup](https://rollupjs.org/introduction/)

## 准备工作
- 安装 [Nodejs](https://nodejs.org/en/)
- 安装 [pnpm](https://pnpm.io/)

## 安装依赖
```bash
pnpm install
```

## 查看开发文档 基于 react + vite + mdx 搭建
```bash
pnpm doc
```

## 组件库本地打包
```bash
pnpm --filter @proj/react-components run build
```
<!-- 保持本地组件库最新后即可启动依赖组件库的相关项目，因为这里没有把打包文件放到git上 -->

