const express = require('express')
const helpers = require('./todos_model')
const {
  validateTodo,
  validateTodoId,
} = require('../middlewares/todo-middleware');

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

router.put('/todo/:id', validateTodoId, validateTodo, (req, res, next) => {

  Todo.editTodo(req.params.id, req.body)
  .then(todos => {
    res.status(200).json(todos);
  })
  .catch(error => {
    next(error)
  });
});

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
