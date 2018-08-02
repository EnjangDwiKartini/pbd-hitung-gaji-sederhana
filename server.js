var express = require('express')
var bodyParser= require('body-parser')
var app = express()
var MongoClient = require('mongodb').MongoClient
var bootstrap = require('express-bootstrap-service')
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bootstrap.serve)
app.use(express.static('public'))
app.use(express.static('views'))

app.set('view engine', 'ejs')

bootstrap.init({
    minified: false
});

app.get('/', (req, res) => {
  res.render('index.ejs')
});

app.get('/data', function(req, res) {
db.collection('gaji').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('data.ejs', {data: result})
  })
});


app.post('/gaji', (req, res) => {
  db.collection('gaji').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/data')
  })
});

var db

MongoClient.connect('mongodb://localhost:27017/gaji', (err, database) => {
  if (err){
  	return console.log(err)
  } else{
  	console.log('connect db')
  }
  db = database
  app.listen(PORT, () => {
    console.log('listening on 3000')
  })
});
