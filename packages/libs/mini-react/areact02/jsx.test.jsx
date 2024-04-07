import { describe, it, expect } from 'vitest'
import AReact from './AReact'

describe('AReact Jsx', () => {
    it('should render jsx', () => {
        const element = (
            <div id="foo">
                <div id="bar"></div>
                <button></button>
            </div>
        )
        console.log(JSON.stringify(element))
        // 可以在终端通过 esbuild 去编译 element 这个 jsx
        // ./node_modules/vite/node_modules/.bin/esbuild ./areact02/jsx.test.jsx
        const container = document.createElement('div')
        const root = AReact.createRoot(container)
        // 去写 createRoot
        // createRoot 是返回一个实例对象的，包含 render 方法，先创建容器节点，再把 element 的内容渲染进去
        root.render(element)
        console.log(container.innerHTML)
        expect(container.innerHTML).toBe('<div id="foo"><div id="bar"></div><button></button></div>')
    });

    it('should render jsx with text', () => {
        const element = (
            <div id="foo">
                <div id="bar"></div>
                <button>Add</button>
            </div>
        )
        console.log(JSON.stringify(element))
        // 添加完 Add 直接运行会报错
        // 由于 children 节点里的 Add 是没有 type、props、children 等这些属性的，所以需要对 string\number 这类的节点做归一化处理
        // 在 AReact.createElement 做处理
        const container = document.createElement('div')
        const root = AReact.createRoot(container)
        root.render(element)
        expect(container.innerHTML).toBe(
            '<div id="foo"><div id="bar"></div><button>Add</button></div>'
        )
    });

    it('should render jsx with different props', ()=> {
        const element = (
            <div id="foo" className="bar">
                <button>Add</button>
            </div>
        )
        const container = document.createElement('div')
        const root = AReact.createRoot(container)
        root.render(element)
        expect(container.innerHTML).toBe(
            '<div id="foo" class="bar"><button>Add</button></div>'
        )
    })
})
