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

router.post('/todo', (req, res, next) => {
  Todo.addTodo(req.body)
    .then(newTodoList => {
      res.status(201).json(newTodoList);
    })
    .catch(next);
})

router.put('/todo/:id', (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the todo id");
  if (
    req.body.id === undefined ||
    !req.body.title ||
    !req.body.director ||
    !req.body.metascore 
  ) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  // movies = movies.map(movie => {
  //   if (`${movie.id}` === req.params.id) {
  //     return req.body;
  //   }
  //   return movie;
  // });
  // res.status(200).send(movies);
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
