var express = require('express')
var router = express.Router()

// 示例数据
const recordsData = [
  { id: 1, name: 'Record 1', description: 'This is the first record.' },
  { id: 2, name: 'Record 2', description: 'This is the second record.' },
  { id: 3, name: 'Record 3', description: 'This is the third record.' }
]

router.get('/', function(req, res, next) {
  res.json({
    code: '200',
    msg: 'success',
    data: recordsData
  }) // 返回示例数据作为 JSON
})

module.exports = router
