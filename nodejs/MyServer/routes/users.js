var express = require('express')
var router = express.Router()

/* GET users listing. */
router
  .get('/', function(req, res, next) {
    res.send('respond with a resource')
  })
  .post('/', (req, res) => {
    res.send('post请求/路径')
  })
  .put('/', (req, res) => {
    res.send('put请求/路径')
  })
  .delete('/', (req, res) => {
    res.send('delete请求/路径')
  })

module.exports = router
