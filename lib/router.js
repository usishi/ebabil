


exports.lists=function(req,res){
  var page = req.params.page;
  console.log("List:"+page);
  switch(page){
    case 'musteri' : {
      mdb.model('ebMusteri').find({},function(e,musteriler){
        res.render('listmusteri',{
          musteriler : musteriler
        });  
      });      
    } break;
  }//switch
}

exports.add=function(req,res){
  var page = req.params.page;
  console.log("Add:"+page);
  switch(page){
    case 'musteri' : {
      res.render('addmusteri');
    } break;
  }//switch
}