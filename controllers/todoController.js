var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://demo1:admin123@todo-awleb.mongodb.net/test?retryWrites=true&w=majority');

//create a schema just like a blueprint of database
var todoSchema = new mongoose.Schema({
  item: String  
});

var Todo = mongoose.model('todo', todoSchema);
// var item1 = Todo({item: 'get flowers'}).save(function(err){
//    if(err) throw err;
//    console.log('item saved'); 
// });



//var data =[{item: 'get milk'},{item: 'walk dog'},{item: 'keep some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){


    app.get('/todo', function(req, res){
        //get data from mongoDb and pass it to the view
        Todo.find({}, function(err, data){
           if(err) throw err;
           res.render('todo', {todos: data});
        })
        
    });

    app.post('/todo',urlencodedParser, function(req, res){
        //get data from the view and add it to database
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res){
        //delete item from mongoDb 
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
};