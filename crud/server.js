
var express        =        require("express");
var bodyParser     =        require("body-parser");
var app            =        express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var mongoose = require('mongoose');    

mongoose.connect("mongodb://root:root123456@ds029630.mlab.com:29630/bookfair", { useNewUrlParser: true });
var db = mongoose.connection;

db.once("open", function(callback) {
   console.log("Connection succeeded.");
  });

  var Schema = mongoose.Schema; 
  var adminSchema = new Schema({
    name: String,
    email: String,
    password: String
  });
  var userSchema = new Schema({
    name: String,
    email: String
  });

  
  app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });

  app.get('/insert', function(req, res){
    db.collection("app_admin").insertOne({ name: "admin", email: "admin@gmail.com",password:"123456" }, function(err, res) {
      if (err) throw err;
      console.log("Document inserted");
      db.close();
    });
    res.send("Ok");
  });

  app.get('/insertuser', function(req, res){
    console.log('ok');
    db.collection("app_user").insertOne({ name: "Test1", email: "test1@gmail.com" }, function(err, res) {
      if (err) throw err;
      console.log("Document inserted");
      db.close();
    });
    res.send('Ok');
  });

  app.get('/list', function(req, res){
    db.collection("app_user").find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      res.send(result);
    });
    
  });

  app.get('/fetch', function(req, res){
    var query = { name: "admin1" };
    db.collection("app_admin").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });

  app.get('/update', function(req, res){
    var myquery = { name: "admin" };
    var newvalues = { $set: {name: "admin1"} };
    db.collection("app_admin").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });

  app.get('/delete', function(req, res){
    var myquery = { name: 'admin' };
    db.collection("app_admin").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      res.send("Data Deleted");
      db.close();
    });
  });

  app.post('/logauth', function (req, res) {
    console.log(req.body);
    db.collection("app_admin").find(req.body).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result);
      db.close();
    });
  })

  app.get('/check',function(req,res){
    console.log('Ok');
  });
  
  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })