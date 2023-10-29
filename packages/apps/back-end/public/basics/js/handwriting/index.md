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
    b: 2,
}

myNew(fn, 3)
```

### 手写 Promise

1. **实现 resolve 和 reject：**（3个特点）

-   Promise 有3个状态 `pending、fulfilled、rejected`,初始状态为`pending`,执行resolve回调状态变成fulfilled,执行reject回调状态变成 rejected
-   状态一经改变，就不会再发生变化，只会从`pending=>fulfilled` 或`pending=>rejected`
-   不通过执行回调reject，也可以通过 `throw` 来将状态 pending => rejected

2. **实现 then**

-   then 接受两个回调函数，一个是成功回调 onFulfilled，一个是失败回调 onRejected
-   当 Promise 状态为 fulfilled 时执行成功回调，为 rejected 时执行失败回调
-   若 resolve 或 reject 回调在定时器里,则 onFulfilled 或 onRejected 在定时器结束后执行
-   then 的执行要在外层宏任务之后执行
-   then 支持链式调用，下一次的 then 的入参 为上一次then的返回值
    -   返回自身的处理
    -   返回Promise,执行下一个then
    -   返回非Promise,直接resolve

实现代码：

```js
class MyPromise {
    constructor(excutor) {
        this.initValue()

        // 捕获 throw 改变状态 pending=>rejected
        try {
            // 这里的 bind 是为了 将resolve 和reject 传递给 excutor 后，
            // 在执行的时候还能继续访问 Pomise 实例上的属性，比如：this.PromiseState、this.PromiseResult
            excutor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    initValue() {
        this.PromiseState = 'pending'
        this.PromiseResult = null

        // 这里的 cbs 是为了处理 resolve 和 reject 在异步环境中 then 的执行顺序问题
        // 数组维护 cbs 通过 while 去在符合条件下执行 cb
        this.onFulfilledCbs = []
        this.onRejectedCbs = []
    }

    resolve(val) {
        if (this.PromiseState !== 'pending') return // 状态不会二次改变，一旦从pending改变之后
        this.PromiseState = 'fulfilled'
        this.PromiseResult = val

        while (this.onFulfilledCbs.length > 0) {
            this.onFulfilledCbs.shift()(this.promiseResult)
        }
    }

    reject(reason) {
        if (this.PromiseState === 'pending') return // 状态不会二次改变，一旦从pending改变之后
        this.PromiseState = 'rejected'
        this.PromiseResult = reason

        while (this.onRejectedCbs.length > 0) {
            this.onRejectedCbs.shift()(this.promiseResult)
        }
    }

    then(onFulfilled, onRejected) {
        // 处理两个回调不是函数的情况时，确保回调都为函数
        // 为下一次then做准备，会获取到本次resolve或reject传递的值
        onFulfilled =
            typeof onFulfilled === 'function' ? onFulfilled : (val) => val
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (reason) => {
                      throw reason
                  }

        const thenPromise = new MyPromise((resolve, reject) => {
            const resolvePromise = (cb) => {
                // 这里的定时器是为了将 then 任务 的执行放在 外层宏任务之后
                setTimeout(() => {
                    try {
                        const res = cb(this.PromiseResult)
                        if (res && res === thenPromise) {
                            throw new Error('不能返回自身')
                        } else if (res instanceof MyPromise) {
                            res.then(resolve, reject)
                        } else {
                            resolve(res)
                        }
                    } catch (err) {
                        reject(err)
                        throw new Error(err)
                    }
                })
            }

            if (this.PromiseState === 'fulfilled') {
                resolvePromise(onFulfilled)
            } else if (this.PromiseState === 'rejected') {
                resolvePromise(onRejected)
            } else if (this.PromiseState === 'pending') {
                // 这里处理 resolve/reject 在异步环境下，先收集 两个回调，后面根据情况执行
                this.onFulfilledCbs.push(resolvePromise.bind(this, onFulfilled))
                this.onRejectedCbs.push(resolvePromise.bind(this, onRejected))
            }
        })

        return thenPromise
    }
}
```

测试代码：

```js
const p = new MyPromise((resolve, reject) => {
    resolve('11111')
    reject('errr')
})

console.log(p)

const p1 = new MyPromise(() => {
    throw 'error'
})

console.log(p1)

const p2 = new MyPromise((resolve, reject) => {
    resolve('1111')
}).then((res) => console.log(res))

const p3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('3333')
    }, 1000)
}).then((res) => console.log(res))

console.log('主线程的宏任务')

const p4 = new MyPromise((resolve, reject) => {
    resolve(1)
})
    .then((res) => {
        return new MyPromise((resolve, reject) => {
            console.log('res', res)
            resolve(res * 10)
        })
    })
    .then((res) => console.log(res))
```

${toc}
