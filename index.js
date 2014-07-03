var express = require("express");
var app = express();
var port = 3700;
 
app.get("/", function(req, res){
    res.send("Welcome to UpDog!");
});
 
app.use(express.static(__dirname + '/public'));
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});