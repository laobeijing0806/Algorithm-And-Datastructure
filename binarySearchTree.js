function BinarySearchTree () {
  // 二叉树的键
  var Node = function (key) {
    // 键值
    this.key = key
    // 左节点
    this.left = null
    // 右节点
    this.right = null
  }

  // 根节点
  var root = null

  // 用于插入节点
  var insertNode = function (node, newNode) {
    // 在二叉搜索树中，比父节点小的值存在左侧节点，大于等于父节点的存在右侧节点
    // 若要插入一个节点（根节点已存在），首先与根节点比大小，若比根节点小则应插入根节点的左侧
    // 如果左侧已存在节点，则递归调用函数，将左侧节点传入递归函数作为当前节点
    // 如果插入的节点比当前节点大且当前节点右侧为空，则插入右侧
    // 如果插入节点比根节点大，原理同上
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    }
  }

  var inOrderTraverseNode = function (node, callback) {
    if (node !== null) { // 停止递归的条件
      inOrderTraverseNode(node.left, callback)
      callback(node.key)
      inOrderTraverseNode(node.right, callback)
    }
  }

  var preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key)
      preOrderTraverseNode(node.left, callback)
      preOrderTraverseNode(node.right, callback)
    }
  }


  var postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback)
      postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  // 自己实现的
  // var minNode = function (node) {
  //   if (node.left !== null) {
  //     return minNode(node.left)
  //   }

  //   return node.key
  // }

  // var maxNode = function (node) {
  //   if (node.right !== null) {
  //     return maxNode(node.right)
  //   }

  //   return node.key
  // }

  var minNode = function(node) {
    // 如果node存在，则开始搜索。能避免树的根节点为Null的情况
    if (node) {
      // 只要树的左侧子节点不为null，则把左子节点赋值给当前节点。
      // 若左子节点为null，则该节点肯定为最小值。
      while (node && node.left !== null) {
        node = node.left
      }
      return node.key
    }
    return null
  }

  var maxNode = function(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key
    }
    return null
  }

  var searchNode = function (node, key) {
    if (node === null) {
      false
    }

    if (key < node.key) {
      return searchNode(node.left, key)
    } else if (key > node.key) {
      return searchNode(node.right, key)
    } else {
      return true
    }
  }

  // 和minNode函数是一样的，只不过返回值不一样
  var findMinNode = function (node) {
    if (node === null) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node
    }
    return null
  }

  var removeNode = function (node, key) {
    if (node === null) {
      return null
    }

    if (key < node.key) {
      node.left = removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = removeNode(node.right, key)
      return node
    } else {
      // 第一种情况：删除叶节点
      if (node.left === null && node.right === null) {
        node = null
        return node
      }

      // 第二种情况：删除一侧有子节点的节点
      // 将一侧的子节点替换为当前节点
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }

      // 第三种情况：删除两侧都有子节点的节点
      // 找到当前节点右侧子树中最小的那个节点，替换掉要删除的节点
      // 然后再把右侧子树中最小的节点移除
      var aux = findMinNode(node.right)
      node.key = aux.key
      node.right = removeNode(node.right, aux.key)
      return node
    }
  }

  // 插入
  this.insert = function (key) {
    var node = new Node(key)

    if (root === null) {
      root = node
    } else {
      insertNode(root, node)
    }
  }

  // 中序遍历
  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(root, callback)
  }

  // 先序遍历
  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(root, callback)
  }

  // 后序遍历
  this.postOrderTraverse = function (callback) {
    postOrderTraverseNode(root, callback)
  }

  // 找到最小节点
  this.min = function () {
    return minNode(root)
  }

  // 找到最大节点
  this.max = function () {
    return maxNode(root)
  }

  // 查找节点
  this.search = function (key) {
    return searchNode(root, key)
  }

  // 删除节点
  this.remove = function (key) {
    root = removeNode(root, key)
  }
}


var tree = new BinarySearchTree()

tree.insert(11)
tree.insert(7)
tree.insert(25)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(100)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(-1)
tree.insert(6)

// tree.inOrderTraverse(function (key) {
//   console.log(key)
// })

console.log(tree.min())
console.log(tree.max())