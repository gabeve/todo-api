var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

var todos = [{
    id: 1,
    description: 'Meet mom for lunch',
    completed: false
}, {
    id: 2,
    description: 'ssssssssss',
    completed: false
}, {
    id: 3,
    description: 'tttttttttt',
    completed: true
}];

var todoNextId = 1;

app.get('/', function(req, res) {
    res.send('Todo API Root');
});


app.get('/todos', function(req, res) {
    res.json(todos);
});

app.get('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id);
    var matchedTodo;
    todos.forEach(function (todo) {
        if(todoId === todo.id) {
            matchedTodo = todo;
        }
    });

    if(matchedTodo) {
        res.json(matchedTodo);
    } else {
        res.status(404).send();
    }
    
    res.send('Asking for todo with id of ' + req.params.id);
});

app.post('/todos', function(req, res) {
   var body = req.body;

   body.id = todoNextId++;

   todos.push(body);

   res.json(body); 
});

app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + '!');
}); 