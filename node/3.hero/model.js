var fs = require('fs');
var path = require('path');

function getAll(callback){
  fs.readFile(path.join(__dirname,'/data.json'),'utf-8',(err,dataStr)=>{
    if(err) callback(err);
    var heros = JSON.parse(dataStr);
    callback(null,heros)
  })
}



module.exports = {
  getAllHero(callback){
    getAll(callback)
  },
  getHeroById(id,callback){
   getAll((err,heros)=>{
     if(err) return callback(err);
     heros.some(hero=>{
       if(hero.id === parseInt(id)){
         callback(null,hero);

         return true; //在some的方法中,表示立即结束循环
       }
     })
   })
  }
}