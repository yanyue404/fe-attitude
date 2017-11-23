
var path = require('path');
var bodyParser = require('body-parser');
var user = require('../model/user');



module.exports = {
    getIndexPage(req,res){
        user.getUserOne(req.body.username,req.body.password,(err,user)=>{
            if(err) throw err
            if(!user) return res.send({err_msg:'err'})

            res.send({err_msg:'ok'})
        })
    }



}