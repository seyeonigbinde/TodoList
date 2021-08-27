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



router.put('/todo/:id', async (req, res) =>{
  const {todo_id} = req.params
  const {body} = req
  try {
      const updated = await Todo.editTodo(todo_id, body)
      if (!updated) {
          res.status(404).json({
              message: `The todo with the ID ${todo_id} does not exist`
          })
      } else {
          res.json(updated)
          
      }
  }catch(err) {
      res.status(500).json({ 
      message: 'The todo information could not be modified',
      error: err.message,
      }) 
  }
}) 

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
