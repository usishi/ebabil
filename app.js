var express = require('express'),  
  router  = require('./lib/router'),  
  ajaxfunctions  = require('./lib/ajax'),  
  ourmodels = require('./lib/models'),
  mongoose = require('mongoose'),
  url           = require('url'),
	http      = require('http');

var app = express();

var Config = global.Config = require('./config').config;

global.mdb = mongoose.createConnection(Config.dbCnnString);

ourmodels.defineModels();

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
  app.use(express.favicon(__dirname + '/static/favicon.ico', { maxAge: 2592000000 }));
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

app.all('/login',function(req,res){
  res.render('login')
});

app.all('/',function(req,res){
  res.redirect('/pg/dashboard'); 
});

app.get('/pg/:page',function(req,res){
  var prm=url.parse(req.url, true).query['e'];
  if (prm==undefined){
    prm='{}';
  } else {
    prm=JSON.stringify(querystring.parse((new Buffer(prm, 'base64').toString('utf8'))));
  }
  if (req.session.user==null){    //session user yokken
    console.log("User YOK");
    if (req.signedCookies.uname == undefined || req.signedCookies.pwd == undefined || req.signedCookies.ldapid == undefined){
      res.redirect('/login'); //cookie de yok
    } else { //cookie var login test
      functions.loginCheck(req.signedCookies.uname,req.signedCookies.pwd,req.signedCookies.ldapid,function(obj){
        console.log("APP  login check");
        if(obj.canlogin){
          req.session.user=obj.user;
          res.render(req.params.page,{config : Config,
            user : req.session.user,params:prm});
        } else {
          res.redirect('/login');
        }
      })
    }
  } else {
    console.log("page:"+req.params.page);
    res.render(req.params.page,{config : Config,
      user : req.session.user,params:prm});
  }
});

app.all('/ajax/:question',ajaxfunctions.ask);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});