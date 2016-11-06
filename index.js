var express = require("express");
var app = express();
var path = require("path");
var port = 3700;


app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/node_modules'));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname + '/tpl/first.html'));
});

var io = require('socket.io').listen(app.listen(port));
console.log("listening on port "+port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});