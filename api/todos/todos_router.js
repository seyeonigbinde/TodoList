const express = require('express')
const helpers = require('./todos_model')

const Todo = require('./todos_model')

const router = express.Router()

router.get('/todos', (req, res, next) => {
  helpers.findTodo()
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(next); 
});

router.get('/todo/:id', (req, res) => {
  const todo_id = req.params.id 
  Todo.findTodoById(todo_id)
  .then(todo => {
      res.json(todo);
  })
  .catch(err => res.status(500).json({ 
      message: err.message, 
      stack: err.stack 
  }))
});

router.post('/todos', (req, res, next) => {
  Todo.addTodo(req.body)
    .then(newTodoList => {
      res.status(201).json(newTodoList);
    })
    .catch(next);
})


router.put('/todo/:id', (req, res, next) => {
  const todo_id = req.params.id 
  const { title, activity } = req.body;
  const findTodoById = todo => {
    return todo.id === todo_id;
  };
  const foundTodo = Todo.find(findTodoById);
  if (!foundTodo) {
    return res.status(400).send("Your request is missing the todo id");
  } else {
    if (title) foundTodo.title = title;
    if (activity) foundTodo.activity = activity;
    return res(
      res.status(200),
      res.json(Todo)
    )
  }
}),

router.delete("/todo/:id", (req, res, next) => {
  const todo_id = req.params.id 
  Todo.deleteTodo(todo_id)
    .then((count) => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "todo not found" });
      }
    })
    .catch(next);
});

module.exports = router
