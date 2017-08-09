function LinkedList () {
  
  var Node = function (element) {
    this.element = element
    // 保存指向下个元素的引用，默认为null
    this.next = null
  }

  // 链表长度
  var length = 0
  // head保存指向第一个元素的引用
  var head = null

  this.append = function (element) {

    var node = new Node(element),
        current

    if (head === null) { // 当链表为空时
      // 将head指向新增的元素
      head = node
    } else { // 链表不为空
      // 使用一个current变量从head开始迭代链表
      current = head

      // 迭代链表，直到找到最后一项
      while (current.next) {
        current = current.next
      }

      // 找到最后一项，将其next赋为node，建立链接
      current.next = node
    }

    // 更新列表长度
    length++
  }

  this.removeAt = function (position) {
    // 判断位置是否越界
    if (position > -1 && position < length) {
      var current = head,
          previous,
          index = 0

      // 如果删除了第一个元素，把head指向下一个元素就行了
      if (position === 0) {
        head = current.next
      } else {
        // 根据输入的位置查找要删除的元素
        while (index++ < position) {
          previous = current
          current = current.next
        }
        // 将上一个元素的next指向current的下一项，跳过current，实现移除current
        previous.next = current.next
      }

      // 更新列表长度
      length--

      // 返回删除的元素
      return current.element
    } else {
      return null
    }
  }

  this.insert = function (position, element) {
    // 检查位置是否越界
    if (position >= 0 && position <= length) {
      var node = new Node(element),
          index = 0,
          previous,
          current = head

      // 在第一个位置添加
      if (position === 0) {

        node.next = current
        head = node

      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }

        node.next = current
        previous.next = node
      }

      // 更新列表长度
      length++

      return true
    } else {
      return false
    }
  }

  // 返回所有元素的值转成字符串
  this.toString = function () {
    var current = head,
        string = ''
    
    while (current) {
      string += current.element
      current = current.next
    }

    return string
  }

  // 查找元素在链表中的位置
  this.indexOf = function (element) {
    var current = head,
        index = 0

    while (current) {
      if (element === current.element) {
        return index
      }
      index++
      current = current.next
    }

    return -1
  }

  // 移除特定元素
  this.remove = function (element) {
    var index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 判断链表是否为空
  this.isEmpty = function () {
    return length === 0
  }

  // 返回链表长度
  this.size = function () {
    return length
  }

  // 返回第一个元素
  this.getHead = function () {
    return head
  }
}

// 一些操作
// var list = new LinkedList()

// console.log(list.indexOf(10))
// list.insert(0, 20)
// list.append(33)
// console.log(list.getHead())
// console.log(list.toString())
