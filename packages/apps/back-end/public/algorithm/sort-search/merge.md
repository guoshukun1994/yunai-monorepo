### 归并排序 （O(nlog(n))

**归并排序** 是第一个可以实际使用的排序算法。它是一种分而治之算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。

实现代码：

```js
const merge = function (leftArr, rightArr) {
    let arr = [],
        i = 0,
        j = 0
    while (i < leftArr.length && j < rightArr.length) {
        arr.push(leftArr[i] < rightArr[j] ? leftArr[i++] : rightArr[j++])
    }
    return arr.concat(i < leftArr.length ? leftArr.slice(i) : rightArr.slice(j))
}
const sortArray = function (nums) {
    if (nums.length > 1) {
        let mid = Math.floor(nums.length / 2)
        let left = sortArray(nums.slice(0, mid))
        let right = sortArray(nums.slice(mid))
        // 先递归分治，再合并比较
        nums = merge(left, right)
    }
    // 当递归到数组长度为1时，开始合并
    return nums
}
```
