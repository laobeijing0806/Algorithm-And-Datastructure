// 用类来实现队列
function Queue () {

  var items = []

  // 向队列尾部添加元素
  this.enqueue = function (element) {
    items.push(element)
  }

  // 删除队列头部的元素并返回删除元素
  this.dequeue = function () {
    return items.shift()
  }

  // 返回队列头部的元素
  this.front = function () {
    return items[0]
  }

  // 队列是否为空
  this.isEmpty = function () {
    return items.length === 0
  }

  // 返回队列里元素的个数
  this.size = function () {
    return items.length
  }

  // 打印队列
  this.print = function () {
    console.log(items.toString())
  }
}

// 一些对队列的操作
// var queue = new Queue()
// console.log(queue.isEmpty())
// queue.enqueue('John')
// queue.enqueue('Jack')
// queue.enqueue('Camila')
// queue.print()
// console.log(queue.size())
// console.log(queue.isEmpty())
// queue.dequeue()
// queue.dequeue()
// queue.print()

// 优先队列的定义
function PriorityQueue () {
  var items = []

  function QueueElement (element, priority) {
    this.element = element
    this.priority = priority
  }

  // 给元素设置优先值，再按优先值插入队列
  this.enqueue = function (element, priority) {
    var queueElement = new QueueElement(element, priority)
    if (this.isEmpty()) {
      items.push(queueElement)
    } else {
      var added = false
      for (var i = 0; i < items.length; i++) {
        if (queueElement.priority < items[i].priority) {
          items.splice(i, 0, queueElement)
          added = true
          break
        }
      }
      if (!added) {
        items.push(queueElement)
      }
    }
  }

  this.dequeue = function () {
    return items.shift()
  }

  this.front = function () {
    return items[0]
  }

  this.isEmpty = function () {
    return items.length === 0
  }

  this.size = function () {
    return items.length
  }

  this.print = function () {
    console.log(items)
  }
}

// 优先队列的使用
// var priorityQueue = new PriorityQueue()

// priorityQueue.enqueue('Jack', 2)
// priorityQueue.enqueue('Jim', 1)
// priorityQueue.enqueue('James', 1)
// priorityQueue.print()

// 击鼓传花游戏
// function hotPotato (nameList, num) {
//   var queue = new Queue()

//   // 参与者的名字入列
//   for (var i = 0; i < nameList.length; i++) {
//     queue.enqueue(nameList[i])
//   }

//   var eliminated = ''

//   // 队列中的最后一个人为胜者
//   while (queue.size() > 1) {
//     // 按设定的击鼓次数，每个人都从队列头部出列转到队列尾部（模拟传花）
//     for (var i = 0; i < num; i++) {
//       queue.enqueue(queue.dequeue())
//     }
//     // 到了规定次数后，在队列头部的人（相当于拿到花）被淘汰
//     eliminated = queue.dequeue()
//     console.log(eliminated + '在击鼓传花游戏中被淘汰')
//   }

//   // 胜者出列并被返回
//   return queue.dequeue()
// }

// var names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
// var winner = hotPotato(names, 7)
// console.log('胜利者：' + winner)

module.exports = Queue