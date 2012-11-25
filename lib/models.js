var mongoose = require('mongoose')
  ,Schema = mongoose.Schema 
  ,ObjectId = Schema.ObjectId 
  
  ;

var ebMusteri = new Schema({
  name:String,
  title:String,
  vergi_dairesi:String,
  vergi_numarasi:String,
  adres : String,
  risk:Number,
  vade:Number,
  rootday:{type:Number,index:true,default:0},
  cust_id : {type:Number, default:1},
  cdate : {type:Date, default : Date.now}
});




exports.defineModels = function() {
  mdb.model('ebMusteri',ebMusteri);
  console.log("models registered");
}