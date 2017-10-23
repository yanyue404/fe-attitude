var model = require('./model');

module.exports = {
  getIndexPage(req,res){
    model.getAllHero((err,heros)=>{
      if(err) throw err;
      res.render('index',{list:heros});
    })
  }
}