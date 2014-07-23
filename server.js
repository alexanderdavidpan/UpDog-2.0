//Create new express server
var express = require('express') 
  ,app = express()
    ,http = require('http')
    ,server = http.createServer(app)
    ,io = require('socket.io').listen(server)
    ,jade = require('jade');

// var logfmt = require("logfmt");
var port = Number(process.env.PORT||3000); //port is either the heroku port or localhost:5000


server.listen(port, function(){
    console.log("I am listening!")
});


//set the configurations for res.render
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set("view options", { layout: false });


app.use(express.static(__dirname + '/public')); // Express mounts/uses a static server on the /public folder (currentdir/public). Any content of public folder becomes avaialble to be served by the static middleware (ie adds headers, request url info etc)


app.get('/', function(req, res){ //when responding to the GET request, render home.jade. Render looks inside the views directory and uses the view engine to render the file.
  res.render('home.jade');
});


io.sockets.on('connection', function (socket) {
    socket.on('setPseudo', function (data) { //this corresponds on line 19 in script.js-----> socket.emit('setPseudo', $("#pseudoInput").val()); ----> script.js sends the setPseudo event, and data is $("#pseduoInput").val();
        socket.set('pseudo', data); //on setPseudo event, the server sets the pseudo as the data received from script for setPseduo ---> pseudonym
    }); 

    socket.on('message', function (message) {
        socket.get('pseudo', function (error, name) {
            var data = { 'message' : message, pseudo : name };
            socket.broadcast.emit('message', data);
            console.log("user " + name + " send this : " + message);
        })
    });
});