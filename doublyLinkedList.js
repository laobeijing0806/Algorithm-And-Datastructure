// 双向链表
function DoublyLinkedList () {
  
  var Node = function (element) {
    this.element = element
    this.prev = null // 新增了一个指向前一个元素的引用
    this.next = null
  }

  var length = 0
  var head = null
  var tail = null //新增了tail指向最后一个元素

  this.insert = function (position, element) {
    // 检查是否越界
    if (position >= 0 && position <= length) {
      var node = new Node(element),
          current = head,
          previous,
          index = 0

      if (position === 0) { // 第一个元素的之前插入
        // 如果链表为空
        if (!head) {
          head = node
          tail = node
        } else {
          node.next = current
          current.prev = node
          head = node
        }
      } else if (position === length) { // 在最后一个元素之后插入
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
        // 如果只有一个元素
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

  this.append = function (element) {
    var node = new Node(element),
        current = tail
    
    if (head === null) {
      head = node
      tail = node
    } else {
      node.prev = current
      current.next = node
      tail = node
    }

    length++
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

  // 链表首元素
  this.showHead = function() {
    return head;
  };

  // 链表长度
  this.showLength = function() {
    return length;
  };

  // 链表尾元素
  this.showTail = function() {
    return tail;
  }  
}

// 一些操作
// var doublylinkedlist = new DoublyLinkedList()

// doublylinkedlist.append(1)
// doublylinkedlist.append(2)
// doublylinkedlist.insert(2, 3)
// doublylinkedlist.append(445)

// console.log(doublylinkedlist.toString())