var Dictionary = require('./dictionary')
var Queue = require('./queue')
var Stack = require('./stack')

function Graph () {
  var vertices = []
  var adjList = new Dictionary()

  // 将所有节点初始化为白色，表示尚未访问
  var initializeColor = function () {
    var color = {}
    for (var i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white'
    }
    return color
  }

  var dfsVisit = function (u, color, callback) {
    color[u] = 'grey'
    if (callback) {
      callback(u)
    }
    var neighbors = adjList.get(u)

    for (var i = 0; i < neighbors.length; i++) {
      var w = neighbors[i]
      if (color[w] === 'white') {
        dfsVisit(w, color, callback)
      }
    }
    color[u] = 'black'
  }

  var DFSVisit = function (u, color, d, f, p) {
    console.log('discovered ' + u)
    color[u] = 'grey'
    d[u] = ++time

    var neighbors = adjList.get(u)
    for (var i = 0; i < neighbors.length; i++) {
      var w = neighbors[i]
      if (color[w] === 'white') {
        p[w] = u
        DFSVisit(w, color, d, f, p)
      }
    }
    color[u] = 'black'
    f[u] = ++time
    console.log('explored ' + u)
  }

  this.addVertex = function (v) {
    vertices.push(v)
    adjList.set(v, [])
  }

  this.addEdge = function (v, w) {
    adjList.get(v).push(w)
    adjList.get(w).push(v)
  }

  // 广度优先搜索(bfs)
  // bfs是从一个指定顶点开始，先搜索相邻顶点，再探索相邻顶点的其他相邻顶点，层层递进
  // 这里用一个队列来存储待探索的顶点
  this.bfs = function (v, callback) {
    var color = initializeColor(),
        queue = new Queue()
    // 将指定顶点入队列
    queue.enqueue(v)

    while (!queue.isEmpty()) {
      var u = queue.dequeue(), // 将顶点出队列
          neighbors = adjList.get(u) // 取出相邻顶点列表
      
      // 将该顶点标记为灰色，表示已访问，还未探索相邻顶点
      color[u] = 'grey'

      // 遍历该顶点的所有相邻顶点
      for (var i = 0; i < neighbors.length; i++) {
        var w = neighbors[i]
        // 避免因为环引起的重复访问
        if (color[w] === 'white') {
          // 将相邻顶点标记为灰，表示已访问，还未探索相邻顶点
          color[w] = 'grey'
          // 将已访问的相邻顶点入队列，准备进一步探索
          queue.enqueue(w)
        }
      }
      // 将原顶点标记为黑色，表示已探索相邻顶点
      color[u] = 'black'

      // 调用回调函数
      if (callback) {
        callback(u)
      }
    }
  }

  // 改进版广度优先搜索，找到每个顶点距离源顶点的最短路径
  // 主要是新增了d数组表示距离，pred数组表示前朔点
  this.BFS = function (v) {
    var color = initializeColor(),
        queue = new Queue(),
        d = [],
        pred = []

    queue.enqueue(v)

    // 初始化两个数组
    for (var i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0
      pred[vertices[i]] = null
    }

    while (!queue.isEmpty()) {
      var u = queue.dequeue(),
          neighbors = adjList.get(u)

      color[u] = 'grey'

      for (var i = 0; i < neighbors.length; i++) {
        var w = neighbors[i]
        if (color[w] === 'white') {
          color[w] = 'grey'
          // 相邻顶点距前朔点距离+1
          d[w] = d[u] + 1
          // 将当前顶点的前朔点记录在pred数组中
          pred[w] = u
          queue.enqueue(w)
        }
      }
      
      color[u] = 'black'
    }
    
    return {
      distance: d,
      predecessors: pred
    }
  }
  
  this.dfs = function (callback) {
    var color = initializeColor()
    
    for (var i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, callback)
      }
    }
  }
  
  var time = 0
  this.DFS = function () {
    var color = initializeColor(),
        d = [],
        f = [],
        p = []
    time = 0

    for (var i = 0; i < vertices.length; i++) {
      f[vertices[i]] = 0
      d[vertices[i]] = 0
      p[vertices[i]] = null
    }

    for (var i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, d, f, p)
      }
    }

    return {
      discovery: d,
      finished: f,
      predecessors: p
    }
  }

  this.toString = function () {
    var string = ''
    for (var i = 0; i < vertices.length; i++) {
      string += vertices[i] + ' -> '
      for (var j = 0; j < adjList.get(vertices[i]).length; j++) {
        string += adjList.get(vertices[i])[j] + ' '
      }
      string += '\n'
    }
    return string
  }
}

var graph = new Graph()
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for (var i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// graph.bfs(myVertices[0], function (value) {
//   console.log('Visited vertex: ' + value)
// })

var shortestPathA = graph.BFS(myVertices[0])
// console.log(shortestPathA)

// 源顶点
var fromVertex = myVertices[0]

// 从myVertices中遍历顶点，每一轮循环输出源顶点到一个顶点的最短路径
for (var i = 1; i < myVertices.length; i++) {
  var toVertex = myVertices[i],
      path = new Stack()
  // 将顶点赋值给v，在predecessors中不断回朔，将回朔点推入栈中，直到找到源顶点，退出循环
  for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v)
  }
  // 把源顶点也推入栈中
  path.push(fromVertex)
  // 因为源顶点最后入栈，所以它最先出栈
  var s = path.pop()

  // 然后不断把栈中的顶点输出，拼接到一个字符串中
  while (!path.isEmpty()) {
    s += ' - ' + path.pop()
  }
  // 这时输出的就是当前顶点到源顶点的最短路径
  console.log(s)
}

graph.dfs(function (value) {
  console.log('Visited vertex: ' + value)
})

graph = new Graph()

myVertices = ['A', 'B', 'C', 'D', 'E', 'F']

for (var i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i])
}

graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('B', 'D')
graph.addEdge('B', 'E')
graph.addEdge('C', 'F')
graph.addEdge('F', 'E')

var result = graph.DFS()
// console.log(graph.toString())