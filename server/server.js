var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var morgan = require('morgan');
var app = express();
var PORT = 9091;

var containers = [];
var id = 0;

app.use(morgan('dev'));
app.use(express.static('containerClient'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/containers', function(req, res){
  var container = req.body;
  id++;
  req.body.id = id + '';
  containers.push(container);
  res.json(container);
});

app.get('/containers', function(req, res){
  res.json(containers);
});

app.get('/containers/:id', function(req, res){
  var container = _.find(containers, {id:req.params.id});
  res.json(container || {});
});

app.put('/containers/:id', function(req, res){
  var update = req.body;
if(update.id){
  delete update.id;
  }


var container = _.findIndex(containers, {id: req.params.id});
if(!containers[container]){
res.send();
}else{
var updateContainer = _.assign(containers[container], update);
res.json(updateContainer);
    }
});

app.delete('/containers/:id', function(req, res){
  var containers = _.findIndex(container, {id: req.params.id});
  if(!containers[container]){
    res.send()
  }else{
    var deletedContainer = container[container];
    lions.splice(container, 1);
    res.json(deletedContainer);
  }
});



app.listen(PORT);
