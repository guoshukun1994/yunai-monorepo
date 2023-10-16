#### 链表的实现

```js
class linkedList {
	constructor() {
		this.length = 0
        // 空链表特征 =》 判断链表长度
		this.head = null
	}

	getElementAt(position) {}   // 返回索引对应的元素
    indexOf(element) {}         // 返回元素的位置

    append(element) {}          // 添加节点
    insert(position, element) {} // 指定位置插入节点

    removeAt(position) {}       // 删除指定位置元素
    remove(element) {}          // 删除指定元素
}

// 辅助
class Node {
	constructor(element) {
		this.element = element
		this.next = null
	}
}
```
