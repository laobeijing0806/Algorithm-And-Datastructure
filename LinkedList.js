function LinkedList () {
  
  var Node = function (element) {
    this.element = element
    this.next = null
  }

  var length = 0
  var head = null

  this.append = function (element) {

    var node = new Node(element),
        current

    // 将列表中第一个节点保存到head中
    if (head === null) {
      head = node
    } else {
      current = head

      // 循环列表，直到找到最后一项
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

      // 如果删除第一个元素，把head指向下一个元素就行了
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

  this.toString = function () {
    var current = head,
        string = ''
    
    while (current) {
      string += current.element
      current = current.next
    }

    return string
  }

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

  this.remove = function (element) {
    var index = this.indexOf(element)
    return this.removeAt(index)
  }

  this.isEmpty = function () {
    return length === 0
  }

  this.size = function () {
    return length
  }

  this.getHead = function () {
    return head
  }
}

var list = new LinkedList()

list.append(15)
list.append(10)

console.log(list)

// 双向链表
function DoubleLinkedList () {
  var Node = function (element) {
    this.element = element
    this.prev = null
    this.next = null
  }

  var length = 0
  var head = null
  var tail = null

  this.insert = function (position, element) {
    // 检查是否越界
    if (position >= 0 && position <= length) {
      var node = new Node(element),
          current = head,
          previous,
          index = 0

      if (position === 0) { // 第一个元素的位置插入
        // 如果链表为空
        if (!head) {
          head = node
          tail = node
        } else {
          node.next = current
          current.prev = node
          head = node
        }
      } else if (position === length) { // 在最后一个元素插入
        current = tail
        node.prev = current
        current.next = node
        tail = node
      } else { // 在中间插入
        while (index++ < position) {
          previous = current
          current = current.next
        }

        node.next = current
        previous.next = node

        current.prev = node
        node.prev = previous
      }

      length++

      return true
    } else {
      return false
    }
  }

  this.removeAt = function (position) {
    // 检查是否越界
    if (position > -1 && position < length) {
      var current = head,
          previous,
          index = 0

      if (position === 0) { // 第一个元素
        head = current.next
        // 如果只有一项
        if (length === 1) {
          tail = null
        } else {
          head.prev = null
        }
      } else if (position === length - 1) { // 最后一个元素
        current = tail
        tail = current.prev
        tail.next = null
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }

        previous.next = current.next
        current.next.prev = previous
      }

      length--

      return current.element
    } else {
      return null
    }
  }
}