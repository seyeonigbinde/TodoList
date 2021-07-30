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

router.post('/addtodo', (req, res, next) => {
  Todo.addTodo(req.body)
    .then(newTodo => {
      res.status(201).json(newTodo);
    })
    .catch(next);
})

router.put('/todo/:id', (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the movie id");
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

router.delete("/api/movies/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the movie id");
  // movies = movies.filter(movie => `${movie.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

module.exports = router
