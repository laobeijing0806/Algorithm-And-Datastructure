function ArrayList () {
  var array = []

  var swap = function (index1, index2) {
    var aux = array[index1]
    array[index1] = array[index2]
    array[index2] = aux
    console.log(array)
  }

  // 归并排序辅助，用于合并排序
  var merge = function (left, right) {
    var result = [],
        il = 0,
        ir = 0

    // 将左右两个数组元素的大小进行比较，按从小到大的顺序推入result数组
    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++])
      } else {
        result.push(right[ir++])
      }
    }

    // 上一轮比较之后其中一个数组还剩下一些元素，再将这些元素继续推入result数组
    while (il < left.length) {
      result.push(left[il++])
    }
    while (ir < right.length) {
      result.push(right[ir++])
    }

    // 返回完成排序的数组
    return result
  }

  // 归并排序辅助函数，用于拆分数组
  var mergeSortRect = function (array) {
    var length = array.length
    if (length == 1) {
      return array
    }
    var mid = Math.floor(length / 2),
        left = array.slice(0, mid),
        right = array.slice(mid, length)

    return merge(mergeSortRect(left), mergeSortRect(right))
  }

  this.insert = function (item) {
    array.push(item)
  }

  this.toString = function () {
    return array.join()
  }

  // 自己实现的不知道什么排序，复杂度O(n^2)
  this.donKnowWhatSort = function () {
    var length = array.length
    for (var i = 0; i < length; i++) {
      for (var j = i; j < length; j++) {
        if (array[i] > array[j]) {
          swap(i, j)
        }
      }
    }
  }

  // 改进后的冒泡排序，复杂度O(n^2)
  this.bubbleSort = function () {
    var length = array.length
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          swap(j, j + 1)
        }
      }
    }
  }

  // 选择排序，复杂度O(n^2)
  this.selectionSort = function () {
    var length = array.length,
        minIndex
    for (var i = 0; i < length - 1; i++) {
      minIndex = i
      for (var j = i; j < length; j++) {
        if (array[i] > array[j]) {
          minIndex = j
        }
      }
      if (minIndex !== i) {
        swap(i, minIndex)
      }
    }
  }

  // 插入排序，复杂度O(n^2)
  this.insertionSort = function () {
    var length = array.length,
        j, temp

    for (var i = 1; i < length; i++) {
      j = i
      temp = array[i]
      while (j > 0 && array[j - 1] > temp ) {
        array[j] = array[j - 1]
        j--
      }
      array[j] = temp
    }
  }

  // 归并排序
  this.mergeSort = function () {
    array = mergeSortRect(array)
  }
}

function createNonSortedArray (size) {
  var array = new ArrayList()
  for (var i = size; i > 0; i--) {
    array.insert(i)
  }
  return array
}

var array = createNonSortedArray(5)
console.log(array.toString())
array.mergeSort()
console.log(array.toString())