function Dictionary () {
  var items = {}

  this.has = function (key) {
    // 书上用的是in操作符来判断，但是in对于继承来的属性也会返回true，所以我换成了这个
    return items.hasOwnProperty(key)
  }

  this.set = function (key, value) {
    items[key] = value
  }

  this.remove = function (key) {
    if (this.has(key)) {
      delete items[key]
      return true
    }
    return false
  }

  this.get = function (key) {
    return this.has(key) ? items[key] : undefined 
  }

  // 自己实现的
  // this.values = function () {
  //   var valueArr = []
  //   var keyArr = Object.keys(items)
  //   for (var i = 0; i < keyArr.length; i++) {
  //     valueArr[i] = items[keyArr[i]]
  //   }
  //   return valueArr
  // }

  this.values = function () {
    var values = []
    for (var k in items) {
      if (this.has(k)) {
        values.push(items[k])
      }
    }
    return values
  }

  this.keys = function () {
    return Object.keys(items)
  }

  this.size = function () {
    return Object.keys(items).length
  }

  this.clear = function () {
    items = {}
  }

  this.getItems = function () {
    return items
  }
}

// 一些操作
// var dictionary = new Dictionary()

// dictionary.set('A', '1')
// dictionary.set('B', '2')
// dictionary.set('C', '3')

// console.log(dictionary.has('A'))
// console.log(dictionary.size())
// console.log(dictionary.keys())
// console.log(dictionary.values())
// console.log(dictionary.get('C'))

// dictionary.remove('B')

// console.log(dictionary.keys())
// console.log(dictionary.values())
// console.log(dictionary.getItems())

module.exports = Dictionary