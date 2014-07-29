//Create new express server
var express = require('express') 
    ,app = express()
    ,http = require('http')
    ,server = http.createServer(app)
    ,io = require('socket.io')(server)
    ,jade = require('jade');

var port = process.env.PORT || 3000;

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

io.on('connection', function (socket) {
    socket.on('setUsername', function (username) {
        socket.username = username
    }); 
    socket.on('message', function (data) {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });           
    })
});