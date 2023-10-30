### 插入排序

每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序了。接着和第二项比较，看第二项是否要插到第一项之前，接着看第三项是否要插到第一、第二的前面，一次类推。

实现代码：

```js
const sortArray = function (nums) {
    for (let i = 1; i < nums.length; i++) {
        let j = i
        let temp = nums[j]
        // 前面的都已经排好序，只需要比较当前temp跟前面比较过的值
        while (j > 0 && temp < nums[j - 1]) {
            nums[j] = nums[j - 1]
            // 这里 j 对应的值是比temp 大的，所以交换后 temp 的位置就是 j-1
            j--
            // 如果后面temp不比前面的值小，那么这里的j--后的下标就是temp对应的下标
        }

        nums[j] = temp
    }
    return nums
}
```
