function Set () {
  
  var items = {}

  this.has = function (value) {
    return items.hasOwnProperty(value)
  }

  this.add = function (value) {
    if (!this.has(value)) {
      items[value] = value
      return true
    }
    return false
  }

  this.remove = function (value) {
    if (this.has(value)) {
      delete items[value]
      return true
    }
    return false
  }

  this.clear = function () {
    items = {}
  }

  this.size = function () {
    return Object.keys(items).length
  }

  this.values = function () {
    return Object.keys(items)
  }

  this.union = function (otherSet) {
    var unionSet = new Set()

    var values = this.values()
    for (var i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }

    values = otherSet.values()
    for (var i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }

    return unionSet
  }

  // 自己实现的T T，和下面一对比被秒成渣
  // this.intersection = function (otherSet) {
  //   var intersectionSet = new Set()

  //   var values1 = this.values()
  //   var values2 = otherSet.values()

  //   for (var i = 0; i < values1.length; i++) {
  //     for (var j = 0; j < values2.length; j++) {
  //       if (values1[i] === values2[j]) {
  //         intersectionSet.add(values1[i])
  //         break
  //       }
  //     }
  //   }

  //   return intersectionSet
  // }

  this.intersection = function (otherSet) {
    var intersectionSet = new Set()

    var values = this.values()
    for (var i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersectionSet.add(values[i])
      }
    }

    return intersectionSet
  }

  this.difference = function (otherSet) {
    var differenceSet = new Set()
    
    var values = this.values()
    for (var i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        differenceSet.add(values[i])
      }
    }

    return differenceSet
  }

  // 自己实现的
  // this.subSet = function (otherSet) {
  //   var values = this.values()
  //   return values.every(function (value) {
  //     return otherSet.has(value)
  //   })
  // }

  this.subSet = function (otherSet) {
    if (this.size() > otherSet.size()) {
      return false
    } else {
      var values = this.values()
      for (var i = 0; i < values.length; i++) {
        if (!otherSet.has(values[i])) {
          return false
        }
      }
      return true
    }
  }
}

var setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)

var setB = new Set()
setB.add(2)
setB.add(3)
setB.add(4)
setB.add(5)

var setC = new Set()
setC.add(2)
setA.add(3)

var unionAB = setA.union(setB)
console.log(unionAB.values())

var intersectionAB = setA.intersection(setB)
console.log(intersectionAB.values())

var differenceAB = setA.difference(setB)
console.log(differenceAB.values())

console.log(setA.subSet(setB))
console.log(setC.subSet(setA))
console.log(setC.subSet(setB))

// var set = new Set()

// set.add(1)
// console.log(set.values())
// console.log(set.has(1))
// console.log(set.size())

// set.add(2)
// console.log(set.values())
// console.log(set.has(2))
// console.log(set.size())

// set.remove(1)
// console.log(set.values())

// set.remove(2)
// console.log(set.values())