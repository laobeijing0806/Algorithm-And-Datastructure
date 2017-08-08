function Queue () {

  var items = []

  this.enqueue = function (element) {
    items.push(element)
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
    console.log(items.toString())
  }
}

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

// function PriorityQueue () {
//   var items = []

//   function QueueElement (element, priority) {
//     this.element = element
//     this.priority = priority
//   }

//   this.enqueue = function (element, priority) {
//     var queueElement = new QueueElement(element, priority)
//     if (this.isEmpty()) {
//       items.push(queueElement)
//     } else {
//       var added = false
//       for (var i = 0; i < items.length; i++) {
//         if (queueElement.priority < items[i].priority) {
//           items.splice(i, 0, queueElement)
//           added = true
//           break
//         }
//       }
//       if (!added) {
//         items.push(queueElement)
//       }
//     }
//   }

//   this.dequeue = function () {
//     items.shift()
//   }

//   this.front = function () {
//     return items[0]
//   }

//   this.isEmpty = function () {
//     return items.length === 0
//   }

//   this.size = function () {
//     return items.length
//   }

//   this.print = function () {
//     console.log(items)
//   }
// }

// var priorityQueue = new PriorityQueue()

// priorityQueue.enqueue('Jack', 2)
// priorityQueue.enqueue('Jim', 1)
// priorityQueue.enqueue('James', 1)
// priorityQueue.print()

function hotPotato (nameList, num) {
  var queue = new Queue()

  for (var i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i])
  }
  // debugger
  var eliminated = ''
  while (queue.size() > 1) {
    for (var i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    eliminated = queue.dequeue()
    console.log(eliminated + '在击鼓传花游戏中被淘汰')
  }

  return queue.dequeue()
}

var names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']
var winner = hotPotato(names, 7)
console.log('胜利者：' + winner)