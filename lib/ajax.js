var sendReturn = function(res,returnVal) {
    res.contentType('application/json');    
    res.send(JSON.stringify(returnVal));
    console.log('return sent');
};

exports.functions = function(req,res) {
  var func = req.params.fname;
  console.log('AJAX:'+func);
  switch(func) {
    case 'addmusteri':{
      var ebMusteri = mdb.model('ebMusteri');
      var musteri  = new ebMusteri();
      musteri.name = req.body.musteri
      musteri.title = req.body.title;
      musteri.vergi_dairesi = req.body.vergidairesi;
      musteri.vergi_numarasi = req.body.verginumarasi;
      musteri.adres=req.body.adres;
      musteri.risk=req.body.risk;
      musteri.vade=req.body.vade;
      musteri.save(function(e){
        if (e) { throw e;}
        sendReturn(res,'saved');
      });
    } break;
  } // switch
}