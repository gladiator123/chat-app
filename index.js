var express = require("express"),
	routes = require('./routes'),
  	socket = require('./routes/socket.js');
var path = require("path");

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

app.configure(function(){
  app.set('views', __dirname + '/tpl');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
});

app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/node_modules'));
app.use(express.static(__dirname+'/tpl'));
app.get('*', routes.index);

var io = require('socket.io').listen(app);


io.sockets.on('connection', socket);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});