var fs = require('fs');
var path = require('path');

function getAll(callback) {
  fs.readFile(path.join(__dirname, '/data.json'), 'utf-8', (err, dataStr) => {
    if (err) callback(err);
    var heros = JSON.parse(dataStr);
    callback(null, heros)
  })
}


function writeAll(heros, callback) {
  fs.writeFile(path.join(__dirname, './data.json'), JSON.stringify(heros, null, '  '), (err) => {
    if (err) return callback(err);
    // 返回true表示文件写入成功！
    callback(null, true);
    // 异步方法中无法通过 return 直接返回数据，所以 需要让调用者传递一个 callback 回调函数操作数据
  });
}



module.exports = {
  getAllHero(callback) {
    getAll(callback)
  },
  getHeroById(id, callback) {
    getAll((err, heros) => {
      if (err) return callback(err);
      heros.some(hero => {
        if (hero.id === parseInt(id)) {
          callback(null, hero);

          return true; //在some的方法中,表示立即结束循环
        }
      })
    })
  },
  deleteHeroById(id, callback) {
    getAll((err, heros) => {
      if (err) return callback(err);
      heros.some((hero, index) => {
        if (hero.id === parseInt(id)) {
          heros.splice(index, 1);
          
        
          return true;
        }
      })

      //重写到数据当中
      writeAll(heros,callback)
    })
  },
  addHero(hero,callback){
getAll((err,heros)=>{
  var newId = 0;
  heros.forEach(item=>{
    if(item.id>newId){
      newId = item.id;
    }
  });
  newId++;
  hero.id = newId;
  heros.push(hero);
  writeAll(heros,callback);
})
  },
  changeHeroInfo(hero,callback){
      hero.id = parseInt(hero.id);
    getAll((err,heros)=>{
      if(err) throw err;
      heros.some((item,index)=>{
        if(item.id ===hero.id){
          heros.splice(index,1,hero);
          return true;
        }
      })
        writeAll(heros,callback);
    })
  }


}