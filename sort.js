/**
 * 这是我自己实现的一些排序算法，默认从小到大排序
 */

// 公共函数swap，用于交换两个值
function swap (myArr, p1, p2) {
  var temp = myArr[p1]
  myArr[p1] = myArr[p2]
  myArr[p2] = temp
}


// 冒泡排序
/**
 * 思路：
 * 第一步：选取一个数依次与后面的数比较，如果大于后面的数就调换位置，如果小于就结束该轮循环
 * 第二步：重复上面的步骤
 */

function bubbleSort (array) {
  var length = array.length
  if (!Array.isArray(array) || length === 0) {
    return 'please input array'
  }

  for (var i = 0; i < length - 1; i++) {
    for (var j = 0; j < length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }

  return array
}
 
// 选择排序
/**
 * 思路：
 * 第一步：选取一个数假设为剩下的数中最小的数min
 * 第二步：遍历剩余数组，如果找到更小的数就跟min交换
 * 第三步：重复上述步骤
 */

function selectionSort (array) {
  var length = array.length
  if (!Array.isArray(array) || length === 0) {
    return 'please input array'
  }
  var min

  for (var i = 0; i < length; i++) {
    min = i
    for (var j = i+1; j < length; j++) {
      if (array[j] < array[min]) {
        min = j
      }
    }
    if (i !== min) {
      swap(array, min, i)
    }
  }

  return array
}

// 插入排序
/**
 * 思路：
 * 第一步：把从第二个元素开始，假设之前的已经排序
 * 第二步：若该元素比前一个的元素小，则二者交换位置
 * 第三步：如果该元素比前一个大，则停止此轮排序
 * 第四步：从下一个元素开始，重复之前步骤
 */

function insertionSort (array) {
  var length = array.length
  if (!Array.isArray(array) || length === 0) {
    return 'please input array'
  }
  var temp, j

  for (var i = 1; i < length; i++) {
    j = i
    temp = array[i]
    while (j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = temp
  }

  return array
}

// 归并排序
/** 
 * 思路：
 * 第一步：将数组不断分解为最小的数组
 * 第二步：将元素1对1排序合并
 * 第三步：继续对已排序的数组排序合并
 * 第四步：重复上述步骤直至排序结束
 */
function merge (left, right) {
  var result = [],
      il = 0,
      ir = 0

  while (il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++])
    } else {
      result.push(right[ir++])
    }
  }
  
  return result.concat(left.slice(il), right.slice(ir))
}

function mergeSort (array) {
  if (array.length <= 1) {
    return array
  }

  var middle = Math.floor(array.length / 2),
      left = array.slice(0, middle),
      right = array.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

// 快速排序
/**
 * 思路：
 * 第一步：数组中选择一个基点
 * 第二步：新建两个数组，一边放比基点小的；一边放比基点大的
 * 第三步：对两个小数组继续重复上述步骤
 */

function quickSort (array) {
  if (array.length <= 1) {
    return array
  }

  var pivotIndex = Math.floor(array.length / 2)
  var pivot = array.splice(pivotIndex, 1)[0]
  var left = []
  var right = []

  for (var i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }
  
  return quickSort(left).concat([pivot], quickSort(right))
}

// 三行代码撸出快排
/* function quickSort (array) {
  return array.length <= 1 ? array : quickSort(array.slice(1).filter(item => item <= array[0])).concat(array[0], quickSort(array.slice(1).filter(item => item > array[0])))
} */

var arrayList = [7, 4, 2, 3, 8, 1, 6, 5]
// console.time()
console.log(quickSort(arrayList) ) // 0.27ms左右
/* arrayList.sort(function (a, b) {
  return a - b
}) */ // 0.7ms左右
// console.timeEnd()