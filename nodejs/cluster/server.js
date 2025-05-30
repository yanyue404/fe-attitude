const http = require('http')
// 加载拿到 cluster 模块
const cluster = require('cluster')
// 通过 os 模块拿到当前计算机上的 cpu
const cpus = require('os').cpus()

// 通过 cluster 启动 HTTP 服务
// cluster 能拿到当前是否是 master 模式
if (cluster.isMaster) {
  // master 下，对每个 cpu 都 fork 一个进程
  // 相当于是把 cpu 个数都吃满，充分利用多核优势
  for (let i = 0; i < cpus.length; i++) {
    cluster.fork()
  }
} else {
  // 如果不是 master 模式，则每个子进程都会启动这个服务
  // 相当于有多少个 cpu，fork 了多少个进程，这里就会有多少个服务器
  http
    .Server((req, res) => {
      for (var i = 0; i < 1000000; i++) {}
      // 关键修改点：声明字符编码
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
      })
      res.end(    '经过一个耗时操作，这是返回的一段文本\n')
    })
    .listen(5000, () => console.log('服务启动了, 在 http://localhost:5000/'))
}
