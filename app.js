var express = require('express'),  
  router  = require('./lib/router'),  
  ourmodels = require('./lib/models'),
  mongoose = require('mongoose'),
	http      = require('http');

var app = express();

var Config = global.Config = require('./config').config;

global.mdb = mongoose.createConnection('mongodb://ebabil:ebabil@mongodb.usishi.net/ebabildb');

function addPublicVariables(req, res, next){
  res.locals = {           
      title : 'Ebabil ',      
      config : Config
  };                                         
  next(); 
};                             

app.configure(function() {
	app.set('port',process.env.PORT || 8085);
	app.use(express.favicon());
  app.use('/static',express.static(__dirname + '/static'));
  app.set('views', __dirname + '/views');
	app.set('view engine', 'jade'); 
	app.use(express.bodyParser());
 	app.use(express.methodOverride());
	app.use(express.cookieParser('Usishi.Ebabil.2012'));
	app.use(express.session({cookie:{ maxAge:60000}}));
  //app.use(usnlib({admin:'/adm',opens:['/static','/def'],Config.dbCnnString,modelName:'ghUser'}));
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
  res.render('root');
});

app.get('/list/:page', router.lists);
app.get('/add/:page', router.add);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});