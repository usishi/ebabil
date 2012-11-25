exports.lists=function(req,res){
  var page = req.params.page;
  console.log("List:"+page);
  switch(page){
    case 'musteri' : {
      res.render('listmusteri');
    } break;
  }//switch
}