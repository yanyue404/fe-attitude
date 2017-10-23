var model = require('./model');

module.exports = {
  getIndexPage(req,res){
    model.getAllHero((err,heros)=>{
      if(err) throw err;
      res.render('index',{list:heros});
    })
  },
  showHeroInfo(req,res){
    var id = req.query.id;
    model.getHeroById(id,(err,hero)=>{
      if(err) throw err;
      res.render('info',hero)
    })
  }
}