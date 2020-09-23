//require express
var express = require ('express');

//create express object, call express
var app = express();

//get home page
app.get('/', function(req, res){
    //return something to homepage
    res.send('Hello World');
})

//server setup
app.listen(3000, function(){
    console.log('Listening...')
});

//node index.js will launch