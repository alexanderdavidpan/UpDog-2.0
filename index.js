var express = require("express");
var app = express();
var port = 3700;
 
app.get("/", function(req, res){
    res.send("Welcome to Updog!");
});
 
app.listen(port);
console.log("Listening on port " + port);

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});