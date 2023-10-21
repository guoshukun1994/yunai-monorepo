### 手写 Object.create

Object.create() 静态方法以一个现有对象作为原型，创建一个新对象。

```js
function create(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}
```

### 手写 instanceof

instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链上。实现步骤：

1. 首先获取类型的原型
2. 然后获取对象的原型
3. 最后循环判断对象的原型是否等于类型的原型，直到对象原型 `null`，因为原型链最顶层就是 `null` 实现代码：

```js
function myInstanceof(obj, Fn) {
    if (!obj) return false
    let protoForObj = Object.getPrototypeOf(obj)
    let prototypeForFn = Fn.prototype
    while (protoForObj) {
        if (protoForObj === prototypeForFn) return true
        protoForObj = Object.getPrototypeOf(protoForObj)
    }
    return false
}
```

### 手写 new

new 就是用来创建构造函数的实例对象的，new 的主要执行操作如下：

1. 在内存中创建一个新对象
2. 将新对象的原型赋值为构造函数的 prototype 对象
3. 构造函数内部的 this 赋值为这个新对象（即 this 指向新对象）
4. 执行构造函数内部的代码（给新对象添加属性）
5. 如果构造函数返回非null的对象，则返回该对象；否则返回刚创建的新对象。

```js
function myNew() {
    let newObj = null // 1
    let constructor = Array.prototype.shift.call(arguments) // 取出第一个参数 判断其是否是一个函数
    if (typeof constructor !== 'function') {
        throw new Error('a is not a constructor')
    }
    newObj = Object.create(constructor.prototype) // 2
    const result = constructor.apply(newObj, arguments) // 3和4
    return typeof result === 'object' || typeof result === 'function' // 5
        ? result
        : newObj
}

function Fn(a) {
    this.a = 1
}

Fn.prototype = {
    b: 2
}

myNew(fn, 3)
```

${toc}