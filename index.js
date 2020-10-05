//require express
var express = require('express');
//reqiure body parser
var bodyParser = require('body-parser');
//Require mongoose
var mongoose = require('mongoose');
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

//MongoDB Connection Info
const Todo = require('./models/todo.model');
const mongoDB = 'mongodb+srv://xiiethan:fLvdhzo1K55gAUAv@cluster0.mumvp.mongodb.net/todolist?retryWrites=true&w=majority';
//TO DO: Change database to mine
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

//Couple of items items
var tasks = [];
//completed items 
var completed = [];

//get home page
app.get('/', function (req, res) {
    //Query to mongoDB
    Todo.find(function(err, todo){
        if(err){
            console.log(err);
        }else{
            console.log(todo);
            for(i=0; i < todo.length; i++){
                if(todo[i].done == true){
                    completed.push(todo[i].item);
                }else{
                    tasks.push(todo[i].item);
                }
            }
        }
    });
    //return something to homepage
    res.render('index', { tasks: tasks, completed: completed });
});

//add post method /addtask
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    tasks.push(newTask);
    //return index
    res.redirect('/');
});
//TO DO: Update removetask for the mongoDB
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