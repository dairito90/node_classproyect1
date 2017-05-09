var express = require('express');
var app = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./models/books.js');

const PORT = 6666;
const db = 'mongodb://drodriguez:j071312d@ds133291.mlab.com:33291/containers';


mongoose.connect(db);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.listen(PORT, function(){
    console.log('app listening on port ${PORT}');
});
