# 每周总结可以写在这里
## searchPath
* insert
  * 扩散搜索
  * 斜向搜索
  * 记录pre，上一个到达的点。
* 搜索到之后，从记录pre的map数据，反向搜索路径

### 启发式搜索
* 启发式搜索
  * 带启蒙函数，每次都尽可能地搜索到最小路径的点，最后是找到的是最短的路径
    * 新的数据结构

* 无序数组，每次拿最小的  
``` javascript
  class Sorted {
    constructor(data, compare) {
      this.data = data;
      this.compare = compare;
    }
    take() {
      if (!this.data.length) {
        return;
      }
      let min = this.data[0];
      let minIndex = 0;
      for (let i = 0; i < this.data.length; i++) {
        if (this.compare(this.data[i], min) < 0) {
          min = this.data[i];
          minIndex = i;
        }
      }
      // 对于无序的数组，这里只需要把最后一个和当前需要pop出去的交换位置，然后pop最后一个即可
      this.data[minIndex] = this.data[this.data.length - 1];
      this.data.pop();
      return min;
    }
    insert(v) {
      this.data.push(v)
    }
    get length() {
      return this.data.length;
    }
  }
```
* 最小二叉平衡树（重要：使用一维数组实现）
``` javascript
  // 二叉树
  class BinaryHeap {
    constructor(data, compare) {
      this.data = data;
      this.compare = compare;
    }
    take() {
      if (!this.data.length) {
        return;
      }
      let min = this.data[0];
      let i = 0;
      // fix heap
      while(i < this.data.length) {
        let leftLeaf = i * 2 + 1;
        let rightLeaf = i * 2 + 2;
        if (leftLeaf >= this.data.length) {
          break;
        }
        if (rightLeaf >= this.data.length) {
          this.data[i] = this.data[leftLeaf];
          i = leftLeaf;
          break;
        }
        if (this.compare(this.data[leftLeaf], this.data[rightLeaf]) < 0) {
          this.data[i] = this.data[leftLeaf];
          i = leftLeaf;
        } else {
          this.data[i] = this.data[rightLeaf];
          i = rightLeaf;
        }
      }
      if (i < this.data.length - 1) {
        this.insertAt(i, this.data.pop());
      } else {
        this.data.pop();
      }

      return min;
    }
    insertAt(i, v) {
      this.data[i] = v;
      while (i > 0 && this.compare(v, this.data[Math.floor((i - 1)/ 2)]) < 0) {
        this.data[i] = this.data[Math.floor((i - 1)/ 2)];
        this.data[Math.floor((i - 1)/ 2)] = v;
        i = Math.floor((i - 1)/ 2)
      }
    }
    insert(v) {
      this.insertAt(this.data.length, v);
    }
    get length() {
      return this.data.length;
    }
  }

```