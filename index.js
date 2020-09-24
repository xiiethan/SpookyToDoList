//require express
var express = require ('express');

//create express object, call express
var app = express();

//get home page
app.get('/', function(req, res){
    //return something to homepage
    //res.send('Hello World');
    res.render('index');
})

//add post method /addtask
app.post('/addtask', function(req, res){
    //return index
    res.render('index');
}

//server setup
app.listen(3000, function(){
    console.log('Listening...')
});

//node index.js will launch