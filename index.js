//require express
var express = require('express');
//reqiure body parser
var bodyParser = require('body-parser');
//create express object, call express
var app = express();

//get port info
const port = process.env.PORT || 3000;

//tell app to use EJS for templates
app.set('view engine', 'ejs');

//Make styles public
app.use(express.static("public"));

//tell app to use Body parser
app.use(bodyParser.urlencoded({ extended: true }));

//Couple of items items
var tasks = ["Attend Class", "Do Homework"];

//completed items 
var completed = ["Vocab words"];

//get home page
app.get('/', function (req, res) {
    //return something to homepage
    //res.send('Hello World');
    res.render('index', { tasks: tasks, completed: completed });
});

//add post method /addtask
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    tasks.push(newTask);
    //return index
    res.redirect('/');
});

app.post('/removetask', function (req, res) {
    var removeTask = req.body.check;
    //To Do: push to completed
    if (typeof removeTask === 'string') {
        tasks.splice(tasks.indexOf(removeTask), 1);
        completed.push(removeTask);
    } else if (typeof removeTask === 'object') {
        for (var i = 0; i < removeTask.length; i++) {
            tasks.splice(tasks.indexOf(removeTask[i]), 1);
            completed.push(removeTask[i]);
        }
    }
    res.redirect('/');
});

//server setup
app.listen(port, function () {
    console.log('Listening on port ' + port)
});

//node index.js will launch