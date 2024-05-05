const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
// babel-traverse 是 AST 遍历工具，对 AST 进行替换
const traverse = require('babel-traverse').default
// 将 es2015+ 的高级语法转化为 es5 的语法
const { transformFromAst } = require('babel-core')

let ID = 0

// filename 参数为文件路径，读取内容并提取它的依赖关系
function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8')
    console.log(`1---读取到的原始文件-${filename}-的内容`, content)

    // 获取该文件对应的 ast 抽象语法树
    const ast = babylon.parse(content, {
        sourceType: 'module',
    })

    console.log(`2---源文件转化的 ast 文件-${filename}-的内容`, ast)

    // dependencise 保存所依赖的模块的相对路径
    const dependencises = []

    // 通过查找 import 节点，找到该文件的依赖关系
    // 因为项目中我们都是通过 import 引入其他文件的，找到了 import 节点，就找到这个文件引用了哪些文件
    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            // 查找 import 节点
            dependencises.push(node.source.value)
        },
    })

    console.log(
        '3---遍历 ast 得到所有 import 的文件------',
        JSON.stringify(dependencises)
    )

    // 通过递增计数器，为此模块分配唯一标识符，用于缓存已解析过的文件
    const id = ID++
    // 该‘presets’选项是一组规则，告诉‘babel’如何传输我们的代码
    // 用‘babel-preset-env’将代码转换为浏览器可以运行的东西
    const { code } = transformFromAst(ast, null, {
        presets: ['env'],
    })

    console.log('4---babel 处理过之后的代码------', code)

    console.log(
        '为当前模块创建的依赖内容',
        JSON.stringify({
            id,
            filename,
            dependencises,
            code,
        })
    )

    // 返回此模块的相关信息
    return {
        id, // 文件的唯一标识 id
        filename, // 文件路径
        dependencises, // 当前文件的依赖关系-就是依赖文件列表
        code, // 兼容浏览器的 代码
    }
}

// 提取它每一个依赖文件的依赖关系，循环下去: 找到对应的这个项目的 ‘以来图’
function createGraph(entry) {
    // first: 得到入口文件的依赖关系
    const mainAsset = createAsset(entry)

    const queue = [mainAsset]
    for (const asset of queue) {
        asset.mapping = {}
        // 获取这个模块所在目录
        const dirname = path.dirname(asset.filename)
        asset.dependencises.forEach((relativePath) => {
            // 通过将相对路径与父资源目录的路径连接，将相对路径转变为绝对路径
            // 每个文件的绝对路径是固定的、唯一的
            const absolutePath = path.join(dirname, relativePath)
            // 递归解析其中所引入的资源
            const child = createAsset(absolutePath)
            asset.mapping[relativePath] = child.id
            // 将 child 推入队列，通过递归实现了它的依赖关系解析
            queue.push(child)
        })
    }
    return queue
}

// 自定义实现了 require 方法，找到导出变量的引用逻辑
function bundle(graph) {
    let modules = ''
    graph.forEach((mod) => {
        modules += `${mod.id}: [
            function (require, module, exports){ ${mod.code} },
            ${JSON.stringify(mod.mapping)}
        ],`
    })

    // console.log('graph', graph)

    const result = `
    (function(modules) {
        console.log('222',modules);
        function require(id) {
            const [fn, mapping] = modules[id];
            function localRequire(name) {
                return require(mapping[name]);
            }
            const module = {
                exports: {}
            };
            fn(localRequire, module, module.exports);
            return module.exports;
        }
        require(0);
    })({${modules}})
    `
    // console.log(result)
    return result
}

// webpack 构建的 三大主要流程 -------------------------------------------------------

// 第一步 根据入口文件创建依赖图
const graph = createGraph('../../src/entry/index.js')

// 第二步 根据依赖图打 bundle
const result = bundle(graph)

// 第三步 创建 dist 目录， 将打包的内容写入 main.js
fs.mkdir('../../dist', (err) => {
    if (!err) {
        fs.writeFile('../../dist/main.js', result, (err1) => {
            if (!err1) console.log('打包成功')
        })
    }
})

//  ------------------------------------------------------- webpack 构建的 三大主要流程
