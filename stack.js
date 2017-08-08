function Stack () {
  
  var items = []

  this.push = function (element) {
    items.push(element)
  }

  this.pop = function () {
    return items.pop()
  }

  this.peek = function () {
    return items[items.length - 1]
  }

  this.isEmpty = function () {
    return items.length === 0
  }

  this.size = function () {
    return items.length
  }

  this.clear = function () {
    items = []
  }

  this.print = function () {
    console.log(items.toString())
  }
}

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

function divideBy2 (decNumber, base) {
  var remStack = new Stack(),
      rem,
      binaryString = '',
      digits = '0123456789ABCDEF'


  while (decNumber > 0) {
    rem = Math.floor(decNumber % base)
    remStack.push(rem)
    decNumber = Math.floor(decNumber / base)
  }

  while (!remStack.isEmpty()) {
    binaryString += digits[remStack.pop()]
  }

  return binaryString
}

console.log(divideBy2(233, 16))