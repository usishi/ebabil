var express = require('express'),
  usnlib    = require('usnlib'),
  router  = require('./lib/router'),  
  forms  = require('./lib/forms'),
  ourmodels = require('./lib/models'),
  mongoose = require('mongoose'),
	http      = require('http');

var app = express();

global.mdb = mongoose.createConnection('mongodb://yapit:yapit@mongodb.usishi.net/yapitdb');

ourmodels.defineModels();

function addPublicVariables(req, res, next){
  mdb.model('ytMekan').find(function(err,mekanlar){
    res.locals = {           
        title : 'Proje Takip Sistemi',                          
        mekanlar: mekanlar,
        user:req.session.user
    };                                         
    next(); 
  });                     
};                             

app.configure(function() {
	app.set('port',process.env.PORT || 8084);
	app.use(express.favicon());
  app.use('/static',express.static(__dirname + '/static'));
  app.set('views', __dirname + '/views');
	app.set('view engine', 'jade'); 
	app.use(express.bodyParser());
 	app.use(express.methodOverride());
	app.use(express.cookieParser('Usishi.YapiTadilat.2012'));
	app.use(express.session({cookie:{ maxAge:60000}}));
  app.use(usnlib({admin:'/adm',opens:['/static','/def'],mongoCnnString:'mongodb://ghdb:ghdb@mongodb.usishi.net/ghdb',modelName:'ghUser'}));
  app.use(addPublicVariables);
  app.use(app.router);
   
});

app.configure('development', function () {
  	app.use(express.errorHandler({
    	dumpExceptions: true,
    	showStack: true
  }));
  app.use(express.logger({ format: 'PORTAL REQUEST :status [:date] :method :url' }));
  app.use(express.logger('dev'));
});

app.configure('production', function () {
  	app.use(express.errorHandler());
});


app.get('/', function(req, res) {
  res.render('root',{});
});

//app.get('/def/:page/:param', usrouter.membership);
app.get('/def/:page', router.definitions);
app.get('/def/:page/:mekan_id/', router.definitions);
app.get('/def/:page/:mekan_id/:item_id', router.definitions);
app.post('/def/:page/:job',forms.definitions);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});