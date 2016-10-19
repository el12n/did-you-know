var express = require('express');
var app = express();

app.use(express.static(__dirname+"/public/views"));
app.use('/views',express.static(__dirname+"/public/views"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});