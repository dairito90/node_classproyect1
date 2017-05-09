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

app.get('/', function(req,res) {
    res.send('Happy to be here!!')
});


app.post('/book', function(req,res){
    var newBook = new Book ();
    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;

    newBook.save(function(err, book){
        if (err) {
            res.send(err);
        } else {
            console.log(book);
            res.send(book);
        }
    });
});


app.get('/books', function(req,res){
    Book.find({});
    .exec(function (err, books){
        if (err) {
            res.send(err);
        } else {
            console.log(books);
            res.json(books);
        }
    });
});

app.get('/books/:id', function(req,res){
    Book.findOne({
        _id:req.params.id
    })
    .exec(function(err, books){
        if (err) {
            res.send(err);
        } else {
            console.log(book);
            res.json(book);
        }
    })
});



app.listen(PORT, function(){
    console.log('app listening on port ${PORT}');
});
