var fs = require('fs');
var path = require('path');

function getAll(callback){
  fs.readFile(path.join(__dirname,'/data.json'),'utf-8',(err,dataStr)=>{
    if(err) callback(err);
    var heros = JSON.parse(dataStr);
    callback(null,heros)
  })
}

function delHeroByIndex(index,callback){
  
}

module.exports = {
  getAllHero(callback){
    getAll(callback)
  }
}