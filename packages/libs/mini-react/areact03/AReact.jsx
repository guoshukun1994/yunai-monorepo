function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            // 对文本类节点做归一化处理
            children: children.map((child) => {
                return typeof child === 'object'
                    ? child
                    : createTextElement(child)
            }),
        },
    }
}

function createTextElement(text) {
    return {
        type: 'HostText',
        props: { nodeValue: text, children: [] },
    }
}

const isChildrenProperty = (key) => key !== 'children'

class AreactDomRoot {
    constructor(container) {
        this.container = container
    }

    render(element) {
        this.renderImpl(element, this.container)
    }

    renderImpl(element, parent) {
        const dom =
            element.type === 'HostText'
                ? document.createTextNode('')
                : document.createElement(element.type)
        Object.keys(element.props)
            .filter((key) => isChildrenProperty(key))
            .forEach((key) => {
                dom[key] = element.props[key]
            })
        element.props.children.forEach((item) => this.renderImpl(item, dom))
        parent.appendChild(dom)
    }
}

function createRoot(container) {
    return new AreactDomRoot(container)
}

export default { createElement, createRoot }
