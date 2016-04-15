const fs = require('fs');
const express = require('express');
const cors = require('cors');
const dummyjson = require('dummy-json');

var template = fs.readFileSync('dummy-json/user.hbs', {encoding: 'utf8'});
var app = express();

app.use(cors());

app.get('/people', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(dummyjson.parse(template));
});

app.listen(3001);
console.log('Listening at localhost: 3001');
