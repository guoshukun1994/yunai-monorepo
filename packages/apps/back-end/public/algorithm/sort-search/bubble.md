### 冒泡排序 O(n^2)

比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样。

实现代码：

```js
const sortArray = function (nums) {
    for (let i = 0; i < nums.length; i++) {
        // 下面条件的 -i 是为了减少不必要的比较
        for (let j = 0; j < nums.length - 1 - i; j++) {
            if (nums[j + 1] < nums[j]) {
                let temp = nums[j + 1]
                nums[j + 1] = nums[j]
                nums[j] = temp
            }
        }
    }
    return nums
}
```
