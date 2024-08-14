var express = require('express')
var router = express.Router()

/* GET home page. */
router
  .get('/', function(req, res, next) {
    res.render('index', {
      title: 'Express',
      description: 'A simple Node.js web application',
      keywords: 'Node.js, Express, Web Application'
    })
  })
  .get('/info', (req, res) => {
    res.send('get发起的info请求')
  })

module.exports = router
