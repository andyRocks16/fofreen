var express = require('express');
var app = express();
var randomstring = require("randomstring");
var moment = require('moment');
var now = moment();

var plants = [];
var pots = [];
var air_purifiers = [];
var orders = [];
var users = [];


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
    .listen(8080, function () {
        console.log("GO GREEN PRIVATE LTD Server Started ..............");
    });

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/getPlants', function (req, res) {
    return res.status(200).json(plants);
})

app.get('/getPots', function (req, res) {
   return res.status(200).json(pots);
})

app.get('/getAirPurifiers', function (req, res) {
    return res.status(200).json(air_purifiers);
})

app.post('/giveOrder', function (req, res) {
    var body = req.body;
    var tkn = randomstring.generate();
    var newOrder = {user_id : body.user_id, orders:[]};
    for(var i=0;i<body.content.length;i++){
        newOrder.orders.push(body.content[i]);
    }
    orders.push(newOrder);
    return res.status(200).json({status:"Order Placed", orders});
})

app.post('/login', function (req, res) {
    for(var i=0;i<users.length;i++){
        if(users[i].id == req.body.id && users[i].pwd == req.body.pwd){
            res.status(200).json(users[i]);
        }
    }
})

app.post('/register', function (req, res) {
    console.log(req.body);
    users.push(req.body);
    return res.status(200).json({status:"Registered"});
})