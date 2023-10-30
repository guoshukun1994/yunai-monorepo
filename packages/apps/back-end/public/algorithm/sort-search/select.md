### 选择排序 O(n^2)

选择排序算法是一种原址比较算法。找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并放在第二位，一次类推。

实现代码：

```js
// 选择排序
const sortArray = function (nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        let minIndex = i
        for (let j = i; j < nums.length; j++) {
            if (nums[j] < nums[minIndex]) {
                minIndex = j
            }
        }
        // 拿到最小值的索引后再执行交换
        if (minIndex !== i) {
            let temp = nums[i]
            nums[i] = nums[minIndex]
            nums[minIndex] = temp
        }
    }
    return nums
}
```
