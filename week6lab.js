let express = require("express");
let bodyparser = require('body-parser');

const mongoose = require('mongoose');
const task = require('./models/task');
const Developer = require('./models/developer');

let app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static('images'));
app.use(express.static('css'));

app.use(bodyparser.urlencoded({ extended: false }));
app.listen(8080);


mongoose.connect('mongodb://localhost:27017/taskDb', function (err){
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
    console.log('Successfully connected');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/addnewtasks', function (req, res) {
    res.sendFile(__dirname + '/views/insertnewtasks.html');
});

//Change the Task Schema!!!
app.post('/addnewtasks', function(req,res){
    let newTask = new task({
        _id: new mongoose.Types.ObjectId(),
        taskName: req.body.tname,
        taskAssign: req.body.tuser,
        taskDate: req.body.tdate,
        taskStatus: req.body.tstat,
        taskDescription: req.body.tdesc
    });

    newTask.save(function (err) {
        if (err) throw err;
        console.log('task successfully save to DB')});

    res.redirect('/getalltasks');
});



// app.get('/getalltasks', function (req, res) {
//     task.find({}, function(err,docs){
//         if (!err){
//             res.render('listalltasks.html', {taskDb: docs});
//             // console.log(docs.length);
//         }
//     });
// });

app.get('/getalltasks', function(req,res){
    task.find({}).populate('taskAssign').exec(function(err,docs){
        if (err) throw err;
        res.render('listalltasks.html', {taskDb: docs});
    })
});

app.get('/addnewdev', function (req, res) {
    res.sendFile(__dirname + '/views/insertdeveloper.html');
});

app.post('/addnewdev', function(req,res){
    let newDev = new Developer({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: req.body.devfName,
            lastName:req.body.devlName
        },
        level: req.body.devLevel,
        address:{
            State: req.body.devState,
            Suburb: req.body.devSuburb,
            Street: req.body.devStreet,
            Unit:req.body.devUnit
        }
    });

    newDev.save(function (err) {
        if (err) throw err;
        console.log('Developer successfully save to DB')});
    res.redirect('/getalldev');
});

app.get('/getalldev', function (req, res) {
    Developer.find({}, function(err,docs){
        if (!err){
            res.render('listalldev.html', {devDb: docs});
        }
    });

});

app.get('/deletetask', function(req,res){
    res.sendFile(__dirname + "/views/deleteTask.html")
});

//Delete task by taskID
app.post('/deletetask', function(req,res){
   task.findByIdAndDelete({'_id': req.body.taskid}, function(err,doc){
       console.log("Deleted successfully")
   });
   res.redirect('/getalltasks');
});

//delete all completed tasks
app.get('/deletealltask', function(req,res){
   task.deleteMany({'taskStatus': 'Completed'}, function(err, doc){
       console.log("Deleted all Completed Task successfully");
   }) ;
   res.redirect('/getalltasks');
});

//Update task by taskID
app.get('/updatetask', function(req,res){
    res.sendFile(__dirname + '/views/updateTask.html')
});

app.post('/updatetask', function(req,res){
    task.updateOne({'_id': req.body.taskid }, {$set: {'taskStatus': req.body.newstat}}, function(err,doc){
        console.log("Update Complete!");
    })
    res.redirect('/getalltasks');
});
