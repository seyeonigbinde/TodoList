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


router.get('/todo/:todo_id', (req, res) => {
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

router.post('/newtodo', (req, res, next) => {
  Todo.addTodo(req.body)
    .then(newTodo => {
      res.status(201).json(newTodo);
    })
    .catch(next);
})

module.exports = router
