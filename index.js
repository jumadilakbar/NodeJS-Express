//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//konfigurasi koneksi
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crud_db'
});

//connect ke database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// set folder public sebagai static folder untuk static file
// app.use('/assets',express.static(__dirname + '/public'));

//route untuk homepage
app.get('/',(req, res) => {
  var sql = "SELECT * FROM user";
  var query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('index',{
      results: results
    });
  });
});

// route untuk insert data
app.post('/save',(req, res) => {
  var data = {nama_user: req.body.nama_user, jumlah_mantan: req.body.jumlah_mantan};
  var sql = "INSERT INTO user SET ?";
  var query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route untuk update data
app.post('/update',(req, res) => {
  var sql = "UPDATE user SET nama_user='"+req.body.nama_user+"', jumlah_mantan='"+req.body.jumlah_mantan+"' WHERE id_user="+req.body.id;
  var query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route untuk delete data
app.post('/delete',(req, res) => {
  var sql = "DELETE FROM user WHERE id_user="+req.body.id_user+"";
  var query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
