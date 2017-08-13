// 用类来实现栈
function Stack () {
  
  var items = []

  // 栈顶添加
  this.push = function (element) {
    items.push(element)
  }

  // 栈顶删除并返回删除元素
  this.pop = function () {
    return items.pop()
  }

  // 返回栈顶元素
  this.peek = function () {
    return items[items.length - 1]
  }

  // 栈是否为空
  this.isEmpty = function () {
    return items.length === 0
  }

  // 返回栈里的元素个数
  this.size = function () {
    return items.length
  }

  // 清空栈
  this.clear = function () {
    items = []
  }

  // 打印栈
  this.print = function () {
    console.log(items.toString())
  }
}

// 一些对栈的操作
// var stack = new Stack()
// console.log(stack.isEmpty())
// stack.push(5)
// stack.push(8)
// console.log(stack.peek())
// stack.push(11)
// console.log(stack.size())
// console.log(stack.isEmpty())
// stack.print()
// stack.push(15)
// stack.pop()
// stack.pop()
// console.log(stack.size())
// stack.print()

// 十进制转二进制
function divideBy2 (decNumber) {
  var remStack = new Stack(),
      rem,
      binaryString = ''
  
  while (decNumber > 0) {
    rem = Math.floor(decNumber % 2)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / 2)
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString()
  }

  return binaryString
}

// 把十进制转成任何进制
function BaseConverter (decNumber, base) {
  var remStack = new Stack(),
      rem,
      binaryString = '',
      digits = '0123456789ABCDEF'

  // 判断十进制数是否为0，把余数推入栈中
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / base)
  }

  // 把栈中的元素拼接打印出来
  while (!remStack.isEmpty()) {
    binaryString += digits[remStack.pop()]
  }

  // 返回转换的二进制数
  return binaryString
}

// console.log(BaseConverter(233, 16))

module.exports = Stack