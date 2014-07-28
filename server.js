//Create new express server
var express = require('express') 
    ,app = express()
    ,http = require('http')
    ,server = http.createServer(app)
    ,io = require('socket.io')(server)
    ,jade = require('jade');

var port = Number(process.env.PORT||3000); //port is either the heroku port or localhost:3000

server.listen(port, function(){
    console.log("Listening on port " + port + "...")
});

//set the configurations for res.render
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.render('home.jade');
});

io.sockets.on('connection', function (socket) {
    socket.on('setUsername', function (data) {
        socket.set('username', data);
    }); 
    socket.on('message', function (message) {
        socket.get('username', function (error, name) {
            var data = { 'message' : message, username : name };
            socket.broadcast.emit('message', data);
            console.log("user " + name + " send this : " + message);
        })
    });
});