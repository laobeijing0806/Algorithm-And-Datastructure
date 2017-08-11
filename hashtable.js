var LinkedList = require('./LinkedList') // 分离链接法需要引入之前定义的链表

function HashTable () {
  var table = []

  var loseloseHashCode = function (key) {
    var hash = 0
    for (var i = 0; i　< key.length; i++) {
      hash += key.charCodeAt(i)
    }
    // 37是一个任意的数，这里只是为了得到一个较小的数值
    return hash % 37
  }

  var ValuePair = function (key, value) {
    this.key = key
    this.value = value
    this.toString = function () {
      return '[' + this.key + ' - ' + this.value + ']'
    }
  }

  // 初始实现的三种方法
  // this.put = function (key, value) {
  //   var position = loseloseHashCode(key)
  //   // 用于展示的
  //   console.log(position + ' - ' + key)
  //   table[position] = value
  // }

  // this.get = function (key) {
  //   return table[loseloseHashCode(key)]
  // }

  // this.remove = function (key) {
  //   table[loseloseHashCode(key)] = undefined
  // }

  // 为了解决冲突，使用分离链接法重写
  this.put = function (key, value) {
    var position = loseloseHashCode(key)

    if (table[position] === undefined) {
      table[position] = new LinkedList()
    }

    table[position].append(new ValuePair(key, value))
  }

  this.get = function (key) {
    var position = loseloseHashCode(key)

    if (table[position] !== undefined) {
      var current = table[position].getHead()

      // 遍历链表查找值
      while (current.next) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }

      // 检查元素如果是最后一个的情况
      if (current.element.key === key) {
        return current.element.value
      }
    }

    return undefined
  }

  this.remove = function (key) {
    var position = loseloseHashCode(key)

    if (table[position] !== undefined) {
      var current = table[position].getHead()

      // 遍历查找值
      while (current.next) {
        if (current.element.key === key) {
          // 使用链表的remove方法
          table[position].remove(current.element)
          //　当链表为空了，就把散列表该位置设为undefined
          if (table[position].isEmpty()) {
            table[position] = undefined
          }
          return true
        }
        current = current.next
      }

      if (current.element.key === key) {
        table[position].remove(current.element)
        if (table[position].isEmpty()) {
          table[position] = undefined
        }
        return true
      }
    }

    return false
  }

  // 使用线性探查重写
  this.put = function (key, value) {
    var position = loseloseHashCode(key)
    // 如果当前位置是空，就直接赋值
    if (table[position] === undefined) {
      table[position] === new ValuePair(key, value)
    } else {
      // 否则就在下一个索引赋值
      var index = ++position

      while (table[index] !== undefined) {
        index++
      }
      table[index] = new ValuePair(key, value)
    }
  }

  this.get = function (key) {
    var position = loseloseHashCode(key)

    if (table[position] !== undefined) {
      if (table[position].key === key) {
        return table[position].value
      } else {
        var index = ++position
        while(table[index].key !== key || table[index] === undefined) {
          index++
        }
        if (table[index].key === key) {
          return table[position].value
        } 
      }
    }
    return undefined
  }

  this.remove = function () {
    var position = loseloseHashCode(key)

    if (table[position] !== undefined) {
      if (table[position].key === key) {
        table[position] = undefined
      } else {
        var index = ++position
        while(table[index].key !== key || table[index] === undefined) {
          index++
        }
        if (table[index].key === key) {
          table[position] = undefined
        } 
      }
    }
    return undefined
  }

  this.print = function () {
    for (var i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ': ' + table[i])
      }
    }
  }
}

var hash = new HashTable()

hash.put('Gandalf', 'gandalf@email.com')
hash.put('John', 'john@email.com')
hash.put('Tyrion', 'tyrion@email.com')
hash.put('Aaron', 'aaron@email.com')
hash.put('Donnie', 'donnie@email.com')
hash.put('Ana', 'ana@email.com')
hash.put('Jonathan', 'jonathan@email.com')
hash.put('Jamie', 'jamie@email.com')
hash.put('Sue', 'sue@email.com')
hash.put('Mindy', 'mindy@email.com')
hash.put('Paul', 'paul@email.com')
hash.put('Nathan', 'nathan@email.com')


/*
 * 上面Jonathan, Jamie, Sue散列值相同，因此被添加时，后面的值会覆盖前面的值，其他冲突元素也一样。
 */
hash.print()