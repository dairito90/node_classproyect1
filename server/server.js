var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var morgan = require('morgan');
var app = express();
var PORT = 9091;
var mongoose = require('mongoose');
var Container = require('../models/containers');

mongoose.connect('mongodb://drodriguez:j071312d@ds133291.mlab.com:33291/containers')

// var containers = [];
// var id = 0;

app.use(morgan('dev'));
app.use(express.static('containerClient'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/containers', function(req, res){
  const ContainerObj = new Container ({
      companyName: req.body.companyName ,
      containerNumber:req.body.containerNumber,
      status:req.body.status
  });
  ContainerObj.save((err) => {
      if (err) {
          res.send(err);
      }
      res.json({message:'Container created'});
  });
});

app.get('/containers', function(req, res){
    container.find((err, containers) => {
        if (err) {
            res.send(err);
        }
        res.send(containers);
    });
});

app.get('/containers/:id', function(req, res){
  var container = _.find(containers, {id:req.params.id});
  res.json(container || {});
});

app.put('/containers/:id', function(req, res){
 Container.findById(req.params.id,(err, container) => {
     if (err) {
         res.send();
     }
     if (req.body.companyName) {
         container.companyName = req.body.companyName;
     }
     if (req.body.containerNumber) {
         container.containerNumber = req.body.containerNumber;
     }
     if (req.body.status) {
         container.status= req.body.status;
     }

     container.save((err) => {
         if (err) {
             res.send(err);
         }
         res.json({message:'Updated container'})
     });
 });
});

app.delete('/containers/:id', function(req, res){
  Container.remove({_id: req.params.id}, (err,container) => {
      if (err) {
          res.send(err);
      }

      res.json({message:'Deleted container!'});
  });
});



app.listen(PORT);
