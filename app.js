var express = require('express');//เรียก libary มาใช้
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var port = 5555;

var con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'nodejs'
});
con.connect(function(err){
  console.log(err);
});


app.use(express.static('src/views'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({extended:true}));

app.set('views','./src/views');
app.set('view engine','ejs');

app.listen(port,function(){ //listen เอาไว้ รัน server
  console.log('running: '+port);
});

var nav = require('./src/nav.js');


app.get('/',function(req,res){//การทำ rout localhost => / , localhost => /index
  var name = 'Tanapon';
  res.render('index',{
    datas:{
      nav:nav,
      name:name
  }
});
});


app.post('/',function(req,res){
  var name = req.body.name;
  res.render('index',{
    datas:{
      nav:nav,
    name:name
  }
});
});

app.get('/users',function(req,res){
  var sql = `SELECT * FROM users`;
  con.query(sql,function(err,result,fields){
    console.log(result);
    res.render('users',{
      datas:{
      nav:nav,
      users:result
  }
});
});
});




var hi = 'Hello World';
console.log(hi);
